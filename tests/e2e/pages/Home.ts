import { WebActions } from "@lib/WebActions"
import type { BrowserContext, Page } from 'playwright'

export class HomePage {
    SIGN_IN = `text=Sign in`

    SEARCH_INPUT = `#main-search-autocomplete`

    AD_BANNER = `#ad-banner`

    GITHUB_VERSION_LINK = `//div[contains(text(), 'Version')]//following-sibling::a`

    RELEASE_DIST_URL_ROOT = `https://github.com/blockscout/blockscout/releases`

    // navbar
    LOGO = `#navbar-logo`

    BLOCKCHAIN_TAB = `text=Blockchain`

    BLOCKCHAIN_TAB_BLOCKS = `a:has-text("Blocks") >> nth=0`

    BLOCKCHAIN_TAB_TRANSACTIONS = `text=Validated`

    BLOCKCHAIN_TAB_TRANSACTIONS_MINED = `text=Mined`

    BLOCKCHAIN_TAB_VERIFIED_CONTRACTS = `text=Verified contracts`

    BLOCKS_TAB = `#navbarBlocksDropdown`

    TRANSACTIONS_TAB = `#navbarTransactionsDropdown`

    TOKENS_TAB = `#navbarTokensDropdown`

    APPS_TAB = `#navbarAppsDropdown`

    NETWORKS_SELECT_TAB = `#navbarDropdown`

    DARK_MODE_CHANGER = `#dark-mode-changer`

    // Small text on dashboard under the plot
    NETWORK_STATS_BAR = `[class="dashboard-banner-chart-legend"]`

    NETWORK_STATS_DIVS = `[class="dashboard-banner-chart-legend"] >> div >> nth=0`

    // Network dashboard
    NETWORK_DASHBOARD_CHART = `[class=dashboard-banner-chart]`

    NETWORK_DASHBOARD_CHART_DATA_CONTAINER = `[class=dashboard-banner-chart-legend]`

    NETWORK_DASHBOARD_CHART_XDAI_PRICE_TEXT = `xDai Price`

    NETWORK_DASHBOARD_CHART_XDAI_PRICE = `text=${this.NETWORK_DASHBOARD_CHART_XDAI_PRICE_TEXT}`

    NETWORK_DASHBOARD_CHART_XDAI_PRICE_DATA = `//span[contains(text(),'${this.NETWORK_DASHBOARD_CHART_XDAI_PRICE_TEXT}')]/following-sibling::div/span[contains(text(),'$')]`

    NETWORK_DASHBOARD_CHART_GAS_TRACKER_TEXT = `Gas tracker`

    NETWORK_DASHBOARD_CHART_GAS_TRACKER = `text=${this.NETWORK_DASHBOARD_CHART_GAS_TRACKER_TEXT}`

    NETWORK_DASHBOARD_CHART_GAS_TRACKER_DATA = `//span[contains(text(),'${this.NETWORK_DASHBOARD_CHART_GAS_TRACKER_TEXT}')]/following-sibling::div//div[@class='flex-column' and contains(text(), 'Gwei')]`

    NETWORK_DASHBOARD_CHART_XDAI_TVL_TEXT = `Total Value Locked`

    NETWORK_DASHBOARD_CHART_XDAI_TVL = `text=${this.NETWORK_DASHBOARD_CHART_XDAI_TVL_TEXT}`

    NETWORK_DASHBOARD_CHART_XDAI_TVL_DATA = `//span[contains(text(),'${this.NETWORK_DASHBOARD_CHART_XDAI_TVL_TEXT}')]/following-sibling::div//span[@class='dashboard-banner-chart-legend-value' and contains(text(), '$')]`

    NETWORK_DASHBOARD_CHART_XDAI_DAILY_TRANSACTIONS_TEXT = `Daily`

    NETWORK_DASHBOARD_CHART_XDAI_DAILY_TRANSACTIONS = `text=${this.NETWORK_DASHBOARD_CHART_XDAI_DAILY_TRANSACTIONS_TEXT}`

    NETWORK_DASHBOARD_CHART_XDAI_DAILY_TRANSACTIONS_DATA = `//span[contains(text(),'${this.NETWORK_DASHBOARD_CHART_XDAI_DAILY_TRANSACTIONS_TEXT}')]/following-sibling::span`

    // group on the right
    NETWORK_CHART_AVG_BLOCK_TIME = `text=Average block time`

    NETWORK_CHART_AVG_BLOCK_TIME_DATA = `//span[@data-selector='average-block-time' and contains(text(), 'seconds')]`

    NETWORK_CHART_TOTAL_TRANSACTIONS = `text=Total transactions`

    NETWORK_CHART_TOTAL_TRANSACTIONS_DATA = `//span[@data-selector='transaction-count' and contains(text(), ',')]`

    NETWORK_CHART_TOTAL_BLOCKS = `text=Total blocks`

    NETWORK_CHART_TOTAL_BLOCKS_DATA = `//span[@data-selector='block-count' and contains(text(), ',')]`

    NETWORK_CHART_WALLET_ADDRESSES = `text=Wallet addresses`

    NETWORK_CHART_WALLET_ADDRESSES_DATA = `//span[@data-selector='address-count' and contains(text(), ',')]`

    BLOCKS_GOTO = `text=View All Blocks`

    BLOCKS = `[data-selector="chain-block"]`

    TRANSACTIONS_GOTO = `text=View All Transactions`

    TRANSACTIONS = `[data-test='chain_transaction']`

    // Verified contracts

    readonly page: Page

    actions: WebActions

    constructor(page: Page) {
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(): Promise<void> {
        await this.actions.navigateToURL(`/`)
    }

    async open_verificated_contracts(): Promise<void> {
        await this.actions.navigateToURL(`/`)
        await this.actions.clickElement(this.BLOCKCHAIN_TAB)
        await this.actions.clickElement(this.BLOCKCHAIN_TAB_VERIFIED_CONTRACTS)
    }

    async check_verified_contracts_list(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`h2 >> text=Contracts`, `no contracts header`)
        await this.actions.verifyElementIsDisplayed(`h2 >> text=Verified contracts`, `no verified contracts header`)
        await this.actions.verifyElementIsDisplayed(`[class="d-flex flex-column"] >> nth=0 >> text=/\\d+/`, `no verified contracts header`)
        await this.actions.verifyElementIsDisplayed(`[class="d-flex flex-column"] >> nth=1 >> text=/\\d+/`, `no verified contracts header`)
        await this.actions.verifyElementIsDisplayed(`[class="d-flex flex-column"] >> nth=2 >> text=/\\d+/`, `no verified contracts header`)
        await this.actions.verifyElementIsDisplayed(`[class="d-flex flex-column"] >> nth=3 >> text=/\\d+/`, `no verified contracts header`)
        await this.actions.verifyElementIsDisplayed(`th >> nth=0 >> text=Address`, `no verified contracts header`)
        await this.actions.verifyElementIsDisplayed(`th >> nth=1 >> text=Balance`, `no verified contracts header`)
        await this.actions.verifyElementIsDisplayed(`th >> nth=2 >> text=Txns`, `no verified contracts header`)
        await this.actions.verifyElementIsDisplayed(`th >> nth=3 >> text=Compiler`, `no verified contracts header`)
        await this.actions.verifyElementIsDisplayed(`th >> nth=4 >> text=Version`, `no verified contracts header`)
        await this.actions.verifyElementIsDisplayed(`th >> nth=5 >> text=Optimization`, `no verified contracts header`)
        await this.actions.verifyElementIsDisplayed(`th >> nth=6 >> text=Constructor args`, `no verified contracts header`)
        await this.actions.verifyElementIsDisplayed(`th >> nth=7 >> text=Verified`, `no verified contracts header`)
        await this.actions.verifyElementIsDisplayed(`th >> nth=8 >> text=Market cap`, `no verified contracts header`)

        await this.actions.verifyElementIsDisplayed(`td >> nth=0 >> a >> text=/TestToken/`, `no test contracts address`)
        await this.actions.verifyElementIsDisplayed(`td >> nth=0 >> a >> text=0x`, `no test contracts address`)
        // await this.actions.verifyElementIsDisplayed(`td >> nth=1 >> text=//`, `no test contracts address`)
        await this.actions.verifyElementIsDisplayed(`td >> nth=2 >> text=/\\d+|N/A/`, `no test contracts transactions`)
        await this.actions.verifyElementIsDisplayed(`td >> nth=3 >> text=Solidity`, `no test contracts compiler type`)
        await this.actions.verifyElementIsDisplayed(`td >> nth=4 >> text=/v\\d+/`, `no test contracts compiler version`)
        await this.actions.verifyElementIsDisplayed(`td >> nth=5 >> i`, `no optimizations icon`)
        await this.actions.verifyElementIsDisplayed(`td >> nth=6 >> i`, `no constructor args icon`)
        await this.actions.verifyElementIsDisplayed(`td >> nth=7 >> text=ago`, `no verified date`)
        await this.actions.verifyElementIsDisplayed(`td >> nth=8 >> text=N/A`, `no market cap`)
    }

    async delay(amount: number): Promise<void> {
        await this.actions.delay(amount)
    }

    async verifyComponents(ctx: BrowserContext): Promise<void> {
        await this.verifyWidgetTiles()
        await this.verifyNavbarComponents()
        await this.verifyNetworksDashboardChartComponents()
        await this.visitGithubRelease(ctx)
    }

    async verifyNavbarComponents(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(this.LOGO, `no logo have been found`)
        await this.actions.verifyElementIsDisplayed(this.SEARCH_INPUT, `no search have been found`)
        await this.actions.verifyElementIsDisplayed(this.BLOCKS_TAB, `no blockchain tab have been found`)
        await this.actions.verifyElementIsDisplayed(this.TRANSACTIONS_TAB, `no blocks tab have been found`)
        await this.actions.verifyElementIsDisplayed(this.TOKENS_TAB, `no tokens tab have been found`)
        await this.actions.verifyElementIsDisplayed(this.NETWORKS_SELECT_TAB, `no networks select tab have been found`)
        await this.actions.verifyElementIsDisplayed(this.DARK_MODE_CHANGER, `no dark mode selector tab have been found`)
    }

    async verifyWidgetTiles(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(this.BLOCKS_GOTO, `no blocks page widget link have been found`)
        await this.actions.verifyElementIsDisplayed(this.BLOCKS, `no block tiles have been found`)
        await this.actions.verifyElementIsDisplayed(this.TRANSACTIONS_GOTO, `no transactions page widget link have been found`)
        await this.actions.verifyElementIsDisplayed(this.TRANSACTIONS, `no transactions tiles have been found`)
    }

    async verifyNetworkDashboardStats(stats: string[]): Promise<void> {
        // eslint-disable-next-line guard-for-in
        for (const idx in stats) {
            // eslint-disable-next-line no-await-in-loop
            await this.actions.verifyElementContainsText(`${this.NETWORK_STATS_BAR} >> div >> nth=${idx}`, stats[idx])
        }
    }

    async verifyNetworksDashboardChartComponents(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(this.NETWORK_DASHBOARD_CHART, `no network chart have been found`)
        await this.actions.verifyElementIsDisplayed(this.NETWORK_DASHBOARD_CHART_DATA_CONTAINER, `no network chart data have been found`)
        await this.actions.verifyElementIsDisplayed(this.NETWORK_DASHBOARD_CHART_GAS_TRACKER, `no gas tracker is displayed`)
        await this.actions.verifyElementIsDisplayed(this.NETWORK_DASHBOARD_CHART_GAS_TRACKER_DATA, `no gas tracker data is displayed`)
        // group on the right
        await this.actions.verifyElementIsDisplayed(this.NETWORK_CHART_AVG_BLOCK_TIME, `no avg block time is displayed`)
        await this.actions.verifyElementIsDisplayed(this.NETWORK_CHART_AVG_BLOCK_TIME_DATA, `no avg block time data is displayed`)
        await this.actions.verifyElementIsDisplayed(this.NETWORK_CHART_TOTAL_TRANSACTIONS, `no total transactions is displayed`)
        await this.actions.verifyElementIsDisplayed(this.NETWORK_CHART_TOTAL_TRANSACTIONS_DATA, `no total transactions data is displayed`)
        await this.actions.verifyElementIsDisplayed(this.NETWORK_CHART_TOTAL_BLOCKS, `no total blocks is displayed`)
        await this.actions.verifyElementIsDisplayed(this.NETWORK_CHART_TOTAL_BLOCKS_DATA, `no total blocks data is displayed`)
        await this.actions.verifyElementIsDisplayed(this.NETWORK_CHART_WALLET_ADDRESSES, `no wallet addresses is displayed`)
        await this.actions.verifyElementIsDisplayed(this.NETWORK_CHART_WALLET_ADDRESSES_DATA, `no wallet addresses data is displayed`)
    }

    async visitGithubRelease(ctx: BrowserContext): Promise<void> {
        await this.actions.verifyNewWindowUrl(ctx, this.GITHUB_VERSION_LINK, this.RELEASE_DIST_URL_ROOT)
    }

    async selectBlocksTab(): Promise<void> {
        await this.actions.clickElement(this.BLOCKS_TAB)
    }
}
