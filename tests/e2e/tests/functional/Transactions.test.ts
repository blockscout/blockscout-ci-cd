/* eslint-disable dot-notation */
import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test(`@Ethereum @Transactions @Data @AccountImage Check transactions list`, async ({ transactionsListPage }) => {
    const { TestNFTSymbolV, TestTokenSymbolV, TestNFTSymbol, TestTokenSymbol } = process.env
    await transactionsListPage.open()
    await transactionsListPage.check_header()
    await transactionsListPage.check_table_data(TestNFTSymbolV, TestNFTSymbol, TestTokenSymbolV, TestTokenSymbol)
})

test(`@Ethereum @Transactions @Data @AccountImage Check contract creation tx props`, async ({ transactionPage }) => {
    const { TestTokenDeployTXHash, MinerAddress, TestTokenAddress } = process.env
    await transactionPage.open(TestTokenDeployTXHash)
    await transactionPage.check_tx_description()
    await transactionPage.check_tx_details()
    await transactionPage.check_transaction_logs()
    await transactionPage.check_raw_trace(MinerAddress, TestTokenAddress)
})
