/* eslint-disable dot-notation */
import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test(`@AccountImage @Blocks Check blocks list`, async ({ blocksListPage }) => {
    await blocksListPage.open()
    await blocksListPage.check_header()
    await blocksListPage.check_table()
})
