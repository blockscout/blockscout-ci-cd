/* eslint-disable no-unused-vars */
/* eslint-disable no-new */
/* eslint-disable no-shadow */
import { Construct } from 'constructs'
import { Chart, ChartProps } from 'cdk8s'
import { ConfigMap } from 'cdk8s-plus-22'
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

const NETWORK_HTTP_PORT = 8544
const NETWORK_WS_PORT = 8546
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
    wallet: string
    walletJSON: string
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

const selectResources = (mode: ResourceMode): [ResourceRequirements, ResourceRequirements, ResourceRequirements] => {
    let resourcesDB: ResourceRequirements
    let resourcesBS: ResourceRequirements
    let resourcesNetwork: ResourceRequirements
    switch (mode) {
    case ResourceMode.E2E:
        resourcesDB = guaranteedResources(`250m`, `1024Mi`)
        resourcesBS = guaranteedResources(`250m`, `1024Mi`)
        resourcesNetwork = guaranteedResources(`250m`, `500Mi`)
        break
    case ResourceMode.Load:
        resourcesDB = guaranteedResources(`2000m`, `4Gi`)
        resourcesBS = guaranteedResources(`1000m`, `2Gi`)
        resourcesNetwork = guaranteedResources(`250m`, `500Mi`)
        break
    case ResourceMode.Chaos:
        resourcesDB = guaranteedResources(`500m`, `1Gi`)
        resourcesBS = guaranteedResources(`1000m`, `1Gi`)
        resourcesNetwork = guaranteedResources(`250m`, `500Mi`)
        break
    default:
        throw Error(`unknown resource mode`)
    }
    return [resourcesBS, resourcesDB, resourcesNetwork]
}

const gethContainer = (resources: ResourceRequirements, cm: ConfigMap): Container => ({
    name: `geth`,
    image: `ethereum/client-go:v1.10.17`,
    ports: [
        { name: `http`, containerPort: NETWORK_HTTP_PORT },
        { name: `ws`, containerPort: NETWORK_WS_PORT },
    ],
    volumeMounts: [
        {
            name: cm.name,
            mountPath: `/root/init.sh`,
            subPath: `init.sh`,
        },
        {
            name: cm.name,
            mountPath: `/root/config`,
        },
        {
            name: cm.name,
            mountPath: `/root/.ethereum/devchain/keystore/key1`,
            subPath: `key1`,
        },
        {
            name: cm.name,
            mountPath: `/root/.ethereum/devchain/keystore/key2`,
            subPath: `key2`,
        },
        {
            name: cm.name,
            mountPath: `/root/.ethereum/devchain/keystore/key3`,
            subPath: `key3`,
        },
    ],
    command: [`sh`, `./root/init.sh`],
    args: [
        `--dev`,
        `--password`,
        `/root/config/password.txt`,
        `--datadir`,
        `/root/.ethereum/devchain`,
        `--unlock`,
        `0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266`,
        `--mine`,
        `--miner.etherbase`,
        `0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266`,
        `--ipcdisable`,
        `--http`,
        `--http.vhosts`,
        `*`,
        `--http.addr`,
        `0.0.0.0`,
        `--http.port=8544`,
        `--ws`,
        `--ws.origins`,
        `*`,
        `--ws.addr`,
        `0.0.0.0`,
        `--ws.port=8546`,
        `--graphql`,
        `-graphql.corsdomain`,
        `*`,
        `--allow-insecure-unlock`,
        `--rpc.allow-unprotected-txs`,
        `--http.corsdomain`,
        `*`,
        `--vmdebug`,
        `--networkid=1337`,
        `--rpc.txfeecap`,
        `0`,
        `--dev.period`,
        `2`,
        `--miner.threads`,
        `1`,
        `--miner.gasprice`,
        `10000000000`,
        `--miner.gastarget`,
        `80000000000`,
    ],
    resources,
})

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

        const [bs, db, net] = selectResources(bsProps.resourceMode)

        const cm = new ConfigMap(this, `geth-cm`, {
            metadata: {
                namespace: ns.name,
            },
            // those are the same as default static hardhat keys but in JSON form, it's known publicly so it's safe to keep it here
            data: {
                key1: bsProps.walletJSON,
                'init.sh': `    #!/bin/bash
                if [ ! -d /root/.ethereum/keystore ]; then
                    echo "/root/.ethereum/keystore not found, running 'geth init'..."
                    geth init /root/ethconfig/genesis.json
                    echo "...done!"
                fi
            
                geth "$@"`,
                'password.txt': ``,
                'genesis.json': `    {
                    "config": {
                      "chainId": 1337,
                      "homesteadBlock": 0,
                      "eip150Block": 0,
                      "eip155Block": 0,
                      "eip158Block": 0,
                      "eip160Block": 0,
                      "byzantiumBlock": 0,
                      "constantinopleBlock": 0,
                      "petersburgBlock": 0,
                      "istanbulBlock": 0,
                      "muirGlacierBlock": 0,
                      "berlinBlock": 0,
                      "londonBlock": 0
                    },
                    "nonce": "0x0000000000000042",
                    "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
                    "difficulty": "1",
                    "coinbase": "0x3333333333333333333333333333333333333333",
                    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
                    "extraData": "0x",
                    "gasLimit": "8000000000",
                    "alloc": {
                      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266": {
                        "balance": "20000000000000000000000"
                      },
                    }
                  }`,
            },
        })

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
                            volumes: [
                                {
                                    name: cm.name,
                                    configMap: {
                                        name: cm.name,
                                    },
                                },
                            ],
                            containers: [
                                gethContainer(net, cm),
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
