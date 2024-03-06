import test from '@lib/BaseTest'
import { format } from 'util'

const { execSync } = require(`child_process`)

test.describe.configure({ mode: `parallel` })

const CMD = `npx lighthouse %s --preset desktop --output html --output-path ./%s-%s-report.html --disable-full-page-screenshot --screenEmulation.disabled`
const domain = /https:\/\/(.+?)\./

const runLighthouse = (url: string) => {
    const envPrefix = domain.exec(url)[1]
    execSync(format(CMD, url, envPrefix, `main`))
    execSync(format(CMD, `${url}/blocks`, envPrefix, `blocks`))
    execSync(format(CMD, `${url}/txs`, envPrefix, `txs`))
    execSync(format(CMD, `${url}/tokens`, envPrefix, `tokens`))
    execSync(format(CMD, `${url}/accounts`, envPrefix, `accounts`))
    execSync(format(CMD, `${url}/stats`, envPrefix, `stats`))
}

test(`@LHSmokeEthMainnet Eth performance report`, async ({ newHomePage }) => {
    runLighthouse(`https://eth.blockscout.com`)
})

test(`@LHSmokeEthBaseMainnet Base performance report`, async ({ newHomePage }) => {
    runLighthouse(`https://base.blockscout.com`)
})
