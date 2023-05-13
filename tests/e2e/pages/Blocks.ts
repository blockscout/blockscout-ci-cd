/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'
import { CommonPage } from "./Common"

export class BlocksPage extends CommonPage {
    readonly page: Page

    BLOCK_HEADER = `h1 >> text=/Block #\\d+/`

    DETAILS_TAB = `button[role="tab"]:has-text("Details")`

    TRANSACTIONS_TAB = `button[role="tab"]:has-text("Details")`

    actions: WebActions

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(bn: string): Promise<void> {
        await this.actions.navigateToURL(`${process.env.BLOCKSCOUT_URL}/block/${bn}`)
    }

    async openDetailsTab(): Promise<void> {
        await this.actions.clickElement(this.DETAILS_TAB)
    }

    async openTraansactionsTab(): Promise<void> {
        await this.actions.clickElement(this.TRANSACTIONS_TAB)
    }

    async check_block_description_new(): Promise<void> {
        await this.check_selector(`h1 >> text=/Block #\\d+/`, `no block header`)
        await this.check_table_element(`Block height`, 0, `\\d+`)
        await this.check_table_element(`Size`, 0, `\\d+`)
        await this.check_table_element(`Timestamp`, 0, `\\.*ago.*UTC`)
        await this.check_table_element(`Transaction`, 0, `\\d+ transaction`)
        await this.check_table_element(`Validated by`, 0, `0x0000000000000000000000000000000000000000`)
        await this.check_table_element(`Gas used`, 0, `\\d+.*%`)
        await this.check_table_element(`Gas limit`, 0, `\\d+`)
        await this.check_table_element(`Base fee per gas`, 0, `\\d+.*SPOA.*Gwei`)
        await this.check_table_element(`Burnt fees`, 0, `.*SPOA.*\\d+.*%`)
    }

    async check_details(): Promise<void> {
        await this.actions.clickElement(this.DETAILS_TAB_FOOTER)
        await this.check_table_element(`Difficulty`, 0, `\\d+`)
        await this.check_table_element(`Total difficulty`, 0, `\\d+`)
        await this.check_table_element(`Hash`, 0, `0x`)
        await this.check_table_element(`Parent hash`, 0, `\\d+`)
        await this.check_table_element(`Nonce`, 0, `0x`)
    }
}
