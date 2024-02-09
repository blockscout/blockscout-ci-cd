import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test(`@SmokeEthMainnet @ENS Eth main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test(`@SmokeEthGoerli @ENS Eth Goerli main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth-goerli.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthSepolia @ENS Eth Sepolia main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth-sepolia.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthGnosisMainnet @ENS Gnosis main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`http://gnosis.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test(`@SmokeEthGnosisChiado @ENS Gnosis Chiado main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://gnosis-chiado.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthOptimismMainnet @ENS Optimism main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthOptimismGoerli @ENS Optimism Goerli main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism-goerli.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthRootstock @ENS Rootstock main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://rootstock.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthNeonMainnet @ENS Neon main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://neon.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthNeonDevnet @ENS Neon devnet main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://neon-devnet.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test(`@SmokeEthBaseGoerli @ENS Base goerli main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base-goerli.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthBaseSepolia @ENS Base Sepolia main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base-sepolia.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokezkSync @ENS zkSync Era main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://zksync-era-mainnet.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeStability @ENS zkSync Era main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://stability-betanet.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test(`@SmokeEthBaseMainnet @ENS Base main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthZetaAthens3 @ENS Zetachain Athens 3 main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://zetachain-athens-3.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthLightlinkPegasus @ENS Pegasus main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://pegasus.lightlink.io/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthLightlinkPhoenix @ENS Phoenix main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://phoenix.lightlink.io/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthIotaShimmer @ENS Iota Shimmer main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.evm.testnet.shimmer.network/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthImmutable @ENS Immutable main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.testnet.immutable.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthShibarium @ENS Shibarium main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://www.shibariumscan.io/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthFuse @ENS Fuse main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.fuse.io/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthFuseTestnet @ENS Fuse testnet main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.fusespark.io/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthShibariumTestnet @ENS Shibarium testnet main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://puppyscan.shib.io/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthOptimismSepolia @ENS Optimism sepolia testnet main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism-sepolia.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthIotaMainnetShimmer @ENS Iota Shimmer mainnet main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.evm.shimmer.network/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthETCMordor @ENS Mordor main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://etc-mordor.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthETCMainnet @ENS ETC main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://etc.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})
