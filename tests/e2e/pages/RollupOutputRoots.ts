import { expect } from "@playwright/test"
import { WebActions } from "@lib/WebActions"
import type { Page, BrowserContext } from 'playwright'
import { HomeRollup } from "./HomeRollup"

export class RollupOutputRootsPage extends HomeRollup {
    readonly page: Page

    actions: WebActions

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(): Promise<void> {
        await this.actions.navigateToURL(`https://blockscout-optimism-goerli.test.aws-k8s.blockscout.com/l2-output-roots`)
    }

    async validateTable(ctx: BrowserContext): Promise<void> {
        await this.clickTableRowCol(4, 2, `a`)
        expect(this.page.url()).toContain(this.l2URL())
        await this.open()
        const txL1 = await this.openLinkNewPage(ctx, () => this.clickTableRowCol(4, 3))
        expect(txL1.url()).toContain(this.l1URL())
    }
}
