import test from '@lib/BaseTest'
import { TXDecodedLogProps } from '@pages/Common'
import { VerificationFlattenForm } from '@pages/Verification'

test.describe.configure({ mode: `parallel` })

test(`@Verification Can list verified contracts`, async (
    {
        homePage, verificationPage, transactionPage, transactionsListPage,
    },
) => {
    const {
        TestTokenAddressV,
        TestTokenFlatContractCode,
    } = process.env
    await verificationPage.open(TestTokenAddressV)
    const form = {
        contractName: `TestToken`,
        compilerVersion: `v0.8.17+commit.8df45f5f`,
        evmVersion: ``,
        code: TestTokenFlatContractCode,
    } as VerificationFlattenForm
    await verificationPage.fillFlattenForm(form)
    await homePage.check_verified_address_page()
})
