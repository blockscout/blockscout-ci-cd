import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'

export class NewHomePage {
    SEARCH_BAR = `input >> nth=0`

    HEADER_TOTAL_BLOCKS = `main >> div >> nth=13`

    HEADER_AVG_BLOCK_TIME = `main >> div >> nth=15`

    HEADER_TOTAL_TXNS = `main >> div >> nth=16`

    HEADER_WALLETS = `main >> div >> nth=18`

    HEADER_GAS_TRACKER = `main >> div >> nth=20`

    BLOCKS_WIDGET = `main >> div >> nth=26`

    BLOCKS_WIDGET_LAST_BLOCK = `main >> div >> nth=27`

    TXNS_WIDGET = `main >> div >> nth=60`

    readonly page: Page

    actions: WebActions

    constructor(page: Page) {
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(): Promise<void> {
        await this.actions.navigateToURL(`/`)
    }

    async check_heaader(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.HEADER_TOTAL_BLOCKS} >> text=/\\d+/`, `total blocks are wrong`)
        await this.actions.verifyElementIsDisplayed(`${this.HEADER_AVG_BLOCK_TIME} >> text=/\\d+.*s/`, `avg block time is wrong`)
        await this.actions.verifyElementIsDisplayed(`${this.HEADER_TOTAL_TXNS} >> text=/\\d+/`, `total txns is wrong`)
        await this.actions.verifyElementIsDisplayed(`${this.HEADER_WALLETS} >> text=/\\d+/`, `total wallets is wrong`)
        await this.actions.verifyElementIsDisplayed(`${this.HEADER_GAS_TRACKER} >> text=/\\d+.*Gwei/`, `no gas tracker data`)
    }

    async check_blocks_widget(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(this.BLOCKS_WIDGET)
        await this.actions.verifyElementIsDisplayed(this.BLOCKS_WIDGET_LAST_BLOCK)
    }

    async check_last_block(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> div >> nth=0 >> text=/.*sec.*ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> div >> nth=3 >> text=/Txn/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> div >> nth=4 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> div >> nth=5 >> text=/Reward/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> div >> nth=6 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> div >> nth=7 >> text=/Miner/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> div >> nth=8 >> text=/0x/`)
    }

    async check_txn_widget(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=4 >> text=/Token transfer.*Success/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=7 >> text=/0x.*ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=12 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=15 >> text=/NFTV/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=19 >> text=/Value SPOA.*\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=20 >> text=/Fee SPOA.*\\d+/`)

        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=26 >> text=/Contract creation.*Success/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=28 >> text=/0x.*ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=33 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=36 >> text=/NFTV/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=40 >> text=/Value SPOA.*\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=41 >> text=/Fee SPOA.*\\d+/`)

        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=46 >> text=/Contract call.*Failed/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=49 >> text=/0x.*ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=54 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=57 >> text=/EPICV/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=61 >> text=/Value SPOA.*\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=62 >> text=/Fee SPOA.*\\d+/`)

        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=68 >> text=/Token transfer.*Success/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=70 >> text=/0x.*ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=75 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=78 >> text=/EPICV/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=82 >> text=/Value SPOA.*\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=83 >> text=/Fee SPOA.*\\d+/`)

        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=89 >> text=/Contract creation.*Success/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=91 >> text=/0x.*ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=95 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=99 >> text=/EPICV/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=103 >> text=/Value SPOA.*\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=104 >> text=/Fee SPOA.*\\d+/`)

        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=110 >> text=/Token transfer.*Success/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=112 >> text=/0x.*ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=117 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=120 >> text=/NFT/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=124 >> text=/Value SPOA.*\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=125 >> text=/Fee SPOA.*\\d+/`)
    }
}
