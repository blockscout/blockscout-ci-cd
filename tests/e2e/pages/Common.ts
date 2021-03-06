/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'

export interface TXProps {
    name: string
    status: string
    from1: string
    to1: string
    nativeAmount: string
}

export interface TXTokenProps {
    name: string
    status: string
    from1: string
    to1: string
    tokenAmount: string
    tokenSymbol: string
}

export interface TokenHoldersProps {
    holder: string[]
    value: string[]
}

export interface TXLogProps {
    address: string[]
    topics: string[]
    data: string[]
    logIndex: string[]
}

export class CommonPage {
    readonly page: Page

    actions: WebActions

    VERIFY_MSG = `To see accurate decoded input data, the contract must be verified`

    TX = `[data-test='chain_transaction']`

    TX_STATUS = `[data-test='transaction_status']`

    TX_HASH = `[data-test='transaction_hash_link']`

    TX_ADDR_BAR = `[data-test='address_hash_link']`

    TX_INTERNAL = `[data-test='internal_transaction']`

    CARD_BODY_KEYS = `[class='card-body fs-14'] >> dt`

    CARD_BODY_VALUES = `[class='card-body fs-14'] >> dd`

    TOKEN_TILES = `[class='tile tile-type-token-transfer fade-in']`

    TOKEN_HOLDERS_TAB = `[data-test='token_holders_tab']`

    TX_LOGS_TAB = `[data-test='transaction_logs_link']`

    INTERNAL_TXS_TAB = `[data-test='internal_transactions_tab_link']`

    TX_RAW_TRACE_TAB = `text=Raw Trace`

    TOKEN_HOLDERS_LIST = `[data-test='token_holders']`

    TX_LOG = `[data-test='transaction_log']`

    VERIFY_ALERT_ROW = `[data-items] >> [class='alert alert-info'] >> nth=0`

    constructor(page: Page) {
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async delay(amount: number): Promise<void> {
        await this.actions.delay(amount)
    }

    async waitTextReload(status: string): Promise<void> {
        await this.actions.waitWithReload(`text=${status}`)
    }

    async select_token_holders_tab(): Promise<void> {
        await this.actions.clickElement(this.TOKEN_HOLDERS_TAB)
    }

    async select_internal_txs_tab(): Promise<void> {
        await this.actions.clickElement(this.INTERNAL_TXS_TAB)
    }

    async select_logs_tab(): Promise<void> {
        await this.actions.clickElement(this.TX_LOGS_TAB)
    }

    async select_trace_tab(): Promise<void> {
        await this.actions.clickElement(this.TX_RAW_TRACE_TAB)
    }

    async check_verify_alert(): Promise<void> {
        await this.actions.verifyElementContainsText(this.VERIFY_ALERT_ROW, this.VERIFY_MSG)
    }

    async check_token_holders(num: number, p: TokenHoldersProps): Promise<void> {
        await this.actions.verifyElementContainsText(`${this.TOKEN_HOLDERS_LIST} >> nth=${num} >> ${this.TX_ADDR_BAR}`, p.holder[0])
        await this.actions.verifyElementContainsText(`${this.TOKEN_HOLDERS_LIST} >> nth=${num}`, p.value[0])
        await this.actions.verifyElementContainsText(`${this.TOKEN_HOLDERS_LIST} >> nth=${num}`, p.value[1])
    }

    async check_internal_txs_list(num: number, p: TXProps): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.TX_INTERNAL} >> nth=${num} >> text=${p.name}`, `wrong header name`)
        await this.actions.verifyElementIsDisplayed(`${this.TX_INTERNAL} >> nth=${num} >> [data-internal-transaction-type='${p.status}']`, `wrong status`)
        await this.actions.verifyElementIsDisplayed(`${this.TX_INTERNAL} >> nth=${num} >> ${this.TX_HASH}`, `no tx hash link`)
        await this.actions.verifyElementIsDisplayed(`${this.TX_INTERNAL} >> nth=${num} >> ${this.TX_ADDR_BAR} >> nth=0 >> text=${p.from1}`, `no from addr`)
        // different html tags on every page for (from -> to) lines, rewrite to a component when testing more than 2 targets
        await this.actions.verifyElementContainsText(`${this.TX_INTERNAL} >> nth=${num}`, p.to1)
        await this.actions.verifyElementContainsText(`${this.TX_INTERNAL} >> nth=${num} >> text=Ether`, p.nativeAmount)
        await this.actions.verifyElementContainsText(`${this.TX_INTERNAL}`, `Block`)
    }

    // checks tx fields across different pages when it displayed as a tile
    async check_tx_in_list(num: number, p: TXProps): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.TX} >> nth=${num} >> text=${p.name}`, `header text is wrong`)
        await this.actions.verifyElementIsDisplayed(`${this.TX} >> nth=${num} >> ${this.TX_STATUS} >> text=${p.status}`, `status is wrong`)
        await this.actions.verifyElementIsDisplayed(`${this.TX} >> nth=${num} >> ${this.TX_HASH}`, `no tx hash link`)
        await this.actions.verifyElementContainsText(`${this.TX} >> nth=${num} >> ${this.TX_ADDR_BAR} >> nth=0`, p.from1)
        // different html tags on every page for (from -> to) lines, rewrite to a component when testing more than 2 targets
        await this.actions.verifyElementContainsText(`${this.TX} >> nth=${num}`, p.to1)
        await this.actions.verifyElementContainsText(`${this.TX} >> nth=${num} >> text=Ether`, p.nativeAmount)
        await this.actions.verifyElementContainsText(`${this.TX} >> nth=${num} >> text=TX Fee`, `0`)
        await this.actions.verifyElementContainsText(`${this.TX} >> nth=${num}`, `Block`)
    }

    // checks token transfer fields across different pages when it displayed as a tile
    async check_token_txs_list(num: number, p: TXTokenProps): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.TOKEN_TILES} >> nth=${num} >> text=${p.name}`, `wrong header name`)
        await this.actions.verifyElementIsDisplayed(`${this.TOKEN_TILES} >> nth=${num} >> ${this.TX_HASH}`, `no tx hash link`)
        await this.actions.verifyElementIsDisplayed(`${this.TOKEN_TILES} >> nth=${num} >> ${this.TX_ADDR_BAR} >> nth=0 >> text=${p.from1}`, `no from addr`)
        await this.actions.verifyElementIsDisplayed(`${this.TOKEN_TILES} >> nth=${num} >> ${this.TX_ADDR_BAR} >> nth=1 >> text=${p.to1}`, `no tx to addr`)
        await this.actions.verifyElementIsDisplayed(`${this.TOKEN_TILES} >> nth=${num} >> span:has-text("${p.tokenAmount} ${p.tokenSymbol}")`, `no token amount`)
    }

    async check_tx_logs(num: number, p: TXLogProps): Promise<void> {
        let row = 0
        for (const field in p) {
            const [name, ...assertions] = p[field]
            console.log(`field: ${field}`)
            await this.actions.verifyElementContainsText(`${this.TX_LOG} >> nth=${num} >> dt >> nth=${row}`, p[field][0])
            for (const a of assertions) {
                console.log(`assertion: ${a}`)
                await this.actions.verifyElementContainsText(`${this.TX_LOG} >> nth=${num} >> dd >> nth=${row}`, a)
            }
            row += 1
        }
    }
}
