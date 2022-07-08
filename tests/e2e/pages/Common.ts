import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'

let actions: WebActions

export class CommonPage {
    readonly page: Page

    actions: WebActions

    constructor(page: Page) {
        this.page = page
        actions = new WebActions(this.page)
    }

    async delay(amount: number): Promise<void> {
        await this.actions.delay(amount)
    }

    async waitTextReload(status: string): Promise<void> {
        await this.actions.waitWithReload(`text=${status}`)
    }
}
