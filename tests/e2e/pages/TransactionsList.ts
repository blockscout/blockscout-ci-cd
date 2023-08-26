/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'
import { CommonPage } from "./Common"

export class TransactionsListPage extends CommonPage {
    readonly page: Page

    readonly actions: WebActions

    TABLE_HEADER = `table >> thead >> tr >> th >> nth=`

    TABLE_CELL = `table >> tbody >> tr >> nth= >> td >> nth=`

    async table_element_displayed(row: number, col: number, text: string): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`table >> tbody >> tr >> nth=${row} >> td >> nth=${col} >> text=${text}`)
    }

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(): Promise<void> {
        await this.actions.navigateToURL(`txs`)
    }

    async check_header(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_HEADER}1 >> text=Txn hash`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_HEADER}2 >> text=Type`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_HEADER}3 >> text=Method`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_HEADER}4 >> text=Block`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_HEADER}5 >> text=From`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_HEADER}7 >> text=To`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_HEADER}8 >> text=Value ETH`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_HEADER}9 >> text=Fee ETH`)
    }

    async check_table_data(nftSymbolV: string, nftSymbol: string, erc20SymbolV: string, erc20Symbol: string): Promise<void> {
        await this.table_element_displayed(1, 1, `/0x.*ago/`)
        await this.table_element_displayed(1, 2, `/Token transfer.*Success/`)
        await this.table_element_displayed(1, 3, `/0x/`)
        await this.table_element_displayed(1, 4, `/\\d+/`)
        await this.table_element_displayed(1, 5, `0x`)
        await this.table_element_displayed(1, 7, nftSymbolV)
        await this.table_element_displayed(1, 8, `0`)
        await this.table_element_displayed(1, 9, `/\\d\\.\\d+/`)

        await this.table_element_displayed(2, 1, `/0x.*ago/`)
        await this.table_element_displayed(2, 2, `/Token creation.*Success/`)
        await this.table_element_displayed(2, 3, ``)
        await this.table_element_displayed(2, 4, `/\\d+/`)
        await this.table_element_displayed(2, 5, `0x`)
        await this.table_element_displayed(2, 7, nftSymbolV)
        await this.table_element_displayed(2, 8, `0`)
        await this.table_element_displayed(2, 9, `/\\d\\.\\d+/`)

        await this.table_element_displayed(3, 1, `/0x.*ago/`)
        await this.table_element_displayed(3, 2, `/Contract call.*Failed/`)
        await this.table_element_displayed(3, 3, `/alwaysReverts/`)
        await this.table_element_displayed(3, 4, `/\\d+/`)
        await this.table_element_displayed(3, 5, `0x`)
        await this.table_element_displayed(3, 7, erc20SymbolV)
        await this.table_element_displayed(3, 8, `0`)
        await this.table_element_displayed(3, 9, `/\\d\\.\\d+/`)
    }

    async findText(tags: string[]): Promise<void> {
        for (const t of tags) {
            await this.actions.verifyElementIsDisplayed(`text=${t}`, `element with text ${t} haven't been found`)
        }
    }
}
