/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'
import { CommonPage } from "./Common"

export class TokenPage extends CommonPage {
    readonly page: Page

    actions: WebActions

    DESCRIPTION_DIV = `main >> div >> nth=`

    HOLDERS_TAB = `button >> text=/Holders/`

    HOLDERS_ITEM = `table >> tr >> nth=1 >> td >> nth=`

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(addr: string): Promise<void> {
        await this.actions.navigateToURL(`token/${addr}`)
    }

    async selectProjectInfo(): Promise<void> {
        await this.actions.clickElement(`[aria-label="Show project info"]`)
    }

    async verifyProjectInfo(uniqueSupportURL: string): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`text=/${uniqueSupportURL}/`)
    }

    async check_token(): Promise<void> {
        await this.check_selector(`text=/0x/`, `no token address is displayed`)
        await this.check_table_element(`EPIC (EPC)`, 1, `ERC-721`)
        await this.check_table_element(`Max total supply`, 0, `\\d+`)
        await this.check_table_element(`Holders`, 0, `\\d+`)
        await this.check_table_element(`Transfers`, 0, `\\d+`)
        await this.check_table_element(`Decimals`, 0, `18`)
    }

    async select_holders_tab(): Promise<void> {
        await this.actions.clickElement(this.HOLDERS_TAB)
    }

    async check_holders_tab(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.HOLDERS_ITEM}0 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.HOLDERS_ITEM}1 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.HOLDERS_ITEM}2 >> text=/\\%/`)
    }
}
