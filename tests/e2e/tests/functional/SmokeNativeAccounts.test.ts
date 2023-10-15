import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

/*
    See Smoke.test.ts for explanations
*/

test(`@SmokeEthMainnet @NativeAccounts Eth native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth.blockscout.com/accounts`)
    await newHomePage.checkNativeAccountsNoPerc()
})

test(`@SmokeEthGoerli @NativeAccounts Eth Goerli native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth-goerli.blockscout.com/accounts`)
    await newHomePage.checkNativeAccountsNoPerc()
})

test(`@SmokeEthGnosisMainnet @NativeAccounts Gnosis native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`http://gnosis.blockscout.com/accounts`)
    await newHomePage.checkNativeAccounts()
})

test(`@SmokeEthGnosisChiado @NativeAccounts Gnosis Chiado native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://gnosis-chiado.blockscout.com/accounts`)
    await newHomePage.checkNativeAccountsNoPerc()
})

test(`@SmokeEthOptimismMainnet @NativeAccounts Optimism native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism.blockscout.com/accounts`)
    await newHomePage.checkNativeAccountsNoPerc()
})

test(`@SmokeEthOptimismGoerli @NativeAccounts Optimism Goerli native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism-goerli.blockscout.com/accounts`)
    await newHomePage.checkNativeAccountsNoPerc()
})

test.skip(`@SmokeEthAstar @NativeAccounts Astar native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/astar/accounts`)
    await newHomePage.checkNativeAccounts()
})

test.skip(`@SmokeEthShiden @NativeAccounts Shiden native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/shiden/accounts`)
    await newHomePage.checkNativeAccounts()
})

test.skip(`@SmokeEthShibuya @NativeAccounts Shubuya native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/shibuya/accounts`)
    await newHomePage.checkNativeAccounts()
})

test(`@SmokeEthRootstock @NativeAccounts Rootstock native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://rootstock.blockscout.com/accounts`)
    await newHomePage.checkNativeAccounts()
})

test(`@SmokeEthNeonMainnet @NativeAccounts Neon native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://neon.blockscout.com/accounts`)
    await newHomePage.checkNativeAccountsNoPerc()
})

test(`@SmokeEthNeonDevnet @NativeAccounts Neon devnet native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://neon-devnet.blockscout.com/accounts`)
    await newHomePage.checkNativeAccountsNoPerc()
})

test(`@SmokeEthBaseGoerli @NativeAccounts Base goerli native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base-goerli.blockscout.com/accounts`)
    await newHomePage.checkNativeAccountsNoPerc()
})

test(`@SmokeEthBaseMainnet @NativeAccounts Base native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base.blockscout.com/accounts`)
    await newHomePage.checkNativeAccounts()
})

test(`@SmokeEthZetaAthens3 @NativeAccounts Zetachain Athens 3 native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://zetachain-athens-3.blockscout.com/accounts`)
    await newHomePage.checkNativeAccountsNoPerc()
})

test(`@SmokeEthLightlinkPegasus @NativeAccounts Pegasus native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://pegasus.lightlink.io/accounts`)
    await newHomePage.checkNativeAccountsNoPerc()
})

test(`@SmokeEthLightlinkPhoenix @NativeAccounts Phoenix native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://phoenix.lightlink.io/accounts`)
    await newHomePage.checkNativeAccountsNoPerc()
})

test(`@SmokeEthIotaShimmer @NativeAccounts Iota Shimmer native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.evm.testnet.shimmer.network/accounts`)
    await newHomePage.checkNativeAccountsNoPerc()
})

test(`@SmokeEthImmutable @NativeAccounts Immutable native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.testnet.immutable.com/accounts`)
    await newHomePage.checkNativeAccountsNoPerc()
})

test(`@SmokeEthShibarium @NativeAccounts Shibarium native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://puppyscan.shib.io/accounts`)
    await newHomePage.checkNativeAccountsNoPerc()
})

test(`@SmokeEthFuse @NativeAccounts Fuse native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.fuse.io/accounts`)
    await newHomePage.checkNativeAccounts()
})

test(`@SmokeEthFuseTestnet @NativeAccounts Fuse testnet native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.fusespark.io/accounts`)
    await newHomePage.checkNativeAccountsNoPerc()
})

test(`@SmokeEthShibariumTestnet @NativeAccounts Shibarium testnet native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://puppyscan.shib.io/accounts`)
    await newHomePage.checkNativeAccountsNoPerc()
})

test(`@SmokeEthIotaShimmerMainnet @NativeAccounts Iota Shimmernative accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.evm.shimmer.network/accounts`)
    await newHomePage.checkNativeAccounts()
})

test(`@SmokeEthETCMordor @NativeAccounts Mordor native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://etc-mordor.blockscout.com/accounts`)
    await newHomePage.checkNativeAccountsNoPerc()
})

test(`@SmokeEthETCMainnet @NativeAccounts ETC native accounts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://etc.blockscout.com//accounts`)
    await newHomePage.checkNativeAccountsNoPerc()
})
