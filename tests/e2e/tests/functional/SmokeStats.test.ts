import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

/*
    See Smoke.test.ts for explanations
*/
test.skip()

test(`@SmokeEthMainnet Eth stats counters check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth.blockscout.com/stats`)
    await newHomePage.checkStatsCounters()
    await newHomePage.checkStatsGraphsDisplayed()
})

test(`@SmokeEthGoerli Eth Goerli stats counters check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth-goerli.blockscout.com/stats`)
    await newHomePage.checkStatsCounters()
    await newHomePage.checkStatsGraphsDisplayed()
})

test(`@SmokeEthGnosisMainnet Gnosis stats counters check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`http://gnosis.blockscout.com/stats`)
    await newHomePage.checkStatsCounters()
    await newHomePage.checkStatsGraphsDisplayed()
})

test(`@SmokeEthGnosisChiado Gnosis Chiado stats counters check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://gnosis-chiado.blockscout.com/stats`)
    await newHomePage.checkStatsCounters()
    await newHomePage.checkStatsGraphsDisplayed()
})

test(`@SmokeEthOptimismMainnet Optimism stats counters check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism.blockscout.com/stats`)
    await newHomePage.checkStatsCounters()
    await newHomePage.checkStatsGraphsDisplayed()
})

test(`@SmokeEthOptimismGoerli Optimism Goerli stats counters check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism-goerli.blockscout.com/stats`)
    await newHomePage.checkStatsCounters()
    await newHomePage.checkStatsGraphsDisplayed()
})

test.skip(`@SmokeEthAstar Astar stats counters check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/astar/stats`)
    await newHomePage.checkStatsCounters()
    await newHomePage.checkStatsGraphsDisplayed()
})

test.skip(`@SmokeEthShiden Shiden stats counters check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/shiden/stats`)
    await newHomePage.checkStatsCounters()
    await newHomePage.checkStatsGraphsDisplayed()
})

test.skip(`@SmokeEthShibuya Shubuya stats counters check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/shibuya/stats`)
    await newHomePage.checkStatsCounters()
    await newHomePage.checkStatsGraphsDisplayed()
})

test(`@SmokeEthRootstock Rootstock stats counters check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://rootstock.blockscout.com/stats`)
    await newHomePage.checkStatsCounters()
    await newHomePage.checkStatsGraphsDisplayed()
})

test(`@SmokeEthNeonMainnet Neon stats counters check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://neon.blockscout.com/stats`)
    await newHomePage.checkStatsCounters()
    await newHomePage.checkStatsGraphsDisplayed()
})

test(`@SmokeEthNeonDevnet Neon devnet stats counters check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://neon-devnet.blockscout.com/stats`)
    await newHomePage.checkStatsCounters()
    await newHomePage.checkStatsGraphsDisplayed()
})

test(`@SmokeEthBaseGoerli Base goerli stats counters check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base-goerli.blockscout.com/stats`)
    await newHomePage.checkStatsCounters()
    await newHomePage.checkStatsGraphsDisplayed()
})

test(`@SmokeEthBaseMainnet Base stats counters check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base.blockscout.com/stats`)
    await newHomePage.checkStatsCounters()
    await newHomePage.checkStatsGraphsDisplayed()
})

test(`@SmokeEthZetaAthens2 Zetachain Athens 2 stats counters check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://zetachain-athens-2.blockscout.com/stats`)
    await newHomePage.checkStatsCounters()
    await newHomePage.checkStatsGraphsDisplayed()
})

test(`@SmokeEthZetaAthens3 Zetachain Athens 3 stats counters check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://zetachain-athens-3.blockscout.com/stats`)
    await newHomePage.checkStatsCounters()
    await newHomePage.checkStatsGraphsDisplayed()
})

test(`@SmokeEthLightlinkPegasus Pegasus stats counters check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://pegasus.lightlink.io/stats`)
    await newHomePage.checkStatsCounters()
    await newHomePage.checkStatsGraphsDisplayed()
})

test(`@SmokeEthLightlinkPhoenix Phoenix stats counters check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://phoenix.lightlink.io/stats`)
    await newHomePage.checkStatsCounters()
    await newHomePage.checkStatsGraphsDisplayed()
})

test(`@SmokeEthIotaShimmer Iota Shimmer stats counters check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://iota-shimmer-testnet.blockscout.com/stats`)
    await newHomePage.checkStatsCounters()
    await newHomePage.checkStatsGraphsDisplayed()
})

test(`@SmokeEthImmutable Immutable stats counters check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.testnet.immutable.com/stats`)
    await newHomePage.checkStatsCounters()
    await newHomePage.checkStatsGraphsDisplayed()
})

test(`@SmokeEthShibarium Shibarium stats counters check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://puppyscan.shib.io/stats`)
    await newHomePage.checkStatsCounters()
    await newHomePage.checkStatsGraphsDisplayed()
})

test(`@SmokeEthFuse Fuse stats counters check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://fuse.blockscout.com/stats`)
    await newHomePage.checkStatsCounters()
    await newHomePage.checkStatsGraphsDisplayed()
})

test(`@SmokeEthFuseTestnet Fuse testnet stats counters check`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://fuse-testnet.blockscout.com/stats`)
    await newHomePage.checkStatsCounters()
    await newHomePage.checkStatsGraphsDisplayed()
})

test(`@SmokeEthShibariumTestnet Shibarium testnet stats counters check`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://puppyscan.shib.io/stats`)
    await newHomePage.checkStatsCounters()
    await newHomePage.checkStatsGraphsDisplayed()
})
