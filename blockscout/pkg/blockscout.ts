/* eslint-disable no-unused-vars */
/* eslint-disable no-new */
/* eslint-disable no-shadow */
import { Construct } from 'constructs'
import { Chart, ChartProps } from 'cdk8s'
import {
    KubeDeployment,
    KubeService,
    IntOrString,
    KubeNamespace,
    Container,
    ResourceRequirements,
    KubeStatefulSet,
} from '../imports/k8s'

const defaultCmd = `mix ecto.create && mix ecto.migrate && mix phx.server`

const PG_PORT = 5432
const APP_PORT = 4000

export enum ResourceMode {
    E2E = `e2e`,
    Load = `load`,
    Chaos = `chaos`,
}

interface BlockscoutProps {
    image: string
    namespaceName: string
    httpURL: string
    wsURL: string
    variant: string
    coin?: string
    resourceMode: ResourceMode
    command?: string
}

const guaranteedResources = (cpu: string, memory: string) => ({
    requests: {
        cpu: { value: cpu },
        memory: { value: memory },
    },
    limits: {
        cpu: { value: cpu },
        memory: { value: memory },
    },
})

const selectResources = (mode: ResourceMode): [ResourceRequirements, ResourceRequirements] => {
    let resourcesDB: ResourceRequirements
    let resourcesBS: ResourceRequirements
    switch (mode) {
    case ResourceMode.E2E:
        resourcesDB = guaranteedResources(`500m`, `500Mi`)
        resourcesBS = guaranteedResources(`500m`, `500Mi`)
        break
    case ResourceMode.Load:
        resourcesDB = guaranteedResources(`2000m`, `4Gi`)
        resourcesBS = guaranteedResources(`1000m`, `2Gi`)
        break
    case ResourceMode.Chaos:
        resourcesDB = guaranteedResources(`500m`, `1Gi`)
        resourcesBS = guaranteedResources(`1000m`, `1Gi`)
        break
    default:
        throw Error(`unknown resource mode`)
    }
    return [resourcesBS, resourcesDB]
}

const pgContainer = (resources: ResourceRequirements): Container => ({
    name: `postgres`,
    image: `postgres:13.6`,
    ports: [{ name: `postgres`, containerPort: PG_PORT }],
    readinessProbe: {
        exec: {
            command: [`pg_isready`, `-U`, `postgres`],
        },
        initialDelaySeconds: 10,
        periodSeconds: 2,
    },
    env: [
        {
            name: `POSTGRES_PASSWORD`,
            value: `postgres`,
        },
        {
            name: `POSTGRES_DB`,
            value: `explorer_test`,
        },
    ],
    resources,
})

const bsContainer = (bsProps: BlockscoutProps, resources: ResourceRequirements): Container => ({
    name: `node`,
    image: bsProps.image,
    command: [`/bin/bash`],
    args: [`-c`, bsProps.command || defaultCmd],
    imagePullPolicy: `Always`,
    ports: [{ containerPort: APP_PORT }],
    readinessProbe: {
        httpGet: {
            path: `/`,
            port: { value: APP_PORT },
        },
        initialDelaySeconds: 10,
        periodSeconds: 2,
    },
    env: [
        {
            name: `MIX_ENV`,
            value: `prod`,
        },
        {
            name: `ECTO_USE_SSL`,
            value: `'false'`,
        },
        {
            name: `COIN`,
            value: bsProps.coin || `DAI`,
        },
        {
            name: `ETHEREUM_JSONRPC_VARIANT`,
            value: bsProps.variant,
        },
        {
            name: `ETHEREUM_JSONRPC_HTTP_URL`,
            value: bsProps.httpURL,
        },
        {
            name: `ETHEREUM_JSONRPC_WS_URL`,
            value: bsProps.wsURL,
        },
        {
            name: `DATABASE_URL`,
            value: `postgresql://postgres:@localhost:${PG_PORT}/blockscout?ssl=false`,
        },
    ],
    resources,
})

export class BlockscoutChart extends Chart {
    namespaceName: string

    ports: number[] = []

    readySelector: string

    // eslint-disable-next-line default-param-last
    constructor(scope: Construct, id: string, props: ChartProps = {}, bsProps: BlockscoutProps) {
        super(scope, id, props)
        this.ports.push(APP_PORT, PG_PORT)
        const label = { app: `blockscout-e2e` }
        this.readySelector = `app=${label.app}`

        const ns = new KubeNamespace(this, `ns`, {
            metadata: {
                name: bsProps.namespaceName,
                labels: {
                    type: `blockscout-e2e-test`,
                },
            },
        })
        this.namespaceName = ns.name

        const svc = new KubeService(this, `svc`, {
            metadata: {
                name: `service`,
                namespace: ns.name,
            },
            spec: {
                ports: [{ port: APP_PORT, targetPort: IntOrString.fromNumber(APP_PORT) }],
                selector: label,
            },
        })

        const [bs, db] = selectResources(bsProps.resourceMode)

        switch (bsProps.resourceMode) {
        case ResourceMode.Chaos:
            new KubeStatefulSet(this, `deployment`, {
                metadata: {
                    namespace: ns.name,
                    name: `deployment`,
                    labels: {
                        app: `blockscout`,
                    },
                },
                spec: {
                    serviceName: svc.name,
                    replicas: 1,
                    selector: {
                        matchLabels: label,
                    },
                    template: {
                        metadata: { labels: label },
                        spec: {
                            containers: [
                                bsContainer(bsProps, bs),
                                pgContainer(db),
                            ],
                        },
                    },
                },
            })
            break
        case ResourceMode.E2E:
        case ResourceMode.Load:
            new KubeDeployment(this, `deployment`, {
                metadata: {
                    namespace: ns.name,
                    name: `deployment`,
                    labels: {
                        app: `blockscout`,
                    },
                },
                spec: {
                    replicas: 1,
                    selector: {
                        matchLabels: label,
                    },
                    template: {
                        metadata: {
                            name: `pod`,
                            labels: label,
                        },
                        spec: {
                            containers: [
                                bsContainer(bsProps, bs),
                                pgContainer(db),
                            ],
                        },
                    },
                },
            })
            break
        default:
            throw Error(`unknown resource mode`)
        }
    }
}
