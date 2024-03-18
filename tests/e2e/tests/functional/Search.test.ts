import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test(`@AccountImage @Search Check ERC-20 token search`, async ({ newHomePage }) => {
    const {
        TestTokenAddress,
        TestTokenName,
    } = process.env
    await newHomePage.open()
    await newHomePage.delay(2000)
    await newHomePage.search(TestTokenName)
})

test(`@AccountImage @Search Check ERC-721 token search`, async ({ newHomePage }) => {
    const {
        TestNFTName,
    } = process.env
    await newHomePage.open()
    await newHomePage.delay(2000)
    await newHomePage.search(TestNFTName)
})

test(`@AccountImage @Search Check transaction search`, async ({ newHomePage }) => {
    const {
        TestTokenDeployTXHash,
    } = process.env
    await newHomePage.open()
    await newHomePage.delay(2000)
    await newHomePage.search(TestTokenDeployTXHash)
})

test(`@AccountImage @Search Check token search by partial name`, async ({ newHomePage }) => {
    const {
        TestTokenName,
        TestTokenAddress,
    } = process.env
    await newHomePage.open()
    await newHomePage.delay(2000)
    await newHomePage.search(TestTokenName.slice(0, 3))
})

test(`@AccountImage @Search Check token search by symbol`, async ({ newHomePage }) => {
    const {
        TestTokenSymbol,
        TestTokenAddress,
    } = process.env
    await newHomePage.open()
    await newHomePage.delay(2000)
    await newHomePage.search(TestTokenSymbol)
})
