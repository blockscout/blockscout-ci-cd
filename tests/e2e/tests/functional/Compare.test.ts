/* eslint-disable guard-for-in */
/* eslint-disable dot-notation */
import test from '@lib/BaseTest'
import {
    RequestBlocksData,
    RequestTransactionsData,
    compareAndPrintBlocks,
    compareAndPrintTxs,
} from '@lib/Format'

test.describe.configure({ mode: `parallel` })

test(`@Etherscan Compare blocks between Etherscan Goerli and Blockscout Goerli`, async ({ newHomeGoerli, etherscanGoerliPage }) => {
    const data: RequestBlocksData = {
        blocks: [
            { num: 8741000 },
            { num: 8741010 },
            { num: 8743020 },
            { num: 8743030 },
            { num: 8743040 },
        ],
    }
    const etherscanData = await etherscanGoerliPage.get_blocks_data(data)
    const goerliData = await newHomeGoerli.get_blocks_data(data)
    compareAndPrintBlocks(etherscanData, goerliData)
})

test(`@Etherscan Compare txs between Etherscan Goerli and Blockscout Goerli`, async ({ newHomeGoerli, etherscanGoerliPage }) => {
    const data: RequestTransactionsData = {
        txs: [
            { hash: `0xe1075297bf5dd1828164c5ae007d4ae7a3a000ceb62f9e080f3c761bf398b201` },
            { hash: `0xcf1e1c180abf30f5191d4fb5e6e85981e1bbd758ca582ff191db7cfa3b2eb320` },
        ],
    }
    const etherscanData = await etherscanGoerliPage.get_txs_data(data)
    const goerliData = await newHomeGoerli.get_txs_data(data)
    compareAndPrintTxs(etherscanData, goerliData)
})
