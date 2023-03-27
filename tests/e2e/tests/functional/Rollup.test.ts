import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test(`@Rollup Rollups main page menu`, async ({ newHomeRollup }) => {
    await newHomeRollup.open()
    await newHomeRollup.verifyFeaturesEnabled()
})

test(`@Rollup Deposits table verification`, async ({ context, newRollupDeposits }) => {
    await newRollupDeposits.open()
    await newRollupDeposits.validateTable(context)
})

test(`@Rollup Withdrawals table verification`, async ({ context, newRollupWithdrawals }) => {
    await newRollupWithdrawals.open()
    await newRollupWithdrawals.validateTable(context)
})

test(`@Rollup Txn batches table verification`, async ({ context, newRollupTxnBatches }) => {
    await newRollupTxnBatches.open()
    await newRollupTxnBatches.validateTable(context)
})

test(`@Rollup Output roots table verification`, async ({ context, newRollupOutputRoots }) => {
    await newRollupOutputRoots.open()
    await newRollupOutputRoots.validateTable(context)
})
