/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { WebActions } from "@lib/WebActions"
import type { Locator, Page } from 'playwright'

let actions: WebActions

export interface TXProps {
    name: string
    status: string
    from1: string
    to1: string
    nativeAmount: string
}

export interface TXDescriptionProps {
    transactionsHash: string[]
    result: string[]
    status: string[]
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

export default class CommonElements {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
        actions = new WebActions(this.page)
    }

    TX = `[data-test='chain_transaction']`

    TX_TYPE = `[data-test='transaction_type']`

    TX_STATUS = `[data-test='transaction_status']`

    TX_TRANSFER_BAR = `[data-test='token_transfer']`

    TX_HASH = `[data-test='transaction_hash_link']`

    TX_ADDR_BAR = `[data-test='address_hash_link']`

    TX_DESC_FIELDS = `[class='card-body'] >> dt`

    TX_DESC_VALUES = `[class='card-body'] >> dd`

    tx_num(num: number): string {
        return `${this.TX} >> nth=${num}`
    }

    // checks tx fields across different pages
    async check_tx_in_list(num: number, p: TXProps): Promise<void> {
        await actions.verifyElementIsDisplayed(`${this.tx_num(num)} >> text=${p.name}`, `header text is wrong`)
        await actions.verifyElementIsDisplayed(`${this.tx_num(num)} >> ${this.TX_STATUS} >> text=${p.status}`, `status is wrong`)
        await actions.verifyElementIsDisplayed(`${this.tx_num(num)} >> ${this.TX_HASH}`, `no tx hash link`)
        await actions.verifyElementIsDisplayed(`${this.tx_num(num)} >> ${this.TX_ADDR_BAR} >> nth=0 `, `no tx addr from link`)
        await actions.verifyElementContainsText(`${this.tx_num(num)} >> ${this.TX_ADDR_BAR} >> nth=0`, p.from1)
        await actions.verifyElementIsDisplayed(`${this.tx_num(num)} >> ${this.TX_ADDR_BAR} >> nth=1`, `no tx addr to link`)
        await actions.verifyElementIsDisplayed(`${this.tx_num(num)} >> ${this.TX_ADDR_BAR} >> nth=1 >> text=${p.to1} >> nth=0`, `no contract name in receive block`)
        await actions.verifyElementContainsText(`${this.tx_num(num)} >> text=Ether`, p.nativeAmount)
        await actions.verifyElementContainsText(`${this.tx_num(num)} >> text=TX Fee`, `0`)
        await actions.verifyElementContainsText(this.tx_num(num), `Block`)
    }

    // checks tx description for each field in array format [fieldText, valueAssertion, valueAssertion...]
    async check_tx_description(hash: string, p: TXDescriptionProps): Promise<void> {
        await actions.navigateToURL(`tx/${hash}`)
        let row = 0
        for (const field in p) {
            const [name, ...assertions] = p[field]
            console.log(`field: ${field}`)
            await actions.verifyElementContainsText(`${this.TX_DESC_FIELDS} >> nth=${row}`, p[field][0])
            for (const a of assertions) {
                console.log(`assertion: ${a}`)
                await actions.verifyElementContainsText(`${this.TX_DESC_VALUES} >> nth=${row}`, a)
            }
            row += 1
        }
    }
}
