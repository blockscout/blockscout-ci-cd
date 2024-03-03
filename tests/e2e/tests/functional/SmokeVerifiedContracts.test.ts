import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })
/*
    See Smoke.test.ts for explanations
*/

test(`@SmokeEthMainnet Eth verified contracts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth.blockscout.com/verified-contracts`)
    await newHomePage.checkVerifiedContractsStats()
})

test(`@SmokeEthGoerli Eth Goerli verified contracts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth-goerli.blockscout.com/verified-contracts`)
    await newHomePage.checkVerifiedContractsStats()
})

test(`@SmokeEthGnosisMainnet Gnosis verified contracts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`http://gnosis.blockscout.com/verified-contracts`)
    await newHomePage.checkVerifiedContractsStats()
})

test(`@SmokeEthGnosisChiado Gnosis Chiado verified contracts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://gnosis-chiado.blockscout.com/verified-contracts`)
    await newHomePage.checkVerifiedContractsStats()
})

test(`@SmokeEthOptimismMainnet Optimism verified contracts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism.blockscout.com/verified-contracts`)
    await newHomePage.checkVerifiedContractsStats()
})

test(`@SmokeEthOptimismGoerli Optimism Goerli verified contracts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism-goerli.blockscout.com/verified-contracts`)
    await newHomePage.checkVerifiedContractsStats()
})

test.skip(`@SmokeEthAstar Astar verified contracts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/astar/verified-contracts`)
    await newHomePage.checkVerifiedContractsStats()
})

test.skip(`@SmokeEthShiden Shiden verified contracts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/shiden/verified-contracts`)
    await newHomePage.checkVerifiedContractsStats()
})

test.skip(`@SmokeEthShibuya Shubuya verified contracts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/shibuya/verified-contracts`)
    await newHomePage.checkVerifiedContractsStats()
})

test(`@SmokeEthRootstock Rootstock verified contracts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://rootstock.blockscout.com/verified-contracts`)
    await newHomePage.checkVerifiedContractsStats()
})

test(`@SmokeEthNeonMainnet Neon verified contracts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://neon.blockscout.com/verified-contracts`)
    await newHomePage.checkVerifiedContractsStats()
})

test(`@SmokeEthNeonDevnet Neon devnet verified contracts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://neon-devnet.blockscout.com/verified-contracts`)
    await newHomePage.checkVerifiedContractsStats()
})

test(`@SmokeEthBaseSepolia Base sepolia verified contracts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base-sepolia.blockscout.com/verified-contracts`)
    await newHomePage.checkVerifiedContractsStats()
})

test(`@SmokeEthBaseMainnet Base verified contracts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base.blockscout.com/verified-contracts`)
    await newHomePage.checkVerifiedContractsStats()
})

test(`@SmokeEthZetaAthens3 Zetachain Athens 3 verified contracts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://zetachain-athens-3.blockscout.com/verified-contracts`)
    await newHomePage.checkVerifiedContractsStats()
})

test(`@SmokeEthLightlinkPegasus Pegasus verified contracts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://pegasus.lightlink.io/verified-contracts`)
    await newHomePage.checkVerifiedContractsStats()
})

test(`@SmokeEthLightlinkPhoenix Phoenix verified contracts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://phoenix.lightlink.io/verified-contracts`)
    await newHomePage.checkVerifiedContractsStats()
})

test(`@SmokeEthIotaShimmer Iota Shimmer verified contracts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.evm.testnet.shimmer.network/verified-contracts`)
    await newHomePage.checkVerifiedContractsStats()
})

test(`@SmokeEthImmutable Immutable verified contracts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.testnet.immutable.com/verified-contracts`)
    await newHomePage.checkVerifiedContractsStats()
})

test(`@SmokeEthShibariumMainnet Shibarium verified contracts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://www.shibariumscan.io/verified-contracts`)
    await newHomePage.checkVerifiedContractsStats()
})

test(`@SmokeEthFuse Fuse verified contracts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.fuse.io/verified-contracts`)
    await newHomePage.checkVerifiedContractsStats()
})

// no verified contracts yet
test.skip(`@SmokeEthFuseTestnet Fuse testnet verified contracts page check`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.fusespark.io/verified-contracts`)
    await newHomePage.checkVerifiedContractsStats()
})

test(`@SmokeEthShibariumTestnet Shibarium testnet verified contracts page check`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://puppyscan.shib.io/verified-contracts`)
    await newHomePage.checkVerifiedContractsStats()
})

// no contracts
test.skip(`@SmokeEthOptimismSepoliaV Optimism sepolia verified contracts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism-sepolia.blockscout.com/verified-contracts`)
    await newHomePage.checkVerifiedContractsStats()
})

// no contracts
test.skip(`@SmokeEthIotaMainnetShimmer Iota Shimmer mainnet verified contracts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.evm.shimmer.network/verified-contracts`)
    await newHomePage.checkVerifiedContractsStats()
})

test(`@SmokeEthETCMordor Mordor verified contracts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://etc-mordor.blockscout.com/verified-contracts`)
    await newHomePage.checkVerifiedContractsStats()
})

test(`@SmokeEthETCMainnet ETC verified contracts page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://etc.blockscout.com/verified-contracts`)
    await newHomePage.checkVerifiedContractsStats()
})
