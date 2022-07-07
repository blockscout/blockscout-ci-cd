import test from '@lib/BaseTest'
import {
    TXDescriptionProps, TXLogProps, TXProps, TXTokenProps,
} from '@pages/Transaction'
import { expect } from '@playwright/test'
import { TestToken } from '../../../contracts/typechain/contracts/TestToken'

test(`@Ethereum @Transactions Transaction type cheks`, async ({
    context,
    transactionPage,
    contracts,
}) => {
    await test.step(`Check contract creation props`, async () => {
        const contract = await contracts.deploy(`TestToken`, `erc20`) as TestToken
        await transactionPage.open(contract.deployTransaction.hash)
        await transactionPage.waitTXStatus(`Success`)
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
    })

    await test.step(`Check mint tx props`, async () => {
        const token = contracts.get(`erc20`) as TestToken
        const tx = await token.mint(contracts.wallet.address, 1)
        await transactionPage.open(tx.hash)
        await transactionPage.waitTXStatus(`Success`)
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
            tokenSymbol: `TST`,
        } as TXTokenProps)
        await transactionPage.select_logs_tab()
        await transactionPage.check_tx_logs(0, {
            address: [`Address`, `0x`, `Test Token`],
            topics: [`Topics`, `[0]`, `[1]`, `[2]`],
            data: [`Data`, `0x0000000000000000000000000000000000000000000000000000000000000001`],
            logIndex: [`Log Index`],
        } as TXLogProps)
    })

    await test.step(`Check reverted tx props`, async () => {
        const token = contracts.get(`erc20`) as TestToken
        const tx = await token.alwaysReverts({ gasLimit: 250000 })
        await transactionPage.open(tx.hash)
        await transactionPage.waitTXStatus(`Error: execution reverted`)
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
