import { WebActions } from "@lib/WebActions"
import type { BrowserContext, Page } from 'playwright'
import { expect } from "@playwright/test"
import { CommonPage } from "./Common"

export class NewHomePage extends CommonPage {
    SEARCH_BAR = `input >> nth=0`

    SEARCH_ITEM = `section[role="dialog"] >> nth=1 >> div >> nth=`

    SEARCH_ITEMS = `section[role="dialog"] >> nth=1`

    SEARCH_ITEMS_ICONS = `div[id="search_bar_popover_content"] >> nth=1 >> svg`

    BLOCKS_WIDGET = `text=/Latest blocks/ >> ..`

    BATCHES_WIDGET = `text=/Latest batch/ >> ..`

    BLOCKS_WIDGET_LAST_BLOCK = `${this.BLOCKS_WIDGET} >> div >> div >> nth=0`

    TXNS_FIELDS = `body >> div >> nth=98 >> div >> div >> div >> div >> div >> div >> div`

    MONTHS_REGEX = `/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sept|Oct|Nov|Dec/`

    NATIVE_ACCOUNTS_ROW = `table >> tr >> nth=1 >> td`

    BLOCKS_HEADER = `table >> tr >> nth=0 >> th`

    BLOCKS_FIRST_ROW = `table >> tr >> nth=2 >> td`

    RECENT_BLOCK_URL = `table >> tr >> nth=2 >> td >> a >> nth=0`

    BLOCK_PAGE_IS_VALID = `h1 >> text=/Block\\s\\#\\d+/`

    GAS_TRACKER_ON = `div >> div >> nth=4 >> span >> nth=0 >> text=/ETH/`

    GAS_TRACKER_POPUP = `div >> div >> nth=6 >> span >> nth=1 >> text=/$.*/`

    GAS_TRACKER_HEADER_TEXT = `div[id="__next"] >> div >> div >> nth=1 >> text=`

    GAS_TRACKER_HEADER_URL = `div[id="__next"] >> div >> div >> nth=1 >> a`

    readonly page: Page

    actions: WebActions

    currentPage: string

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async checkENSHeader(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`main >> th >> nth=0 >> text=/Domain/`)
        await this.actions.verifyElementIsDisplayed(`main >> th >> nth=1 >> text=/Address/`)
        await this.actions.verifyElementIsDisplayed(`main >> th >> nth=2 >> text=/Registered on/`)
        await this.actions.verifyElementIsDisplayed(`main >> th >> nth=3 >> text=/Expiration date/`)
    }

    async sortENSRows(): Promise<void> {
        await this.actions.clickElement(`text=/Registered on/ >> nth=2`)
        await this.actions.clickElement(`text=/Registered on/ >> nth=2`)
    }

    async checkENSRow(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`main >> tr >> nth=2 >> td >> nth=0 >> text=/\\w+/`)
        await this.actions.verifyElementIsDisplayed(`main >> tr >> nth=2 >> td >> nth=1 >> text=/0x.*/`)
        await this.actions.verifyElementIsDisplayed(`main >> tr >> nth=2 >> td >> nth=2 >> text=/.*ago/`)
        await this.actions.verifyElementIsDisplayed(`main >> tr >> nth=2 >> td >> nth=3 >> text=/Expires in.*/`)
    }

    async UserOpsIsOn(): Promise<boolean> {
        await this.actions.clickElement(`text=/Blockchain/`)
        return this.actions.page.isVisible(`text=/User operations/`)
    }

    async BlobIsOn(): Promise<boolean> {
        return this.actions.page.isVisible(`text=/Blob txns/`)
    }

    async hasWriteContractTab(): Promise<boolean> {
        return this.page.getByRole(`tab`, { name: `Write contract` }).isVisible()
    }

    async checkBlobTransactions(): Promise<void> {
        await this.page.click(`text=/Blob txns/`)
        const firstRow = `text=/Blob txn$/ >> ../../../.. >> nth=0`
        await this.actions.verifyElementIsDisplayed(`${firstRow} >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${firstRow} >> text=/.*ago/`)
        await this.actions.verifyElementIsDisplayed(`${firstRow} >> text=/Success/`)
        await this.actions.verifyElementIsDisplayed(`${firstRow} >> div >> nth=10 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${firstRow} >> div >> nth=13 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${firstRow} >> td >> nth=5 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${firstRow} >> td >> nth=6 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${firstRow} >> td >> nth=7 >> text=/\\d+/`)
    }

    async openFirstVerifiedContract(url: string): Promise<void> {
        await this.open_custom(`${url}/verified-contracts`)
        await this.page.click(`main >> table >> td >> nth=0 >> a`)
    }

    async checkContractReadTabs(): Promise<void> {
        await this.page.getByRole(`tab`, { name: `Read contract` }).click()
        await this.page.getByText(`DisconnectedConnect wallet`).isVisible()
        await this.page.getByText(`Contract information`).isVisible()
        await this.page.getByText(`Expand all`).click()
        await this.page.getByText(`Collapse all`).click()
        await this.page.getByText(`Reset`).click()
        await this.actions.verifyElementIsDisplayed(`div[role='tabpanel'] >> section >> nth=1 >> text=/1..*/`)
    }

    async checkContractsWriteTabs(): Promise<void> {
        await this.page.getByRole(`tab`, { name: `Write contract` }).click()
        await this.page.getByText(`DisconnectedConnect wallet`).isVisible()
        await this.page.getByText(`Expand all`).click()
        await this.page.getByText(`Collapse all`).click()
        await this.page.getByText(`Reset`).click()
        await this.page.getByText(`Contract information`).isVisible()
        await this.actions.verifyElementIsDisplayed(`div[role='tabpanel'] >> section >> nth=1 >> text=/1..*/`)
    }

    async checkContractsCodeTab(): Promise<void> {
        await this.page.getByLabel(`Code`, { exact: true }).getByText(`Contract name`).isVisible()
        await this.page.getByText(`EVM version`).isVisible()
        await this.page.getByText(`Optimization runs`).isVisible()
        await this.page.getByText(`Contract file path`).isVisible()
        await this.page.getByText(`Compiler version`).isVisible()
        await this.page.getByText(`Optimization enabled`).isVisible()
        await this.page.getByText(`Verified at`).isVisible()
        await this.page.getByText(`Contract source code`, { exact: true }).isVisible()
    }

    async checkERC721Inventory(data: any): Promise<void> {
        await expect(this.page.getByText(`ERC-721`)).toBeVisible()
        await expect(this.page.getByText(`Max total supply`)).toBeVisible()
        await expect(this.page.locator(`p`).filter({ hasText: `Holders` })).toBeVisible()
        await expect(this.page.getByText(`Transfers`, { exact: true })).toBeVisible()
        await expect(this.page.getByText(`Sponsored`)).toBeVisible()
        await expect(this.page.getByRole(`tab`, { name: `Inventory` })).toBeVisible()
        await expect(this.page.getByRole(`tab`, { name: `Token transfers` })).toBeVisible()
        await expect(this.page.getByRole(`tab`, { name: `Holders` })).toBeVisible()
        await expect(this.page.getByRole(`tab`, { name: `Contract` })).toBeVisible()
        await expect(this.page.getByRole(`tab`, { name: `Contract` })).toBeVisible()

        await this.actions.verifyElementIsDisplayed(this.tokenInventoryElement(0, 0))
        await this.actions.verifyElementIsDisplayed(`${this.tokenInventoryElement(0, 2)} >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.tokenInventoryElement(0, 4)} >> text=/0x/`)
    }

    async checkInventoryERC721Element(data: any): Promise<void> {
        await expect(this.page.getByText(`ERC-721`)).toBeVisible()
        await expect(this.page.getByText(`Owner`)).toBeVisible()
        await expect(this.page.getByText(`Creator`)).toBeVisible()
        await expect(this.page.locator(`p`).filter({ hasText: `Token ID` })).toBeVisible()
        await expect(this.page.getByText(`Transfers`, { exact: true })).toBeVisible()
        await expect(this.page.getByText(`Name`)).toBeVisible()
        await expect(this.page.getByText(`Description`)).toBeVisible()
        await expect(this.page.getByText(`Attributes`)).toBeVisible()
        await expect(this.page.getByText(`Sponsored`)).toBeVisible()
    }

    async checkInventoryERC721MetadataTab(data: any): Promise<void> {
        await this.page.getByRole(`tab`, { name: `Metadata` }).click()
        await this.page.getByRole(`combobox`).selectOption(`JSON`)
        const textContent = await this.page.locator(`body >> section >> div >> nth=26`).textContent()
        const minified = JSON.stringify(JSON.parse(textContent))
        await expect(minified).toContain(
            data.metadata,
        )
    }

    async checkERC404Inventory(data: any): Promise<void> {
        await expect(this.page.getByText(`ERC-404`, { exact: true })).toBeVisible()
        await expect(this.page.getByText(`Max total supply`)).toBeVisible()
        await expect(this.page.locator(`p`).filter({ hasText: `Holders` })).toBeVisible()
        await expect(this.page.getByText(`Transfers`, { exact: true })).toBeVisible()
        await expect(this.page.getByText(`Decimals`)).toBeVisible()
        await expect(this.page.getByText(`Sponsored`)).toBeVisible()
        await expect(this.page.getByRole(`tab`, { name: `Inventory` })).toBeVisible()
        await expect(this.page.getByRole(`tab`, { name: `Token transfers` })).toBeVisible()
        await expect(this.page.getByRole(`tab`, { name: `Holders` })).toBeVisible()
        await expect(this.page.getByRole(`tab`, { name: `Contract` })).toBeVisible()
    }

    async checkInventoryERC404Element(data: any): Promise<void> {
        await expect(this.page.getByText(`ERC-404`, { exact: true })).toBeVisible()
        await expect(this.page.getByText(`Owner`)).toBeVisible()
        await expect(this.page.getByText(`Creator`)).toBeVisible()
        await expect(this.page.locator(`p`).filter({ hasText: `Token ID` })).toBeVisible()
        await expect(this.page.getByText(`Transfers`, { exact: true })).toBeVisible()
        await expect(this.page.getByText(`Name`)).toBeVisible()
        await expect(this.page.getByText(`Description`)).toBeVisible()
        await expect(this.page.getByText(`Attributes`)).toBeVisible()
        await expect(this.page.getByText(`Sponsored`)).toBeVisible()
    }

    async checkInventoryERC404MetadataTab(data: any): Promise<void> {
        await this.page.getByRole(`tab`, { name: `Metadata` }).click()
        await this.page.getByRole(`combobox`).selectOption(`JSON`)
        const textContent = await this.page.locator(`body >> section >> div >> nth=26`).textContent()
        const minified = JSON.stringify(JSON.parse(textContent))
        await expect(minified).toContain(
            data.metadata,
        )
    }

    async checkERC1155Inventory(data: any): Promise<void> {
        await expect(this.page.getByText(`ERC-1155`)).toBeVisible()
        await expect(this.page.getByText(`Max total supply`)).toBeVisible()
        await expect(this.page.locator(`p`).filter({ hasText: `Holders` })).toBeVisible()
        await expect(this.page.getByText(`Transfers`, { exact: true })).toBeVisible()
        await expect(this.page.getByText(`Sponsored`)).toBeVisible()
        await expect(this.page.getByRole(`tab`, { name: `Inventory` })).toBeVisible()
        await expect(this.page.getByRole(`tab`, { name: `Token transfers` })).toBeVisible()
        await expect(this.page.getByRole(`tab`, { name: `Holders` })).toBeVisible()
        await expect(this.page.getByRole(`tab`, { name: `Contract` })).toBeVisible()
    }

    async checkInventoryERC1155Element(data: any): Promise<void> {
        await expect(this.page.getByText(`ERC-1155`)).toBeVisible()
        await expect(this.page.getByText(`Owner`, { exact: true })).toBeVisible()
        await expect(this.page.getByText(`Creator`)).toBeVisible()
        await expect(this.page.locator(`p`).filter({ hasText: `Token ID` })).toBeVisible()
        await expect(this.page.getByText(`Transfers`, { exact: true })).toBeVisible()
        await expect(this.page.getByText(`Sponsored`)).toBeVisible()
    }

    async checkInventoryERC1155MetadataTab(data: any): Promise<void> {
        await this.page.getByRole(`tab`, { name: `Metadata` }).click()
        await this.page.getByRole(`combobox`).selectOption(`JSON`)
        const textContent = await this.page.locator(`body >> section >> div >> nth=26`).textContent()
        const minified = JSON.stringify(JSON.parse(textContent))
        await expect(minified).toContain(
            data.metadata,
        )
    }

    tokenInventoryElement(row: number, el: number): string {
        return `div[role="tabpanel"] >> nth=${row} >> div >> div >> div >> nth=0 >> div >> nth=${el}`
    }

    async checkContractUMLDiagram(): Promise<void> {
        await this.page.getByRole(`link`, { name: `View UML diagram` }).click()
        await this.page.getByText(`/For contract0x.*/`).isVisible()
        await this.page.getByRole(`img`, { name: `/Contract.*/` }).isVisible()
    }

    async checkParticularBlob(url: string, addr: string): Promise<void> {
        await this.open_custom(`${url}/tx/${addr}`)
        await this.actions.clickElement(`text=/Blobs/`)
        await this.page.getByRole(`link`, { name: `0x01a78ecbd6c01ab745dd85878ca57b67f3bb9629351e1c53bb18f0d3ac21484d` }).click()
        await this.page.getByRole(`link`, { name: `0x671cc5e15f140d220c36b0abaf0f76afd108c23c83cc63bb8ded37de1ffffc5b` }).isVisible()
        await this.page.getByText(`0x01a78ecbd6c01ab745dd85878ca57b67f3bb9629351e1c53bb18f0d3ac21484d`, { exact: true }).isVisible()
        await this.page.getByText(`Sponsored`).isVisible()
        await this.page.getByText(`Blob details`).isVisible()
        await this.page.locator(`div`).filter({ hasText: /^Blob details$/ }).first().click()
    }

    async checkUserOpsHeader(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`main >> th >> nth=0 >> text=/User op hash/`)
        await this.actions.verifyElementIsDisplayed(`main >> th >> nth=1 >> text=/Age/`)
        await this.actions.verifyElementIsDisplayed(`main >> th >> nth=2 >> text=/Status/`)
        await this.actions.verifyElementIsDisplayed(`main >> th >> nth=3 >> text=/Sender/`)
        await this.actions.verifyElementIsDisplayed(`main >> th >> nth=4 >> text=/Tx hash/`)
        await this.actions.verifyElementIsDisplayed(`main >> th >> nth=5 >> text=/Block/`)
        await this.actions.verifyElementIsDisplayed(`main >> th >> nth=6 >> text=/Fee ETH/`)
    }

    async checkUserOpsRow(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`main >> td >> nth=0 >> text=/0x.*/`)
        await this.actions.verifyElementIsDisplayed(`main >> td >> nth=1 >> text=/.*ago/`)
        await this.actions.verifyElementIsDisplayed(`main >> td >> nth=2 >> text=/Success|Failed/`)
        await this.actions.verifyElementIsDisplayed(`main >> td >> nth=3 >> text=/0x.*/`)
        await this.actions.verifyElementIsDisplayed(`main >> td >> nth=4 >> text=/0x.*/`)
        await this.actions.verifyElementIsDisplayed(`main >> td >> nth=5 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`main >> td >> nth=6 >> text=/\\d+/`)
    }

    async search(text: string): Promise<void> {
        await this.actions.enterElementText(this.SEARCH_BAR, text)
    }

    async checkSearchItemText(pos: number, text: string): Promise<void> {
        await this.actions.verifyElementContainsText(`${this.SEARCH_ITEM}${pos}`, text)
    }

    async findInSearchItems(text: string): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`text=/${text}/`)
    }

    async open(options = { waitUntil: `load` }): Promise<void> {
        await this.actions.navigateToURL(`/`, options)
    }

    async open_custom(url: string, options = { waitUntil: `load` }): Promise<void> {
        this.currentPage = url
        await this.actions.navigateToURL(url, options)
        await this.delay(5000)
    }

    async isENSEnabled(): Promise<boolean> {
        await this.actions.page.hover(`text=/Blockchain/`)
        return this.page.isVisible(`text=/Name services lookup/`)
    }

    async isGasTrackerOn(): Promise<boolean> {
        return this.actions.page.isVisible(this.GAS_TRACKER_ON)
    }

    async checkGasTrackerPopup(): Promise<void> {
        await this.actions.page.hover(this.GAS_TRACKER_HEADER_URL)
        await this.delay(2000)
        await this.actions.verifyElementIsDisplayed(`text=/Last update/`)
        await this.actions.verifyElementIsDisplayed(`text=/Fast/`)
        await this.actions.verifyElementIsDisplayed(`text=/.*Gwei/`)
    }

    async checkGasTrackerView(): Promise<void> {
        await this.actions.navigateToURL(`${this.currentPage}/gas-tracker`)
        await this.actions.verifyElementIsDisplayed(`main >> text=/Network utilization \\d+.\\d+% — .* load/`)
        await this.actions.verifyElementIsDisplayed(`main >> text=/Last updated.*/`)
        await this.actions.verifyElementIsDisplayed(`text=/Average gas price/`)

        await this.actions.verifyElementIsDisplayed(`main >> ul >> li >> nth=0 >> div >> nth=0 >> text=/Fast.*/`)
        await this.actions.verifyElementIsDisplayed(`main >> ul >> li >> nth=0 >> div >> nth=3 >> text=/$.*/`)
        await this.actions.verifyElementIsDisplayed(`main >> ul >> li >> nth=0 >> div >> nth=4 >> text=/\\d+ Gwei per transaction / \\d+/`)
        await this.actions.verifyElementIsDisplayed(`main >> ul >> li >> nth=0 >> div >> nth=5 >> text=/Base.*\\d+.*/.*Priority.*\\d+.*/`)

        await this.actions.verifyElementIsDisplayed(`main >> ul >> li >> nth=1 >> div >> nth=0 >> text=/Normal.*/`)
        await this.actions.verifyElementIsDisplayed(`main >> ul >> li >> nth=1 >> div >> nth=3 >> text=/$.*/`)
        await this.actions.verifyElementIsDisplayed(`main >> ul >> li >> nth=1 >> div >> nth=4 >> text=/\\d+ Gwei per transaction / \\d+/`)
        await this.actions.verifyElementIsDisplayed(`main >> ul >> li >> nth=1 >> div >> nth=5 >> text=/Base.*\\d+.*/.*Priority.*\\d+.*/`)

        await this.actions.verifyElementIsDisplayed(`main >> ul >> li >> nth=2 >> div >> nth=0 >> text=/Slow.*/`)
        await this.actions.verifyElementIsDisplayed(`main >> ul >> li >> nth=2 >> div >> nth=3 >> text=/$.*/`)
        await this.actions.verifyElementIsDisplayed(`main >> ul >> li >> nth=2 >> div >> nth=4 >> text=/\\d+ Gwei per transaction / \\d+/`)
        await this.actions.verifyElementIsDisplayed(`main >> ul >> li >> nth=2 >> div >> nth=5 >> text=/Base.*\\d+.*/.*Priority.*\\d+.*/`)
    }

    async checkGasTrackerBar(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.GAS_TRACKER_HEADER_TEXT}/$.*/`)
        await this.actions.verifyElementIsDisplayed(`${this.GAS_TRACKER_HEADER_TEXT}/.*%/`)
        await this.actions.verifyElementIsDisplayed(`${this.GAS_TRACKER_HEADER_TEXT}/Gas/`)
        await this.actions.verifyElementIsDisplayed(this.GAS_TRACKER_POPUP)
    }

    async checkIndexing(): Promise<void> {
        // why any event from waitUntil is not working?
        // waitUntil?: "load"|"domcontentloaded"|"networkidle"|"commit";
        await this.delay(2000)
        const indexingInProgress = await this.actions.page.$(`text=/We're indexing this/`)
        if (indexingInProgress) {
            this.HEADER_STATS = `main >> div >> nth=10 >> div >> div`
        }
    }

    async checkL2Blocks(context: BrowserContext): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=0 >> text=/Block/`, `no Blocks header is present`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=1 >> text=/Size.*bytes/`, `no Size in bytes header is present`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=2 >> text=/Validator|Miner/`, `no Validator|Miner header is present`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=3 >> text=/Txn/`, `no Txn header is present`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=4 >> text=/Gas used/`, `no Gas used header is present`)

        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=0 >> text=/\\d+.*ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=1 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=2 >> text=/0x|\\w/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=3 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=4 >> text=/\\d+/`)

        await this.actions.clickElement(this.RECENT_BLOCK_URL)
        await this.actions.verifyElementIsDisplayed(this.BLOCK_PAGE_IS_VALID)
    }

    async checkBlocksnoMiner(context: BrowserContext): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=0 >> text=/Block/`, `no Blocks header is present`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=1 >> text=/Size.*bytes/`, `no Size in bytes header is present`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=3 >> text=/Txn/`, `no Txn header is present`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=4 >> text=/Gas used/`, `no Gas used header is present`)

        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=0 >> text=/\\d+.*ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=1 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=3 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=4 >> text=/\\d+.*/`)

        await this.actions.clickElement(this.RECENT_BLOCK_URL)
        await this.actions.verifyElementIsDisplayed(this.BLOCK_PAGE_IS_VALID)
    }

    async checkBlocksNoFees(context: BrowserContext): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=0 >> text=/Block/`, `no Blocks header is present`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=1 >> text=/Size.*bytes/`, `no Size in bytes header is present`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=2 >> text=/Validator|Miner/`, `no Validator|Miner header is present`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=3 >> text=/Txn/`, `no Txn header is present`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=4 >> text=/Gas used/`, `no Gas used header is present`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=5 >> text=/Reward.*/`, `no Reward header is present`)

        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=0 >> text=/\\d+.*ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=1 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=2 >> text=/0x|\\w/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=3 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=4 >> text=/\\d+.*\\d+\\%.*\\d+\\%/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=5 >> text=/\\d+/`)

        await this.actions.clickElement(this.RECENT_BLOCK_URL)
        await this.actions.verifyElementIsDisplayed(this.BLOCK_PAGE_IS_VALID)
    }

    async checkBlocksNoHeader(context: BrowserContext): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=0 >> text=/Block/`, `no Blocks header is present`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=1 >> text=/Size.*bytes/`, `no Size in bytes header is present`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=2 >> text=/Txn/`, `no Txn header is present`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=3 >> text=/Gas used/`, `no Gas used header is present`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=4 >> text=/Reward.*/`, `no Reward header is present`)

        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=0 >> text=/\\d+.*ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=1 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=2 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=3 >> text=/\\d+.*\\d+\\%.*\\d+\\%/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=4 >> text=/\\d+/`)

        await this.actions.clickElement(this.RECENT_BLOCK_URL)
        await this.actions.verifyElementIsDisplayed(this.BLOCK_PAGE_IS_VALID)
    }

    async checkBlocksNoHeaderNoReward(context: BrowserContext): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=0 >> text=/Block/`, `no Blocks header is present`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=1 >> text=/Size.*bytes/`, `no Size in bytes header is present`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=2 >> text=/Txn/`, `no Txn header is present`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=3 >> text=/Gas used/`, `no Gas used header is present`)

        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=0 >> text=/\\d+.*ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=1 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=2 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=3 >> text=/\\d+.*/`)

        await this.actions.clickElement(this.RECENT_BLOCK_URL)
        await this.actions.verifyElementIsDisplayed(this.BLOCK_PAGE_IS_VALID)
    }

    async checkBlocksImmutable(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=0 >> text=/Block/`, `no Blocks header is present`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=1 >> text=/Size.*bytes/`, `no Size in bytes header is present`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=2 >> text=/Txn/`, `no Txn header is present`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=3 >> text=/Gas used/`, `no Gas used header is present`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=4 >> text=/Reward.*/`, `no Reward header is present`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=5 >> text=/Burnt fees.*/`, `no Burnt fees header is present`)

        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=0 >> text=/\\d+.*ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=1 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=2 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=3 >> text=/\\d+.*\\d+\\%.*\\d+\\%/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=4 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=5 >> text=/\\d+.*\\d+\\%/`)

        await this.actions.clickElement(this.RECENT_BLOCK_URL)
        await this.actions.verifyElementIsDisplayed(this.BLOCK_PAGE_IS_VALID)
    }

    async checkBlocks(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=0 >> text=/Block/`, `no Blocks header is present`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=1 >> text=/Size.*bytes/`, `no Size in bytes header is present`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=2 >> text=/Validator|Miner/`, `no Validator|Miner header is present`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=3 >> text=/Txn/`, `no Txn header is present`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=4 >> text=/Gas used/`, `no Gas used header is present`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=5 >> text=/Reward.*/`, `no Reward header is present`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_HEADER} >> nth=6 >> text=/Burnt fees.*/`, `no Burnt fees header is present`)

        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=0 >> text=/\\d+.*ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=1 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=2 >> text=/0x|\\w/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=3 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=4 >> text=/\\d+.*\\d+\\%.*\\d+\\%/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=5 >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_FIRST_ROW} >> nth=6 >> text=/\\d+.*\\d+\\%/`)

        await this.actions.clickElement(this.RECENT_BLOCK_URL)
        await this.actions.verifyElementIsDisplayed(this.BLOCK_PAGE_IS_VALID)
    }

    async checkNativeAccounts(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.NATIVE_ACCOUNTS_ROW} >> nth=0 >> text=/\\d+/`, `no idx in native accounts`)
        await this.actions.verifyElementIsDisplayed(`${this.NATIVE_ACCOUNTS_ROW} >> nth=3 >> text=/\\d+/`, `no balance in native accounts`)
        await this.actions.verifyElementIsDisplayed(`${this.NATIVE_ACCOUNTS_ROW} >> nth=4 >> text=/\\d+/`, `no percentage in native accounts`)
        await this.actions.verifyElementIsDisplayed(`${this.NATIVE_ACCOUNTS_ROW} >> nth=5 >> text=/\\d+/`, `no txn count in native accounts`)
    }

    async checkNativeAccountsNoPerc(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.NATIVE_ACCOUNTS_ROW} >> nth=0 >> text=/\\d+/`, `no idx in native accounts`)
        await this.actions.verifyElementIsDisplayed(`${this.NATIVE_ACCOUNTS_ROW} >> nth=3 >> text=/\\d+/`, `no balance in native accounts`)
        await this.actions.verifyElementIsDisplayed(`${this.NATIVE_ACCOUNTS_ROW} >> nth=4 >> text=/\\d+/`, `no txn count in native accounts`)
    }

    async checkVerifiedContractsStats(): Promise<void> {
        await this.displayed_in_parent(`text=/Total contracts/`, `text=/\\d+/`, 2, `no total contracts`)
        await this.displayed_in_parent(`text=/Verified contracts/`, `text=/\\d+/`, 2, `no verified contracts`)
        await this.actions.verifyElementIsDisplayed(`${this.NATIVE_ACCOUNTS_ROW} >> nth=0 >> text=/0x/`, `no contract name/address`)
        await this.actions.verifyElementIsDisplayed(`${this.NATIVE_ACCOUNTS_ROW} >> nth=1 >> text=/\\d+/`, `no contract balance`)
        await this.actions.verifyElementIsDisplayed(`${this.NATIVE_ACCOUNTS_ROW} >> nth=2 >> text=/\\d+/`, `no contract txs`)
        await this.actions.verifyElementIsDisplayed(`${this.NATIVE_ACCOUNTS_ROW} >> nth=3 >> text=/solidity.*\\d+.\\d+.\\d+/`, `no compiler/version`)
        await this.actions.verifyElementIsDisplayed(`${this.NATIVE_ACCOUNTS_ROW} >> nth=5 >> text=/.*ago.*/`, `no verification date`)
    }

    async checkHeader(): Promise<void> {
        await this.displayed_in_parent(`text=/Total blocks/`, `text=/\\d+.*/`, 2, `no total blocks`)
        await this.displayed_in_parent(`text=/Average block time/`, `text=/\\d+.*/`, 2, `no avg block time`)
        await this.displayed_in_parent(`text=/Total transactions/`, `text=/\\d+.*/`, 2, `no total transactions`)
        await this.displayed_in_parent(`text=/Wallet addresses/`, `text=/\\d+.*/`, 2, `no wallet addresses`)
    }

    async checkHeaderL2(): Promise<void> {
        await this.displayed_in_parent(`text=/Latest batch/`, `text=/\\d+.*/`, 2, `no total blocks`)
        await this.displayed_in_parent(`text=/Average block time/`, `text=/\\d+.*/`, 2, `no avg block time`)
        await this.displayed_in_parent(`text=/Total transactions/`, `text=/\\d+.*/`, 2, `no total transactions`)
        await this.displayed_in_parent(`text=/Wallet addresses/`, `text=/\\d+.*/`, 2, `no wallet addresses`)
    }

    async checkStatsCounters(): Promise<void> {
        await this.displayed_in_parent(`text=/Average block time/`, `text=/\\d+.*s/`, 2, `no avg block time`)
        await this.displayed_in_parent(`text=/Completed txns/`, `text=/\\d+.*/`, 2, `no completed txns`)
        await this.displayed_in_parent(`text=/Number of verified contracts today/`, `text=/\\d+.*/`, 2, `no number of verified contracts today`)
        await this.displayed_in_parent(`text=/Total accounts/`, `text=/\\d+.*/`, 2, `no total accounts`)
        await this.displayed_in_parent(`text=/Total blocks/`, `text=/\\d+.*/`, 2, `no total blocks`)
        await this.displayed_in_parent(`text=/Total ETH transfers/`, `text=/\\d+.*/`, 2, `no total native coin trasfers`)
        await this.displayed_in_parent(`text=/Total tokens/`, `text=/\\d+.*/`, 2, `no total tokens`)
        await this.displayed_in_parent(`text=/Total txns/`, `text=/\\d+.*/`, 2, `no total txns`)
        await this.displayed_in_parent(`text=/Total verified contracts/`, `text=/\\d+.*/`, 2, `no total verified contracts`)
    }

    async checkStatsGraphsDisplayed(): Promise<void> {
        await this.displayed_in_parent(`text=/Accounts growth/`, `text=${this.MONTHS_REGEX}`, 3, `no accounts growth`)
        await this.displayed_in_parent(`text=/Active accounts/`, `text=${this.MONTHS_REGEX}`, 3, `no active accounts`)
        await this.displayed_in_parent(`text=/New accounts/`, `text=${this.MONTHS_REGEX}`, 3, `no new accounts`)

        await this.displayed_in_parent(`text=/Average block rewards/`, `text=${this.MONTHS_REGEX}`, 3, `no avg block rewards`)
        await this.displayed_in_parent(`text=/Average block size/`, `text=${this.MONTHS_REGEX}`, 3, `no avg block size`)
        await this.displayed_in_parent(`text=/New blocks/`, `text=${this.MONTHS_REGEX}`, 3, `no new blocks`)

        await this.displayed_in_parent(`text=/New verified contracts/`, `text=${this.MONTHS_REGEX}`, 3)
        await this.displayed_in_parent(`text=/Verified contracts growth/`, `text=${this.MONTHS_REGEX}`, 3, `no verified contracts growth`)

        await this.displayed_in_parent(`text=/Average gas limit/`, `text=${this.MONTHS_REGEX}`, 3, `no avg gas limit`)
        await this.displayed_in_parent(`text=/Average gas price/`, `text=${this.MONTHS_REGEX}`, 3, `no avg gas price`)
        await this.displayed_in_parent(`text=/Gas used growth/`, `text=${this.MONTHS_REGEX}`, 3, `no gas used growth`)

        await this.displayed_in_parent(`text=/New ETH transfers/`, `text=${this.MONTHS_REGEX}`, 3, `no new native coin transfers`)

        await this.displayed_in_parent(`text=/Average transaction fee/`, `text=${this.MONTHS_REGEX}`, 3, `no avg transaction fee`)
        await this.displayed_in_parent(`text=/New transactions/`, `text=${this.MONTHS_REGEX}`, 3, `no new transactions`)
        await this.displayed_in_parent(`text=/Transactions fees/`, `text=${this.MONTHS_REGEX}`, 3, `no transactions fees`)
        await this.displayed_in_parent(`text=/Transactions growth/`, `text=${this.MONTHS_REGEX}`, 3, `no transactions growth`)
        await this.displayed_in_parent(`text=/Transactions success rate/`, `text=${this.MONTHS_REGEX}`, 3, `no transactions success rate`)
    }

    async checkBlocksWidget(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(this.BLOCKS_WIDGET)
        await this.actions.verifyElementIsDisplayed(this.BLOCKS_WIDGET_LAST_BLOCK)
    }

    async checkDailyTransactions(): Promise<void> {
        await this.displayed_in_parent(`text=/Daily transactions/`, `text=/\\d+.*/`, 2, `no daily transactions`)
    }

    async check_last_block(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> text=/.*ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> text=/Txn/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK}  >> text=/Reward/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> text=/\\d+/`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> text=Validator`)
        await this.actions.verifyElementIsDisplayed(`${this.BLOCKS_WIDGET_LAST_BLOCK} >> text=/0x/`)
    }

    async check_txn_widget(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_FIELDS} >> nth=0 >> text=/Token transfer/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_FIELDS} >> nth=1 >> text=/Success/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_FIELDS} >> nth=5 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_FIELDS} >> nth=6 >> text=/ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_FIELDS} >> nth=10 >> text=/NFTV/`)

        await this.actions.verifyElementIsDisplayed(`${this.TXNS_FIELDS} >> nth=11 >> text=/Contract creation/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_FIELDS} >> nth=12 >> text=/Success/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_FIELDS} >> nth=16 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_FIELDS} >> nth=17 >> text=/ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_FIELDS} >> nth=21 >> text=/NFTV/`)

        await this.actions.verifyElementIsDisplayed(`${this.TXNS_FIELDS} >> nth=22 >> text=/Contract call/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_FIELDS} >> nth=23 >> text=/Failed/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_FIELDS} >> nth=27 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_FIELDS} >> nth=28 >> text=/ago/`)
        await this.actions.verifyElementIsDisplayed(`${this.TXNS_FIELDS} >> nth=32 >> text=/EPICV/`)
    }
}
