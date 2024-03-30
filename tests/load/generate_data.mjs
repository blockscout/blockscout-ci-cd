/* eslint-disable no-await-in-loop */
import fetch from 'node-fetch'
import chalk from 'chalk'
import { readFileSync, writeFileSync } from 'fs'

const { log } = console
const BLOCKS_URL = `${process.env.URL}/api/v2/blocks`
const TXS_URL = `${process.env.URL}/api/v2/transactions?filter=validated`
const TXS_PENDING_URL = `${process.env.URL}/api/v2/transactions?filter=pending`
const ADDRESSES_URL = `${process.env.URL}/api/v2/addresses`
const TOKENS_ERC_20_URL = `${process.env.URL}/api/v2/tokens?type=ERC-20`
const TOKENS_ERC_721_URL = `${process.env.URL}/api/v2/tokens?type=ERC-721`
const TOKENS_ERC_1155_URL = `${process.env.URL}/api/v2/tokens?type=ERC-1155`
const TOKEN_INSTANCES_URL = (token) => `${process.env.URL}/api/v2/tokens/${token}/instances`

async function fetchJSON(url) {
    const response = await fetch(url)
    const data = await response.json()
    // log(chalk.blue(`fetching data for url ${url}: ${JSON.stringify(data)}`))
    return data
}

async function fetchLastNItems(url, amount, field) {
    log(chalk.blue(`fetching data from URL: ${url}`))
    const data = await fetchJSON(url)
    const { items } = data
    const lastN = items.slice(0, amount)
    const blockNumbers = []
    for (const b of lastN) {
        blockNumbers.push(b[field])
    }
    return blockNumbers
}

async function fetchTokenInstances(tokens, amount, field) {
    const tokenInfos = []
    for (const t of tokens) {
        const url = TOKEN_INSTANCES_URL(t)
        log(chalk.blue(`fetching data from URL: ${url}`))
        const data = await fetchJSON(url)
        const { items } = data
        const lastN = items.slice(0, amount)
        const instances = []
        for (const b of lastN) {
            instances.push(b[field])
        }
        tokenInfos.push({ addr: t, instances })
    }
    return tokenInfos
}

function validateEnvVars() {
    if (process.env.URL === undefined || process.env.URL === ``) {
        log(chalk.red(`set URL env variable`))
        process.exit(1)
    }
    if (process.env.FILENAME === undefined || process.env.FILENAME === ``) {
        log(chalk.red(`set FILENAME env variable, see test_data file names convention`))
        process.exit(1)
    }
}

async function generateData(dataTmpl) {
    validateEnvVars()
    const blocks = await fetchLastNItems(BLOCKS_URL, dataTmpl.blocksAmount, `height`)
    console.log(`blocks: ${JSON.stringify(blocks)}`)
    const txs = await fetchLastNItems(TXS_URL, dataTmpl.txsAmount, `hash`)
    console.log(`transactions: ${JSON.stringify(txs)}`)
    const addresses = await fetchLastNItems(ADDRESSES_URL, dataTmpl.addressesAmount, `hash`)
    console.log(`addresses: ${JSON.stringify(txs)}`)
    const tokensERC20 = await fetchLastNItems(TOKENS_ERC_20_URL, dataTmpl.tokensERC20Amount, `address`)
    console.log(`tokens ERC20: ${JSON.stringify(tokensERC20)}`)
    const tokensERC721 = await fetchLastNItems(TOKENS_ERC_721_URL, dataTmpl.tokensERC721Amount, `address`)
    console.log(`tokens ERC721: ${JSON.stringify(tokensERC721)}`)
    const tokensERC1155 = await fetchLastNItems(TOKENS_ERC_1155_URL, dataTmpl.tokensERC1155Amount, `address`)
    console.log(`tokens ERC1155: ${JSON.stringify(tokensERC1155)}`)

    const tokenInstances = await fetchTokenInstances(tokensERC1155, dataTmpl.tokenInstancesAmount, `id`)
    console.log(`tokens instances ERC1155: ${JSON.stringify(tokenInstances)}`)

    writeFileSync(`test_data/${process.env.FILENAME}.json`, JSON.stringify([{
        blocks,
        txs,
        addresses,
        tokens: tokensERC20,
        nfts: tokenInstances,
    }]))
}

await generateData({
    blocksAmount: 20,
    txsAmount: 20,
    addressesAmount: 20,
    tokensERC20Amount: 20,
    tokensERC721Amount: 20,
    tokensERC1155Amount: 20,
    tokenInstancesAmount: 20,
})
