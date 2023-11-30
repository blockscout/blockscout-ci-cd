import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })
/*
    these tests are for common smoke functionality across all priority envs
    they do not interact with contract deployments, checking static data
    test logic is common, however we separate the tests for visibility
*/

const COMMON_TOKEN_NAME = `USDT`
const COMMON_TOKEN_FULL_NAME = `Tether USD \\(USDT\\)`

test(`@SmokeEthMainnet Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthGoerli Eth Goerli Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth-goerli.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthGnosisMainnet Gnosis Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`http://gnosis.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(`Tether USD on xDai \\(USDT\\)`)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthGnosisChiado Gnosis Chiado Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://gnosis-chiado.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthOptimismMainnet Optimism Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthOptimismGoerli Optimism Goerli Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism-goerli.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test.skip(`@SmokeEthAstar Astar Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/astar`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test.skip(`@SmokeEthShiden Shiden Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/shiden`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test.skip(`@SmokeEthShibuya Shubuya Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/shibuya`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthRootstock Rootstock Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://rootstock.blockscout.com`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(`USDTbs \\(USDTbs\\)`)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthNeonMainnet Neon Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://neon.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(`USDT \\(USDT\\)`)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthNeonDevnet Neon devnet Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://neon-devnet.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthBaseGoerli Base goerli Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base-goerli.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthBaseSepolia Base Sepolia Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base-sepolia.blockscout.com/`)
    await newHomePage.search(`MyToken`)
    await newHomePage.findInSearchItems(`MyToken \\(MTKN\\)`)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthBaseMainnet Base Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base.blockscout.com`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthZetaAthens3 Zetachain Athens 3 Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://zetachain-athens-3.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthLightlinkPegasus Pegasus Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://pegasus.lightlink.io/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(`USDT \\(USDT\\)`)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthLightlinkPhoenix Phoenix Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://phoenix.lightlink.io/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(`Tether USD \\(USDT.e\\)`)
    await newHomePage.checkSearchItemsIcons()
})

test.only(`@SmokeEthIotaShimmer Iota Shimmer Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.evm.testnet.shimmer.network`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(`Wrapped USDT \\(WUSDT\\)`)
    await newHomePage.checkSearchItemsIcons()
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
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthFuse Fuse Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.fuse.io/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthFuseTestnet Fuse testnet Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.fusespark.io/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthShibariumTestnet Shibarium testnet Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://puppyscan.shib.io/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthOptimismSepolia Optimism sepolia testnet Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism-sepolia.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthIotaMainnetShimmer Iota Shimmer mainnet Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.evm.shimmer.network/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthETCMordor Mordor Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://etc-mordor.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthETCMainnet ETC Search USDT`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://etc.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})
