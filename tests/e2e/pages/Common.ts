/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { APIActions } from "@lib/APIActions"
import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'

export interface TXProps {
    name: string
    status: string
    from1: string
    to1: string
    nativeAmount: string
    nativeName: string
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
    topics?: string[]
    data?: string[]
    logIndex?: string[]
}

export interface TXDecodedLogProps {
    methodIDText: string
    methodID: string
    callText: string
    call: string
    logFields: string[][]
}

export class CommonPage {
    readonly page: Page

    actions: WebActions

    apiActions: APIActions

    SIGN_IN = `text=Sign in`

    ACCOUNT_MENU = `#navbarBlocksDropdown >> nth=1`

    AUTH0_SIGN_UP = `text=Sign up`

    AUTH0_INPUT_EMAIL = `input[name="email"]`

    AUTH0_INPUT_USERNAME = `input[name="username"]`

    AUTH0_INPUT_PASSWORD = `input[name="password"]`

    AUTH0_SUBMIT = `button[name="action"]`

    LOGGED_IN_AS = `text=Signed in as`

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
        this.apiActions = new APIActions()
    }

    async signUp(email: string, password: string): Promise<void> {
        await this.actions.navigateToURL(process.env.BLOCKSCOUT_URL)
        await this.actions.clickElement(this.SIGN_IN)
        await this.actions.clickElement(this.AUTH0_SIGN_UP)
        await this.actions.enterElementText(this.AUTH0_INPUT_EMAIL, email)
        await this.actions.enterElementText(this.AUTH0_INPUT_PASSWORD, password)
        await this.actions.clickElement(this.AUTH0_SUBMIT)
    }

    async delay(amount: number): Promise<void> {
        await this.actions.delay(amount)
    }

    async hasText(text: string): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`text=${text}`, `failed to find text on the page`)
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
        await this.actions.verifyElementContainsText(`${this.TX_INTERNAL} >> nth=${num} >> text=${p.nativeName}`, p.nativeAmount)
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
        await this.actions.verifyElementContainsText(`${this.TX} >> nth=${num} >> text=${p.nativeName}`, p.nativeAmount)
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

    async check_decoded_tx_logs(num: number, p: TXDecodedLogProps): Promise<void> {
        await this.actions.verifyElementContainsText(`[data-items] >> dd >> table >> nth=0 >> tr >> nth=0 >> td >> nth=0`, p.methodIDText)
        await this.actions.verifyElementContainsText(`[data-items] >> dd >> table >> nth=0 >> tr >> nth=0 >> td >> nth=1`, p.methodID)
        await this.actions.verifyElementContainsText(`[data-items] >> dd >> table >> nth=0 >> tr >> nth=1 >> td >> nth=0`, p.callText)
        await this.actions.verifyElementContainsText(`[data-items] >> dd >> table >> nth=0 >> tr >> nth=1 >> td >> nth=1`, p.call)
        for (const rowIdx in p.logFields) {
            for (const colIdx in p.logFields[rowIdx]) {
                await this.actions.verifyElementContainsText(`[data-items] >> dd >> table >> nth=1 >> tr >> nth=${2 + Number(rowIdx)} >> td >> nth=${colIdx}`, p.logFields[rowIdx][colIdx])
            }
        }
    }

    async check_decoded_inputs(num: number, p: TXDecodedLogProps): Promise<void> {
        await this.actions.verifyElementContainsText(`[class="card-body"] >> nth=1 >> table >> nth=0 >> tr >> nth=0 >> td >> nth=0`, p.methodIDText)
        await this.actions.verifyElementContainsText(`[class="card-body"] >> nth=1 >> table >> nth=0 >> tr >> nth=0 >> td >> nth=1`, p.methodID)
        await this.actions.verifyElementContainsText(`[class="card-body"] >> nth=1 >> table >> nth=0 >> tr >> nth=1 >> td >> nth=0`, p.callText)
        await this.actions.verifyElementContainsText(`[class="card-body"] >> nth=1 >> table >> nth=0 >> tr >> nth=1 >> td >> nth=1`, p.call)
        for (const rowIdx in p.logFields) {
            for (const colIdx in p.logFields[rowIdx]) {
                await this.actions.verifyElementContainsText(`[class="card-body"] >> nth=1 >> table >> nth=1 >> tr >> nth=${2 + Number(rowIdx)} >> td >> nth=${colIdx}`, p.logFields[rowIdx][colIdx])
            }
        }
    }

    async isSignedIn(): Promise<void> {
        await this.actions.clickElement(this.ACCOUNT_MENU)
        await this.actions.verifyElementIsDisplayed(this.LOGGED_IN_AS, `login failed`)
    }
}
