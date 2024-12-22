/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'
import { CommonPage } from "./Common"

export class TokenPage extends CommonPage {
    readonly page: Page

    actions: WebActions

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
        await this.actions.verifyElementIsDisplayed(`main >> div >> nth=10 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`main >> div >> text=/EPIC/`)
        await this.actions.verifyElementIsDisplayed(`main >> div >> nth=20 >> text=/Max total supply/`)
        await this.actions.verifyElementIsDisplayed(`main >> div >> nth=22 >> text=/\\d+.*EPC/`)
        await this.actions.verifyElementIsDisplayed(`main >> div >> nth=26 >> text=/Holders/`)
        await this.actions.verifyElementIsDisplayed(`main >> div >> nth=30 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`main >> div >> nth=33 >> text=/Transfers/`)
        await this.actions.verifyElementIsDisplayed(`main >> div >> nth=37 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`main >> div >> nth=40 >> text=/Decimals/`)
        await this.actions.verifyElementIsDisplayed(`main >> div >> nth=44 >> text=/\\d+/`)
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
