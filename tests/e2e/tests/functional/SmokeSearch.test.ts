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

test(`@SmokeEthGoerli Eth Goerli main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth-goerli.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthGnosisMainnet Gnosis main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`http://gnosis.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthGnosisChiado Gnosis Chiado main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://gnosis-chiado.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthOptimismMainnet Optimism main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthOptimismGoerli Optimism Goerli main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism-goerli.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test.skip(`@SmokeEthAstar Astar main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/astar`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test.skip(`@SmokeEthShiden Shiden main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/shiden`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test.skip(`@SmokeEthShibuya Shubuya main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/shibuya`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthRootstock Rootstock main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://rootstock.blockscout.com`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthNeonMainnet Neon main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://neon.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthNeonDevnet Neon devnet main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://neon-devnet.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthBaseGoerli Base goerli main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base-goerli.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthBaseMainnet Base main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base.blockscout.com`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthZetaAthens3 Zetachain Athens 3 main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://zetachain-athens-3.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthLightlinkPegasus Pegasus main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://pegasus.lightlink.io/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthLightlinkPhoenix Phoenix main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://phoenix.lightlink.io/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthIotaShimmer Iota Shimmer main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.evm.testnet.shimmer.network`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthImmutable Immutable main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.testnet.immutable.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthShibarium Shibarium main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://www.shibariumscan.io/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthFuse Fuse main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.fuse.io/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthFuseTestnet Fuse testnet main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.fusespark.io/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthShibariumTestnet Shibarium testnet main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://puppyscan.shib.io/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthOptimismSepolia Optimism sepolia testnet main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism-sepolia.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthIotaShimmerMainnet Iota Shimmer mainnet main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.evm.shimmer.network/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthETCMordor Mordor main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://etc-mordor.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})

test(`@SmokeEthETCMainnet ETC main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://etc.blockscout.com/`)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
    await newHomePage.checkSearchItemsIcons()
})
