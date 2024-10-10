import {test, expect} from '@playwright/test'
import {LoadDataFile, LoadTokens } from "@lib/File"

const urls = (process.env.BLOCKSCOUT_URL || ``).split(`,`)

urls.forEach((url: string) => {
    LoadDataFile(url)
    test(`@Api ${url} Check tokens data`, async ({ request }): Promise<void> => {
        const data = await LoadTokens(url,'ERC-1155', 3)
        for (const t of data.tokens) {
            console.log(`addr: ${t.address}`)
            const resp = await request.get(`${url}/api/v2/tokens/${t.address}`);
            expect(resp.ok()).toBeTruthy();
            expect(resp.status()).toBe(200);
            const body = await resp.json();
            console.log(`body: ${JSON.stringify(body, null, 2)}`)
        }
    })
})
