/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'
import { CommonPage } from "./Common"

export class TransactionsListPage extends CommonPage {
    readonly page: Page

    readonly actions: WebActions

    TABLE_HEADER = `table >> thead >> tr >> th >> nth=`

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(): Promise<void> {
        await this.actions.navigateToURL(`txs`)
    }

    async check_header(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_HEADER}1 >> text=Txn hash`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_HEADER}2 >> text=Type`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_HEADER}3 >> text=Method`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_HEADER}4 >> text=Block`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_HEADER}5 >> text=From/To`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_HEADER}6 >> text=Value ETH`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_HEADER}7 >> text=Fee ETH`)
    }

    async check_table_data(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`text=/Token transfer/`)
        await this.actions.verifyElementIsDisplayed(`text=/Success/`)
        await this.actions.verifyElementIsDisplayed(`text=/Failed/`)
        await this.actions.verifyElementIsDisplayed(`text=/alwaysReverts/`)
        await this.actions.verifyElementIsDisplayed(`text=/0.01/`)
    }
}
