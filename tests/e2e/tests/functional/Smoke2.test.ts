import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

/*
    these tests are for common smoke functionality across all priority envs
    they do not interact with contract deployments, checking static data
    test logic is common, however we separate the tests for visibility

     https://eth.blockscout.com/
     https://eth-goerli.blockscout.com/
     http://gnosis.blockscout.com/
     https://gnosis-chiado.blockscout.com/
     https://optimism.blockscout.com/
     https://optimism-goerli.blockscout.com/
     https://blockscout.com/astar
     https://blockscout.com/shiden
     https://blockscout.com/shibuya
     https://rootstock.blockscout.com
     https://neon-devnet.blockscout.com/
     https://neon.blockscout.com/
     https://base-goerli.blockscout.com/
     https://base.blockscout.com
     https://zetachain-athens-2.blockscout.com/
     https://zetachain-athens-3.blockscout.com/
     https://pegasus.lightlink.io/
     https://phoenix.lightlink.io/
     https://iota-shimmer-testnet.blockscout.com/
     https://immutable-testnet.blockscout.com/
     https://shibarium-testnet.blockscout.com/
     https://fuse.blockscout.com/

 */

test(`@SmokeEthMainnet Eth main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthGoerli Eth Goerli main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://eth-goerli.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthGnosis Gnosis main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`http://gnosis.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthGnosisChiado Gnosis Chiado main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://gnosis-chiado.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthOptimismMainnet Optimism main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthOptimismGoerli Optimism Goerli main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://optimism-goerli.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test.skip(`@SmokeEthAstar Astar main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/astar/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test.skip(`@SmokeEthShiden Shiden main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/shiden/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test.skip(`@SmokeEthShibuya Shubuya main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://blockscout.com/shibuya/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthRootstock Rootstock main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://rootstock.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthNeonMainnet Neon main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://neon.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthNeonDevnet Neon devnet main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://neon-devnet.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthBaseGoerli Base goerli main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base-goerli.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthBaseMainnet Base main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://base.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthZetaAthens2 Zetachain Athens 2 main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://zetachain-athens-2.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthZetaAthens3 Zetachain Athens 3 main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://zetachain-athens-3.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthLightlinkPegasus Pegasus main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://pegasus.lightlink.io/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthLightlinkPhoenix Phoenix main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://phoenix.lightlink.io/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthIotaShimmer Iota Shimmer main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://iota-shimmer-testnet.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthImmutable Immutable main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://immutable-testnet.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthShibarium Shibarium main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://shibarium-testnet.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@SmokeEthFuse Shibarium main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`https://fuse.blockscout.com/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})
