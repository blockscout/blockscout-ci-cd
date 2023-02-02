/* eslint-disable dot-notation */
import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test(`@Ethereum @Address @Data @AccountImage Check address page`, async ({ addressPage }) => {
    await test.step(`Check address page`, async () => {
        const { TestTokenAddress } = process.env
        await addressPage.open(TestTokenAddress)
        // await addressPage.check_header_tx_ad()
        await addressPage.check_address_description()
        await addressPage.check_tx_in_list()
        await addressPage.select_logs_tab()
        await addressPage.check_tx_logs()
    })
})
