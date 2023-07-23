/* eslint-disable dot-notation */
import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test.skip(`@AccountImage @Blocks Block with a create tx`, async ({ blocksPage }) => {
    const { TestTokenDeployTXHash } = process.env
    await blocksPage.mock_ads()
    await blocksPage.open(TestTokenDeployTXHash)
    await blocksPage.check_block_description_new()
    await blocksPage.check_details()
})

test(`@AccountImage @Blocks Check blocks list`, async ({ blocksListPage }) => {
    await blocksListPage.open()
    await blocksListPage.check_header()
    await blocksListPage.check_table()
})
