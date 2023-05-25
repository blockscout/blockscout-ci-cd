import { WebActions } from "@lib/WebActions"
import type { Page, BrowserContext } from 'playwright'
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
        await this.actions.navigateToURL(`https://blockscout-optimism-goerli.k8s-dev.blockscout.com`)
    }

    l1URL(): string {
        return `https://eth-goerli.blockscout.com`
    }

    l2URL(): string {
        return `https://blockscout-optimism-goerli.k8s-dev.blockscout.com`
    }

    navbar(num: Number): string {
        return `nav >> ul >> li >> nth=${num}`
    }

    section(num: Number): string {
        return `section >> ul >> li >> nth=${num}`
    }

    tableRow(num: Number): string {
        return `table >> tr >> nth=${num}`
    }

    async openLinkNewPage(ctx: BrowserContext, action: any): Promise<Page> {
        const [newPage] = await Promise.all([
            ctx.waitForEvent(`page`),
            await action(),
        ])
        return newPage
    }

    async clickTableRowCol(row: Number, col: Number, additionalSelector?: string): Promise<void> {
        await this.actions.clickElement(additionalSelector ? `${this.tableRow(row)} >> td >> nth=${col} >> ${additionalSelector}` : `${this.tableRow(row)} >> td >> nth=${col}`)
    }

    async checkTableNotEmpty(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`table >> tr >> nth=1`)
    }

    async verifyFeaturesEnabled(): Promise<void> {
        await this.openDeposits()
        await this.actions.verifyElementIsDisplayed(`text=Deposits (L1 → L2)`)
        await this.checkTableNotEmpty()
        await this.openWithdrawals()
        await this.actions.verifyElementIsDisplayed(`text=Withdrawals (L2 → L1)`)
        await this.checkTableNotEmpty()
        await this.openBatches()
        await this.actions.verifyElementIsDisplayed(`text=Tx batches (L2 blocks)`)
        await this.checkTableNotEmpty()
        await this.openStateRoots()
        await this.actions.verifyElementIsDisplayed(`text=Output roots`)
        await this.checkTableNotEmpty()
    }

    async openDeposits(): Promise<void> {
        await this.actions.clickElement(this.navbar(0))
        await this.actions.clickElement(`${this.navbar(0)} >> ${this.section(1)}`)
    }

    async openWithdrawals(): Promise<void> {
        await this.actions.clickElement(this.navbar(0))
        await this.actions.clickElement(`${this.navbar(0)} >> ${this.section(2)}`)
    }

    async openBatches(): Promise<void> {
        await this.actions.clickElement(this.navbar(0))
        await this.actions.clickElement(`${this.navbar(0)} >> ${this.section(4)}`)
    }

    async openStateRoots(): Promise<void> {
        await this.actions.clickElement(this.navbar(0))
        await this.actions.clickElement(`${this.navbar(0)} >> ${this.section(5)}`)
    }
}
