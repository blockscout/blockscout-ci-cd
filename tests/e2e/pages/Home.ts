import { WebActions } from "@lib/WebActions"
import type { BrowserContext, Page } from 'playwright'

let actions: WebActions

export class HomePageObjects {
    SIGN_IN = `text=Sign in`

    SEARCH_INPUT = `#main-search-autocomplete`

    AD_BANNER = `#ad-banner`

    GITHUB_VERSION_LINK = `//div[contains(text(), 'Version')]//following-sibling::a`

    RELEASE_DIST_URL_ROOT = `https://github.com/blockscout/blockscout/releases`

    // navbar
    LOGO = `#navbar-logo`

    BLOCKS_TAB = `#navbarBlocksDropdown`

    TRANSACTIONS_TAB = `#navbarTransactionsDropdown`

    TOKENS_TAB = `#navbarTokensDropdown`

    APPS_TAB = `#navbarAppsDropdown`

    NETWORKS_SELECT_TAB = `#navbarDropdown`

    DARK_MODE_CHANGER = `#dark-mode-changer`

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
    NETWORK_DASHBOARD_CHART_XDAI_AVG_BLOCK_TIME = `text=Average block time`

    NETWORK_DASHBOARD_CHART_XDAI_AVG_BLOCK_TIME_DATA = `//span[@data-selector='average-block-time' and contains(text(), 'seconds')]`

    NETWORK_DASHBOARD_CHART_XDAI_TOTAL_TRANSACTIONS = `text=Total transactions`

    NETWORK_DASHBOARD_CHART_XDAI_TOTAL_TRANSACTIONS_DATA = `//span[@data-selector='transaction-count' and contains(text(), ',')]`

    NETWORK_DASHBOARD_CHART_XDAI_TOTAL_BLOCKS = `text=Total blocks`

    NETWORK_DASHBOARD_CHART_XDAI_TOTAL_BLOCKS_DATA = `//span[@data-selector='block-count' and contains(text(), ',')]`

    NETWORK_DASHBOARD_CHART_XDAI_WALLET_ADDRESSES = `text=Wallet addresses`

    NETWORK_DASHBOARD_CHART_XDAI_WALLET_ADDRESSES_DATA = `//span[@data-selector='address-count' and contains(text(), ',')]`

    // blocks feed
    BLOCKS_GOTO = `text=View All Blocks`

    BLOCKS = `[data-selector="chain-block"]`

    // transactions feed
    TRANSACTIONS_GOTO = `text=View All Transactions`

    TRANSACTIONS = `[data-test='chain_transaction']`
}

export class HomePage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
        actions = new WebActions(this.page)
    }

    po = new HomePageObjects()

    async open(): Promise<void> {
        await actions.navigateToURL(`/`)
    }

    async verifyComponents(ctx: BrowserContext): Promise<void> {
        await actions.verifyElementIsDisplayed(this.po.LOGO, `no logo have been found`)
        await actions.verifyElementIsDisplayed(this.po.SIGN_IN, `no sign in have been found`)
        await actions.verifyElementIsDisplayed(this.po.SEARCH_INPUT, `no search have been found`)
        await this.verifyNavbarComponents()
        await actions.verifyElementIsDisplayed(this.po.BLOCKS_GOTO, `no blocks page widget link have been found`)
        await actions.verifyElementIsDisplayed(this.po.BLOCKS, `no block tiles have been found`)
        await actions.verifyElementIsDisplayed(this.po.TRANSACTIONS_GOTO, `no transactions page widget link have been found`)
        await actions.verifyElementIsDisplayed(this.po.TRANSACTIONS, `no transactions tiles have been found`)
        await this.verifyNetworksDashboardChartComponents()
        await this.visitGithubRelease(ctx)
    }

    async verifyNavbarComponents(): Promise<void> {
        await actions.verifyElementIsDisplayed(this.po.BLOCKS_TAB, `no blocks tab have been found`)
        await actions.verifyElementIsDisplayed(this.po.TRANSACTIONS_TAB, `no transactions tab have been found`)
        await actions.verifyElementIsDisplayed(this.po.TOKENS_TAB, `no tokens tab have been found`)
        await actions.verifyElementIsDisplayed(this.po.APPS_TAB, `no apps tab have been found`)
        // TODO: not displayed in local deployment
        await actions.verifyElementIsDisplayed(this.po.NETWORKS_SELECT_TAB, `no networks select tab have been found`)
        await actions.verifyElementIsDisplayed(this.po.DARK_MODE_CHANGER, `no dark mode selector tab have been found`)
    }

    async verifyNetworksDashboardChartComponents(): Promise<void> {
        await actions.verifyElementIsDisplayed(this.po.NETWORK_DASHBOARD_CHART, `no network chart have been found`)
        await actions.verifyElementIsDisplayed(this.po.NETWORK_DASHBOARD_CHART_DATA_CONTAINER, `no network chart data have been found`)
        await actions.verifyElementIsDisplayed(this.po.NETWORK_DASHBOARD_CHART_XDAI_PRICE, `no xDAI price is displayed`)
        await actions.verifyElementIsDisplayed(this.po.NETWORK_DASHBOARD_CHART_XDAI_PRICE_DATA, `no xDAI price data is displayed`)
        await actions.verifyElementIsDisplayed(this.po.NETWORK_DASHBOARD_CHART_GAS_TRACKER, `no gas tracker is displayed`)
        await actions.verifyElementIsDisplayed(this.po.NETWORK_DASHBOARD_CHART_GAS_TRACKER_DATA, `no gas tracker data is displayed`)
        await actions.verifyElementIsDisplayed(this.po.NETWORK_DASHBOARD_CHART_XDAI_TVL, `no TVL is displayed`)
        await actions.verifyElementIsDisplayed(this.po.NETWORK_DASHBOARD_CHART_XDAI_TVL_DATA, `no TVL data is displayed`)
        await actions.verifyElementIsDisplayed(this.po.NETWORK_DASHBOARD_CHART_XDAI_DAILY_TRANSACTIONS, `no daily transactions is displayed`)
        await actions.verifyElementIsDisplayed(this.po.NETWORK_DASHBOARD_CHART_XDAI_DAILY_TRANSACTIONS_DATA, `no daily transactions data is displayed`)
        // group on the right
        await actions.verifyElementIsDisplayed(this.po.NETWORK_DASHBOARD_CHART_XDAI_AVG_BLOCK_TIME, `no avg block time is displayed`)
        await actions.verifyElementIsDisplayed(this.po.NETWORK_DASHBOARD_CHART_XDAI_AVG_BLOCK_TIME_DATA, `no avg block time data is displayed`)
        await actions.verifyElementIsDisplayed(this.po.NETWORK_DASHBOARD_CHART_XDAI_TOTAL_TRANSACTIONS, `no total transactions is displayed`)
        await actions.verifyElementIsDisplayed(this.po.NETWORK_DASHBOARD_CHART_XDAI_TOTAL_TRANSACTIONS_DATA, `no total transactions data is displayed`)
        await actions.verifyElementIsDisplayed(this.po.NETWORK_DASHBOARD_CHART_XDAI_TOTAL_BLOCKS, `no total blocks is displayed`)
        await actions.verifyElementIsDisplayed(this.po.NETWORK_DASHBOARD_CHART_XDAI_TOTAL_BLOCKS_DATA, `no total blocks data is displayed`)
        await actions.verifyElementIsDisplayed(this.po.NETWORK_DASHBOARD_CHART_XDAI_WALLET_ADDRESSES, `no wallet addresses is displayed`)
        await actions.verifyElementIsDisplayed(this.po.NETWORK_DASHBOARD_CHART_XDAI_WALLET_ADDRESSES_DATA, `no wallet addresses data is displayed`)
    }

    async visitGithubRelease(ctx: BrowserContext): Promise<void> {
        await actions.verifyNewWindowUrl(ctx, this.po.GITHUB_VERSION_LINK, this.po.RELEASE_DIST_URL_ROOT)
    }

    async selectBlocksTab(): Promise<void> {
        await actions.clickElement(this.po.BLOCKS_TAB)
    }
}
