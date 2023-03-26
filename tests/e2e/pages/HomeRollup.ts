import { WebActions } from "@lib/WebActions"
import type { BrowserContext, Page } from 'playwright'
import { HomePage } from "./Home"

export class HomeRollup extends HomePage {
    readonly page: Page

    actions: WebActions

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(): Promise<void> {
        await this.actions.navigateToURL(`https://blockscout-optimism-goerli.test.aws-k8s.blockscout.com`)
    }

    navbar(num: Number): string {
        return `nav >> ul >> li >> nth=${num}`
    }

    section(num: Number): string {
        return `section >> ul >> li >> nth=${num}`
    }

    async openDeposits(): Promise<void> {
        await this.actions.clickElement(this.navbar(0))
        await this.actions.clickElement(`${this.navbar(0)} >> ${this.section(1)}`)
    }

    async openWithdrawals(): Promise<void> {
        await this.actions.clickElement(this.navbar(0))
        await this.actions.clickElement(`${this.navbar(0)} >> ${this.section(2)}`)
    }
}
