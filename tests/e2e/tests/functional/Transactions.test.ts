/* eslint-disable dot-notation */
import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test(`@AccountImage @Transactions Check transactions list`, async ({ transactionsListPage }) => {
    await transactionsListPage.open()
    await transactionsListPage.check_header()
    await transactionsListPage.check_table_data()
})

test(`@AccountImage @Transactions Check contract creation tx props`, async ({ transactionPage }) => {
    const { TestTokenDeployTXHash, MinerAddress, TestTokenAddress } = process.env
    await transactionPage.open(TestTokenDeployTXHash)
    await transactionPage.check_tx_description()
    await transactionPage.check_tx_details()
    // await transactionPage.check_transaction_logs()
})
