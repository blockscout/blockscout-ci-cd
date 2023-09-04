import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })
/*
    See Smoke.test.ts for explanations
*/
// test.skip()

test(`@SmokeEthMainnet Eth transactions page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthGoerli Eth Goerli transactions page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth-goerli.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthGnosisMainnet Gnosis transactions page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`http://gnosis.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthGnosisChiado Gnosis Chiado transactions page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://gnosis-chiado.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthOptimismMainnet Optimism transactions page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthOptimismGoerli Optimism Goerli transactions page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism-goerli.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test.skip(`@SmokeEthAstar Astar transactions page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/astar/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test.skip(`@SmokeEthShiden Shiden transactions page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/shiden/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test.skip(`@SmokeEthShibuya Shubuya transactions page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/shibuya/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthRootstock Rootstock transactions page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://rootstock.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthNeonMainnet Neon transactions page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://neon.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthNeonDevnet Neon devnet transactions page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://neon-devnet.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthBaseGoerli Base goerli transactions page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base-goerli.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthBaseMainnet Base transactions page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthZetaAthens2 Zetachain Athens 2 transactions page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://zetachain-athens-2.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthZetaAthens3 Zetachain Athens 3 transactions page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://zetachain-athens-3.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthLightlinkPegasus Pegasus transactions page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://pegasus.lightlink.io/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthLightlinkPhoenix Phoenix transactions page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://phoenix.lightlink.io/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthIotaShimmer Iota Shimmer transactions page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://iota-shimmer-testnet.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthImmutable Immutable transactions page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://explorer.testnet.immutable.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthShibarium Shibarium transactions page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://puppyscan.shib.io/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthFuse Fuse transactions page check`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://fuse.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthFuseTestnet Fuse testnet transactions page check`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://fuse-testnet.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthShibariumTestnet Shibarium testnet transactions page check`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`https://puppyscan.shib.io/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})
