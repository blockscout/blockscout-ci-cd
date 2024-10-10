import { WebActions } from "@lib/WebActions"
import type { BrowserContext, Page } from 'playwright'

export class HomePage {
    ADDRESSES_VERIFIED_TABLE = `div[role="tabpanel"] >> div`

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

    async check_verified_address_page(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`text=Contract Source Code Verified (Partial Match)`, `no contract verification match message is present`)
        await this.actions.verifyElementIsDisplayed(`${this.ADDRESSES_VERIFIED_TABLE} >> nth=10 >> text=/Contract name/`, `no contract name field is present`)
        await this.actions.verifyElementIsDisplayed(`${this.ADDRESSES_VERIFIED_TABLE} >> nth=11 >> text=/TestToken/`, `no contract name field is present`)
        await this.actions.verifyElementIsDisplayed(`${this.ADDRESSES_VERIFIED_TABLE} >> nth=13 >> text=/Compiler version/`, `no contract name field is present`)
        await this.actions.verifyElementIsDisplayed(`${this.ADDRESSES_VERIFIED_TABLE} >> nth=14 >> text=/v0\\.8\\.17\\+commit\\.8df45f5f/`, `no contract name field is present`)
        await this.actions.verifyElementIsDisplayed(`${this.ADDRESSES_VERIFIED_TABLE} >> nth=16 >> text=/EVM version/`, `no contract name field is present`)
        await this.actions.verifyElementIsDisplayed(`${this.ADDRESSES_VERIFIED_TABLE} >> nth=17 >> text=/default/`, `no contract name field is present`)
        await this.actions.verifyElementIsDisplayed(`${this.ADDRESSES_VERIFIED_TABLE} >> nth=19 >> text=/Optimization enabled/`, `no contract name field is present`)
        await this.actions.verifyElementIsDisplayed(`${this.ADDRESSES_VERIFIED_TABLE} >> nth=20 >> text=/true/`, `no contract name field is present`)
        await this.actions.verifyElementIsDisplayed(`${this.ADDRESSES_VERIFIED_TABLE} >> nth=22 >> text=/Optimization runs/`, `no contract name field is present`)
        await this.actions.verifyElementIsDisplayed(`${this.ADDRESSES_VERIFIED_TABLE} >> nth=23 >> text=/200/`, `no contract name field is present`)
        await this.actions.verifyElementIsDisplayed(`${this.ADDRESSES_VERIFIED_TABLE} >> nth=25 >> text=/Verified at/`, `no contract name field is present`)
        await this.actions.verifyElementIsDisplayed(`${this.ADDRESSES_VERIFIED_TABLE} >> nth=26 >> text=/UTC/`, `no contract name field is present`)
        await this.actions.verifyElementIsDisplayed(`${this.ADDRESSES_VERIFIED_TABLE} >> nth=28 >> text=/Constructor Arguments/`, `no contract name field is present`)
        await this.actions.verifyElementIsDisplayed(`${this.ADDRESSES_VERIFIED_TABLE} >> nth=30 >> text=/_name/`, `no contract name field is present`)
        await this.actions.verifyElementIsDisplayed(`${this.ADDRESSES_VERIFIED_TABLE} >> nth=30 >> text=/_symbol/`, `no contract name field is present`)
        await this.actions.verifyElementIsDisplayed(`${this.ADDRESSES_VERIFIED_TABLE} >> nth=30 >> text=/randomVar/`, `no contract name field is present`)
        await this.actions.verifyElementIsDisplayed(`${this.ADDRESSES_VERIFIED_TABLE} >> nth=30 >> text=/EPICV/`, `no contract name field is present`)
    }

    async delay(amount: number): Promise<void> {
        await this.actions.delay(amount)
    }
}
