/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'
import { CommonPage } from "./Common"

export interface TokenProps {
    contract: string[]
    totalSupply: string[]
    holders: string[]
    transfers: string[]
    decimals: string[]
    tokenType: string[]
}

export interface NativeCurrencyRowProps {

}

export class TokenPage extends CommonPage {
    readonly page: Page

    actions: WebActions

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(addr: string): Promise<void> {
        await this.actions.navigateToURL(`token/${addr}/token-transfers`)
    }

    async check_token(p: TokenProps): Promise<void> {
        let row = 0
        for (const field in p) {
            const [name, ...assertions] = p[field]
            console.log(`field: ${field}`)
            await this.actions.verifyElementContainsText(`${this.CARD_BODY_KEYS} >> nth=${row}`, p[field][0])
            for (const a of assertions) {
                console.log(`assertion: ${a}`)
                await this.actions.verifyElementContainsText(`${this.CARD_BODY_VALUES} >> nth=${row}`, a)
            }
            row += 1
        }
    }
}
