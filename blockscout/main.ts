import { App } from 'cdk8s'
import { K8sClient } from './client/client'
import { env } from './config'
import { BlockscoutChart } from './pkg/blockscout'

const app = new App()
const chart = new BlockscoutChart(
    app,
    `blockscout`,
    {},
    {
        // TODO: do spread with a prefix for env vars
        image: env.IMAGE || `blockscout/blockscout:latest`,
        namespaceName: env.NAMESPACE_NAME,
        wallet: env.WALLET,
        httpURL: env.HTTP_URL,
        wsURL: env.WS_URL,
        variant: env.VARIANT,
        resourceMode: env.RESOURCE_MODE,
    },
)
app.synth()

new K8sClient(chart.namespaceName, chart.readySelector).deploy()
