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
        await this.actions.verifyElementIsDisplayed(this.BLOCK_HEADER, `no block header is displayed`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}1 >> text=Block height`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}3 >> text=/\\d+/`, `no block height is displayed`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}5 >> text=/Size/`, `no block size is present`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}7 >> text=/\\d+/`, `no block size is present`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}8 >> text=/Timestamp/`, `no timestamp is present`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}10 >> text=/\\.*ago.*UTC/`, `no timestamp is present`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}12 >> text=/Transactions/`, `no tx link is present`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}13 >> text=/transactions/`, `no tx link is present`)

        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}14 >> text=/Validated by/`, `no validated by is present`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}16 >> text=/0x/`, `no validated by is present`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}18 >> text=/Gas used/`, `no gas used is present`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}20 >> text=/\\d+/`, `no gas used is present`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}21 >> text=/\\d+.*%/`, `no gas used is present`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}24 >> text=/\\d+.*%/`, `no gas used is present`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}25 >> text=/Gas limit/`, `no gas limit is present`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}27 >> text=/\\d+/`, `no gas limit is present`)

        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}28 >> text=/Base fee per gas/`, `no base fee is present`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}30 >> text=/\\d+.*SPOA.*Gwei/`, `no base fee is present`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}31 >> text=/Burnt fees/`, `no base fee is present`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}33 >> text=/.*SPOA/`, `no base fee is present`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}34 >> text=/\\d+.*%/`, `no base fee is present`)
    }

    async check_details(): Promise<void> {
        await this.actions.clickElement(this.DETAILS_TAB_FOOTER)
        await this.actions.verifyElementContainsText(`${this.TABLE_TABPANEL_DIV}44`, `Difficulty`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}46 >> text=/\\d+/`, `no difficulty is present in details`)
        await this.actions.verifyElementContainsText(`${this.TABLE_TABPANEL_DIV}47`, `Total difficulty`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}49 >> text=/\\d+/`, `no total difficulty is present in details`)
        await this.actions.verifyElementContainsText(`${this.TABLE_TABPANEL_DIV}52`, `Hash`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}53 >> text=0x`, `no hash is present in details`)
        await this.actions.verifyElementContainsText(`${this.TABLE_TABPANEL_DIV}55`, `Parent hash`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}57 >> text=/\\d+/`, `no parent hash is present in details`)
        await this.actions.verifyElementContainsText(`${this.TABLE_TABPANEL_DIV}58`, `Nonce`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}60 >> text=0x`, `no nonce is present in details`)
    }
}
