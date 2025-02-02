import { test, expect } from '@playwright/test'
import { LoadDataFile } from "@lib/File"
import chalk from "chalk"

const urls = (process.env.BLOCKSCOUT_URL || ``).split(`,`)

urls.forEach((url: string) => {
    LoadDataFile(url)
    test(`@Api @Health ${url} Check health`, async ({ request }): Promise<void> => {
        console.log(chalk.yellow(`checking service health...`))
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
        expect(diff).toBeLessThan(20)
    })
    test(`@Api @Health ${url} Check transactions`, async ({ request }): Promise<void> => {
        console.log(chalk.yellow(`checking transactions...`))
        const resp = await request.get(`${url}/api/v2/transactions?filter=validated`)
        expect(resp.status()).toBe(200)
        const body = await resp.json()
        const txs = body.items
        expect(txs.length).toBeGreaterThan(0)
        for (const tx of txs) {
            expect(tx.hash).toBeDefined()
        }
    })
    test(`@Api @Health ${url} Check blocks`, async ({ request }): Promise<void> => {
        console.log(chalk.yellow(`checking blocks...`))
        const resp = await request.get(`${url}/api/v2/blocks?type=block`)
        expect(resp.status()).toBe(200)
        const body = await resp.json()
        const blocks = body.items
        expect(blocks.length).toBeGreaterThan(0)
        for (const blk of blocks) {
            expect(blk.size).toBeDefined()
        }
    })
    test(`@Api @Health ${url} Check main page blocks`, async ({ request }): Promise<void> => {
        console.log(chalk.yellow(`checking main page blocks...`))

        const resp = await request.get(`${url}/api/v2/main-page/blocks`)
        expect(resp.status()).toBe(200)
        const blocks = await resp.json()
        // console.log(`body: ${JSON.stringify(blocks, null, 2)}`)
        expect(blocks.length).toBeGreaterThan(0)
        for (const blk of blocks) {
            expect(blk.size).toBeDefined()
        }
    })

    test(`@Api @Health ${url} Check main page transactions`, async ({ request }): Promise<void> => {
        console.log(chalk.yellow(`checking main page transactions...`))

        const resp = await request.get(`${url}/api/v2/main-page/transactions`)
        expect(resp.status()).toBe(200)
        const txs = await resp.json()
        expect(txs.length).toBeGreaterThan(0)
        for (const tx of txs) {
            expect(tx.hash).toBeDefined()
        }
    })

    test(`@Api @Health ${url} Check main page chart txs`, async ({ request }): Promise<void> => {
        console.log(chalk.yellow(`checking main page chart tx...`))

        const resp = await request.get(`${url}/api/v2/stats/charts/transactions`)
        expect(resp.status()).toBe(200)
        const txs = await resp.json()
        for (const tx of txs.chart_data) {
            expect(tx.transaction_count).toBeDefined()
        }
    })

    test(`@Api @Health ${url} Check main page stats`, async ({ request }): Promise<void> => {
        console.log(chalk.yellow(`checking main page stats...`))

        const resp = await request.get(`${url}/api/v2/stats`)
        expect(resp.status()).toBe(200)
        const stats = await resp.json()
        expect(stats.transactions_today).toBeDefined()
        expect(stats.average_block_time).toBeDefined()
        expect(stats.gas_prices).toBeDefined()
    })
})
