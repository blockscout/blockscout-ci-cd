import { test, expect } from '@playwright/test'
import { LoadDataFile, LoadTokens } from "@lib/File"

const urls = (process.env.BLOCKSCOUT_URL || ``).split(`,`)

urls.forEach((url: string) => {
    LoadDataFile(url)
    test(`@Api @Health ${url} Check health`, async ({ request }): Promise<void> => {
        console.log(`checking service health..`)
        const resp = await request.get(`${url}/api/health`)
        const body = await resp.json()
        console.log(`body: ${JSON.stringify(body, null, 2)}`)
    })
    // test(`@Api ${url} Check tokens data`, async ({ request }): Promise<void> => {
    //     const data = await LoadTokens(url, `ERC-1155`, 3)
    //     for (const t of data.tokens) {
    //         console.log(`addr: ${t.address}`)
    //         // eslint-disable-next-line no-await-in-loop
    //         const resp = await request.get(`${url}/api/v2/tokens/${t.address}`)
    //         expect(resp.ok()).toBeTruthy()
    //         expect(resp.status()).toBe(200)
    //         // eslint-disable-next-line no-await-in-loop
    //         const body = await resp.json()
    //         console.log(`body: ${JSON.stringify(body, null, 2)}`)
    //     }
    // })
})
