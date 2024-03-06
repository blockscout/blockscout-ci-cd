import { expect } from "@playwright/test"
import { WebActions } from "@lib/WebActions"
import type { Page, BrowserContext } from 'playwright'
import { HomeRollupBaseSepolia } from "./HomeRollupBaseSepolia"

export class RollupDepositsPage extends HomeRollupBaseSepolia {
    readonly page: Page

    actions: WebActions

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(): Promise<void> {
        await this.actions.navigateToURL(`${this.l2URL()}/l2-deposits`)
    }

    async validateTable(ctx: BrowserContext): Promise<void> {
        const blockPageL1 = await this.openLinkNewPage(ctx, () => this.clickTableRowCol(4, 0))
        expect(blockPageL1.url()).toContain(this.l1URL())
        await this.clickTableRowCol(4, 1)
        expect(this.page.url()).toContain(this.l2URL())
        await this.open()
        const txPageL1 = await this.openLinkNewPage(ctx, () => this.clickTableRowCol(4, 3))
        expect(txPageL1.url()).toContain(this.l1URL())
        const txPageOriginL1 = await this.openLinkNewPage(ctx, () => this.clickTableRowCol(4, 4))
        expect(txPageOriginL1.url()).toContain(this.l1URL())
    }
}
