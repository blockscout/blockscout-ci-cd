import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test(`@AccountImage @Main Check main page widgets`, async ({ newHomePage }) => {
    await newHomePage.open()
    await newHomePage.checkHeader()
    await newHomePage.checkBlocksWidget()
    await newHomePage.check_last_block()
    // await newHomePage.check_txn_widget()
})
