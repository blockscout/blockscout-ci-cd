import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'
import { HomePage } from "./Home"

export class HomeMainDev extends HomePage {
    readonly page: Page

    actions: WebActions

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(): Promise<void> {
        await this.actions.navigateToURL(`https://blockscout-main.test.aws-k8s.blockscout.com/`)
    }

    async open_state_change(tx: string): Promise<void> {
        await this.actions.navigateToURL(`https://blockscout-main.test.aws-k8s.blockscout.com/tx/${tx}?tab=state`)
    }
}
