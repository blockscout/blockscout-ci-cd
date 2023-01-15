import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'

export class NewHomePage {
    SEARCH_BAR = `input >> nth=0`

    HEADER_TOTAL_BLOCKS = `main >> div >> nth=11`

    HEADER_AVG_BLOCK_TIME = `main >> div >> nth=13`

    HEADER_TOTAL_TXNS = `main >> div >> nth=14`

    HEADER_WALLETS = `main >> div >> nth=16`

    HEADER_GAS_TRACKER = `main >> div >> nth=18`

    BLOCKS_WIDGET = `main >> div >> nth=25`

    BLOCKS_WIDGET_LAST_BLOCK = `main >> div >> nth=26`

    TXNS_WIDGET = `main >> div >> nth=59`

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
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> div >> nth=0 >> text=/\\d+.*secs ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> div >> nth=3 >> text=/Txn/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> div >> nth=4 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> div >> nth=5 >> text=/Reward/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> div >> nth=6 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> div >> nth=7 >> text=/Miner/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> div >> nth=8 >> text=/0x/`)
    }

    async check_txn_widget(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=4 >> text=/Token transfer.*Success/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=6 >> text=/0x.*ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=11 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=14 >> text=/NFTV/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=18 >> text=/Value SPOA.*\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=19 >> text=/Fee SPOA.*\\d+/`)

        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=24 >> text=/Contract creation.*Success/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=26 >> text=/0x.*ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=31 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=34 >> text=/NFTV/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=38 >> text=/Value SPOA.*\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=39 >> text=/Fee SPOA.*\\d+/`)

        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=44 >> text=/Contract call.*Failed/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=46 >> text=/0x.*ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=51 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=54 >> text=/EPICV/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=58 >> text=/Value SPOA.*\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=59 >> text=/Fee SPOA.*\\d+/`)

        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=64 >> text=/Token transfer.*Success/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=66 >> text=/0x.*ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=71 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=74 >> text=/EPICV/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=78 >> text=/Value SPOA.*\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=79 >> text=/Fee SPOA.*\\d+/`)

        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=84 >> text=/Contract creation.*Success/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=86 >> text=/0x.*ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=91 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=94 >> text=/EPICV/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=98 >> text=/Value SPOA.*\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=99 >> text=/Fee SPOA.*\\d+/`)

        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=104 >> text=/Token transfer.*Success/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=106 >> text=/0x.*ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=111 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=114 >> text=/NFT/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=118 >> text=/Value SPOA.*\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_WIDGET} >> div >> nth=119 >> text=/Fee SPOA.*\\d+/`)
    }
}
