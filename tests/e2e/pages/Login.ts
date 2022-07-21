/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { APIRequestContext, request } from "@playwright/test"
import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'
import testConfig from "../testConfig"
import { CommonPage } from "./Common"

export interface AddressProps {
    token: string[]
    creator: string[]
    balance: string[]
    tokens: string[]
    transactions: string[]
    transfers: string[]
    gasUsed: string[]
    lastBalanceUpdate: string[]
}

export interface WatchListCheckEventChecks {
    Ether: boolean
    Tokens: boolean
    NFT: boolean
}

export interface WatchListSpec {
    address: string
    name: string
    excludeIncoming: WatchListCheckEventChecks
    excludeOutgoing: WatchListCheckEventChecks
    excludeNotifications: boolean
}

export class LoginPage extends CommonPage {
    readonly page: Page

    actions: WebActions

    ACCOUNT_MENU_PROFILE = `text=Profile`

    PROFILE_NAME = `#static-name`

    PROFILE_NICKNAME = `#static-nickname`

    PROFILE_EMAIL = `#static-email`

    WATCHLIST_TAB = `text=Watch list`

    WATCHLIST_ADDRESS_INPUT = `#watchlist_address_address_hash`

    WATCHLIST_ADDRESS_NAME_INPUT = `#watchlist_address_name`

    WATCHLIST_ETHER_IN_CHECKBOX = `text=Incoming >> nth=0`

    WATCHLIST_TOKENS_IN_CHECKBOX = `text=Incoming >> nth=1`

    WATCHLIST_NFT_IN_CHECKBOX = `text=Incoming >> nth=2`

    WATCHLIST_ETHER_OUT_CHECKBOX = `text=Outgoing >> nth=0`

    WATCHLIST_TOKENS_OUT_CHECKBOX = `text=Outgoing >> nth=1`

    WATCHLIST_NFT_OUT_CHECKBOX = `text=Outgoing >> nth=2`

    WATCHLIST_EMAIL_NOTIFICATIONS = `text=Email notifications`

    WATCHLIST_SAVE_BUTTON = `text=Save`

    ADD_ADDRESS_BUTTON = `text=Add address`

    WARN_ADDRESS_REQUIRED = `text=Address required >> span`

    WARN_NAME_REQUIRED = `text=Name required >> span`

    WARN_ADDRESS_INVALID = `text=is invalid`

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(options?: Object): Promise<void> {
        await this.actions.navigateToURL(`/`, options)
    }

    async openAccount(options?: Object): Promise<void> {
        await this.actions.navigateToURL(`/`, options)
        await this.actions.clickElement(this.ACCOUNT_MENU)
        await this.actions.clickElement(this.WATCHLIST_TAB)
    }

    async newAPIContext(username: string, password: string, options?: Object): Promise<APIRequestContext> {
        await this.actions.navigateToURL(`/auth/auth0_api`, options)
        await this.signIn(username, password)
        const content = await this.page.textContent(`html`)
        const token = JSON.parse(content).auth_token
        console.log(`token: ${token}`)
        return request.newContext({
            baseURL: testConfig[process.env.ENV],
            extraHTTPHeaders: {
                Authorization: `Bearer ${token}`,
            },
        })
    }

    async signIn(email: string, password: string): Promise<void> {
        await this.actions.navigateToURL(`/`)
        await this.actions.clickElement(this.SIGN_IN)
        await this.actions.enterElementText(this.AUTH0_INPUT_USERNAME, email)
        await this.actions.enterElementText(this.AUTH0_INPUT_PASSWORD, password)
        await this.actions.clickElement(this.AUTH0_SUBMIT)
    }

    async checkProfile(): Promise<void> {
        await this.actions.clickElement(this.ACCOUNT_MENU)
        await this.actions.clickElement(this.ACCOUNT_MENU_PROFILE)
        await this.actions.verifyElementAttribute(this.PROFILE_NAME, `value`, `fahrbss@gmail.com`)
        await this.actions.verifyElementAttribute(this.PROFILE_NICKNAME, `value`, `fahrbss`)
        await this.actions.verifyElementAttribute(this.PROFILE_EMAIL, `value`, `fahrbss@gmail.com`)
    }

    async checkWatchListRow(data: string[]): Promise<void> {
        for (const idx in data) {
            await this.actions.verifyElementContainsText(`tbody >> tr >> nth=0 >> td >> nth=${idx}`, data[idx])
        }
    }

    async addAddressWatch(data: WatchListSpec): Promise<void> {
        await this.actions.clickElement(this.ADD_ADDRESS_BUTTON)

        await this.actions.enterElementText(this.WATCHLIST_ADDRESS_INPUT, data.address)
        await this.actions.enterElementText(this.WATCHLIST_ADDRESS_NAME_INPUT, data.name)

        if (data.excludeIncoming) {
            if (data.excludeIncoming.Ether) {
                await this.actions.clickElement(this.WATCHLIST_ETHER_IN_CHECKBOX)
            }
            if (data.excludeIncoming.Tokens) {
                await this.actions.clickElement(this.WATCHLIST_TOKENS_IN_CHECKBOX)
            }
            if (data.excludeIncoming.NFT) {
                await this.actions.clickElement(this.WATCHLIST_NFT_IN_CHECKBOX)
            }
        }

        if (data.excludeOutgoing) {
            if (data.excludeOutgoing.Ether) {
                await this.actions.clickElement(this.WATCHLIST_ETHER_OUT_CHECKBOX)
            }
            if (data.excludeOutgoing.Tokens) {
                await this.actions.clickElement(this.WATCHLIST_TOKENS_OUT_CHECKBOX)
            }
            if (data.excludeOutgoing.NFT) {
                await this.actions.clickElement(this.WATCHLIST_NFT_OUT_CHECKBOX)
            }
        }

        if (data.excludeNotifications) {
            await this.actions.clickElement(this.WATCHLIST_EMAIL_NOTIFICATIONS)
        }
        await this.actions.clickElement(this.WATCHLIST_SAVE_BUTTON)
    }

    async checkValidationWarn(asserts: string[]): Promise<void> {
        for (const a in asserts) {
            await this.actions.verifyElementIsDisplayed(`text=${a}`, `validation warning not found`)
        }
    }
}
