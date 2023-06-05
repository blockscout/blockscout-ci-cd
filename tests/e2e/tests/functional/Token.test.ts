/* eslint-disable dot-notation */
import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test(`@AccountImage @Token Check token page`, async ({ tokenPage }) => {
    const { TestTokenAddress } = process.env
    await tokenPage.mock_ads()
    await tokenPage.open(TestTokenAddress)
    await tokenPage.check_token()
    await tokenPage.select_holders_tab()
    await tokenPage.check_holders_tab()
})
