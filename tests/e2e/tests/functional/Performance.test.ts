import test from '@lib/BaseTest'
import { format } from 'util'

const { execSync } = require("child_process")

test.describe.configure({ mode: `parallel` })

const CMD = `npx lighthouse %s --preset desktop --output html --output-path ./%s-%s-report.html --disable-full-page-screenshot --screenEmulation.disabled`
const domain = /https:\/\/(.+?)\./

test(`@LHSmokeEthMainnet Eth performance report`, async ({ newHomePage }) => {
    const url = `https://eth.blockscout.com`
    const envPrefix = domain.exec(url)[1]
    execSync(format(CMD, url, envPrefix, `main`))
    execSync(format(CMD, `${url}/blocks`, envPrefix, `blocks`))
    execSync(format(CMD, `${url}/txs`, envPrefix, `txs`))
})

test(`@LHSmokeEthGoerli @LH Eth Goerli performance report`, async ({ newHomePage }) => {
    const url = `https://eth-goerli.blockscout.com`
    const envPrefix = domain.exec(url)[1]
    execSync(format(CMD, url, envPrefix, `main`))
    execSync(format(CMD, `${url}/blocks`, envPrefix, `blocks`))
    execSync(format(CMD, `${url}/txs`, envPrefix, `txs`))
})

// test(`@SmokeEthGnosisMainnet Gnosis main page components`, async ({ newHomePage }) => {
//     await newHomePage.open_custom(`http://gnosis.blockscout.com/`)
//     await newHomePage.checkIndexing()
//     await newHomePage.checkHeader()
//     await newHomePage.checkBlocksWidget()
// })

// test(`@SmokeEthGnosisChiado Gnosis Chiado main page components`, async ({ newHomePage }) => {
//     await newHomePage.open_custom(`https://gnosis-chiado.blockscout.com/`)
//     await newHomePage.checkIndexing()
//     await newHomePage.checkHeader()
//     await newHomePage.checkBlocksWidget()
// })

// test(`@SmokeEthOptimismMainnet Optimism main page components`, async ({ newHomePage }) => {
//     await newHomePage.open_custom(`https://optimism.blockscout.com/`)
//     await newHomePage.checkIndexing()
//     await newHomePage.checkHeader()
//     await newHomePage.checkBlocksWidget()
// })

// test(`@SmokeEthOptimismGoerli Optimism Goerli main page components`, async ({ newHomePage }) => {
//     await newHomePage.open_custom(`https://optimism-goerli.blockscout.com/`)
//     await newHomePage.checkIndexing()
//     await newHomePage.checkHeader()
//     await newHomePage.checkBlocksWidget()
// })

// test.skip(`@SmokeEthAstar Astar main page components`, async ({ newHomePage }) => {
//     await newHomePage.open_custom(`https://blockscout.com/astar`)
//     await newHomePage.checkIndexing()
//     await newHomePage.checkHeader()
//     await newHomePage.checkBlocksWidget()
// })

// test.skip(`@SmokeEthShiden Shiden main page components`, async ({ newHomePage }) => {
//     await newHomePage.open_custom(`https://blockscout.com/shiden`)
//     await newHomePage.checkIndexing()
//     await newHomePage.checkHeader()
//     await newHomePage.checkBlocksWidget()
// })

// test.skip(`@SmokeEthShibuya Shubuya main page components`, async ({ newHomePage }) => {
//     await newHomePage.open_custom(`https://blockscout.com/shibuya`)
//     await newHomePage.checkIndexing()
//     await newHomePage.checkHeader()
//     await newHomePage.checkBlocksWidget()
// })

// test(`@SmokeEthRootstock Rootstock main page components`, async ({ newHomePage }) => {
//     await newHomePage.open_custom(`https://rootstock.blockscout.com`)
//     await newHomePage.checkIndexing()
//     await newHomePage.checkHeader()
//     await newHomePage.checkBlocksWidget()
// })

// test(`@SmokeEthNeonMainnet Neon main page components`, async ({ newHomePage }) => {
//     await newHomePage.open_custom(`https://neon.blockscout.com/`)
//     await newHomePage.checkIndexing()
//     await newHomePage.checkHeader()
//     await newHomePage.checkBlocksWidget()
// })

// test(`@SmokeEthNeonDevnet Neon devnet main page components`, async ({ newHomePage }) => {
//     await newHomePage.open_custom(`https://neon-devnet.blockscout.com/`)
//     await newHomePage.checkIndexing()
//     await newHomePage.checkHeader()
//     await newHomePage.checkBlocksWidget()
// })

// test(`@SmokeEthBaseGoerli Base goerli main page components`, async ({ newHomePage }) => {
//     await newHomePage.open_custom(`https://base-goerli.blockscout.com/`)
//     await newHomePage.checkIndexing()
//     await newHomePage.checkHeader()
//     await newHomePage.checkBlocksWidget()
// })

// test(`@SmokeEthBaseMainnet Base main page components`, async ({ newHomePage }) => {
//     await newHomePage.open_custom(`https://base.blockscout.com`)
//     await newHomePage.checkIndexing()
//     await newHomePage.checkHeader()
//     await newHomePage.checkBlocksWidget()
// })

// test(`@SmokeEthZetaAthens2 Zetachain Athens 2 main page components`, async ({ newHomePage }) => {
//     await newHomePage.open_custom(`https://zetachain-athens-2.blockscout.com/`)
//     await newHomePage.checkIndexing()
//     await newHomePage.checkHeader()
//     await newHomePage.checkBlocksWidget()
// })

// test(`@SmokeEthZetaAthens3 Zetachain Athens 3 main page components`, async ({ newHomePage }) => {
//     await newHomePage.open_custom(`https://zetachain-athens-3.blockscout.com/`)
//     await newHomePage.checkIndexing()
//     await newHomePage.checkHeader()
//     await newHomePage.checkBlocksWidget()
// })

// test(`@SmokeEthLightlinkPegasus Pegasus main page components`, async ({ newHomePage }) => {
//     await newHomePage.open_custom(`https://pegasus.lightlink.io/`)
//     await newHomePage.checkIndexing()
//     await newHomePage.checkHeader()
//     await newHomePage.checkBlocksWidget()
// })

// test(`@SmokeEthLightlinkPhoenix Phoenix main page components`, async ({ newHomePage }) => {
//     await newHomePage.open_custom(`https://phoenix.lightlink.io/`)
//     await newHomePage.checkIndexing()
//     await newHomePage.checkHeader()
//     await newHomePage.checkBlocksWidget()
// })

// test(`@SmokeEthIotaShimmer Iota Shimmer main page components`, async ({ newHomePage }) => {
//     await newHomePage.open_custom(`https://explorer.evm.testnet.shimmer.network`)
//     await newHomePage.checkIndexing()
//     await newHomePage.checkHeader()
//     await newHomePage.checkBlocksWidget()
// })

// test(`@SmokeEthImmutable Immutable main page components`, async ({ newHomePage }) => {
//     await newHomePage.open_custom(`https://explorer.testnet.immutable.com/`)
//     await newHomePage.checkIndexing()
//     await newHomePage.checkHeader()
//     await newHomePage.checkBlocksWidget()
// })

// test(`@SmokeEthShibarium Shibarium main page components`, async ({ newHomePage }) => {
//     await newHomePage.open_custom(`https://www.shibariumscan.io/`)
//     await newHomePage.checkIndexing()
//     await newHomePage.checkHeader()
//     await newHomePage.checkBlocksWidget()
// })

// test(`@SmokeEthFuse Fuse main page components`, async ({ newHomePage }) => {
//     await newHomePage.open_custom(`https://fuse.blockscout.com/`)
//     await newHomePage.checkIndexing()
//     await newHomePage.checkHeader()
//     await newHomePage.checkBlocksWidget()
// })

// test(`@SmokeEthFuseTestnet Fuse testnet main page components`, async ({ newHomePage }) => {
//     await newHomePage.open_custom(`https://fuse-testnet.blockscout.com/`)
//     await newHomePage.checkIndexing()
//     await newHomePage.checkHeader()
//     await newHomePage.checkBlocksWidget()
// })

// test(`@SmokeEthShibariumTestnet Shibarium testnet main page components`, async ({ newHomePage }) => {
//     await newHomePage.open_custom(`https://puppyscan.shib.io/`)
//     await newHomePage.checkIndexing()
//     await newHomePage.checkHeader()
//     await newHomePage.checkBlocksWidget()
// })

// test(`@SmokeEthOptimismSepolia Optimism sepolia testnet main page components`, async ({ newHomePage }) => {
//     await newHomePage.open_custom(`https://optimism-sepolia.blockscout.com/`)
//     await newHomePage.checkIndexing()
//     await newHomePage.checkHeader()
//     await newHomePage.checkBlocksWidget()
// })

// test(`@SmokeEthIotaShimmerMainnet Iota Shimmer mainnet main page components`, async ({ newHomePage }) => {
//     await newHomePage.open_custom(`https://explorer.evm.shimmer.network/`)
//     await newHomePage.checkIndexing()
//     await newHomePage.checkHeader()
//     await newHomePage.checkBlocksWidget()
// })

// test(`@SmokeEthETCMordor Mordor main page components`, async ({ newHomePage }) => {
//     await newHomePage.open_custom(`https://etc-mordor.blockscout.com/`)
//     await newHomePage.checkIndexing()
//     await newHomePage.checkHeader()
//     await newHomePage.checkBlocksWidget()
// })

// test(`@SmokeEthETCMainnet ETC main page components`, async ({ newHomePage }) => {
//     await newHomePage.open_custom(`https://etc.blockscout.com/`)
//     await newHomePage.checkIndexing()
//     await newHomePage.checkHeader()
//     await newHomePage.checkBlocksWidget()
// })
