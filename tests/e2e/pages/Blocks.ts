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

    TABLE_TABPANEL_DIV = `[role="tabpanel"] >> div >> div >> nth=`

    DETAILS_TAB_FOOTER = `text=View details`

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
        await this.actions.verifyElementContainsText(`${this.TABLE_TABPANEL_DIV}0`, `Block height`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}3 >> text=/\\d+/`, `no block height is displayed`)
        await this.actions.verifyElementContainsText(`${this.TABLE_TABPANEL_DIV}5`, `Size`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}8 >> text=/\\d+/`, `no block size is present`)
        await this.actions.verifyElementContainsText(`${this.TABLE_TABPANEL_DIV}9`, `Timestamp`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}12 >> text=/\\.*ago.*UTC/`, `no timestamp is present`)
        await this.actions.verifyElementContainsText(`${this.TABLE_TABPANEL_DIV}13`, `Transactions`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}16 >> text=transact`, `no tx link is present`)
        await this.actions.verifyElementContainsText(`${this.TABLE_TABPANEL_DIV}17`, `Validated by`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}20 >> text=0x`, `no validator address is present`)
        await this.actions.verifyElementContainsText(`${this.TABLE_TABPANEL_DIV}22`, `Gas used`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}25 >> text=/\\d+.*\\%/`, `no gas used absolute value is present`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}26 >> text=/\\d+.*\\%/`, `no gas used per block percentage is present`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}29 >> text=/\\d+.*\\%/`, `no gas used diff percentage is present`)
        await this.actions.verifyElementContainsText(`${this.TABLE_TABPANEL_DIV}31`, `Gas limit`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}33 >> text=/\\d+/`, `no gas limit is present`)
        await this.actions.verifyElementContainsText(`${this.TABLE_TABPANEL_DIV}34`, `Base fee per gas`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}37 >> text=/\\d+.*SPOA.*Gwei/`, `no base fee per gas is present`)
        await this.actions.verifyElementContainsText(`${this.TABLE_TABPANEL_DIV}38`, `Burnt fees`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}41 >> text=/\\d+.*SPOA/`, `no burnt fees is present`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}43 >> text=/\\d+\\%/`, `no burnt fees percent is present`)
        await this.actions.verifyElementContainsText(`${this.TABLE_TABPANEL_DIV}47`, `Priority fee / Tip`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}49 >> text=/\\d+.*SPOA/`, `no burnt fees is present`)
    }

    async check_details(): Promise<void> {
        await this.actions.clickElement(this.DETAILS_TAB_FOOTER)
        await this.actions.verifyElementContainsText(`${this.TABLE_TABPANEL_DIV}54`, `Difficulty`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}56 >> text=/\\d+/`, `no difficulty is present in details`)
        await this.actions.verifyElementContainsText(`${this.TABLE_TABPANEL_DIV}57`, `Total difficulty`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}60 >> text=/\\d+/`, `no total difficulty is present in details`)
        await this.actions.verifyElementContainsText(`${this.TABLE_TABPANEL_DIV}62`, `Hash`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}65 >> text=0x`, `no hash is present in details`)
        await this.actions.verifyElementContainsText(`${this.TABLE_TABPANEL_DIV}67`, `Parent hash`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}70 >> text=0x`, `no parent hash is present in details`)
        await this.actions.verifyElementContainsText(`${this.TABLE_TABPANEL_DIV}71`, `Nonce`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}74 >> text=0x`, `no nonce is present in details`)
    }
}
