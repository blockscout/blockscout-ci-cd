/* eslint-disable dot-notation */
import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test(`@Ethereum @Blocks @Data @AccountImage @NewFrontend Block with a create tx (new frontend)`, async ({ blocksPage }) => {
    const { TestTokenDeployTXBlockNumber } = process.env
    await blocksPage.open(TestTokenDeployTXBlockNumber)
    await blocksPage.check_block_description_new()
    await blocksPage.check_details()
})

test(`@Ethereum @Blocks @Data @AccountImage @NewFrontend Check blocks list (new frontend)`, async ({ blocksListPage }) => {
    await blocksListPage.open()
    await blocksListPage.check_header()
    await blocksListPage.check_table()
})
