/* eslint-disable dot-notation */
import test from '@lib/BaseTest'
import {
    TXDescriptionProps,
} from '@pages/Transaction'
import { TXLogProps, TXProps, TXTokenProps } from '@pages/Common'

test.describe.configure({ mode: `parallel` })

test(`@Ethereum @Transactions @Data @PublicImage Check contract creation tx props`, async ({ transactionPage }) => {
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
            value: [`Value`, `Ether`, `USD`],
            transactionFee: [`Transaction Fee`, `Ether`, `USD`],
            gasPrice: [`Gas Price`, `Gwei`],
            transactionType: [`Transaction Type`, `2 (EIP-1559)`],
            gasLimit: [`Gas Limit`],
            maxFeePerGas: [`Max Fee per Gas`, `Gwei`],
            maxPriorityFeePerGas: [`Max Priority Fee per Gas`, `Gwei`],
            priorityFeeTip: [`Priority Fee / Tip`, `Ether`],
            transactionBurntFee: [`Transaction Burnt Fee`, `Ether`, `USD`],
            gasUsedByTransaction: [`Gas Used by Transaction`, `%`],
            nonce: [`Nonce`],
        } as TXDescriptionProps)
        await transactionPage.check_internal_txs_list(0, {
            name: `Internal Transaction`,
            status: `Create`,
            from1: `0x`,
            to1: `0x`,
            nativeAmount: `0`,
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

test(`@Ethereum @Transactions @Data @PublicImage Check mint tx props`, async ({ transactionPage }) => {
    await test.step(`Check mint tx props`, async () => {
        const { TestTokenTXMintHash, TestTokenName, TestTokenSymbol } = process.env
        await transactionPage.open(TestTokenTXMintHash)
        await transactionPage.waitTextReload(`Success`)
        await transactionPage.check_tx_description({
            transactionsHash: [`Transaction Hash`, `0x`],
            result: [`Result`, `Success`],
            status: [`Status`, `Confirmed`, `Confirmed by`],
            block: [`Block`],
            timestamp: [`Timestamp`],
            from: [`From`, `0x`],
            interactedWith: [`Interacted With (To)`, `0x`],
            tokensMinted: [`Tokens Minted`, `From`, `To`, `For`],
            value: [`Value`, `Ether`, `USD`],
            transactionFee: [`Transaction Fee`, `Ether`, `USD`],
            gasPrice: [`Gas Price`, `Gwei`],
            transactionType: [`Transaction Type`, `2 (EIP-1559)`],
            gasLimit: [`Gas Limit`],
            maxFeePerGas: [`Max Fee per Gas`, `Gwei`],
            maxPriorityFeePerGas: [`Max Priority Fee per Gas`, `Gwei`],
            priorityFeeTip: [`Priority Fee / Tip`, `Ether`],
            transactionBurntFee: [`Transaction Burnt Fee`, `Ether`, `USD`],
            gasUsedByTransaction: [`Gas Used by Transaction`, `%`],
            nonce: [`Nonce`],
        } as TXDescriptionProps)
        await transactionPage.check_token_txs_list(0, {
            name: `Token Minting`,
            from1: `0x`,
            to1: `0x`,
            tokenAmount: `0.000000000000000001`,
            tokenSymbol: TestTokenSymbol,
        } as TXTokenProps)
        await transactionPage.select_logs_tab()
        await transactionPage.check_tx_logs(0, {
            address: [`Address`, `0x`, TestTokenName],
            topics: [`Topics`, `[0]`, `[1]`, `[2]`],
            data: [`Data`, `0x0000000000000000000000000000000000000000000000000000000000000001`],
            logIndex: [`Log Index`],
        } as TXLogProps)
    })
})

test(`@Ethereum @Transactions @Data @PublicImage Check reverted tx props`, async ({ transactionPage }) => {
    await test.step(`Check reverted tx props`, async () => {
        const { TestTokenTXRevertHash } = process.env
        await transactionPage.open(TestTokenTXRevertHash)
        await transactionPage.waitTextReload(`Error: execution reverted`)
        await transactionPage.check_tx_description({
            transactionsHash: [`Transaction Hash`, `0x`],
            result: [`Result`, `Error: execution reverted`],
            status: [`Status`],
            revertReason: [`Revert reason`, `Raw`, `0x`],
            block: [`Block`],
            timestamp: [`Timestamp`],
            from: [`From`, `0x`],
            interactedWith: [`Interacted With (To)`, `0x`],
            value: [`Value`, `Ether`, `USD`],
            transactionFee: [`Transaction Fee`, `Ether`, `USD`],
            gasPrice: [`Gas Price`, `Gwei`],
            transactionType: [`Transaction Type`, `2 (EIP-1559)`],
            gasLimit: [`Gas Limit`],
            maxFeePerGas: [`Max Fee per Gas`, `Gwei`],
            maxPriorityFeePerGas: [`Max Priority Fee per Gas`, `Gwei`],
            priorityFeeTip: [`Priority Fee / Tip`, `Ether`],
            transactionBurntFee: [`Transaction Burnt Fee`, `Ether`, `USD`],
            gasUsedByTransaction: [`Gas Used by Transaction`, `%`],
            nonce: [`Nonce`],
        } as TXDescriptionProps)
    })
})
