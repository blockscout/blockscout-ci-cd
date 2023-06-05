/* eslint-disable dot-notation */
import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test(`@AccountImage @Blocks Block with a create tx`, async ({ blocksPage }) => {
    const { TestTokenDeployTXBlockNumber } = process.env
    await blocksPage.mock_ads()
    await blocksPage.open(TestTokenDeployTXBlockNumber)
    await blocksPage.check_block_description_new()
    await blocksPage.check_details()
})

test(`@AccountImage @Blocks Check blocks list`, async ({ blocksListPage }) => {
    await blocksListPage.open()
    await blocksListPage.check_header()
    await blocksListPage.check_table()
})
