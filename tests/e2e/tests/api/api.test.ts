import { test, expect } from '@playwright/test'
import { LoadDataFile } from "@lib/File"
import chalk from "chalk"
import { shouldRunWithRelease } from "../common"

test.describe.configure({ mode: `parallel` })

const contractsInfoURL = `https://contracts-info.services.blockscout.com`
const adminURL = `https://admin-rs.services.blockscout.com`
const bensURL = `https://bens.services.blockscout.com`

const urls = (process.env.BLOCKSCOUT_URL || ``).split(`,`)

const urlToChainIdMap = {
    "https://eth-sepolia.k8s-dev.blockscout.com": 11155111,
    "https://eth-sepolia.blockscout.com": 11155111,
    "https://eth.blockscout.com": 1,
    "https://base.blockscout.com": 8453,
    "https://gnosis.blockscout.com": 100,
    "https://optimism.blockscout.com": 10,
    "https://neon.blockscout.com": 245022934,
    "https://rootstock.blockscout.com": 30,
    "https://polygon.blockscout.com": 137,
    "https://explorer.immutable.com": 13371,
    "https://zkevm.blockscout.com": 1101,
    "https://arbitrum.blockscout.com": 42161,
    "https://zksync.blockscout.com": 324,
    "https://www.shibariumscan.io": 109,
    "https://explorer.zora.energy": 7777777,
    "https://blast.blockscout.com": 81457,
}

urls.forEach((url: string) => {
    LoadDataFile(url)
    test.skip(`@Api @Health ${url} Check health`, async ({ request }): Promise<void> => {
        const resp = await request.get(`${url}/api/health`)
        expect(resp.status()).toBe(200)
        const body = await resp.json()
        expect(body.healthy).toBeTruthy()
        expect(body.metadata.latest_block).toMatchObject({
            cache: expect.any(Object),
        })
        expect(body.metadata.latest_block.db).toMatchObject({
            number: expect.any(String),
        })
        const lbData = body.metadata.latest_block
        const diff = Number(lbData.db.number) - Number(lbData.cache.number)
        if (url.includes(`arbitrum`)) {
            expect(diff).toBeLessThan(120)
        } else {
            expect(diff).toBeLessThan(10)
        }
    })
    test(`@Api ${url} Check transactions`, async ({ request }): Promise<void> => {
        const resp = await request.get(`${url}/api/v2/transactions?filter=validated`)
        expect(resp.status()).toBe(200)
        const body = await resp.json()
        const txs = body.items
        expect(txs.length).toBeGreaterThan(0)
        for (const tx of txs) {
            expect(tx.hash).toBeDefined()
        }
    })
    test(`@Api ${url} Check blocks`, async ({ request }): Promise<void> => {
        const resp = await request.get(`${url}/api/v2/blocks?type=block`)
        expect(resp.status()).toBe(200)
        const body = await resp.json()
        const blocks = body.items
        expect(blocks.length).toBeGreaterThan(0)
        for (const blk of blocks) {
            expect(blk.size).toBeDefined()
        }
    })
    test(`@Api ${url} Check main page blocks`, async ({ request }): Promise<void> => {
        const resp = await request.get(`${url}/api/v2/main-page/blocks`)
        expect(resp.status()).toBe(200)
        const blocks = await resp.json()
        expect(blocks.length).toBeGreaterThan(0)
        for (const blk of blocks) {
            expect(blk.size).toBeDefined()
        }
    })

    test(`@Api ${url} Check main page transactions`, async ({ request }): Promise<void> => {
        const resp = await request.get(`${url}/api/v2/main-page/transactions`)
        expect(resp.status()).toBe(200)
        const txs = await resp.json()
        expect(txs.length).toBeGreaterThan(0)
        for (const tx of txs) {
            expect(tx.hash).toBeDefined()
        }
    })

    test(`@Api ${url} Check main page chart txs`, async ({ request }): Promise<void> => {
        const resp = await request.get(`${url}/api/v2/stats/charts/transactions`)
        expect(resp.status()).toBe(200)
        const txs = await resp.json()
        for (const tx of txs.chart_data) {
            expect(tx.transaction_count).toBeDefined()
        }
    })

    test(`@Api ${url} Check main page stats`, async ({ request }): Promise<void> => {
        const resp = await request.get(`${url}/api/v2/stats`)
        expect(resp.status()).toBe(200)
        const stats = await resp.json()
        expect(stats.transactions_today).toBeDefined()
        expect(stats.average_block_time).toBeDefined()
        expect(stats.gas_prices).toBeDefined()
    })

    test(`@Api ${url} Check top accounts`, async ({ request }): Promise<void> => {
        const resp = await request.get(`${url}/api/v2/addresses`)
        expect(resp.status()).toBe(200)
        const body = await resp.json()
        for (const acc of body.items) {
            expect(acc.hash).toBeDefined()
        }
    })

    test(`@Api ${url} Check tokens`, async ({ request }): Promise<void> => {
        const resp = await request.get(`${url}/api/v2/tokens`)
        expect(resp.status()).toBe(200)
        const body = await resp.json()
        for (const acc of body.items) {
            expect(acc.address).toBeDefined()
        }
    })

    test(`@Api ${url} Check token transfers`, async ({ request }): Promise<void> => {
        const resp = await request.get(`${url}/api/v2/token-transfers?type=`)
        expect(resp.status()).toBe(200)
        const body = await resp.json()
        for (const token of body.items) {
            expect(token.token).toBeDefined()
        }
    })

    test(`@Api ${url} Check DEX pools`, async ({ request }): Promise<void> => {
        const resp = await request.get(`${contractsInfoURL}/api/v1/chains/${urlToChainIdMap[url]}/pools`)
        expect(resp.status()).toBe(200)
        const body = await resp.json()
        for (const dex of body.items) {
            expect(dex.dex).toBeDefined()
        }
    })

    test(`@Api ${url} Check DApps`, async ({ request }): Promise<void> => {
        const resp = await request.get(`${adminURL}/api/v1/chains/${contractsInfoURL[url]}/marketplace/dapps`)
        expect(resp.status()).toBe(200)
        const body = await resp.json()
        for (const dapp of body) {
            expect(dapp.title).toBeDefined()
        }
    })
    test(`@Api ${url} Check User Ops`, async ({ request }): Promise<void> => {
        if (url.includes(`eth-sepolia`, `gnosis`, `eth.blockscout`, `base`, `optimism`, `neon`, `polygon`, `explorer`)) {
            const resp = await request.get(`${url}/api/v2/proxy/account-abstraction/operations`)
            expect(resp.status()).toBe(200)
            const body = await resp.json()
            for (const op of body.items) {
                expect(op.address.hash).toBeDefined()
            }
        }
    })
    test(`@Api ${url} Check Verified Contracts`, async ({ request }): Promise<void> => {
        const resp = await request.get(`${url}/api/v2/smart-contracts`)
        expect(resp.status()).toBe(200)
        const body = await resp.json()
        for (const contract of body.items) {
            expect(contract.address.name).toBeDefined()
        }
    })

    test(`@Api ${url} Check Domains`, async ({ request }): Promise<void> => {
        if (url.includes(`eth-sepolia`, `gnosis`, `eth.blockscout`, `base`, `optimism`, `neon`, `polygon`, `explorer`)) {
            const resp = await request.get(`${bensURL}/api/v1/${urlToChainIdMap[url]}/domains:lookup?only_active=true`)
            expect(resp.status()).toBe(200)
            const body = await resp.json()
            for (const domain of body.items) {
                expect(domain.name).toBeDefined()
            }
        }
    })
    test(`@Api ${url} Check Withdrawals`, async ({ request }): Promise<void> => {
        const resp = await request.get(`${url}/api/v2/withdrawals`)
        expect(resp.status()).toBe(200)
        const body = await resp.json()
        for (const withdrawal of body.items) {
            expect(withdrawal.amount).toBeDefined()
        }
    })

    test(`@Api ${url} Check account abstraction status`, async ({ request }): Promise<void> => {
        if (shouldRunWithRelease(`v7.0.0`, `v7.0.0`)) {
            const resp = await request.get(`${url}/api/v2/proxy/account-abstraction/status`)
            expect(resp.status()).toBe(200)
            const body = await resp.json()
            expect(body.finished_past_indexing).toBeTruthy()
            expect(body.v06).toBeTruthy()
            expect(body.v06.enabled).toBeTruthy()
            expect(body.v06.live).toBeTruthy()
            expect(body.v06.enabled).toBeTruthy()
            expect(body.v07.live).toBeTruthy()
        }
    })

    test(`@Api @L2 ${url} Check Optimism type deposits`, async ({ request }): Promise<void> => {
        const resp = await request.get(`${url}/api/v2/optimism/deposits`)
        const body = await resp.json()
        if (resp.status() === 400 && body.message.includes(`module`)) {
            test.skip()
        }
        expect(resp.status()).toBe(200)
        expect(body.items[0].l1_block_number).toBeDefined()
        expect(body.items[0].l2_transaction_hash).toBeDefined()
    })

    test(`@Api @L2 ${url} Check ZKEVM type deposits`, async ({ request }): Promise<void> => {
        const resp = await request.get(`${url}/api/v2/zkevm/deposits`)
        const body = await resp.json()
        if (resp.status() === 400 && body.message.includes(`module`)) {
            test.skip()
        }
        expect(resp.status()).toBe(200)
        expect(body.items[0].l1_transaction_hash).toBeDefined()
        expect(body.items[0].l2_transaction_hash).toBeDefined()
    })

    test(`@Api @L2 ${url} Check Arbitrum type deposits`, async ({ request }): Promise<void> => {
        const resp = await request.get(`${url}/api/v2/arbitrum/messages/to-rollup`)
        const body = await resp.json()
        if (resp.status() === 400 && body.message.includes(`module`)) {
            test.skip()
        }
        expect(resp.status()).toBe(200)
        expect(body.items[0].id).toBeDefined()
        // console.log(`resp: ${JSON.stringify(body, null, "")}`)
    })

    test(`@Api @L2 ${url} Check Optimism type withdrawals`, async ({ request }): Promise<void> => {
        const resp = await request.get(`${url}/api/v2/optimism/withdrawals`)
        const body = await resp.json()
        if (resp.status() === 400 && body.message.includes(`module`)) {
            test.skip()
        }
        expect(resp.status()).toBe(200)
        expect(body.items[0].from.hash).toBeDefined()
        expect(body.items[0].l2_transaction_hash).toBeDefined()
    })

    test(`@Api @L2 ${url} Check ZKEVM type withdrawals`, async ({ request }): Promise<void> => {
        const resp = await request.get(`${url}/api/v2/zkevm/withdrawals`)
        const body = await resp.json()
        if (resp.status() === 400 && body.message.includes(`module`)) {
            test.skip()
        }
        expect(resp.status()).toBe(200)
        expect(body.items[0].index).toBeDefined()
        expect(body.items[0].l2_transaction_hash).toBeDefined()
    })

    test(`@Api @L2 ${url} Check Arbitrum type withdrawals`, async ({ request }): Promise<void> => {
        const resp = await request.get(`${url}/api/v2/arbitrum/messages/from-rollup`)
        const body = await resp.json()
        if (resp.status() === 400 && body.message.includes(`module`)) {
            test.skip()
        }
        expect(resp.status()).toBe(200)
        expect(body.items[0].id).toBeDefined()
        expect(body.items[0].status).toBeDefined()
    })

    test(`@Api @L2 ${url} Check Optimism batches `, async ({ request }): Promise<void> => {
        const resp = await request.get(`${url}/api/v2/optimism/batches`)
        const body = await resp.json()
        if (resp.status() === 400 && body.message.includes(`module`)) {
            test.skip()
        }
        expect(resp.status()).toBe(200)
        expect(body.items[0].l1_transaction_hashes).toBeDefined()
        expect(body.items[0].l2_block_start).toBeDefined()
    })

    test(`@Api @L2 ${url} Check ZKEVM batches `, async ({ request }): Promise<void> => {
        const resp = await request.get(`${url}/api/v2/zkevm/batches`)
        const body = await resp.json()
        if (resp.status() === 400 && body.message.includes(`module`)) {
            test.skip()
        }
        expect(resp.status()).toBe(200)
        expect(body.items[0].number).toBeDefined()
        expect(body.items[0].timestamp).toBeDefined()
    })

    test(`@Api @L2 ${url} Check Arbitrum batches `, async ({ request }): Promise<void> => {
        const resp = await request.get(`${url}/api/v2/arbitrum/batches`)
        const body = await resp.json()
        if (resp.status() === 400 && body.message.includes(`module`)) {
            test.skip()
        }
        expect(resp.status()).toBe(200)
        expect(body.items[0].batch_data_container).toBeDefined()
        expect(body.items[0].commitment_transaction.hash).toBeDefined()
    })

    test(`@Api @L2 ${url} Check Optimism dispute games `, async ({ request }): Promise<void> => {
        const resp = await request.get(`${url}/api/v2/optimism/games`)
        const body = await resp.json()
        if (resp.status() === 400 && body.message.includes(`module`)) {
            test.skip()
        }
        expect(resp.status()).toBe(200)
        expect(body.items[0].contract_address).toBeDefined()
        expect(body.items[0].l2_block_number).toBeDefined()
    })

    test(`@Api @L2 ${url} Check Optimism output roots`, async ({ request }): Promise<void> => {
        const resp = await request.get(`${url}/api/v2/optimism/output-roots`)
        const body = await resp.json()
        if (resp.status() === 400 && body.message.includes(`module`)) {
            test.skip()
        }
        expect(resp.status()).toBe(200)
        expect(body.items[0].l1_transaction_hash).toBeDefined()
        expect(body.items[0].output_root).toBeDefined()
    })
})
