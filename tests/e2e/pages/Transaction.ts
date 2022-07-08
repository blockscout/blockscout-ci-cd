/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { WebActions } from "@lib/WebActions"
import type { Locator, Page } from 'playwright'

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

export interface TXLogProps {
    address: string[]
    topics: string[]
    data: string[]
    logIndex: string[]
}

export interface TXDescriptionProps {
    transactionsHash: string[]
    result: string[]
    status: string[]
    revertReason: string[]
    block: string[]
    timestamp: string[]
    from: string[]
    interactedWith: string[]
    tokensMinted?: string[]
    value: string[]
    transactionFee: string[]
    gasPrice: string[]
    transactionType: string[]
    gasLimit: string[]
    maxFeePerGas: string[]
    maxPriorityFeePerGas: string[]
    priorityFeeTip: string[]
    transactionBurntFee: string[]
    gasUsedByTransaction: string[]
    nonce: string[],
}

export default class TransactionPage {
    readonly page: Page

    readonly actions: WebActions

    constructor(page: Page) {
        this.page = page
        this.actions = new WebActions(this.page)
    }

    TX = `[data-test='chain_transaction']`

    TOKEN_TILES = `[class='tile tile-type-token-transfer fade-in']`

    TX_INTERNAL = `[data-test='internal_transaction']`

    TX_TYPE = `[data-test='transaction_type']`

    TX_STATUS = `[data-test='transaction_status']`

    TX_TRANSFER_BAR = `[data-test='token_transfer']`

    TX_HASH = `[data-test='transaction_hash_link']`

    TX_ADDR_BAR = `[data-test='address_hash_link']`

    TX_DESC_FIELDS = `[class='card-body'] >> dt`

    TX_DESC_VALUES = `[class='card-body'] >> dd`

    TX_LOGS_TAB = `[data-test='transaction_logs_link']`

    TX_LOG = `[data-test='transaction_log']`

    TX_RAW_TRACE_TAB = `text=Raw Trace`

    async delay(amount: number): Promise<void> {
        await this.actions.delay(amount)
    }

    async waitTXStatus(status: string): Promise<void> {
        await this.actions.waitWithReload(`text=${status}`)
    }

    async open(hash: string): Promise<void> {
        await this.actions.navigateToURL(`tx/${hash}`)
    }

    tx_num(num: number): string {
        return `${this.TX} >> nth=${num}`
    }

    async select_logs_tab(): Promise<void> {
        await this.actions.clickElement(this.TX_LOGS_TAB)
    }

    async select_trace_tab(): Promise<void> {
        await this.actions.clickElement(this.TX_RAW_TRACE_TAB)
    }

    // checks tx fields across different pages
    async check_tx_in_list(num: number, p: TXProps): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.tx_num(num)} >> text=${p.name}`, `header text is wrong`)
        await this.actions.verifyElementIsDisplayed(`${this.tx_num(num)} >> ${this.TX_STATUS} >> text=${p.status}`, `status is wrong`)
        await this.actions.verifyElementIsDisplayed(`${this.tx_num(num)} >> ${this.TX_HASH}`, `no tx hash link`)
        await this.actions.verifyElementIsDisplayed(`${this.tx_num(num)} >> ${this.TX_ADDR_BAR} >> nth=0 `, `no tx addr from link`)
        await this.actions.verifyElementContainsText(`${this.tx_num(num)} >> ${this.TX_ADDR_BAR} >> nth=0`, p.from1)
        await this.actions.verifyElementIsDisplayed(`${this.tx_num(num)} >> ${this.TX_ADDR_BAR} >> nth=1`, `no tx addr to link`)
        await this.actions.verifyElementIsDisplayed(`${this.tx_num(num)} >> ${this.TX_ADDR_BAR} >> nth=1 >> text=${p.to1} >> nth=0`, `no contract name in receive block`)
        await this.actions.verifyElementContainsText(`${this.tx_num(num)} >> text=Ether`, p.nativeAmount)
        await this.actions.verifyElementContainsText(`${this.tx_num(num)} >> text=TX Fee`, `0`)
        await this.actions.verifyElementContainsText(this.tx_num(num), `Block`)
    }

    async check_token_txs_list(num: number, p: TXTokenProps): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.TOKEN_TILES} >> nth=${num} >> text=${p.name}`, `wrong header name`)
        await this.actions.verifyElementIsDisplayed(`${this.TOKEN_TILES} >> nth=${num} >> ${this.TX_HASH}`, `no tx hash link`)
        await this.actions.verifyElementIsDisplayed(`${this.TOKEN_TILES} >> nth=${num} >> ${this.TX_ADDR_BAR} >> nth=0 >> text=${p.from1}`, `no from addr`)
        await this.actions.verifyElementIsDisplayed(`${this.TOKEN_TILES} >> nth=${num} >> ${this.TX_ADDR_BAR} >> nth=1 >> text=${p.to1}`, `no tx to addr`)
        await this.actions.verifyElementIsDisplayed(`${this.TOKEN_TILES} >> nth=${num} >> span:has-text("${p.tokenAmount} ${p.tokenSymbol}")`, `no token amount`)
    }

    async check_internal_txs_list(num: number, p: TXProps): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.TX_INTERNAL} >> nth=${num} >> text=${p.name}`, `wrong header name`)
        await this.actions.verifyElementIsDisplayed(`${this.TX_INTERNAL} >> nth=${num} >> [data-internal-transaction-type='${p.status}']`, `wrong status`)
        await this.actions.verifyElementIsDisplayed(`${this.TX_INTERNAL} >> nth=${num} >> ${this.TX_HASH}`, `no tx hash link`)
        await this.actions.verifyElementIsDisplayed(`${this.TX_INTERNAL} >> nth=${num} >> ${this.TX_ADDR_BAR} >> nth=0 >> text=${p.from1}`, `no from addr`)
        await this.actions.verifyElementIsDisplayed(`${this.TX_INTERNAL} >> nth=${num} >> ${this.TX_ADDR_BAR} >> nth=1 >> text=${p.to1}`, `no tx to addr`)
        await this.actions.verifyElementContainsText(`${this.TX_INTERNAL} >> nth=${num} >> text=Ether`, p.nativeAmount)
        await this.actions.verifyElementContainsText(`${this.TX_INTERNAL}`, `Block`)
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

    // checks tx description for each field in array format [fieldText, valueAssertion, valueAssertion...]
    async check_tx_description(p: TXDescriptionProps): Promise<void> {
        let row = 0
        for (const field in p) {
            const [name, ...assertions] = p[field]
            console.log(`field: ${field}`)
            await this.actions.verifyElementContainsText(`${this.TX_DESC_FIELDS} >> nth=${row}`, p[field][0])
            for (const a of assertions) {
                console.log(`assertion: ${a}`)
                await this.actions.verifyElementContainsText(`${this.TX_DESC_VALUES} >> nth=${row}`, a)
            }
            row += 1
        }
    }
}
