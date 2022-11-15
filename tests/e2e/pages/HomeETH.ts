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

    async open(): Promise<void> {
        await this.actions.navigateToURL(`https://blockscout.com/eth/mainnet/`)
    }

    async verifyNavbarComponents(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(this.LOGO, `no logo have been found`)
        await this.actions.verifyElementIsDisplayed(this.SEARCH_INPUT, `no search have been found`)
        await this.actions.verifyElementIsDisplayed(this.BLOCKCHAIN_TAB, `no blockchain tab have been found`)
        await this.actions.clickElement(this.BLOCKCHAIN_TAB)
        await this.actions.verifyElementIsDisplayed(this.BLOCKCHAIN_TAB_BLOCKS, `no blocks tab have been found`)
        await this.actions.verifyElementIsDisplayed(this.BLOCKCHAIN_TAB_TRANSACTIONS_MINED, `no transactions tab have been found`)
        await this.actions.verifyElementIsDisplayed(this.TOKENS_TAB, `no tokens tab have been found`)
        await this.actions.verifyElementIsDisplayed(this.NETWORKS_SELECT_TAB, `no networks select tab have been found`)
        await this.actions.verifyElementIsDisplayed(this.DARK_MODE_CHANGER, `no dark mode selector tab have been found`)
    }

    async verifyComponents(ctx: BrowserContext): Promise<void> {
        await this.verifyWidgetTiles()
        await this.verifyNavbarComponents()
        await this.verifyNetworkDashboardStats([`ETH Price`, `USD`, `Market Cap`, `USD`, `Gas tracker`, `Gwei`])
        await this.verifyNetworksDashboardChartComponents()
        await this.visitGithubRelease(ctx)
    }
}
