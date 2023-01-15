/* eslint-disable dot-notation */
import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test(`@Ethereum @TokenPage @Data @PublicImage @AccountImage Check token page`, async ({ tokenPage }) => {
    await test.step(`Check token page`, async () => {
        const { TestTokenAddress } = process.env
        await tokenPage.open(TestTokenAddress)
        await tokenPage.check_token()
        await tokenPage.select_holders_tab()
        await tokenPage.check_holders_tab()
    })
})
