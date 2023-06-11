import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test.skip(`@AccountImage @Search Check block search`, async ({ newHomePage }) => {
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
    await newHomePage.open()
    await newHomePage.search(TestTokenName)
    await newHomePage.findInSearchItems(TestTokenAddress)
})
