import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test.skip(`@SmokeEthMainnet @UserOps Eth UserOps components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth.blockscout.com/ops`)
})

test(`@SmokeEthGoerli @UserOps Eth Goerli UserOps components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth-goerli.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthSepolia @UserOps Eth Sepolia UserOps components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth-sepolia.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthGnosisMainnet @UserOps Gnosis UserOps components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`http://gnosis.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthGnosisChiado @UserOps Gnosis Chiado UserOps components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://gnosis-chiado.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthOptimismMainnet @UserOps Optimism UserOps components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthOptimismGoerli @UserOps Optimism Goerli UserOps components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism-goerli.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthRootstock @UserOps Rootstock UserOps components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://rootstock.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthNeonMainnet @UserOps Neon UserOps components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://neon.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthNeonDevnet @UserOps Neon devnet UserOps components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://neon-devnet.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthBaseGoerli @UserOps Base goerli UserOps components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base-sepolia.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthBaseSepolia @UserOps Base Sepolia UserOps components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base-sepolia.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokezkSync @UserOps zkSync Era UserOps components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://zksync-era-mainnet.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeStability @UserOps zkSync Era UserOps components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://stability-betanet.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthBaseMainnet @UserOps Base UserOps components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthZetaAthens3 @UserOps Zetachain Athens 3 UserOps components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://zetachain-athens-3.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthLightlinkPegasus @UserOps Pegasus UserOps components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://pegasus.lightlink.io/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthLightlinkPhoenix @UserOps Phoenix UserOps components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://phoenix.lightlink.io/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthIotaShimmer @UserOps Iota Shimmer UserOps components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.evm.testnet.shimmer.network/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthImmutable @UserOps Immutable UserOps components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.testnet.immutable.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthShibariumMainnet @UserOps Shibarium UserOps components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://www.shibariumscan.io/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthFuse @UserOps Fuse UserOps components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.fuse.io/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthFuseTestnet @UserOps Fuse testnet UserOps components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.fusespark.io/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthShibariumTestnet @UserOps Shibarium testnet UserOps components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://puppyscan.shib.io/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthOptimismSepolia @UserOps Optimism sepolia testnet UserOps components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism-sepolia.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthIotaMainnetShimmer @UserOps Iota Shimmer mainnet UserOps components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.evm.shimmer.network/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthETCMordor @UserOps Mordor UserOps components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://etc-mordor.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthETCMainnet @UserOps ETC UserOps components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://etc.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})
