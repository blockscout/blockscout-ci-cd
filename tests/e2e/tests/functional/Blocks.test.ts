/* eslint-disable dot-notation */
import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test(`@Ethereum @Blocks @Data @AccountImage @NewFrontend Block with a create tx (new frontend)`, async ({ blocksPage }) => {
    await test.step(`Check block info for create tx`, async () => {
        const { TestTokenDeployTXBlockNumber } = process.env
        await blocksPage.open(TestTokenDeployTXBlockNumber)
        await blocksPage.check_block_description_new()
        await blocksPage.check_details()
    })
})
