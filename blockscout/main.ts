import { App } from 'cdk8s'
import { K8sClient } from './client/client'
import { BlockscoutChart, ResourceMode } from './pkg/blockscout'

const app = new App()
const chart = new BlockscoutChart(
    app,
    `blockscout`,
    {},
    {
        // TODO: do spread with a prefix for env vars
        image: process.env.IMAGE || `blockscout/blockscout:latest`,
        namespaceName: process.env.NAMESPACE_NAME || `e2e-test`,
        wallet: process.env.WALLET || ``,
        httpURL: process.env.HTTP_URL || `http://localhost:8544`,
        wsURL: process.env.WS_URL || `ws://localhost:8546`,
        httpTraceURL: process.env.HTTP_URL || `http://localhost:8544`,
        variant: process.env.VARIANT || `geth`,
        coin: process.env.COIN || `DAI`,
        resourceMode: process.env.RESOURCE_MODE || ResourceMode.E2E,
        // mainnet vars
        firstBlock: process.env.FIRST_BLOCK,
        lastBlock: process.env.LAST_BLOCK,
        port: Number(process.env.PORT) || 4000,
        auth0Domain: process.env.AUTH0_DOMAIN,
        auth0clientID: process.env.AUTH0_CLIENT_ID,
        auth0clientSecret: process.env.AUTH0_CLIENT_SECRET,
        auth0CallbackURL: process.env.AUTH0_CALLBACK_URL,
        auth0LogoutReturnURL: process.env.AUTH0_LOGOUT_RETURN_URL,
        auth0LogoutURL: process.env.AUTH0_LOGOUT_URL,
        sendGridAPIKey: process.env.SENDGRID_API_KEY,
        sendGridSender: process.env.SENDGRID_SENDER,
        sendGridTemplate: process.env.SENDGRID_TEMPLATE,
        publicTagsAirtable: process.env.PUBLIC_TAGS_AIRTABLE_URL,
        publicTagsAirtableAPIKey: process.env.PUBLIC_TAGS_AIRTABLE_API_KEY,
        socketRoot: process.env.SOCKET_ROOT,
        networkPath: process.env.NETWORK_PATH,
        secretKeyBase: process.env.SECRET_KEY_BASE,
    },
)
app.synth()

new K8sClient(chart.namespaceName, chart.readySelector).deploy()
