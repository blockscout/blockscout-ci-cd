import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

/*
    See Smoke.test.ts for explanations
*/

test.skip()

test(`@SmokeEthMainnet Eth native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth.blockscout.com/accounts`)
    await newHomePage.checkNativeAccounts()
})

test(`@SmokeEthGoerli Eth Goerli native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth-goerli.blockscout.com/accounts`)
    await newHomePage.checkNativeAccounts()
})

test(`@SmokeEthGnosisMainnet Gnosis native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`http://gnosis.blockscout.com/accounts`)
    await newHomePage.checkNativeAccounts()
})

test(`@SmokeEthGnosisChiado Gnosis Chiado native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://gnosis-chiado.blockscout.com/accounts`)
    await newHomePage.checkNativeAccounts()
})

test(`@SmokeEthOptimismMainnet Optimism native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism.blockscout.com/accounts`)
    await newHomePage.checkNativeAccounts()
})

test(`@SmokeEthOptimismGoerli Optimism Goerli native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism-goerli.blockscout.com/accounts`)
    await newHomePage.checkNativeAccounts()
})

test.skip(`@SmokeEthAstar Astar native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/astar/accounts`)
    await newHomePage.checkNativeAccounts()
})

test.skip(`@SmokeEthShiden Shiden native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/shiden/accounts`)
    await newHomePage.checkNativeAccounts()
})

test.skip(`@SmokeEthShibuya Shubuya native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/shibuya/accounts`)
    await newHomePage.checkNativeAccounts()
})

test(`@SmokeEthRootstock Rootstock native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://rootstock.blockscout.com/accounts`)
    await newHomePage.checkNativeAccounts()
})

test(`@SmokeEthNeonMainnet Neon native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://neon.blockscout.com/accounts`)
    await newHomePage.checkNativeAccounts()
})

test(`@SmokeEthNeonDevnet Neon devnet native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://neon-devnet.blockscout.com/accounts`)
    await newHomePage.checkNativeAccounts()
})

test(`@SmokeEthBaseGoerli Base goerli native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base-goerli.blockscout.com/accounts`)
    await newHomePage.checkNativeAccounts()
})

test(`@SmokeEthBaseMainnet Base native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base.blockscout.com/accounts`)
    await newHomePage.checkNativeAccounts()
})

test(`@SmokeEthZetaAthens2 Zetachain Athens 2 native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://zetachain-athens-2.blockscout.com/accounts`)
    await newHomePage.checkNativeAccounts()
})

test(`@SmokeEthZetaAthens3 Zetachain Athens 3 native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://zetachain-athens-3.blockscout.com/accounts`)
    await newHomePage.checkNativeAccounts()
})

test(`@SmokeEthLightlinkPegasus Pegasus native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://pegasus.lightlink.io/accounts`)
    await newHomePage.checkNativeAccounts()
})

test(`@SmokeEthLightlinkPhoenix Phoenix native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://phoenix.lightlink.io/accounts`)
    await newHomePage.checkNativeAccounts()
})

test(`@SmokeEthIotaShimmer Iota Shimmer native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://iota-shimmer-testnet.blockscout.com/accounts`)
    await newHomePage.checkNativeAccounts()
})

test(`@SmokeEthImmutable Immutable native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.testnet.immutable.com/accounts`)
    await newHomePage.checkNativeAccounts()
})

test(`@SmokeEthShibarium Shibarium native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://puppyscan.shib.io/accounts`)
    await newHomePage.checkNativeAccounts()
})

test(`@SmokeEthFuse Fuse native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://fuse.blockscout.com/accounts`)
    await newHomePage.checkNativeAccounts()
})

test(`@SmokeEthFuseTestnet Fuse testnet native accounts page check`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://fuse-testnet.blockscout.com/accounts`)
    await newHomePage.checkNativeAccounts()
})

test(`@SmokeEthShibariumTestnet Shibarium testnet native accounts page check`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://puppyscan.shib.io/accounts`)
    await newHomePage.checkNativeAccounts()
})
