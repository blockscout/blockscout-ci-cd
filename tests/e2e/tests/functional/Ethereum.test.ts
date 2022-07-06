import test from '@lib/BaseTest'
import { TXDescriptionProps, TXProps } from '@pages/Common'
import { expect } from '@playwright/test'
import { TestToken } from '../../../contracts/typechain/contracts/TestToken'

test(`@Ethereum @Transaction Transaction type cheks`, async ({
    context,
    common,
    homePage,
    contracts,
}) => {
    await test.step(`Check contract creation props`, async () => {
        const contract = await contracts.deploy(`TestToken`, `erc20`) as TestToken
        await homePage.delay(4000)
        await common.check_tx_description(contract.deployTransaction.hash, {
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
    })

    await test.step(`Check mint tx props`, async () => {
        const token = contracts.get(`erc20`) as TestToken
        const tx = await token.mint(contracts.wallet.address, 1)
        await homePage.delay(4000)
        await common.check_tx_description(tx.hash, {
            transactionsHash: [`Transaction Hash`, `0x`],
            result: [`Result`, `Success`],
            status: [`Status`, `Confirmed`, `Confirmed by`],
            block: [`Block`],
            timestamp: [`Timestamp`],
            from: [`From`, `0x`],
            interactedWith: [`Interacted With (To)`, `0x`],
            tokensMinted: [`Tokens Minted`],
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
