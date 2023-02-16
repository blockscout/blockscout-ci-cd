/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'
import { CommonPage } from "./Common"

interface TokenBalanceAssertionData {
    tokens: number
    balance: number
}

export class Etherscan extends CommonPage {
    readonly page: Page

    actions: WebActions

    BASE_URL = `https://etherscan.io/`

    ADDR_TOTAL_TOKENS_BALANCE = `#availableBalanceDropdown`

    ADDR_TOTAL_TOKENS = `#availableBalanceDropdown >> span`

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async address_data(addr: string): Promise<TokenBalanceAssertionData> {
        await this.actions.navigateToURL(`${this.BASE_URL}/address/${addr}`)
        const tokensBalance = await this.actions.getTextFromWebElements(this.ADDR_TOTAL_TOKENS_BALANCE)
        const tokens = await this.actions.getTextFromWebElements(this.ADDR_TOTAL_TOKENS)
        const b = tokensBalance[0].split(`\n`)[0].slice(1, 0)
        console.log(b)
        console.log(`checking addr: ${addr}`)
        console.log(`Total token balance on Etherscan: ${tokensBalance[0].split(`\n`)[0]}`)
        console.log(`Total tokens Etherscan: ${tokens}`)
        return { tokens: Number(tokens), balance: Number(b) }
    }
}
