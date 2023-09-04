import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })
/*
    these tests are for common smoke functionality across all priority envs
    they do not interact with contract deployments, checking static data
    test logic is common, however we separate the tests for visibility

     https://eth.blockscout.com/
     https://eth-goerli.blockscout.com/
     http://gnosis.blockscout.com/
     https://gnosis-chiado.blockscout.com/
     https://optimism.blockscout.com/
     https://optimism-goerli.blockscout.com/
     https://blockscout.com/astar
     https://blockscout.com/shiden
     https://blockscout.com/shibuya
     https://rootstock.blockscout.com
     https://neon-devnet.blockscout.com/
     https://neon.blockscout.com/
     https://base-goerli.blockscout.com/
     https://base.blockscout.com
     https://zetachain-athens-2.blockscout.com/
     https://zetachain-athens-3.blockscout.com/
     https://pegasus.lightlink.io/
     https://phoenix.lightlink.io/
     https://iota-shimmer-testnet.blockscout.com/
     https://explorer.testnet.immutable.com/
     https://puppyscan.shib.io/
     https://fuse.blockscout.com/

 */
// test.skip()

test(`@SmokeEthMainnet Eth main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth.blockscout.com/`)
    await newHomePage.checkIndexing()
    await newHomePage.checkHeader()
    await newHomePage.checkBlocksWidget()
    await newHomePage.checkDailyTransactions()
})

test(`@SmokeEthGoerli Eth Goerli main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth-goerli.blockscout.com/`)
    await newHomePage.checkIndexing()
    await newHomePage.checkHeader()
    await newHomePage.checkBlocksWidget()
})

test(`@SmokeEthGnosisMainnet Gnosis main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`http://gnosis.blockscout.com/`)
    await newHomePage.checkIndexing()
    await newHomePage.checkHeader()
    await newHomePage.checkBlocksWidget()
})

test(`@SmokeEthGnosisChiado Gnosis Chiado main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://gnosis-chiado.blockscout.com/`)
    await newHomePage.checkIndexing()
    await newHomePage.checkHeader()
    await newHomePage.checkBlocksWidget()
})

test(`@SmokeEthOptimismMainnet Optimism main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism.blockscout.com/`)
    await newHomePage.checkIndexing()
    await newHomePage.checkHeader()
    await newHomePage.checkBlocksWidget()
})

test(`@SmokeEthOptimismGoerli Optimism Goerli main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism-goerli.blockscout.com/`)
    await newHomePage.checkIndexing()
    await newHomePage.checkHeader()
    await newHomePage.checkBlocksWidget()
})

test.skip(`@SmokeEthAstar Astar main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/astar`)
    await newHomePage.checkIndexing()
    await newHomePage.checkHeader()
    await newHomePage.checkBlocksWidget()
})

test.skip(`@SmokeEthShiden Shiden main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/shiden`)
    await newHomePage.checkIndexing()
    await newHomePage.checkHeader()
    await newHomePage.checkBlocksWidget()
})

test.skip(`@SmokeEthShibuya Shubuya main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/shibuya`)
    await newHomePage.checkIndexing()
    await newHomePage.checkHeader()
    await newHomePage.checkBlocksWidget()
})

test(`@SmokeEthRootstock Rootstock main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://rootstock.blockscout.com`)
    await newHomePage.checkIndexing()
    await newHomePage.checkHeader()
    await newHomePage.checkBlocksWidget()
})

test(`@SmokeEthNeonMainnet Neon main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://neon.blockscout.com/`)
    await newHomePage.checkIndexing()
    await newHomePage.checkHeader()
    await newHomePage.checkBlocksWidget()
})

test(`@SmokeEthNeonDevnet Neon devnet main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://neon-devnet.blockscout.com/`)
    await newHomePage.checkIndexing()
    await newHomePage.checkHeader()
    await newHomePage.checkBlocksWidget()
})

test(`@SmokeEthBaseGoerli Base goerli main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base-goerli.blockscout.com/`)
    await newHomePage.checkIndexing()
    await newHomePage.checkHeader()
    await newHomePage.checkBlocksWidget()
})

test(`@SmokeEthBaseMainnet Base main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base.blockscout.com`)
    await newHomePage.checkIndexing()
    await newHomePage.checkHeader()
    await newHomePage.checkBlocksWidget()
})

test(`@SmokeEthZetaAthens2 Zetachain Athens 2 main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://zetachain-athens-2.blockscout.com/`)
    await newHomePage.checkIndexing()
    await newHomePage.checkHeader()
    await newHomePage.checkBlocksWidget()
})

test(`@SmokeEthZetaAthens3 Zetachain Athens 3 main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://zetachain-athens-3.blockscout.com/`)
    await newHomePage.checkIndexing()
    await newHomePage.checkHeader()
    await newHomePage.checkBlocksWidget()
})

test(`@SmokeEthLightlinkPegasus Pegasus main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://pegasus.lightlink.io/`)
    await newHomePage.checkIndexing()
    await newHomePage.checkHeader()
    await newHomePage.checkBlocksWidget()
})

test(`@SmokeEthLightlinkPhoenix Phoenix main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://phoenix.lightlink.io/`)
    await newHomePage.checkIndexing()
    await newHomePage.checkHeader()
    await newHomePage.checkBlocksWidget()
})

test(`@SmokeEthIotaShimmer Iota Shimmer main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://iota-shimmer-testnet.blockscout.com/`)
    await newHomePage.checkIndexing()
    await newHomePage.checkHeader()
    await newHomePage.checkBlocksWidget()
})

test(`@SmokeEthImmutable Immutable main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.testnet.immutable.com/`)
    await newHomePage.checkIndexing()
    await newHomePage.checkHeader()
    await newHomePage.checkBlocksWidget()
})

test(`@SmokeEthShibarium Shibarium main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://www.shibariumscan.io/`)
    await newHomePage.checkIndexing()
    await newHomePage.checkHeader()
    await newHomePage.checkBlocksWidget()
})

test(`@SmokeEthFuse Fuse main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://fuse.blockscout.com/`)
    await newHomePage.checkIndexing()
    await newHomePage.checkHeader()
    await newHomePage.checkBlocksWidget()
})

test(`@SmokeEthFuseTestnet Fuse testnet main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://fuse-testnet.blockscout.com/`)
    await newHomePage.checkIndexing()
    await newHomePage.checkHeader()
    await newHomePage.checkBlocksWidget()
})

test(`@SmokeEthShibariumTestnet Shibarium testnet main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://puppyscan.shib.io/`)
    await newHomePage.checkIndexing()
    await newHomePage.checkHeader()
    await newHomePage.checkBlocksWidget()
})
