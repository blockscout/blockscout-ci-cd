/* eslint-disable no-unused-vars */
/* eslint-disable no-new */
/* eslint-disable no-shadow */
import { Construct } from 'constructs'
import { Chart, ChartProps } from 'cdk8s'
import { ConfigMap } from 'cdk8s-plus-22'
import { v4 } from 'uuid'
import { KubeIngress } from 'cdk8s-plus-22/lib/imports/k8s'
import {
    KubeDeployment,
    KubeService,
    IntOrString,
    KubeNamespace,
    Container,
    ResourceRequirements,
    KubeStatefulSet,
} from '../imports/k8s'

const defaultCmd = `bin/blockscout eval "Elixir.Explorer.ReleaseTasks.create_and_migrate()" && bin/blockscout start`

export enum ResourceMode {
    E2E = `e2e`,
    Load = `load`,
    Chaos = `chaos`,
    MainnetTest = `account`
}

interface BlockscoutProps {
    image: string
    verificationServiceImage?: string,
    namespaceName: string
    wallet: string
    httpURL: string
    wsURL: string
    httpTraceURL?: string
    variant: string
    resourceMode: string
    coin?: string
    command?: string
    public: string,
    // ports
    port: number,
    portPG: number,
    portNetworkHTTP: number,
    portNetworkWS: number,
    // mainnet vars
    disableRealtimeIndexer?: string,
    firstBlock?: string
    lastBlock?: string
    auth0Domain?: string
    auth0clientID?: string
    auth0clientSecret?: string
    auth0CallbackURL?: string
    auth0LogoutReturnURL?: string
    auth0LogoutURL?: string
    sendGridAPIKey?: string
    sendGridSender?: string
    sendGridTemplate?: string
    publicTagsAirtable?: string
    publicTagsAirtableAPIKey?: string
    socketRoot?: string
    networkPath?: string
    secretKeyBase?: string
    secretKeyGuardian?: string,
    // verifier vars
    enableRustVerificationService?: string,
    rustVerificationServiceURL?: string,
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

const selectResources = (mode: string): [ResourceRequirements, ResourceRequirements, ResourceRequirements, ResourceRequirements] => {
    let resourcesDB: ResourceRequirements
    let resourcesBS: ResourceRequirements
    let resourcesV: ResourceRequirements
    let resourcesNetwork: ResourceRequirements
    switch (mode) {
    case ResourceMode.MainnetTest:
        resourcesDB = guaranteedResources(`500m`, `2048Mi`)
        resourcesBS = guaranteedResources(`500m`, `1024Mi`)
        resourcesV = guaranteedResources(`100m`, `250Mi`)
        resourcesNetwork = guaranteedResources(`200m`, `2Gi`)
        break
    case ResourceMode.E2E:
        resourcesDB = guaranteedResources(`500m`, `1024Mi`)
        resourcesBS = guaranteedResources(`500m`, `1024Mi`)
        resourcesV = guaranteedResources(`100m`, `250Mi`)
        resourcesNetwork = guaranteedResources(`250m`, `1024Mi`)
        break
    case ResourceMode.Load:
        resourcesDB = guaranteedResources(`250m`, `1Gi`)
        resourcesBS = guaranteedResources(`250m`, `1Gi`)
        resourcesV = guaranteedResources(`100m`, `250Mi`)
        resourcesNetwork = guaranteedResources(`250m`, `1Gi`)
        break
    case ResourceMode.Chaos:
        resourcesDB = guaranteedResources(`250m`, `1024Mi`)
        resourcesBS = guaranteedResources(`250m`, `1024Mi`)
        resourcesV = guaranteedResources(`100m`, `250Mi`)
        resourcesNetwork = guaranteedResources(`250m`, `2Gi`)
        break
    default:
        throw Error(`unknown resource mode`)
    }
    return [resourcesBS, resourcesV, resourcesDB, resourcesNetwork]
}

const verificationContainer = (bsProps: BlockscoutProps, resources: ResourceRequirements, vcm: ConfigMap): Container => (
    {
        name: `bs-verification`,
        image: bsProps.verificationServiceImage,
        args: [`-c`, `/app/config/config.toml`],
        volumeMounts: [
            {
                name: vcm.name,
                mountPath: `/app/config`,
            },
        ],
        resources,
    }
)

const gethContainer = (bsProps: BlockscoutProps, resources: ResourceRequirements, cm: ConfigMap): Container => ({
    name: `geth`,
    image: `ethereum/client-go:v1.10.18`,
    ports: [
        { name: `http`, containerPort: bsProps.portNetworkHTTP },
        { name: `ws`, containerPort: bsProps.portNetworkWS },
    ],
    volumeMounts: [
        {
            name: cm.name,
            mountPath: `/root/init.sh`,
            subPath: `init.sh`,
        },
        {
            name: cm.name,
            mountPath: `/root/genesis.json`,
            subPath: `genesis.json`,
        },
        {
            name: cm.name,
            mountPath: `/root/password.txt`,
            subPath: `password.txt`,
        },
    ],
    command: [`sh`, `./root/init.sh`],
    args: [
        `--fakepow`,
        `--dev`,
        `--dev.period`,
        `1`,
        `--datadir`,
        `/root/.ethereum/devnet`,
        `--keystore`,
        `/root/.ethereum/devnet/keystore`,
        `--password`,
        `/root/password.txt`,
        `--unlock`,
        `0`,
        `--unlock`,
        `1`,
        `--mine`,
        `--miner.threads`,
        `1`,
        `--miner.etherbase`,
        `0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266`,
        `--ipcpath`,
        `/root/geth.ipc`,
        `--http`,
        `--http.vhosts`,
        `*`,
        `--http.addr`,
        `0.0.0.0`,
        `--http.port=${bsProps.portNetworkHTTP}`,
        `--http.api`,
        `eth,net,web3,debug,txpool`,
        `--ws`,
        `--ws.origins`,
        `*`,
        `--ws.addr`,
        `0.0.0.0`,
        `--ws.port=${bsProps.portNetworkWS}`,
        `--ws.api`,
        `eth,net,web3,debug,txpool`,
        `--graphql`,
        `--graphql.corsdomain`,
        `*`,
        `--allow-insecure-unlock`,
        `--rpc.allow-unprotected-txs`,
        `--http.corsdomain`,
        `*`,
        `--vmdebug`,
        `--networkid=1337`,
        `--rpc.txfeecap`,
        `0`,
    ],
    resources,
})

const pgContainer = (bsProps: BlockscoutProps, resources: ResourceRequirements): Container => ({
    name: `postgres`,
    image: `postgres:13.6`,
    ports: [{ name: `postgres`, containerPort: bsProps.portPG }],
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
        {
            name: `PGPORT`,
            value: bsProps.portPG.toString(),
        },
    ],
    resources,
})

const bsContainer = (bsProps: BlockscoutProps, resources: ResourceRequirements): Container => {
    const container = {
        name: `node`,
        image: bsProps.image,
        command: [`/bin/bash`],
        args: [`-c`, bsProps.command || defaultCmd],
        imagePullPolicy: `Always`,
        ports: [{ containerPort: bsProps.port }],
        readinessProbe: {
            httpGet: {
                path: `/`,
                port: { value: bsProps.port },
            },
            initialDelaySeconds: 20,
            periodSeconds: 10,
            timeoutSeconds: 10,
        },
        livenessProbe: {
            httpGet: {
                path: `/`,
                port: { value: bsProps.port },
            },
            initialDelaySeconds: 20,
            periodSeconds: 10,
            timeoutSeconds: 10,
        },
        env: [
            {
                name: `MIX_ENV`,
                value: `prod`,
            },
            {
                name: `PORT`,
                value: bsProps.port.toString()!,
            },
            {
                name: `ECTO_USE_SSL`,
                value: `'false'`,
            },
            {
                name: `COIN`,
                value: bsProps.coin,
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
                name: `ETHEREUM_JSONRPC_TRACE_URL`,
                value: bsProps.httpTraceURL,
            },
            {
                name: `ETHEREUM_JSONRPC_WS_URL`,
                value: bsProps.wsURL,
            },
            {
                name: `DATABASE_URL`,
                value: `postgresql://postgres:@localhost:${bsProps.portPG}/blockscout?ssl=false`,
            },
        ],
        resources,
    }
    if (bsProps.resourceMode === ResourceMode.MainnetTest) {
        container.env.push(...[{
            name: `DISABLE_REALTIME_INDEXER`,
            value: bsProps.disableRealtimeIndexer!,
        },
        {
            name: `FIRST_BLOCK`,
            value: bsProps.firstBlock!,
        },
        {
            name: `LAST_BLOCK`,
            value: bsProps.lastBlock!,
        },
        {
            name: `AUTH0_DOMAIN`,
            value: bsProps.auth0Domain!,
        },
        {
            name: `AUTH0_CLIENT_ID`,
            value: bsProps.auth0clientID!,
        },
        {
            name: `AUTH0_CLIENT_SECRET`,
            value: bsProps.auth0clientSecret!,
        },
        {
            name: `AUTH0_CALLBACK_URL`,
            value: bsProps.auth0CallbackURL!,
        },
        {
            name: `AUTH0_LOGOUT_RETURN_URL`,
            value: bsProps.auth0LogoutReturnURL!,
        },
        {
            name: `AUTH0_LOGOUT_URL`,
            value: bsProps.auth0LogoutURL!,
        },
        {
            name: `SENDGRID_API_KEY`,
            value: bsProps.sendGridAPIKey!,
        },
        {
            name: `SENDGRID_SENDER`,
            value: bsProps.sendGridSender!,
        },
        {
            name: `SENDGRID_TEMPLATE`,
            value: bsProps.sendGridTemplate!,
        },
        {
            name: `PUBLIC_TAGS_AIRTABLE_URL`,
            value: bsProps.publicTagsAirtable!,
        },
        {
            name: `PUBLIC_TAGS_AIRTABLE_API_KEY`,
            value: bsProps.publicTagsAirtableAPIKey!,
        },
        {
            name: `SOCKET_ROOT`,
            value: bsProps.socketRoot!,
        },
        {
            name: `NETWORK_PATH`,
            value: bsProps.networkPath!,
        },
        {
            name: `SECRET_KEY_BASE`,
            value: bsProps.secretKeyBase!,
        },
        {
            name: `SECRET_KEY_GUARDIAN`,
            value: bsProps.secretKeyGuardian,
        },
        {
            name: `ENABLE_RUST_VERIFICATION_SERVICE`,
            value: bsProps.enableRustVerificationService!,
        },
        {
            name: `RUST_VERIFICATION_SERVICE_URL`,
            value: bsProps.rustVerificationServiceURL!,
        },
        ])
    }
    return container
}

const createService = (scope: Construct, namespaceName: string, deploymentSelector: { [key: string]: string}, bsProps: BlockscoutProps): KubeService => {
    let svc
    if (bsProps.public === `true`) {
        svc = new KubeService(scope, `svc-${v4()}`, {
            metadata: {
                name: `service`,
                namespace: namespaceName,
            },
            spec: {
                type: `ClusterIP`,
                ports: [{ port: bsProps.port, targetPort: IntOrString.fromNumber(bsProps.port) }],
                selector: deploymentSelector,
            },
        })
        new KubeIngress(scope, `ingress`, {
            metadata: {
                namespace: namespaceName,
                name: `blockscout-ingress`,
                annotations: {
                    'kubernetes.io/ingress.class': `internal-and-public`,
                    'nginx.ingress.kubernetes.io/proxy-body-size': `500m`,
                    'nginx.ingress.kubernetes.io/client-max-body-size': `500M`,
                    'nginx.ingress.kubernetes.io/proxy-buffering': `off`,
                    'nginx.ingress.kubernetes.io/proxy-connect-timeout': `15m`,
                    'nginx.ingress.kubernetes.io/proxy-send-timeout': `15m`,
                    'nginx.ingress.kubernetes.io/proxy-read-timeout': `15m`,
                },
            },
            spec: {
                rules: [
                    {
                        host: `bs-testnet.aws-k8s.blockscout.com`,
                        http: {
                            paths: [
                                {
                                    path: `/`,
                                    pathType: `Prefix`,
                                    backend: {
                                        service: {
                                            name: svc.name,
                                            port: {
                                                number: bsProps.port,
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        })
    } else {
        svc = new KubeService(scope, `svc-${v4()}`, {
            metadata: {
                name: `service`,
                namespace: namespaceName,
            },
            spec: {
                ports: [{ port: bsProps.port, targetPort: IntOrString.fromNumber(bsProps.port) }],
                selector: deploymentSelector,
            },
        })
    }
    return svc
}

export class BlockscoutChart extends Chart {
    namespaceName: string

    ports: number[] = []

    readySelector: string

    // eslint-disable-next-line default-param-last
    constructor(scope: Construct, id: string, props: ChartProps = {}, bsProps: BlockscoutProps) {
        super(scope, id, props)
        this.ports.push(bsProps.port, bsProps.portPG)
        const deploymentSelector = { app: `blockscout-e2e` }
        this.readySelector = `app=${deploymentSelector.app}`

        const ns = new KubeNamespace(this, `ns`, {
            metadata: {
                name: bsProps.namespaceName,
                labels: {
                    type: `blockscout-e2e-test`,
                },
            },
        })
        this.namespaceName = ns.name

        const svc = createService(this, ns.name, deploymentSelector, bsProps)
        const [bs, v, db, net] = selectResources(bsProps.resourceMode)

        const vcm = new ConfigMap(this, `verification-cm`, {
            metadata: {
                namespace: ns.name,
            },
            data: {
                'config.toml': `
[server]
addr = "0.0.0.0:8043"

[sourcify]
api_url = "https://sourcify.dev/server/"
verification_attempts = 3
request_timeout = 10

[solidity]
compilers_list_url = "https://raw.githubusercontent.com/ethereum/solc-bin/gh-pages/linux-amd64/list.json"
refresh_versions_schedule = "0 0 * * * * *"

[metrics]
endpoint = "/metrics"
addr = "0.0.0.0:6060"

[tracing]
jaeger_agents = ["127.0.0.1:6831"]
                `,
            },
        })

        const cm = new ConfigMap(this, `geth-cm`, {
            metadata: {
                namespace: ns.name,
            },
            data: {
                'init.sh': `#!/bin/bash
                echo "/root/.ethereum/keystore not found, running 'geth init'..."
                rm -rf /root/.ethereum/keystore
                echo ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 >> priv1.txt
                echo 59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d >> priv2.txt
                geth account import --keystore /root/.ethereum/devnet/keystore --password /root/password.txt ./priv1.txt
                geth account import --keystore /root/.ethereum/devnet/keystore --password /root/password.txt ./priv2.txt
                geth --datadir /root/.ethereum/devnet init /root/genesis.json
                echo "...done!"
            
                geth "$@"
                `,
                'password.txt': ``,
                'genesis.json': `{
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
                      "londonBlock": 0,
                      "clique":{
                        "blockperiodseconds": 1,
                        "epochlength":30000
                      }
                    },
                    "nonce": "0x0000000000000042",
                    "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
                    "difficulty": "1",
                    "coinbase": "0x3333333333333333333333333333333333333333",
                    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
                    "extraData": "0x",
                    "gasLimit": "8000000000",
                    "alloc": {
                        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266": { "balance": "20000000000000000000000" },
                        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8": { "balance": "20000000000000000000000" }
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
                        matchLabels: deploymentSelector,
                    },
                    template: {
                        metadata: {
                            name: `pod`,
                            labels: deploymentSelector,
                        },
                        spec: {
                            volumes: [
                                {
                                    name: cm.name,
                                    configMap: {
                                        name: cm.name,
                                    },
                                },
                                {
                                    name: vcm.name,
                                    configMap: {
                                        name: vcm.name,
                                    },
                                },
                            ],
                            containers: [
                                gethContainer(bsProps, net, cm),
                                bsContainer(bsProps, bs),
                                verificationContainer(bsProps, v, vcm),
                                pgContainer(bsProps, db),
                            ],
                        },
                    },
                },
            })
            break
        case ResourceMode.MainnetTest:
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
                        matchLabels: deploymentSelector,
                    },
                    template: {
                        metadata: {
                            name: `pod`,
                            labels: deploymentSelector,
                        },
                        spec: {
                            volumes: [
                                {
                                    name: cm.name,
                                    configMap: {
                                        name: cm.name,
                                    },
                                },
                                {
                                    name: vcm.name,
                                    configMap: {
                                        name: vcm.name,
                                    },
                                },
                            ],
                            containers: [
                                gethContainer(bsProps, net, cm),
                                bsContainer(bsProps, bs),
                                verificationContainer(bsProps, v, vcm),
                                pgContainer(bsProps, db),
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
