/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { WebActions } from "@lib/WebActions"
import { expect } from "@playwright/test"
import type { Page } from 'playwright'
import { CommonPage } from "./Common"

export class TransactionPage extends CommonPage {
    readonly page: Page

    readonly actions: WebActions

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    TX_TYPE = `[data-test='transaction_type']`

    TX_STATUS = `[data-test='transaction_status']`

    TX_TRANSFER_BAR = `[data-test='token_transfer']`

    TX_HASH = `[data-test='transaction_hash_link']`

    TX_ADDR_BAR = `[data-test='address_hash_link']`

    CARD_BODY_KEYS = `[class='card-body'] >> dt`

    CARD_BODY_VALUES = `[class='card-body'] >> dd`

    TAB_TOKEN_TRANSFERS = `[role="tab"] >> text=Token transfers`

    TAB_INTERNAL_TXN = `[role="tab"] >> text=Internal txn`

    TAB_LOGS = `[role="tab"] >> text=Logs`

    TAB_RAW_TRACE = `[role="tab"] >> text=Raw trace`

    RAW_TRACE_TEXT = `section >> div >> nth=1`

    DESCRIPTION_AD_BANNER = `#adBanner`

    async open(hash: string): Promise<void> {
        await this.actions.navigateToURL(`${process.env.BLOCKSCOUT_URL}/tx/${hash}`)
    }

    async check_tx_description(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}1 >> text=Transaction hash`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}3 >> text=0x`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}5 >> text=Status`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}7 >> text=Success`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}8 >> text=Block`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}10 >> text=/\\d+.*\\d+.*confirmations/`)

        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}11 >> text=Timestamp`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}13 >> text=/ago.*UTC.*Confirmed/`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}14 >> text=/Sponsored/`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}20 >> text=From`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}22 >> text=0x`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}26 >> text=/To/`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}28 >> text=/Contract.*0x.*created/`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}31 >> text=Value`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}33 >> text=SPOA`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}34 >> text=Transaction fee`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}36 >> text=/\\d+.*SPOA/`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}37 >> text=Gas price`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}39 >> text=/\\d+.*SPOA.*\\d+.*Gwei/`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}40 >> text=Gas usage & limit by txn`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}42 >> text=/\\d+.*|.*\\d+%/`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}46 >> text=Gas fees (Gwei)`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}48 >> text=/Base.*\\d+.*Max.*\\d+.*Max priority.*\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}52 >> text=Burnt fees`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}54 >> text=/\\d+.*SPOA/`)
        await this.actions.verifyElementIsDisplayed(this.DESCRIPTION_AD_BANNER)
    }

    async check_tx_details(): Promise<void> {
        await this.actions.clickElement(this.DETAILS_TAB_FOOTER)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}58 >> text=Other`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}60 >> text=/Txn type: \\d+.*Nonce: \\d+.*Position: \\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}64 >> text=Raw input`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}66 >> text=0x`)
    }

    async check_token_transfers(): Promise<void> {
        await this.actions.clickElement(this.TAB_TOKEN_TRANSFERS)
    }

    async check_internal_transactions(): Promise<void> {
        await this.actions.clickElement(this.TAB_INTERNAL_TXN)
    }

    async check_transaction_logs(): Promise<void> {
        await this.actions.clickElement(this.TAB_LOGS)
        await this.alert_div_has_text(`To see accurate decoded input data, the contract must be verified. Verify the contract`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}4 >> text=Address`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}6 >> text=EPIC`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}9 >> text=Topics`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}12 >> text=0x`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}16 >> text=0x`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}20 >> text=0x`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}24 >> text=0x`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}25 >> text=Data`)
        await this.actions.verifyElementIsDisplayed(`${this.TABLE_TABPANEL_DIV}26 >> text=0x`)
    }

    async check_raw_trace(minerAddr: string, createdAddr: string): Promise<void> {
        await this.actions.clickElement(this.TAB_RAW_TRACE)
        const text = await this.actions.getTextFromWebElements(this.RAW_TRACE_TEXT)
        const rawData = JSON.parse(text[0])
        expect(rawData[0].action.from).toEqual(minerAddr.toLowerCase())
        expect(rawData[0].action.value).toEqual(`0x0`)
        expect(rawData[0].result.address).toEqual(createdAddr.toLowerCase())
        expect(rawData[0].subtraces).toEqual(0)
        expect(rawData[0].traceAddress).toEqual([])
        expect(rawData[0].type).toEqual(`create`)
    }
}
