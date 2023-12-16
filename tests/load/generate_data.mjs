import fetch from 'node-fetch'
import chalk from 'chalk'
import { readFileSync, writeFileSync } from 'fs'

const { log } = console
const BLOCKS_URL = `${process.env.URL}/api/v2/blocks`

async function fetchJSON(url) {
    const response = await fetch(url)
    const data = await response.json()
    log(chalk.blue(`fetching data for url ${url}: ${JSON.stringify(data)}`))
    return data
}

async function fetchBlocksData(url, amount) {
    const blocksData = await fetchJSON(url)
    const { items } = blocksData
    const lastN = items.slice(0, amount)
    const blockNumbers = []
    for (const b of lastN) {
        blockNumbers.push(b.height)
    }
    return blockNumbers
}

const blocks = await fetchBlocksData(BLOCKS_URL, 10)
console.log(`blocks: ${JSON.stringify(blocks)}`)

/*
[{
    v1Offset: 100,
    blocks: [],
    nfts: [
        {
            addr: ``,
            instances: [],
        },
    ],
    tokens: [],
    addresses: [],
    contracts: [],
    txs: [],
}]
*/

writeFileSync(`test_data/${process.env.NAME}.json`, JSON.stringify(blocks))
