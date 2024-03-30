import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test(`@SmokeEthMainnet @ENS Eth main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test(`@SmokeEthGoerli @ENS Eth Goerli ENS components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth-goerli.blockscout.com/name-domains?only_active=true`)
    await newHomePage.sortENSRows()
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthSepolia @ENS Eth Sepolia ENS components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth-sepolia.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthGnosisMainnet @ENS Gnosis ENS components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`http://gnosis.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test(`@SmokeEthGnosisChiado @ENS Gnosis Chiado ENS components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://gnosis-chiado.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthOptimismMainnet @ENS Optimism ENS components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthOptimismGoerli @ENS Optimism Goerli ENS components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism-goerli.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthRootstock @ENS Rootstock ENS components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://rootstock.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthNeonMainnet @ENS Neon ENS components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://neon.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthNeonDevnet @ENS Neon devnet ENS components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://neon-devnet.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthBaseSepolia @ENS Base Sepolia ENS components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base-sepolia.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokezkSync @ENS zkSync Era ENS components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://zksync-era-mainnet.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthStability @ENS zkSync Era ENS components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://stability-betanet.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test(`@SmokeEthBaseMainnet @ENS Base ENS components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthZetaAthens3 @ENS Zetachain Athens 3 ENS components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://zetachain-athens-3.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthLightlinkPegasus @ENS Pegasus ENS components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://pegasus.lightlink.io/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthLightlinkPhoenix @ENS Phoenix ENS components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://phoenix.lightlink.io/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthIotaShimmer @ENS Iota Shimmer ENS components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.evm.testnet.shimmer.network/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthImmutable @ENS Immutable ENS components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.testnet.immutable.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthShibariumMainnet @ENS Shibarium ENS components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://www.shibariumscan.io/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthFuse @ENS Fuse ENS components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.fuse.io/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthFuseTestnet @ENS Fuse testnet ENS components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.fusespark.io/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthShibariumTestnet @ENS Shibarium testnet ENS components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://puppyscan.shib.io/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthOptimismSepolia @ENS Optimism sepolia testnet ENS components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism-sepolia.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthIotaMainnetShimmer @ENS Iota Shimmer mainnet ENS components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.evm.shimmer.network/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthETCMordor @ENS Mordor ENS components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://etc-mordor.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test.skip(`@SmokeEthETCMainnet @ENS ETC ENS components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://etc.blockscout.com/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})
