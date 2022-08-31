import test from '@lib/BaseTest'
import { VerificationFlattenForm } from '@pages/Verification'

test.describe.configure({ mode: `parallel` })

test(`@Ethereum @Verification @Data Can verify ERC20 contract with flatten`, async ({ verificationPage }) => {
    const { TestTokenAddressV, TestTokenFlatContractCode } = process.env
    await verificationPage.open(TestTokenAddressV)
    await verificationPage.fillFlattenForm(
        {
            contractName: `TestTokenV`,
            compilerVersion: ``,
            evmVersion: ``,
            code: TestTokenFlatContractCode,
        } as VerificationFlattenForm,
    )
})

test(`@Ethereum @Verification @Data Can verify NFT contract with flatten`, async ({ verificationPage }) => {
    const { TestNFTAddressV, TestNFTFlatContractCode } = process.env
    await verificationPage.open(TestNFTAddressV)
    await verificationPage.fillFlattenForm(
        {
            contractName: `TestNFTV`,
            compilerVersion: ``,
            evmVersion: ``,
            code: TestNFTFlatContractCode,
        } as VerificationFlattenForm,
    )
})
