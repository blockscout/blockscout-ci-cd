import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'
import { CommonPage } from "./Common"

export class NewHomePage extends CommonPage {
    SEARCH_BAR = `input >> nth=0`

    HEADER_TOTAL_BLOCKS = `:below(:text("Total blocks")) >> nth=0`

    HEADER_AVG_BLOCK_TIME = `:below(:text("Average block time")) >> nth=3`

    HEADER_TOTAL_TXNS = `:below(:text("Total transactions")) >> nth=4`

    HEADER_WALLETS = `:below(:text("Wallet addresses")) >> nth=4`

    HEADER_GAS_TRACKER = `:below(:text("Gas tracker")) >> nth=0`

    BLOCKS_WIDGET = `main >> div >> nth=24`

    BLOCKS_WIDGET_LAST_BLOCK = `main >> div >> nth=24`

    TXNS_WIDGET = `main >> div >> nth=58`

    TXN_1 = `main >> div >> nth=61`

    TXN_2 = `main >> div >> nth=82`

    TXN_3 = `main >> div >> nth=103`

    TXN_4 = `main >> div >> nth=124`

    TXN_5 = `main >> div >> nth=145`

    TXN_6 = `main >> div >> nth=166`

    readonly page: Page

    actions: WebActions

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(): Promise<void> {
        await this.actions.navigateToURL(`/`)
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
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> div >> nth=3 >> text=/Txn/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> div >> nth=5 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> div >> nth=6 >> text=/Reward/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> div >> nth=7 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> div >> nth=8 >> text=/Miner/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> div >> nth=9 >> text=/0x/`)
    }

    async check_txn_widget(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.TXN_1} >> div >> nth=4 >> text=/Token transfer.*Success/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXN_1} >> div >> nth=7 >> text=/0x.*ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXN_1} >> div >> nth=10 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXN_1} >> div >> nth=16 >> text=/NFTV/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXN_1} >> div >> nth=18 >> text=/SPOA.*\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXN_1} >> div >> nth=19 >> text=/Fee.*\\d+/`)

        await this.actions.verifyElementIsDisplayed(`${this.TXN_2} >> div >> nth=4 >> text=/Contract creation.*Success/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXN_2} >> div >> nth=7 >> text=/0x.*ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXN_2} >> div >> nth=10 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXN_2} >> div >> nth=16 >> text=/NFTV/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXN_2} >> div >> nth=18 >> text=/SPOA.*\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXN_2} >> div >> nth=19 >> text=/Fee.*\\d+/`)

        await this.actions.verifyElementIsDisplayed(`${this.TXN_3} >> div >> nth=4 >> text=/Contract call.*Failed/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXN_3} >> div >> nth=7 >> text=/0x.*ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXN_3} >> div >> nth=10 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXN_3} >> div >> nth=16 >> text=/EPICV/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXN_3} >> div >> nth=18 >> text=/SPOA.*\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXN_3} >> div >> nth=19 >> text=/Fee.*\\d+/`)

        await this.actions.verifyElementIsDisplayed(`${this.TXN_4} >> div >> nth=4 >> text=/Token transfer.*Success/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXN_4} >> div >> nth=7 >> text=/0x.*ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXN_4} >> div >> nth=10 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXN_4} >> div >> nth=16 >> text=/EPICV/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXN_4} >> div >> nth=18 >> text=/SPOA.*\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXN_4} >> div >> nth=19 >> text=/Fee.*\\d+/`)

        await this.actions.verifyElementIsDisplayed(`${this.TXN_5} >> div >> nth=4 >> text=/Contract creation.*Success/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXN_5} >> div >> nth=7 >> text=/0x.*ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXN_5} >> div >> nth=10 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXN_5} >> div >> nth=16 >> text=/EPICV/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXN_5} >> div >> nth=18 >> text=/SPOA.*\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXN_5} >> div >> nth=19 >> text=/Fee.*\\d+/`)

        await this.actions.verifyElementIsDisplayed(`${this.TXN_6} >> div >> nth=4 >> text=/Token transfer.*Success/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXN_6} >> div >> nth=7 >> text=/0x.*ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXN_6} >> div >> nth=10 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXN_6} >> div >> nth=16 >> text=/NFT/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXN_6} >> div >> nth=18 >> text=/SPOA.*\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXN_6} >> div >> nth=19 >> text=/Fee.*\\d+/`)
    }
}
