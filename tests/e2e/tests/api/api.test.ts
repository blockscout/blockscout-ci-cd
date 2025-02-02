import { test, expect } from '@playwright/test'
import { LoadDataFile } from "@lib/File"
import chalk from "chalk"

test.describe.configure({ mode: `parallel` })

const contractsInfoURL = `https://contracts-info.services.blockscout.com`
const adminURL = `https://admin-rs.services.blockscout.com`

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
    test(`@Api @Health ${url} Check health`, async ({ request }): Promise<void> => {
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
            expect(diff).toBeLessThan(70)
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
        // console.log(`body: ${JSON.stringify(blocks, null, 2)}`)
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
})
