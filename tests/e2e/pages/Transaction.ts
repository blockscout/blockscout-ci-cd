/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { WebActions } from "@lib/WebActions"
import { expect } from "@playwright/test"
import type { Page } from 'playwright'
import { CommonPage } from "./Common"

export class TransactionPage extends CommonPage {
    readonly page: Page

    readonly actions: WebActions

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(hash: string): Promise<void> {
        await this.actions.navigateToURL(`${process.env.BLOCKSCOUT_URL}/tx/${hash}`)
    }

    async check_tx_description(): Promise<void> {
        await this.check_table_element(`Transaction hash`, 0, `0x`)
        await this.check_table_element(`Status`, 0, `Success`)

        await this.check_table_element(`Timestamp`, 0, `ago.*UTC.*Confirmed`)
        await this.check_selector(`text=/Sponsored/`)
        await this.check_table_element(`From`, 0, `0x`)
        await this.actions.verifyElementIsDisplayed(`div:right-of(:text("To")) >> span`, `/Contract.*0x.*created/`)
        await this.check_table_element(`Value`, 0, `ETH`)
        await this.check_table_element(`Transaction fee`, 0, `\\d+.*ETH`)
        await this.check_table_element(`Gas price`, 0, `\\d+.*ETH.*\\d+.*Gwei`)
        await this.check_table_element(`Gas usage & limit by txn`, 0, `\\d+.*|.*\\d+%`)
        await this.check_table_element(`Gas fees (Gwei)`, 0, `Base.*\\d+.*Max.*\\d+.*Max priority.*\\d+`)
        await this.check_table_element(`Burnt fees`, 0, `\\d+.*ETH`)
        // await this.actions.verifyElementIsDisplayed(this.DESCRIPTION_AD_BANNER)
    }

    async check_tx_details(): Promise<void> {
        await this.actions.clickElement(this.DETAILS_TAB_FOOTER)
        await this.check_table_element(`Other`, 2, `Txn type: \\d+.*Nonce: \\d+.*Position: \\d+`)
        await this.check_table_element(`Raw input`, 0, `0x`)
    }
}
