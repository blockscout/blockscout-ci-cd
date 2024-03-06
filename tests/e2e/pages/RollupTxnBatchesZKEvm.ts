import { expect } from "@playwright/test"
import { WebActions } from "@lib/WebActions"
import type { Page, BrowserContext } from 'playwright'
import { HomeRollupZKEvm } from "./HomeRollupZKEvm"

export class RollupTxnBatchesPageZKEvm extends HomeRollupZKEvm {
    readonly page: Page

    actions: WebActions

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(): Promise<void> {
        await this.actions.navigateToURL(`${this.l2URL()}batches`)
    }

    async validateTable(ctx: BrowserContext): Promise<void> {
        await this.clickTableRowCol(4, 0, `a`)
        expect(this.page.url()).toContain(this.l2URL())
        await this.open()

        await this.actions.verifyElementIsDisplayed(`table >> tr >> nth=4 >> td >> nth=1 >> text=/L1 Sequence Confirmed/`)
        await this.actions.verifyElementIsDisplayed(`table >> tr >> nth=4 >> td >> nth=2 >> text=/.*go/`)
        await this.clickTableRowCol(4, 3, `a`)
        expect(this.page.url()).toContain(this.l2URL())
        await this.open()

        await this.actions.verifyElementIsDisplayed(`table >> tr >> nth=4 >> td >> nth=4 >> text=/\\w+/`)

        const txPageL1 = await this.openLinkNewPage(ctx, () => this.clickTableRowCol(4, 5, `a`))
        expect(txPageL1.url()).toContain(this.l1URL())
    }
}
