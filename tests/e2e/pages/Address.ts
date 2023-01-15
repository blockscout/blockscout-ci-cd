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

    TX_LOG = `[data-test='address_log']`

    HEADER_TITLE = `text=Contract details`

    DESCRIPTION_BLOCK = `main >> div >> nth=4 >> div >> nth=`

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
        await this.actions.verifyElementIsDisplayed(this.HEADER_TITLE, `no header title is displayed`)
        await this.actions.verifyElementIsDisplayed(`${this.DESCRIPTION_BLOCK}0 >> text=/0x/`, `no addr is displayed`)
        await this.actions.verifyElementIsDisplayed(`${this.DESCRIPTION_BLOCK}3 >> text=/Token name/`, `no token header is displayed`)
        await this.actions.verifyElementIsDisplayed(`${this.DESCRIPTION_BLOCK}6 >> text=/EPIC.*(EPC)/`, `no token name is displayed`)
        await this.actions.verifyElementIsDisplayed(`${this.DESCRIPTION_BLOCK}7 >> text=/Creator/`, `no creator is displayed`)
        await this.actions.verifyElementIsDisplayed(`${this.DESCRIPTION_BLOCK}10 >> text=/0x.*at.*0x.*/`, `no creator address is displayed`)
        await this.actions.verifyElementIsDisplayed(`${this.DESCRIPTION_BLOCK}11 >> text=/Transactions/`, `no transactions aare displayed`)
        await this.actions.verifyElementIsDisplayed(`${this.DESCRIPTION_BLOCK}14 >> text=/\\d+/`, `no transactions amount is displayed`)
        await this.actions.verifyElementIsDisplayed(`${this.DESCRIPTION_BLOCK}15 >> text=/Gas used/`, `no gas used header is displayed`)
        await this.actions.verifyElementIsDisplayed(`${this.DESCRIPTION_BLOCK}18 >> text=/\\d+/`, `no gas used amount is displayed`)
        await this.actions.verifyElementIsDisplayed(`${this.DESCRIPTION_BLOCK}19 >> text=/Last balance update/`, `no last balance update is displayed`)
        await this.actions.verifyElementIsDisplayed(`${this.DESCRIPTION_BLOCK}22 >> text=/\\d+/`, `no last balance update block is displayed`)
    }
}
