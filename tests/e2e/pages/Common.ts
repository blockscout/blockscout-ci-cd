import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'

export interface TXProps {
    name: string
    status: string
    from1: string
    to1: string
    nativeAmount: string
}

export class CommonPage {
    readonly page: Page

    actions: WebActions

    TX = `[data-test='chain_transaction']`

    TX_STATUS = `[data-test='transaction_status']`

    TX_HASH = `[data-test='transaction_hash_link']`

    TX_ADDR_BAR = `[data-test='address_hash_link']`

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

    tx_num(num: number): string {
        return `${this.TX} >> nth=${num}`
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
}
