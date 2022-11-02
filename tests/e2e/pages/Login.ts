/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { APIRequestContext, request } from "@playwright/test"
import { WebActions } from "@lib/WebActions"
import { MailSlurp } from "mailslurp-client"
import type { Page } from 'playwright'
import Contracts from "@lib/Contracts"
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

export interface PublicTagSpec {
    name?: string
    email?: string
    companyName?: string
    companyWebSite?: string
    myProjectCheckBox: boolean
    tags: string[]
    addresses: string[]
    description: string
}

export class AuthorizedArea extends CommonPage {
    readonly page: Page

    readonly ms: MailSlurp

    readonly contracts: Contracts

    actions: WebActions

    ACCOUNT_MENU_PROFILE = `text=Profile`

    PROFILE_NAME = `#name`

    PROFILE_NICKNAME = `#nickname`

    PROFILE_EMAIL = `#email`

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

    SAVE_BTN = `section >> button >> nth=1`

    ADD_ADDRESS_BUTTON = `text=Add address`

    WARN_ADDRESS_REQUIRED = `text=Address required >> span`

    WARN_NAME_REQUIRED = `text=Name required >> span`

    WARN_ADDRESS_INVALID = `text=is invalid`

    PRIVATE_TAGS_TAB = `text=Private tags`

    ADDRESS_TAGS_TAB = `//button[text()="Address"]`

    TRANSACTION_TAGS_TAB = `//button[text()="Transaction"]`

    ADDRESS_TAGS_TAB_ADD_ADDRESS = `text=Add address tag`

    ADDRESS_TAGS_ADDRESS_INPUT = `#address`

    ADDRESS_TAGS_NAME_INPUT = `#tag`

    TX_TAGS_TAB = `section >> text=Transaction Tags`

    TX_TAGS_TAB_ADD_TX = `text=Add transaction tag`

    TX_TAGS_TX_INPUT = `#transaction`

    TX_TAGS_NAME_INPUT = `#tag`

    API_KEYS_TAB = `text=API Keys`

    API_KEYS_ADD_BTN = `text=Add API Key`

    API_KEYS_NAME_INPUT = `#name`

    PUBLIC_TAGS_TAB = `text=Public Tags`

    PUBLIC_TAGS_TAB_BTN = `text=Request to add public tag`

    PUBLIC_TAGS_NAME_INPUT = `#fullName`

    PUBLIC_TAGS_EMAIL_INPUT = `#email`

    PUBLIC_TAGS_COMPANY_INPUT = `#companyName`

    PUBLIC_TAGS_WEBSITE_INPUT = `#companyUrl`

    PUBLIC_TAGS_PROJECT_CHECKBOX = `text=I want to add tags to my project`

    PUBLIC_TAGS_INCORRECT_CHECKBOX = `text=I want to report an incorrect public tag`

    PUBLIC_TAGS_TAGS_INPUT = `#tags`

    PUBLIC_TAGS_ADDRESSES_INPUT = `#address`

    PUBLIC_TAGS_ALIAS_ADDRESSES_INPUT = `#address >> nth=1`

    PUBLIC_TAGS_DESCRIPTION_INPUT = `#comment`

    PUBLIC_TAGS_ADD_FIELD = `[aria-label="add"]`

    PUBLIC_TAGS_SEND_BTN = `text=Send request`

    DELETE_ROW_ICON = `[aria-label="delete"]`

    DELETE_ROW_BTN = `text=Delete`

    constructor(page: Page, ms: MailSlurp, contracts: Contracts) {
        super(page)
        this.page = page
        this.ms = ms
        this.contracts = contracts
        this.actions = new WebActions(this.page)
    }

    async open(options?: Object): Promise<void> {
        await this.actions.navigateToURL(process.env.BLOCKSCOUT_URL, options)
    }

    async openAccount(options?: Object): Promise<void> {
        await this.actions.navigateToURL(process.env.BLOCKSCOUT_URL, options)
        await this.actions.clickElement(this.ACCOUNT_MENU)
        await this.actions.clickElement(this.ACCOUNT_MENU_PROFILE)
    }

    async selectPrivateTagsTab(): Promise<void> {
        await this.actions.clickElement(this.PRIVATE_TAGS_TAB)
    }

    async selectAddressTagTab(): Promise<void> {
        await this.actions.clickElement(this.ADDRESS_TAGS_TAB)
    }

    async selectTXTagTab(): Promise<void> {
        await this.actions.clickElement(this.TRANSACTION_TAGS_TAB)
    }

    async selectAPIKeysTab(): Promise<void> {
        await this.actions.clickElement(this.API_KEYS_TAB)
    }

    async selectPublicTagsTab(): Promise<void> {
        await this.actions.clickElement(this.PUBLIC_TAGS_TAB)
    }

    async selectWatchlistTab(): Promise<void> {
        await this.actions.clickElement(this.WATCHLIST_TAB)
    }

    async newAPIContext(username: string, password: string, options?: Object): Promise<APIRequestContext> {
        await this.actions.navigateToURL(`/auth/auth0_api`, options)
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
        await this.actions.clickElement(this.SIGN_IN)
        await this.actions.enterElementText(this.AUTH0_INPUT_USERNAME, email)
        await this.actions.enterElementText(this.AUTH0_INPUT_PASSWORD, password)
        await this.actions.clickElement(this.AUTH0_SUBMIT)
    }

    async checkProfile(): Promise<void> {
        await this.actions.verifyElementAttribute(this.PROFILE_NAME, `value`, `3cad691b-44e3-4613-bab2-c3ef59ae1f03@mailslurp.com`)
        await this.actions.verifyElementAttribute(this.PROFILE_NICKNAME, `value`, `3cad691b-44e3-4613-bab2-c3ef59ae1f03`)
        await this.actions.verifyElementAttribute(this.PROFILE_EMAIL, `value`, `3cad691b-44e3-4613-bab2-c3ef59ae1f03@mailslurp.com`)
    }

    async checkListRow(row: number, data: any[]): Promise<void> {
        for (const col in data) {
            if (Array.isArray(data[col])) {
                for (const assert of data[col]) {
                    await this.actions.verifyElementContainsText(`tbody >> tr >> nth=${row} >> td >> nth=${col}`, assert)
                }
            } else {
                await this.actions.verifyElementContainsText(`tbody >> tr >> nth=${row} >> td >> nth=${col}`, data[col])
            }
        }
    }

    async clickListRow(row: number, col: number): Promise<void> {
        await this.actions.clickElement(`tbody >> tr >> nth=${row} >> td >> nth=${col} >> div >> a`)
    }

    async addAddressTag(address: string, name: string): Promise<void> {
        await this.actions.clickElement(this.ADDRESS_TAGS_TAB_ADD_ADDRESS)
        await this.actions.enterElementText(this.ADDRESS_TAGS_ADDRESS_INPUT, address)
        await this.actions.enterElementText(this.ADDRESS_TAGS_NAME_INPUT, name)
        await this.actions.clickElement(this.SAVE_BTN)
    }

    async addPublicTag(spec: PublicTagSpec): Promise<void> {
        await this.actions.clickElement(this.PUBLIC_TAGS_TAB_BTN)
        if (spec.name) {
            await this.actions.enterElementText(this.PUBLIC_TAGS_NAME_INPUT, spec.name)
        }
        if (spec.email) {
            await this.actions.enterElementText(this.PUBLIC_TAGS_EMAIL_INPUT, spec.email)
        }
        if (spec.companyName) {
            await this.actions.enterElementText(this.PUBLIC_TAGS_COMPANY_INPUT, spec.companyName)
        }
        if (spec.companyWebSite) {
            await this.actions.enterElementText(this.PUBLIC_TAGS_WEBSITE_INPUT, spec.companyWebSite)
        }
        await this.actions.enterElementText(this.PUBLIC_TAGS_TAGS_INPUT, `${spec.tags[0]};${spec.tags[1]}`)
        await this.actions.enterElementText(this.PUBLIC_TAGS_ADDRESSES_INPUT, spec.addresses[0])
        await this.actions.enterElementText(this.PUBLIC_TAGS_DESCRIPTION_INPUT, spec.description)

        await this.actions.clickElement(this.PUBLIC_TAGS_ADD_FIELD)
        await this.actions.enterElementText(this.PUBLIC_TAGS_ALIAS_ADDRESSES_INPUT, spec.addresses[1])

        await this.actions.clickElement(this.PUBLIC_TAGS_SEND_BTN)
    }

    async addTXTag(txHash: string, name: string): Promise<void> {
        await this.actions.clickElement(this.TX_TAGS_TAB_ADD_TX)
        await this.actions.enterElementText(this.TX_TAGS_TX_INPUT, txHash)
        await this.actions.enterElementText(this.TX_TAGS_NAME_INPUT, name)
        await this.actions.clickElement(this.SAVE_BTN)
    }

    async addAPIKey(name: string): Promise<void> {
        await this.actions.clickElement(this.API_KEYS_ADD_BTN)
        await this.actions.enterElementText(this.API_KEYS_NAME_INPUT, name)
        await this.actions.clickElement(this.SAVE_BTN)
    }

    async deleteRow(): Promise<void> {
        await this.page.reload()
        await this.actions.clickElement(this.DELETE_ROW_ICON)
        await this.actions.clickElement(this.SAVE_BTN)
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
        await this.actions.clickElement(this.SAVE_BTN)
    }

    async checkValidationWarn(asserts: string[]): Promise<void> {
        for (const a of asserts) {
            await this.actions.verifyElementIsDisplayed(`text=${a}`, `validation warning not found`)
        }
    }
}
