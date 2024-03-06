import { WebActions } from "@lib/WebActions"
import type { Page, BrowserContext } from 'playwright'
import { expect } from "@playwright/test"
import { HomeRollupBaseSepolia } from "./HomeRollupBaseSepolia"

export class RollupWithdrawalsPage extends HomeRollupBaseSepolia {
    readonly page: Page

    actions: WebActions

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(): Promise<void> {
        await this.actions.navigateToURL(`${this.l2URL()}/l2-withdrawals`)
    }

    async validateTable(ctx: BrowserContext): Promise<void> {
        await this.clickTableRowCol(4, 1)
        expect(this.page.url()).toContain(this.l2URL())
        await this.open()
        await this.clickTableRowCol(4, 2)
        expect(this.page.url()).toContain(this.l2URL())
    }
}
