import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'
import { CommonPage } from "./Common"

export class NewHomePage extends CommonPage {
    SEARCH_BAR = `input >> nth=0`

    HEADER_TOTAL_BLOCKS = `:below(:text("Total blocks")) >> nth=0`

    HEADER_AVG_BLOCK_TIME = `:below(:text("Average block time")) >> nth=3`

    HEADER_TOTAL_TXNS = `:below(:text("Total transactions")) >> nth=4`

    HEADER_WALLETS = `:below(:text("Wallet addresses")) >> nth=0`

    HEADER_GAS_TRACKER = `:below(:text("Gas tracker")) >> nth=0`

    BLOCKS_WIDGET = `main >> div >> nth=24`

    BLOCKS_WIDGET_LAST_BLOCK = `main >> div >> nth=39`

    TXNS_FIELDS = `main >> div >> nth=76 >> div >> div >> div >> div >> div >> div >> div`

    readonly page: Page

    actions: WebActions

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(options = { waitUntil: `networkidle` }): Promise<void> {
        await this.actions.navigateToURL(`/`, options)
    }

    async check_heaader(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.HEADER_TOTAL_BLOCKS} >> text=/\\d+/`, `total blocks are wrong`)
        await this.actions.verifyElementIsDisplayed(`${this.HEADER_TOTAL_TXNS} >> text=/\\d+/`, `total txns is wrong`)
        await this.actions.verifyElementIsDisplayed(`${this.HEADER_WALLETS} >> text=/\\d+/`, `total wallets is wrong`)
        await this.actions.verifyElementIsDisplayed(`${this.HEADER_GAS_TRACKER} >> text=/.*Gwei.*/`, `no gas tracker data`)
    }

    async check_blocks_widget(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(this.BLOCKS_WIDGET)
        await this.actions.verifyElementIsDisplayed(this.BLOCKS_WIDGET_LAST_BLOCK)
    }

    async check_last_block(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> div >> nth=0 >> text=/.*sec.*ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> div >> nth=6 >> text=/Txn/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> div >> nth=7 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> div >> nth=8 >> text=/Reward/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> div >> nth=9 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> div >> nth=10 >> text=/Miner/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> div >> a >> nth=1 >> text=/0x/`)
    }

    async check_txn_widget(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_FIELDS} >> nth=0 >> text=/Token transfer/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_FIELDS} >> nth=1 >> text=/Success/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_FIELDS} >> nth=3 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_FIELDS} >> nth=4 >> text=/ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_FIELDS} >> nth=8 >> text=/NFTV/`)

        await this.actions.verifyElementIsDisplayed(`${this.TXNS_FIELDS} >> nth=9 >> text=/Contract creation/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_FIELDS} >> nth=10 >> text=/Success/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_FIELDS} >> nth=12 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_FIELDS} >> nth=13 >> text=/ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_FIELDS} >> nth=17 >> text=/NFTV/`)

        await this.actions.verifyElementIsDisplayed(`${this.TXNS_FIELDS} >> nth=18 >> text=/Contract call/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_FIELDS} >> nth=19 >> text=/Failed/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_FIELDS} >> nth=21 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_FIELDS} >> nth=22 >> text=/ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_FIELDS} >> nth=26 >> text=/EPICV/`)
    }
}
