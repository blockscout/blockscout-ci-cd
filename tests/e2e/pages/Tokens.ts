/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'
import { CommonPage } from "./Common"

export interface TokenRowProps {
    summary: string[]
    // remove that field after fixing html
    price: string
    marketCap: string
    holders: string
}

export interface NativeCurrencyProps {
    position: string
    address: string
    balance: string
    percentage: string
    txnCount: string
}

export class TokensPage extends CommonPage {
    readonly page: Page

    actions: WebActions

    TOKENS_TABLE = `main >> table`

    ADDRESSES_TABLE = `[data-selector='top-addresses-list']`

    SEARCH = `[placeholder="Token name or symbol"] >> nth=1`

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(): Promise<void> {
        await this.actions.navigateToURL(`tokens`)
    }

    async openAccounts(): Promise<void> {
        await this.actions.navigateToURL(`accounts`)
    }

    async check_token_row(num: number, p: TokenRowProps): Promise<void> {
        let col = 0
        for (const field in p) {
            if (Array.isArray(p[field])) {
                for (const assertion of p[field]) {
                    await this.actions.verifyElementContainsText(`${this.TOKENS_TABLE} >> tr >> nth=${num} >> td >> nth=${col}`, assertion)
                }
            } else {
                await this.actions.verifyElementContainsText(`${this.TOKENS_TABLE} >> tr >> nth=${num} >> td >> nth=${col}`, p[field])
            }
            col += 1
        }
    }

    async check_native_row(num: number, p: NativeCurrencyProps): Promise<void> {
        let col = 0
        for (const field in p) {
            await this.actions.verifyElementContainsText(`${this.ADDRESSES_TABLE} >> tr >> nth=${num} >> td >> nth=${col}`, p[field])
            col += 1
        }
    }

    async setFilter(option: String): Promise<void> {
        await this.page.click(`text=Filter >> nth=1`)
        await this.page.click(`text=Reset`)
        await this.page.click(`text=${option}`)
    }

    async search(text: string): Promise<void> {
        await this.actions.enterElementText(this.SEARCH, text)
    }
}
