/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'
import { CommonPage } from "./Common"

export class BlockListPage extends CommonPage {
    readonly page: Page

    TAB_ALL = `[type="button"] >> text=All`

    TAB_FORKED = `[type="button"] >> text=Forked`

    TAB_UNCLES = `[type="button"] >> text=Uncles`

    TOTAL_BLOCKS_COUNT = `text=/Total of .* blocks/`

    TABLE_HEADING_1 = `th:has-text("Block")`

    TABLE_HEADING_2 = `th:has-text("Size, bytes")`

    TABLE_HEADING_3 = `th:has-text("Validator")`

    TABLE_HEADING_4 = `th:has-text("Txn")`

    TABLE_HEADING_5 = `th:has-text("Gas used")`

    TABLE_HEADING_6 = `th:has-text("Reward SPOA")`

    TABLE_HEADING_7 = `th:has-text("Burnt fees SPOA")`

    TABLE_GRID_CELL = `[role="gridcell"] >> nth=`

    NETWORK_MENU = `[aria-label="Network menu"]`

    NETWORK_GROUP_MAINNETS = `text=mainnets`

    NETWORK_GROUP_TESTNETS = `text=testnets`

    NETWORK_GROUP_OTHER = `text=other`

    NETWORK_LIST_ITEM = `section >> ul >> li >> nth=`

    async grid(row: number, col: number, regex: string): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`tbody >> tr >> nth=${row} >> td >> nth=${col} >> text=/${regex}/`)
    }

    actions: WebActions

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(): Promise<void> {
        await this.actions.navigateToURL(`${process.env.BLOCKSCOUT_URL}/blocks`)
    }

    async check_network_menu(): Promise<void> {
        await this.actions.clickElement(this.NETWORK_MENU)
        await this.actions.clickElement(this.NETWORK_GROUP_MAINNETS)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}0 >> text=Ethereum`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}1 >> text=Optimism`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}2 >> text=RSK`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}3 >> text=LightLink Phoenix`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}4 >> text=Ethereum classic`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}5 >> text=Gnosis Chain`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}6 >> text=Astar (EVM)`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}7 >> text=Shiden (EVM)`)

        await this.actions.clickElement(this.NETWORK_GROUP_TESTNETS)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}0 >> text=Goerli`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}1 >> text=Base Göerli`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}2 >> text=Optimism Goerli`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}3 >> text=Optimism Bedrock Beta`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}4 >> text=ZetaChain testnet`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}5 >> text=LightLink Pegasus`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}6 >> text=Neon Devnet`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}7 >> text=Gnosis Chiado`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}8 >> text=Shibuya (EVM)`)
        await this.actions.clickElement(this.NETWORK_GROUP_OTHER)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}0 >> text=Optimism Opcraft`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}1 >> text=/ARTIS/`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}2 >> text=/LUKSO/`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}3 >> text=/POA/`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}4 >> text=/POA Sokol/`)
    }

    async check_header(): Promise<void> {
        await this.actions.clickElement(this.TAB_ALL)
        await this.actions.verifyElementIsDisplayed(this.TABLE_HEADING_1, `no table header - block`)
        await this.actions.verifyElementIsDisplayed(this.TABLE_HEADING_2, `no table header - size`)
        await this.actions.verifyElementIsDisplayed(this.TABLE_HEADING_3, `no table header - validator`)
        await this.actions.verifyElementIsDisplayed(this.TABLE_HEADING_4, `no table header - txn`)
        await this.actions.verifyElementIsDisplayed(this.TABLE_HEADING_5, `no table header - gas used`)
        await this.actions.verifyElementIsDisplayed(this.TABLE_HEADING_6, `no table header - reward SPOA`)
        await this.actions.verifyElementIsDisplayed(this.TABLE_HEADING_7, `no table header - burnt fees SPOA`)
    }

    async check_table(): Promise<void> {
        await this.grid(0, 0, `\\d+`)
        await this.grid(0, 0, `sec`)
        await this.grid(0, 1, `\\d+`)
        await this.grid(0, 2, `0x`)
        await this.grid(0, 3, `\\d+`)
        await this.grid(0, 4, `\\d+.*\\%.*\\%`)
        await this.grid(0, 5, `\\d+`)
        await this.grid(0, 6, `\\d+`)
    }
}
