/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'
import { CommonPage, TXProps } from "./Common"

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

    async open(hash: string): Promise<void> {
        await this.actions.navigateToURL(`${process.env.BLOCKSCOUT_URL}/tx/${hash}`)
    }

    // checks tx description for each field in array format [fieldText, valueAssertion, valueAssertion...]
    async check_tx_description(p: TXDescriptionProps): Promise<void> {
        let row = 0
        for (const field in p) {
            const [name, ...assertions] = p[field]
            console.log(`field: ${field}`)
            await this.actions.verifyElementContainsText(`${this.CARD_BODY_KEYS} >> nth=${row}`, p[field][0])
            for (const a of assertions) {
                console.log(`assertion: ${a}`)
                await this.actions.verifyElementContainsText(`${this.CARD_BODY_VALUES} >> nth=${row}`, a)
            }
            row += 1
        }
    }
}
