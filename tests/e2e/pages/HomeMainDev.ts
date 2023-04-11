import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'
import { HomePage } from "./Home"

export class HomeMainDev extends HomePage {
    readonly page: Page

    actions: WebActions

    ROW = `main >> tr >> nth={}`

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    row(num: number): string {
        return `main >> tr >> nth=${num}`
    }

    async open(): Promise<void> {
        await this.actions.navigateToURL(`https://blockscout-main.test.aws-k8s.blockscout.com/`)
    }

    async open_state_change(tx: string): Promise<void> {
        await this.actions.navigateToURL(`https://blockscout-main.test.aws-k8s.blockscout.com/tx/${tx}?tab=state`)
    }

    async assert_row(num: number, text: string): Promise<void> {
        await this.actions.verifyElementContainsText(this.row(num), text)
    }
}
