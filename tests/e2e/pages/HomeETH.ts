import { WebActions } from "@lib/WebActions"
import type { BrowserContext, Page } from 'playwright'
import { HomePage } from "./Home"

export class ETHHome extends HomePage {
    readonly page: Page

    actions: WebActions

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async verifyComponents(ctx: BrowserContext): Promise<void> {
        await this.verifyWidgetTiles()
        await this.verifyNavbarComponents()
        await this.verifyNetworkDashboardStats([`ETH Price`, `USD`, `Market Cap`, `USD`, `Gas tracker`, `Gwei`])
        await this.verifyNetworksDashboardChartComponents()
        await this.visitGithubRelease(ctx)
    }
}
