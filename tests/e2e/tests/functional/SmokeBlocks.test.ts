import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test(`@SmokeEthMainnet Eth blocks`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth.blockscout.com/blocks`)
    await newHomePage.checkBlocks()
})

test(`@SmokeEthGnosisMainnet Gnosis blocks`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`http://gnosis.blockscout.com/blocks`)
    await newHomePage.checkBlocks()
})

test(`@SmokeEthGnosisChiado Gnosis Chiado blocks`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://gnosis-chiado.blockscout.com/blocks`)
    await newHomePage.checkBlocks()
})

test.skip(`@SmokeEthAstar Astar blocks`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/astar/blocks`)
    await newHomePage.checkBlocks()
})

test.skip(`@SmokeEthShiden Shiden blocks`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/shiden/blocks`)
    await newHomePage.checkBlocks()
})

test.skip(`@SmokeEthShibuya Shubuya blocks`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/shibuya/blocks`)
    await newHomePage.checkBlocks()
})

test(`@SmokeEthNeonMainnet Neon blocks`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://neon.blockscout.com/blocks`)
    await newHomePage.checkBlocks()
})

test(`@SmokeEthNeonDevnet Neon devnet blocks`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://neon-devnet.blockscout.com/blocks`)
    await newHomePage.checkBlocks()
})

test(`@SmokeEthZetaAthens3 Zetachain Athens 3 blocks`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://zetachain-athens-3.blockscout.com/blocks`)
    await newHomePage.checkBlocks()
})

test(`@SmokeEthLightlinkPegasus Pegasus blocks`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://pegasus.lightlink.io/blocks`)
    await newHomePage.checkBlocks()
})

test(`@SmokeEthLightlinkPhoenix Phoenix blocks`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://phoenix.lightlink.io/blocks`)
    await newHomePage.checkBlocks()
})

test(`@SmokeEthIotaShimmer Iota Shimmer blocks`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.evm.testnet.shimmer.network/blocks`)
    await newHomePage.checkBlocks()
})

test(`@SmokeEthImmutable Immutable blocks`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.testnet.immutable.com/blocks`)
    await newHomePage.checkBlocksImmutable()
})

test(`@SmokeEthShibariumMainnet Shibarium blocks`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://www.shibariumscan.io/blocks`)
    await newHomePage.checkBlocksNoHeaderNoReward(context)
})

test(`@SmokeEthFuse Fuse blocks`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.fuse.io/blocks`)
    await newHomePage.checkBlocks()
})

test(`@SmokeEthFuseTestnet Fuse testnet blocks`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.fusespark.io/blocks`)
    await newHomePage.checkBlocks()
})

test(`@SmokeEthShibariumTestnet Shibarium testnet blocks`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://puppyscan.shib.io/blocks`)
    await newHomePage.checkBlocksNoHeaderNoReward(context)
})

/* L2 */

test(`@SmokeEthOptimismMainnet Optimism blocks`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://optimism.blockscout.com/blocks`)
    await newHomePage.checkL2Blocks(context)
})

test(`@SmokeEthRootstock Rootstock blocks`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://rootstock.blockscout.com/blocks`)
    await newHomePage.checkL2Blocks(context)
})

test(`@SmokeEthBaseSepolia Base sepolia blocks`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://base-sepolia.blockscout.com/blocks`)
    await newHomePage.checkL2Blocks(context)
})

test(`@SmokeEthBaseMainnet Base blocks`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://base.blockscout.com/blocks`)
    await newHomePage.checkL2Blocks(context)
})

test(`@SmokeEthOptimismSepolia Optimism sepolia blocks`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://optimism-sepolia.blockscout.com/blocks`)
    await newHomePage.checkL2Blocks(context)
})

test(`@SmokeEthIotaMainnetShimmer Iota Shimmer mainnet blocks`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.evm.shimmer.network/blocks`)
    await newHomePage.checkBlocks()
})

test(`@SmokeEthETCMordor Mordor blocks`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://etc-mordor.blockscout.com/blocks`)
    await newHomePage.checkBlocksNoFees(context)
})

test(`@SmokeEthETCMainnet ETC blocks`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://etc.blockscout.com/blocks`)
    await newHomePage.checkBlocksNoFees(context)
})
