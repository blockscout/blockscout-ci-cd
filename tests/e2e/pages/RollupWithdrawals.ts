import { WebActions } from "@lib/WebActions"
import type { Page, BrowserContext } from 'playwright'
import { expect } from "@playwright/test"
import { HomeRollup } from "./HomeRollup"

export class RollupWithdrawalsPage extends HomeRollup {
    readonly page: Page

    actions: WebActions

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(): Promise<void> {
        await this.actions.navigateToURL(`https://blockscout-optimism-goerli.test.aws-k8s.blockscout.com/l2-withdrawals`)
    }

    async validateTable(ctx: BrowserContext): Promise<void> {
        await this.clickTableRowCol(4, 1)
        expect(this.page.url()).toContain(this.l2URL())
        await this.open()
        await this.clickTableRowCol(4, 2)
        expect(this.page.url()).toContain(this.l2URL())
    }
}
