/* eslint-disable no-continue */
/* eslint-disable guard-for-in */
/* eslint-disable dot-notation */

/* this is a common data format between us and Etherscan for Goerli */

import chalk from 'chalk'

/* blocks */

export interface BlockTexts {
    proposedText: string
    transactionsText: string
    feeRecipient: string
    rewardText: string
    totalDifficulty: string
    sizeText: string
    gasUsedText: string
    gasLimitText: string
    baseFeePerGasText: string
    burntFeesText: string
    extraDataText: string
}

export interface Block {
    num: number
    texts: BlockTexts
    slot: string
    epoch: string
    txs: string
    internalTx: string
    reward: string
    size: string
    absGasUsed: string
    percGasUsed: string
    baseFeePerGasETH: string
    baseFeePerGasGwei: string
    burntFees: string
}

export interface BlockRequest {
    num: number
}

export interface RequestBlocksData {
    blocks: BlockRequest[]
}

/* transactions */

export interface RequestTransactions {
    hash: string
}

export interface RequestTransactionsData {
    txs: RequestTransactions[]
}

export interface TransactionsTexts {
    blockText: string
    statusText: string
    fromText: string
    toText: string
}

export interface Transaction {
    hash: string
    texts: TransactionsTexts
    block: string
    status: string
    from: string
    to: string
}

/* comparison */

export interface ComparableData {
    blocks: Block[]
    txs: Transaction[]
}

export interface Comparable {
    get_blocks_data(data: RequestBlocksData): Promise<ComparableData>
    transform_block(b: Block): Block
    get_txs_data(data: RequestTransactionsData): Promise<ComparableData>
    transform_transaction(t: Transaction): Transaction
}

export const compareAndPrintBlocks = (etherscanData: ComparableData, blockscoutData: ComparableData) => {
    console.log(`Etherscan data: ${JSON.stringify(etherscanData, null, 2)}`)
    console.log(`Goerli data: ${JSON.stringify(blockscoutData, null, 2)}`)
    for (const bIdx in etherscanData.blocks) {
        for (const [key, value] of Object.entries(etherscanData.blocks[bIdx])) {
            if (key === `texts`) {
                continue
            }
            console.log(`key: ${key}, value: ${value}`)
            if (value !== blockscoutData.blocks[bIdx][key]) {
                console.log(chalk.red(`Etherscan: ${value}, Blockscout: ${blockscoutData.blocks[bIdx][key]}`))
            } else {
                console.log(chalk.green(`Etherscan: ${value}, Blockscout: ${blockscoutData.blocks[bIdx][key]}`))
            }
        }
    }
}

export const compareAndPrintTxs = (etherscanData: ComparableData, blockscoutData: ComparableData) => {
    console.log(`Etherscan data: ${JSON.stringify(etherscanData, null, 2)}`)
    console.log(`Goerli data: ${JSON.stringify(blockscoutData, null, 2)}`)
    for (const bIdx in etherscanData.txs) {
        for (const [key, value] of Object.entries(etherscanData.txs[bIdx])) {
            if (key === `texts`) {
                continue
            }
            console.log(`key: ${key}, value: ${value}`)
            if (value !== blockscoutData.txs[bIdx][key]) {
                console.log(chalk.red(`Etherscan: ${value}, Blockscout: ${blockscoutData.txs[bIdx][key]}`))
            } else {
                console.log(chalk.green(`Etherscan: ${value}, Blockscout: ${blockscoutData.txs[bIdx][key]}`))
            }
        }
    }
}
