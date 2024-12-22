/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'
import { CommonPage } from "./Common"

export class AddressPage extends CommonPage {
    readonly page: Page

    actions: WebActions

    // overriding, non-consistent attributes on some pages for tabs
    TX_LOGS_TAB = `text=Logs`

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(addr: string): Promise<void> {
        await this.actions.navigateToURL(`address/${addr}`)
    }

    // overriding, non-consistent attributes on some pages for tabs
    async select_logs_tab(): Promise<void> {
        await this.actions.clickElement(this.TX_LOGS_TAB)
    }

    async check_address_description(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`main >> div >> nth=5 >> text=/Token/`)
        await this.actions.verifyElementIsDisplayed(`main >> div >> nth=7 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`main >> div >> nth=20 >> text=/Token name/`)
        await this.actions.verifyElementIsDisplayed(`main >> div >> nth=21 >> text=/EPIC.*\\(EPC\\)/`)
        await this.actions.verifyElementIsDisplayed(`main >> div >> nth=28 >> text=/Balance/`)
        await this.actions.verifyElementIsDisplayed(`main >> div >> nth=31 >> text=/\\d+.*ETH.*\\(\\$.*\\)/`)
        await this.actions.verifyElementIsDisplayed(`main >> div >> nth=33 >> text=/Transactions/`)
        await this.actions.verifyElementIsDisplayed(`main >> div >> nth=36 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`main >> div >> nth=37 >> text=/Gas used/`)
        await this.actions.verifyElementIsDisplayed(`main >> div >> nth=41 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`main >> div >> nth=42 >> text=/Last balance update/`)
        await this.actions.verifyElementIsDisplayed(`main >> div >> nth=47 >> text=/\\d+/`)
    }
}
