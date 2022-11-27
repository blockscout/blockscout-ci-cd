/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { WebActions } from "@lib/WebActions"
import { expect } from "@playwright/test"
import type { BrowserContext, Page } from 'playwright'
import { CommonPage } from "./Common"

export interface SubmitAppProps {
    Name: string
    ContractAddr: string
    WebsiteURL: string
    TwitterURL: string
    DiscordURL: string
    GithubURL: string
    Contact: string
    ContactEmail: string
    ResponseEmail: string
}

export class MarketplacePage extends CommonPage {
    page: Page

    readonly actions: WebActions

    APP_TILE_HEADER = `h3 >> a >> text=`

    APP_TILE_BODY = `[role="group"]`

    APP_STARGAZER = `[role="group"] >> [title="Mark as favorite"] >> nth=`

    FILTER = `text=All apps`

    FILTER_ITEM = `[role="menuitem"] >> nth=`

    SUBMIT_APP = `text=Submit an app`

    SUBMIT_BTN = `input[type="button"]`

    AIRTABLE_FORM_INPUT = `input >> nth=`

    FORM_DESCRIPTION = `[class="cellContainer"] >> nth=3 >> [contenteditable="true"]`

    ADD_CATEGORY = `[class="truncate"]`

    CATEGORY_DEFI = `text=DeFi`

    ATTACH_FILE = `text=Attach file`

    ATTACH_URL = `div[title="Link (URL)"] >> span[class="fsp-source-list__icon fsp-icon fsp-icon--url"]`

    URL_INPUT = `[class="fsp-content"] >> input[type="url"]`

    URL_BTN = `[class="fsp-content"] >> button`

    URL_UPLOAD = `[class="fsp-content"] >> text=Upload >> nth=1`

    SUBMIT_VERIFICATION_TEXT = `text=Your responses have been emailed to you`

    AIRTABLE_EMAIL_RESPONSES_CHECK = `text=Email me a copy of my responses`

    apps = {
        Aave: 0,
        Hop: 1,
        'Revoke.cash': 2,
        'Token approval tracker': 3,
    }

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(): Promise<void> {
        await this.actions.navigateToURL(`${process.env.BLOCKSCOUT_URL}/apps`)
    }

    async checkDefaultAppsList(): Promise<void> {
        for (const [key, _] of Object.entries(this.apps)) {
            await this.actions.verifyElementIsDisplayed(`${this.APP_TILE_HEADER}${key}`)
        }
    }

    async addFavoriteApp(name: string): Promise<void> {
        await this.actions.page.hover(`${this.APP_TILE_HEADER}${name}`)
        await this.actions.clickElement(`${this.APP_STARGAZER}${this.apps[name]}`)
    }

    async filterFavorites(name: string): Promise<void> {
        await this.actions.clickElement(this.FILTER)
        await this.actions.clickElement(`${this.FILTER_ITEM}${this.apps[name]}`)
    }

    async checkGroupsVisible(name: string, n: number): Promise<void> {
        const groups = await this.actions.page.$$(this.APP_TILE_BODY)
        expect(groups).toHaveLength(n)
        await this.actions.verifyElementIsDisplayed(`${this.APP_TILE_HEADER}${name}`)
    }

    async submitNewApp(ctx: BrowserContext, p: SubmitAppProps): Promise<void> {
        const [form] = await Promise.all([
            ctx.waitForEvent(`page`),
            await this.actions.clickElement(this.SUBMIT_APP),
        ])
        this.page = form
        await this.page.waitForLoadState(`load`)
        await this.page.fill(`${this.AIRTABLE_FORM_INPUT}0`, p.Name)
        await this.page.fill(`${this.AIRTABLE_FORM_INPUT}1`, p.ContractAddr)
        await this.page.fill(`${this.AIRTABLE_FORM_INPUT}2`, p.WebsiteURL)
        await this.page.fill(`${this.AIRTABLE_FORM_INPUT}2`, p.TwitterURL)
        await this.page.fill(`${this.AIRTABLE_FORM_INPUT}2`, p.DiscordURL)
        await this.page.fill(`${this.AIRTABLE_FORM_INPUT}2`, p.GithubURL)
        await this.page.fill(`${this.AIRTABLE_FORM_INPUT}2`, p.Contact)
        await this.page.click(this.AIRTABLE_EMAIL_RESPONSES_CHECK)
        await this.page.fill(`${this.AIRTABLE_FORM_INPUT}3`, p.ResponseEmail)
        await this.page.fill(`${this.AIRTABLE_FORM_INPUT}2`, p.ContactEmail)
        await this.page.fill(this.FORM_DESCRIPTION, `fsdfksldf`)
        await this.page.click(this.ADD_CATEGORY)
        await this.page.click(this.CATEGORY_DEFI)
        await this.page.click(this.ATTACH_FILE)
        await this.page.hover(this.ATTACH_URL)
        await this.page.click(this.ATTACH_URL)
        await this.page.type(this.URL_INPUT, `http://ya.ru`)
        await this.page.click(this.URL_BTN)
        // await this.delay(5000)
        await this.page.click(this.URL_UPLOAD)
        await this.page.click(this.SUBMIT_BTN)
        // await this.actions.verifyElementIsDisplayed(this.SUBMIT_VERIFICATION_TEXT)
    }
}
