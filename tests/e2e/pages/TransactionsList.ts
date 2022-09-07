/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'
import { CommonPage } from "./Common"

export class TransactionsListPage extends CommonPage {
    readonly page: Page

    readonly actions: WebActions

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(): Promise<void> {
        await this.actions.navigateToURL(`txs`)
    }

    async findText(tags: string[]): Promise<void> {
        for (const t of tags) {
            await this.actions.verifyElementIsDisplayed(`text=${t}`, `element with text ${t} haven't been found`)
        }
    }
}
