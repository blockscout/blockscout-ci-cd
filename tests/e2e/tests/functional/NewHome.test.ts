import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test(`@Ethereum @Address @Data @AccountImage Check main page widgets`, async ({ newHomePage }) => {
    await newHomePage.open()
    await newHomePage.waitBlocksSynced()
    await newHomePage.check_heaader()
    await newHomePage.check_blocks_widget()
    await newHomePage.check_last_block()
    await newHomePage.check_txn_widget()
})
