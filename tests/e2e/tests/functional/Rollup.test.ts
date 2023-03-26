import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test(`@Rollup Eth main page components`, async ({ context, newHomeRollup }) => {
    await newHomeRollup.open()
    await newHomeRollup.openDeposits()
    await newHomeRollup.openWithdrawals()
})
