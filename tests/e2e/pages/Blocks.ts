/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'
import { CommonPage } from "./Common"

export interface BlockDescriptionProps {
    blockHeight: string[]
}

export class BlocksPage extends CommonPage {
    readonly page: Page

    actions: WebActions

    TX_DESC_FIELDS = `[class='card-body fs-14'] >> dt`

    TX_DESC_VALUES = `[class='card-body fs-14'] >> dd`

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(bn: string): Promise<void> {
        await this.actions.navigateToURL(`block/${bn}/transactions`)
    }

    async check_block_description(p: BlockDescriptionProps): Promise<void> {
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
