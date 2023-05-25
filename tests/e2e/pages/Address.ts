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

    DESCRIPTION_BLOCK = `main >> div >> nth=`

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
        await this.check_table_element(`Contract details`, 0, `ContractToken`)
        await this.check_selector(`text=/0x/`, `wrong account address`)
        await this.check_table_element(`Token name`, 0, `EPIC.*(EPC)`)
        await this.check_table_element(`Creator`, 0, `0x.*at.*0x.*`)
        await this.check_selector(`text=/\\d+ SPOA/`, `no SPOA balance is displayed`)
        await this.check_table_element(`Transactions`, 0, `\\d+`)
        await this.check_table_element(`Gas used`, 0, `\\d+`)
        await this.check_table_element(`Last balance update`, 0, `\\d+`)
    }
}
