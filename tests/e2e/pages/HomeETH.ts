import { WebActions } from "@lib/WebActions"
import type { BrowserContext, Page } from 'playwright'
import { HomePage } from "./Home"
import { NewHomePage } from "./NewHome"

export class ETHHome extends NewHomePage {
    readonly page: Page

    actions: WebActions

    HEADER_TOTAL_BLOCKS = `:below(:text("Total blocks")) >> nth=0`

    HEADER_AVG_BLOCK_TIME = `:below(:text("Average block time")) >> nth=3`

    HEADER_TOTAL_TXNS = `:below(:text("Total transactions")) >> nth=0`

    HEADER_WALLETS = `:below(:text("Wallet addresses")) >> nth=0`

    HEADER_GAS_TRACKER = `:below(:text("Gas tracker")) >> nth=0`

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(): Promise<void> {
        await this.actions.navigateToURL(`https://eth.blockscout.com/`)
    }
}
