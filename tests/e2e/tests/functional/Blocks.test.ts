/* eslint-disable dot-notation */
import test from '@lib/BaseTest'
import { BlockDescriptionProps } from '@pages/Blocks'
import { TXProps } from '@pages/Common'

test.describe.configure({ mode: `parallel` })

test(`@Ethereum @Blocks @Data @AccountImage Block with a create tx`, async ({ blocksPage }) => {
    await test.step(`Check block info for create tx`, async () => {
        const { TestTokenDeployTXBlockNumber } = process.env
        await blocksPage.open(TestTokenDeployTXBlockNumber)
        await blocksPage.check_block_description({
            blockHeight: [`Block Height`],
            timestamp: [`Timestamp`, `UTC`],
            transactions: [`Transactions`, `Transaction`],
            miner: [`Miner`, `0x`],
            size: [`Size`, `bytes`],
            hash: [`Hash`, `0x`],
            parentHash: [`Parent Hash`, `0x`],
            difficulty: [`Difficulty`, `2`],
            totalDifficulty: [`Total Difficulty`],
            gasUsed: [`Gas Used`, `%`],
            gasLimit: [`Gas Limit`, `,`],
            nonce: [`Nonce`, `0x0000000000000000`],
            baseFeePerGas: [`Base Fee per Gas`, `Gwei`],
            burntFees: [`Burnt Fees`, `Ether`],
            priorityFeeTip: [`Priority Fee / Tip`, `Ether`],
        } as BlockDescriptionProps)
        await blocksPage.check_tx_in_list(0, {
            name: `Contract Creation`,
            status: `Success`,
            from1: `0x`,
            to1: `0x`,
            nativeAmount: `0`,
            nativeName: `Ether`,
        } as TXProps)
    })
})

test(`@Ethereum @Blocks @Data @AccountImage with a mint tx`, async ({ blocksPage }) => {
    await test.step(`Check block info for mint tx`, async () => {
        const { TestTokenTXMintBlockNumber } = process.env
        await blocksPage.open(TestTokenTXMintBlockNumber)
        await blocksPage.check_block_description({
            blockHeight: [`Block Height`],
            timestamp: [`Timestamp`, `UTC`],
            transactions: [`Transactions`, `Transaction`],
            miner: [`Miner`, `0x`],
            size: [`Size`, `bytes`],
            hash: [`Hash`, `0x`],
            parentHash: [`Parent Hash`, `0x`],
            difficulty: [`Difficulty`, `2`],
            totalDifficulty: [`Total Difficulty`],
            gasUsed: [`Gas Used`, `%`],
            gasLimit: [`Gas Limit`, `,`],
            nonce: [`Nonce`, `0x0000000000000000`],
            baseFeePerGas: [`Base Fee per Gas`, `Gwei`],
            burntFees: [`Burnt Fees`, `Ether`],
            priorityFeeTip: [`Priority Fee / Tip`, `Ether`],
        } as BlockDescriptionProps)
        await blocksPage.check_tx_in_list(0, {
            name: `Token Minting`,
            status: `Success`,
            from1: `0x`,
            to1: `0x`,
            nativeAmount: `0`,
            nativeName: `Ether`,
        } as TXProps)
    })
})

test(`@Ethereum @Blocks @Data @AccountImage Block info with reverted tx`, async ({ blocksPage }) => {
    await test.step(`Check block info with reverted tx`, async () => {
        const { TestTokenTXRevertBlockNumber } = process.env
        await blocksPage.open(TestTokenTXRevertBlockNumber)
        await blocksPage.check_block_description({
            blockHeight: [`Block Height`],
            timestamp: [`Timestamp`, `UTC`],
            transactions: [`Transactions`, `Transaction`],
            miner: [`Miner`, `0x`],
            size: [`Size`, `bytes`],
            hash: [`Hash`, `0x`],
            parentHash: [`Parent Hash`, `0x`],
            difficulty: [`Difficulty`, `2`],
            totalDifficulty: [`Total Difficulty`],
            gasUsed: [`Gas Used`, `%`],
            gasLimit: [`Gas Limit`, `,`],
            nonce: [`Nonce`, `0x0000000000000000`],
            baseFeePerGas: [`Base Fee per Gas`, `Gwei`],
            burntFees: [`Burnt Fees`, `Ether`],
            priorityFeeTip: [`Priority Fee / Tip`, `Ether`],
        } as BlockDescriptionProps)
        await blocksPage.check_tx_in_list(0, {
            name: `Contract Call`,
            status: `Error: Execution reverted`,
            from1: `0x`,
            to1: `0x`,
            nativeAmount: `0`,
            nativeName: `Ether`,
        } as TXProps)
    })
})

// public image

test(`@Ethereum @Blocks @Data @PublicImage Block with a create tx`, async ({ blocksPage }) => {
    await test.step(`Check block info for create tx`, async () => {
        const { TestTokenDeployTXBlockNumber } = process.env
        await blocksPage.open(TestTokenDeployTXBlockNumber)
        await blocksPage.check_block_description({
            blockHeight: [`Block Height`],
            timestamp: [`Timestamp`, `UTC`],
            transactions: [`Transactions`, `Transaction`],
            miner: [`Miner`, `0x`],
            size: [`Size`, `bytes`],
            hash: [`Hash`, `0x`],
            parentHash: [`Parent Hash`, `0x`],
            difficulty: [`Difficulty`, `2`],
            totalDifficulty: [`Total Difficulty`],
            gasUsed: [`Gas Used`, `%`],
            gasLimit: [`Gas Limit`, `,`],
            nonce: [`Nonce`, `0x0000000000000000`],
            baseFeePerGas: [`Base Fee per Gas`, `Gwei`],
            burntFees: [`Burnt Fees`, `Ether`],
            priorityFeeTip: [`Priority Fee / Tip`, `Ether`],
        } as BlockDescriptionProps)
        await blocksPage.check_tx_in_list(0, {
            name: `Contract Creation`,
            status: `Success`,
            from1: `0x`,
            to1: `0x`,
            nativeAmount: `0`,
            nativeName: `Ether`,
        } as TXProps)
    })
})

test(`@Ethereum @Blocks @Data @PublicImage with a mint tx`, async ({ blocksPage }) => {
    await test.step(`Check block info for mint tx`, async () => {
        const { TestTokenTXMintBlockNumber } = process.env
        await blocksPage.open(TestTokenTXMintBlockNumber)
        await blocksPage.check_block_description({
            blockHeight: [`Block Height`],
            timestamp: [`Timestamp`, `UTC`],
            transactions: [`Transactions`, `Transaction`],
            miner: [`Miner`, `0x`],
            size: [`Size`, `bytes`],
            hash: [`Hash`, `0x`],
            parentHash: [`Parent Hash`, `0x`],
            difficulty: [`Difficulty`, `2`],
            totalDifficulty: [`Total Difficulty`],
            gasUsed: [`Gas Used`, `%`],
            gasLimit: [`Gas Limit`, `,`],
            nonce: [`Nonce`, `0x0000000000000000`],
            baseFeePerGas: [`Base Fee per Gas`, `Gwei`],
            burntFees: [`Burnt Fees`, `Ether`],
            priorityFeeTip: [`Priority Fee / Tip`, `Ether`],
        } as BlockDescriptionProps)
        await blocksPage.check_tx_in_list(0, {
            name: `Token Minting`,
            status: `Success`,
            from1: `0x`,
            to1: `0x`,
            nativeAmount: `0`,
            nativeName: `Ether`,
        } as TXProps)
    })
})

test(`@Ethereum @Blocks @Data @PublicImage Block info with reverted tx`, async ({ blocksPage }) => {
    await test.step(`Check block info with reverted tx`, async () => {
        const { TestTokenTXRevertBlockNumber } = process.env
        await blocksPage.open(TestTokenTXRevertBlockNumber)
        await blocksPage.check_block_description({
            blockHeight: [`Block Height`],
            timestamp: [`Timestamp`, `UTC`],
            transactions: [`Transactions`, `Transaction`],
            miner: [`Miner`, `0x`],
            size: [`Size`, `bytes`],
            hash: [`Hash`, `0x`],
            parentHash: [`Parent Hash`, `0x`],
            difficulty: [`Difficulty`, `2`],
            totalDifficulty: [`Total Difficulty`],
            gasUsed: [`Gas Used`, `%`],
            gasLimit: [`Gas Limit`, `,`],
            nonce: [`Nonce`, `0x0000000000000000`],
            baseFeePerGas: [`Base Fee per Gas`, `Gwei`],
            burntFees: [`Burnt Fees`, `Ether`],
            priorityFeeTip: [`Priority Fee / Tip`, `Ether`],
        } as BlockDescriptionProps)
        await blocksPage.check_tx_in_list(0, {
            name: `Contract Call`,
            status: `Error: Execution reverted`,
            from1: `0x`,
            to1: `0x`,
            nativeAmount: `0`,
            nativeName: `Ether`,
        } as TXProps)
    })
})
