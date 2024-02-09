import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test.skip(`@SmokeEthMainnet @UserOps Eth main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth.blockscout.com/ops`)
})

test(`@SmokeEthGoerli @UserOps Eth Goerli main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth-goerli.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthSepolia @UserOps Eth Sepolia main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth-sepolia.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthGnosisMainnet @UserOps Gnosis main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`http://gnosis.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthGnosisChiado @UserOps Gnosis Chiado main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://gnosis-chiado.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthOptimismMainnet @UserOps Optimism main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthOptimismGoerli @UserOps Optimism Goerli main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism-goerli.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthRootstock @UserOps Rootstock main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://rootstock.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthNeonMainnet @UserOps Neon main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://neon.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthNeonDevnet @UserOps Neon devnet main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://neon-devnet.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthBaseGoerli @UserOps Base goerli main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base-goerli.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthBaseSepolia @UserOps Base Sepolia main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base-sepolia.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokezkSync @UserOps zkSync Era main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://zksync-era-mainnet.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeStability @UserOps zkSync Era main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://stability-betanet.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthBaseMainnet @UserOps Base main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthZetaAthens3 @UserOps Zetachain Athens 3 main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://zetachain-athens-3.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthLightlinkPegasus @UserOps Pegasus main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://pegasus.lightlink.io/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthLightlinkPhoenix @UserOps Phoenix main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://phoenix.lightlink.io/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthIotaShimmer @UserOps Iota Shimmer main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.evm.testnet.shimmer.network/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthImmutable @UserOps Immutable main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.testnet.immutable.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthShibarium @UserOps Shibarium main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://www.shibariumscan.io/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthFuse @UserOps Fuse main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.fuse.io/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthFuseTestnet @UserOps Fuse testnet main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.fusespark.io/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthShibariumTestnet @UserOps Shibarium testnet main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://puppyscan.shib.io/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthOptimismSepolia @UserOps Optimism sepolia testnet main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism-sepolia.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthIotaMainnetShimmer @UserOps Iota Shimmer mainnet main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.evm.shimmer.network/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthETCMordor @UserOps Mordor main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://etc-mordor.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})

test.skip(`@SmokeEthETCMainnet @UserOps ETC main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://etc.blockscout.com/ops`)
    await newHomePage.checkUserOpsHeader()
    await newHomePage.checkUserOpsRow()
})
