import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })
/*
    these tests are for common smoke functionality across all priority envs
    they do not interact with contract deployments, checking static data
    test logic is common, however we separate the tests for visibility
*/

const COMMON_TOKEN_NAME = `USDT`
const COMMON_TOKEN_FULL_NAME = `Tether USD \\(USDT\\)`

test.only(`@SmokeEthMainnet Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
})

test(`@SmokeEthGoerli Eth Goerli Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth-goerli.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
})

test(`@SmokeEthGnosisMainnet Gnosis Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`http://gnosis.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(`Tether USD on xDai \\(USDT\\)`)
})

test(`@SmokeEthGnosisChiado Gnosis Chiado Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://gnosis-chiado.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
})

test(`@SmokeEthOptimismMainnet Optimism Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
})

test(`@SmokeEthOptimismGoerli Optimism Goerli Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism-goerli.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
})

test.skip(`@SmokeEthAstar Astar Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/astar`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
})

test.skip(`@SmokeEthShiden Shiden Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/shiden`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
})

test.skip(`@SmokeEthShibuya Shubuya Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/shibuya`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
})

test(`@SmokeEthRootstock Rootstock Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://rootstock.blockscout.com`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(`USDTbs \\(USDTbs\\)`)
})

test(`@SmokeEthNeonMainnet Neon Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://neon.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(`USDT \\(USDT\\)`)
})

test(`@SmokeEthNeonDevnet Neon devnet Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://neon-devnet.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
})

test(`@SmokeEthBaseGoerli Base goerli Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base-goerli.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
})

test(`@SmokeEthBaseSepolia Base Sepolia Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base-sepolia.blockscout.com/`)
    await newHomePage.search(`MyToken`)
    await newHomePage.findInSearchItems(`MyToken \\(MTKN\\)`)
})

test(`@SmokeEthBaseMainnet Base Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base.blockscout.com`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
})

test(`@SmokeEthZetaAthens3 Zetachain Athens 3 Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://zetachain-athens-3.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
})

test(`@SmokeEthLightlinkPegasus Pegasus Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://pegasus.lightlink.io/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(`USDT \\(USDT\\)`)
})

test(`@SmokeEthLightlinkPhoenix Phoenix Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://phoenix.lightlink.io/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(`Tether USD \\(USDT.e\\)`)
})

test(`@SmokeEthIotaShimmer Iota Shimmer Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.evm.testnet.shimmer.network`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(`Wrapped USDT \\(WUSDT\\)`)
})

test(`@SmokeEthImmutable Immutable Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.testnet.immutable.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.actions.verifyElementIsDisplayed(`section[role="dialog"] >> nth=0 >> text=/Tether \\(USDT\\)/`)
    await newHomePage.actions.verifyElementIsDisplayed(`section[role="dialog"] >> nth=0 >> svg`)
})

test(`@SmokeEthShibarium Shibarium Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://www.shibariumscan.io/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
})

test(`@SmokeEthFuse Fuse Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.fuse.io/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
})

test(`@SmokeEthFuseTestnet Fuse testnet Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.fusespark.io/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
})

test(`@SmokeEthShibariumTestnet Shibarium testnet Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://puppyscan.shib.io/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
})

test(`@SmokeEthOptimismSepolia Optimism sepolia testnet Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism-sepolia.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
})

test(`@SmokeEthIotaMainnetShimmer Iota Shimmer mainnet Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.evm.shimmer.network/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
})

test(`@SmokeEthETCMordor Mordor Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://etc-mordor.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
})

test(`@SmokeEthETCMainnet ETC Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://etc.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
})
