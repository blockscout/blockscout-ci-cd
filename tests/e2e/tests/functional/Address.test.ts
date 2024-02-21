/* eslint-disable dot-notation */
import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test(`@AccountImage @Address Check address page`, async ({ addressPage }) => {
    const { TestTokenAddress } = process.env
    await addressPage.mock_ads()
    await addressPage.open(TestTokenAddress)
    await addressPage.check_address_description()
})
