/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'
import { CommonPage } from "./Common"

export class TokenPage extends CommonPage {
    readonly page: Page

    actions: WebActions

    DESCRIPTION_DIV = `main >> div >> nth=`

    HOLDERS_TAB = `button[role="tab"] >> nth=1`

    HOLDERS_ITEM = `table >> tr >> nth=1 >> td >> nth=`

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(addr: string): Promise<void> {
        await this.actions.navigateToURL(`token/${addr}`)
    }

    async check_token(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.DESCRIPTION_DIV}3 >> text=/EPIC.*(EPC).*token/`)
        await this.actions.verifyElementIsDisplayed(`${this.DESCRIPTION_DIV}5 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.DESCRIPTION_DIV}8 >> text=/Max total supply/`)
        await this.actions.verifyElementIsDisplayed(`${this.DESCRIPTION_DIV}10 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.DESCRIPTION_DIV}14 >> text=/Holders/`)
        await this.actions.verifyElementIsDisplayed(`${this.DESCRIPTION_DIV}16 >> text=/1/`)
        await this.actions.verifyElementIsDisplayed(`${this.DESCRIPTION_DIV}17 >> text=/Transfers/`)
        await this.actions.verifyElementIsDisplayed(`${this.DESCRIPTION_DIV}19 >> text=/1/`)
        await this.actions.verifyElementIsDisplayed(`${this.DESCRIPTION_DIV}20 >> text=/Decimals/`)
        await this.actions.verifyElementIsDisplayed(`${this.DESCRIPTION_DIV}22 >> text=/18/`)
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
