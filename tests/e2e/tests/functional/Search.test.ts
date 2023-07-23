import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test.skip(`@AccountImage @Search Check block number search`, async ({ newHomePage, blocksPage }) => {
    const {
        TestTokenHolder,
        TestTokenAddress,
        TestTokenName,
        TestTokenSymbol,
        TestTokenDeployTXHash,
        TestTokenDeployTXBlockNumber,
        TestTokenTXMintHash,
        TestTokenTXMintBlockNumber,
        TestTokenTXRevertHash,
        TestTokenTXRevertBlockNumber,

        TestNFTAddress,
        TestNFTName,
        TestNFTSymbol,
        TestNFTDeployTXHash,
        TestNFTDeployTXBlockNumber,
        TestNFTTXMintHash,
        TestNFTTXMintBlockNumber,
    } = process.env
    await blocksPage.open(TestTokenDeployTXBlockNumber)
    await blocksPage.openDescriptionDetails()
    const bh = await blocksPage.getBlockHash()
    await newHomePage.open()
    await newHomePage.delay(2000)
    await newHomePage.search(TestTokenDeployTXBlockNumber)
    await newHomePage.findInSearchItems(`Found 1 matching result${TestTokenDeployTXBlockNumber}${bh[0]}`)
    await newHomePage.checkSearchItemsIcons()
})

test(`@AccountImage @Search Check ERC-20 token search`, async ({ newHomePage }) => {
    const {
        TestTokenAddress,
        TestTokenName,
    } = process.env
    await newHomePage.open()
    await newHomePage.delay(2000)
    await newHomePage.search(TestTokenName)
    await newHomePage.findInSearchItems(TestTokenAddress)
    await newHomePage.checkSearchItemsIcons()
})

test(`@AccountImage @Search Check ERC-721 token search`, async ({ newHomePage }) => {
    const {
        TestNFTAddress,
        TestNFTName,
    } = process.env
    await newHomePage.open()
    await newHomePage.delay(2000)
    await newHomePage.search(TestNFTName)
    await newHomePage.findInSearchItems(TestNFTAddress)
    await newHomePage.checkSearchItemsIcons()
})

test(`@AccountImage @Search Check transaction search`, async ({ newHomePage }) => {
    const {
        TestTokenDeployTXHash,
    } = process.env
    await newHomePage.open()
    await newHomePage.delay(2000)
    await newHomePage.search(TestTokenDeployTXHash)
    await newHomePage.findInSearchItems(TestTokenDeployTXHash)
    await newHomePage.checkSearchItemsIcons()
})

test(`@AccountImage @Search Check token search by partial name`, async ({ newHomePage }) => {
    const {
        TestTokenName,
        TestTokenAddress,
    } = process.env
    await newHomePage.open()
    await newHomePage.delay(2000)
    await newHomePage.search(TestTokenName.slice(0, 3))
    await newHomePage.findInSearchItems(TestTokenAddress)
    await newHomePage.checkSearchItemsIcons()
})

test(`@AccountImage @Search Check token search by symbol`, async ({ newHomePage }) => {
    const {
        TestTokenSymbol,
        TestTokenAddress,
    } = process.env
    await newHomePage.open()
    await newHomePage.delay(2000)
    await newHomePage.search(TestTokenSymbol)
    await newHomePage.findInSearchItems(TestTokenAddress)
    await newHomePage.checkSearchItemsIcons()
})
