import { expect } from "@playwright/test"
import { WebActions } from "@lib/WebActions"
import type { Page, BrowserContext } from 'playwright'
import { HomeRollup } from "./HomeRollup"

export class RollupTxnBatchesPage extends HomeRollup {
    readonly page: Page

    actions: WebActions

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(): Promise<void> {
        await this.actions.navigateToURL(`${this.l2URL()}/l2-txn-batches`)
    }

    async validateTable(ctx: BrowserContext): Promise<void> {
        await this.clickTableRowCol(4, 0, `a`)
        expect(this.page.url()).toContain(this.l2URL())
        await this.open()

        await this.clickTableRowCol(4, 1, `a`)
        expect(this.page.url()).toContain(this.l2URL())
        await this.open()

        await this.clickTableRowCol(4, 2)
        expect(this.page.url()).toContain(this.l2URL())
        await this.open()

        const tx1 = await this.openLinkNewPage(ctx, () => this.clickTableRowCol(4, 3, `a >> nth=0`))
        expect(tx1.url()).toContain(this.l1URL())
    }
}
