import { WebActions } from "@lib/WebActions"
import type { BrowserContext, Page } from 'playwright'
import { HomePage } from "./Home"

export class GnosisHome extends HomePage {
    readonly page: Page

    actions: WebActions

    DAILY_TXNS = `text=Daily transactions`

    DAILY_TXNS_DATA = `[data-selector="tx_per_day"]`

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(): Promise<void> {
        await this.actions.navigateToURL(`/xdai/mainnet`)
    }

    async verifyComponents(ctx: BrowserContext): Promise<void> {
        await this.verifyWidgetTiles()
        await this.verifyNavbarComponents()
        await this.verifyNetworkDashboardStats([`xDai Price`, `$`, `Total Value Locked`, `$`, `Gas tracker`, `Gwei`])
        await this.actions.verifyElementIsDisplayed(this.DAILY_TXNS, `no daily txns stats are displayed`)
        await this.actions.verifyElementContainsText(this.DAILY_TXNS_DATA, `,`)
        await this.verifyNetworksDashboardChartComponents()
        await this.visitGithubRelease(ctx)
    }
}
