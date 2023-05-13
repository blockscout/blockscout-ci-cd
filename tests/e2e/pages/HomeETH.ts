import { WebActions } from "@lib/WebActions"
import type { BrowserContext, Page } from 'playwright'
import { HomePage } from "./Home"
import { NewHomePage } from "./NewHome"

export class ETHHome extends NewHomePage {
    readonly page: Page

    actions: WebActions

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(): Promise<void> {
        await this.actions.navigateToURL(`https://eth.blockscout.com/`)
    }

    async verifyComponents(ctx: BrowserContext): Promise<void> {
    }
}
