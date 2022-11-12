/* eslint-disable dot-notation */
import test from '@lib/BaseTest'
import {
    TXDescriptionProps,
} from '@pages/Transaction'
import { TXLogProps, TXProps, TXTokenProps } from '@pages/Common'

test.describe.configure({ mode: `parallel` })

test.skip(`@Ethereum @Transactions @Data @AccountImage Check contract creation tx props`, async ({ transactionPage }) => {
    await test.step(`Check contract creation props`, async () => {
        const { TestTokenDeployTXHash } = process.env
        await transactionPage.open(TestTokenDeployTXHash)
        await transactionPage.waitTextReload(`Success`)
        await transactionPage.check_tx_description({
            transactionsHash: [`Transaction Hash`, `0x`],
            result: [`Result`, `Success`],
            status: [`Status`, `Confirmed`, `Confirmed by`],
            block: [`Block`],
            timestamp: [`Timestamp`],
            from: [`From`, `0x`],
            interactedWith: [`To`, `0x`],
            value: [`Value`, `ETH`],
            transactionFee: [`Transaction Fee`, `ETH`],
            gasPrice: [`Gas Price`, `Gwei`],
            transactionType: [`Transaction Type`, `2 (EIP-1559)`],
            gasLimit: [`Gas Limit`],
            maxFeePerGas: [`Max Fee per Gas`, `Gwei`],
            maxPriorityFeePerGas: [`Max Priority Fee per Gas`, `Gwei`],
            priorityFeeTip: [`Priority Fee / Tip`, `ETH`],
            transactionBurntFee: [`Transaction Burnt Fee`, `ETH`],
            gasUsedByTransaction: [`Gas Used by Transaction`, `%`],
            nonce: [`Nonce`],
        } as TXDescriptionProps)
        await transactionPage.check_internal_txs_list(0, {
            name: `Internal Transaction`,
            status: `Create`,
            from1: `0x`,
            to1: `0x`,
            nativeAmount: `0`,
            nativeName: `ETH`,
        } as TXProps)
        await transactionPage.select_logs_tab()
        await transactionPage.check_tx_logs(0, {
            address: [`Address`, `0x`],
            topics: [`Topics`, `[0]`, `[1]`, `[2]`, `[3]`],
            data: [`Data`],
            logIndex: [`Log Index`],
        } as TXLogProps)
        await transactionPage.check_tx_logs(1, {
            address: [`Address`, `0x`],
            topics: [`Topics`, `[0]`, `[1]`, `[2]`, `[3]`],
            data: [`Data`],
            logIndex: [`Log Index`],
        } as TXLogProps)
        await transactionPage.check_verify_alert()
    })
})
