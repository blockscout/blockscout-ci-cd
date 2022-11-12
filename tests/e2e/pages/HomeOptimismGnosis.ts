import { WebActions } from "@lib/WebActions"
import type { BrowserContext, Page } from 'playwright'
import { HomePage } from "./Home"

export class GnosisOptimismHome extends HomePage {
    readonly page: Page

    actions: WebActions

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(): Promise<void> {
        await this.actions.navigateToURL(`https://blockscout.com/xdai/optimism`)
    }

    async verifyNavbarComponents(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(this.LOGO, `no logo have been found`)
        await this.actions.verifyElementIsDisplayed(this.SEARCH_INPUT, `no search have been found`)
        await this.actions.verifyElementIsDisplayed(this.BLOCKCHAIN_TAB, `no blockchain tab have been found`)
        await this.actions.clickElement(this.BLOCKCHAIN_TAB)
        await this.actions.verifyElementIsDisplayed(this.BLOCKCHAIN_TAB_BLOCKS, `no blocks tab have been found`)
        await this.actions.verifyElementIsDisplayed(this.BLOCKCHAIN_TAB_TRANSACTIONS, `no transactions tab have been found`)
        await this.actions.verifyElementIsDisplayed(this.TOKENS_TAB, `no tokens tab have been found`)
        await this.actions.verifyElementIsDisplayed(this.NETWORKS_SELECT_TAB, `no networks select tab have been found`)
        await this.actions.verifyElementIsDisplayed(this.DARK_MODE_CHANGER, `no dark mode selector tab have been found`)
    }

    async verifyComponents(ctx: BrowserContext): Promise<void> {
        await this.verifyWidgetTiles()
        await this.verifyNavbarComponents()
        await this.verifyNetworkDashboardStats()
        await this.verifyNetworksDashboardChartComponents()
        await this.visitGithubRelease(ctx)
    }

    async verifyNetworksDashboardChartComponents(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(this.NETWORK_DASHBOARD_CHART, `no network chart have been found`)
        await this.actions.verifyElementIsDisplayed(this.NETWORK_DASHBOARD_CHART_DATA_CONTAINER, `no network chart data have been found`)
        await this.actions.verifyElementIsDisplayed(this.NETWORK_DASHBOARD_CHART_GAS_TRACKER, `no gas tracker is displayed`)
        await this.actions.verifyElementIsDisplayed(this.NETWORK_DASHBOARD_CHART_GAS_TRACKER_DATA, `no gas tracker data is displayed`)
        await this.actions.verifyElementIsDisplayed(this.NETWORK_CHART_TOTAL_TRANSACTIONS, `no total transactions is displayed`)
        await this.actions.verifyElementIsDisplayed(this.NETWORK_CHART_TOTAL_TRANSACTIONS_DATA, `no total transactions data is displayed`)
        await this.actions.verifyElementIsDisplayed(this.NETWORK_CHART_TOTAL_BLOCKS, `no total blocks is displayed`)
        await this.actions.verifyElementIsDisplayed(this.NETWORK_CHART_TOTAL_BLOCKS_DATA, `no total blocks data is displayed`)
        await this.actions.verifyElementIsDisplayed(this.NETWORK_CHART_WALLET_ADDRESSES, `no wallet addresses is displayed`)
        await this.actions.verifyElementIsDisplayed(this.NETWORK_CHART_WALLET_ADDRESSES_DATA, `no wallet addresses data is displayed`)
    }

    async verifyNetworkDashboardStats(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_STATS_DIVS}0 >> text=Gas tracker`, ``)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_STATS_DIVS}0 >> text=/\\d+/`, ``)
    }
}
