/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { APIRequestContext, expect, request } from "@playwright/test"
import { WebActions } from "@lib/WebActions"
import {
    MailSlurp, MatchOptionFieldEnum, MatchOptionShouldEnum, WaitForMatchingEmailsSortEnum,
} from "mailslurp-client"
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

export interface TokenInfoSpec {
    requesterName: string
    requesterEmail: string
    projectName: string
    projectEmail: string
    projectWebsite: string
    docs: string
    support: string
    iconURL: string
    projectDescription: string
}

export class AuthorizedArea extends CommonPage {
    readonly page: Page

    readonly ms: MailSlurp

    readonly contracts: Contracts

    actions: WebActions

    WATCHLIST_TAB = `text=Watch list`

    WATCHLIST_ADDRESS_INPUT = `[role="dialog"] >> text=/Address.*0x/`

    WATCHLIST_ADDRESS_NAME_INPUT = `[role="dialog"] >> text=/Private.*tag.*max.*characters/`

    WATCHLIST_ETHER_IN_CHECKBOX = `text=Incoming >> nth=0`

    WATCHLIST_TOKENS_IN_CHECKBOX = `text=Incoming >> nth=1`

    WATCHLIST_NFT_IN_CHECKBOX = `text=Incoming >> nth=2`

    WATCHLIST_ETHER_OUT_CHECKBOX = `text=Outgoing >> nth=0`

    WATCHLIST_TOKENS_OUT_CHECKBOX = `text=Outgoing >> nth=1`

    WATCHLIST_NFT_OUT_CHECKBOX = `text=Outgoing >> nth=2`

    WATCHLIST_EMAIL_NOTIFICATIONS = `text=Email notifications`

    SAVE_BTN = `section >> button >> nth=1`

    ADD_ADDRESS_BUTTON = `text=/Add address/`

    WARN_ADDRESS_REQUIRED = `text=Address required >> span`

    WARN_NAME_REQUIRED = `text=Name required >> span`

    WARN_ADDRESS_INVALID = `text=is invalid`

    PRIVATE_TAGS_TAB = `text=Private tags`

    ADDRESS_TAGS_TAB = `button >> text=/Address/`

    TRANSACTION_TAGS_TAB = `button >> text=/Transaction/`

    ADDRESS_TAGS_TAB_ADD_ADDRESS = `text=Add address tag`

    ADDRESS_TAGS_ADDRESS_INPUT = `section >> input >> nth=0`

    ADDRESS_TAGS_NAME_INPUT = `section >> input >> nth=1`

    TX_TAGS_TAB = `section >> text=Transaction Tags`

    TX_TAGS_TAB_ADD_TX = `text=Add transaction tag`

    TX_TAGS_TX_INPUT = `section >> input >> nth=0`

    TX_TAGS_NAME_INPUT = `section >> input >> nth=1`

    API_KEYS_TAB = `text=API Keys`

    API_KEYS_ADD_BTN = `text=Add API Key`

    API_KEYS_NAME_INPUT = `section >> input >> nth=0`

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

    DELETE_ROW_ICON = `[aria-label="delete"] >> nth=1`

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
        await this.actions.navigateToURL(`${process.env.BLOCKSCOUT_URL}auth/profile`, options)
    }

    async openWatchlist(options?: Object): Promise<void> {
        await this.actions.navigateToURL(process.env.BLOCKSCOUT_URL, options)
        await this.actions.navigateToURL(`${process.env.BLOCKSCOUT_URL}account/watchlist`, options)
    }

    async openVerifiedAddresses(): Promise<void> {
        await this.actions.navigateToURL(`${process.env.BLOCKSCOUT_URL}account/verified-addresses`)
    }

    async addAddressDetails(ti: TokenInfoSpec): Promise<void> {
        await this.actions.clickElement(`button[aria-label="edit"]`)
        await this.actions.enterElementText(`input[name="requester_name"]`, ti.requesterName)
        await this.actions.enterElementText(`input[name="requester_email"]`, ti.requesterEmail)
        await this.actions.enterElementText(`input[name="project_name"]`, ti.projectName)
        await this.actions.clickElement(`main >> div >> nth=11`)
        await this.actions.clickElement(`text=/Bridge/`)
        await this.actions.enterElementText(`input[name="project_email"]`, ti.projectEmail)
        await this.actions.enterElementText(`input[name="project_website"]`, ti.projectWebsite)
        await this.actions.enterElementText(`input[name="docs"]`, ti.docs)
        await this.actions.enterElementText(`input[name="support"]`, ti.support)
        await this.actions.enterElementText(`input[name="icon_url"]`, ti.iconURL)
        await this.actions.enterElementText(`textarea[name="project_description"]`, ti.projectDescription)
        await this.actions.clickElement(`text=/Send request/`)
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

    async signIn(email: string): Promise<void> {
        await this.actions.clickElement(`text=/Log in/ >> nth=1`)
        await this.actions.clickElement(`text=/Continue with email/`)
        await this.actions.enterElementText(`text=/Email/`, email)
        await this.actions.clickElement(`text=/Send a code/`)
        console.log(`Awaiting OTP code..`)
        await this.delay(10000)
        const ms = new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY })

        const matchingEmails = await ms.waitController.waitForMatchingEmails(
            {
                matchOptions: {
                    matches: [
                        {
                            field: MatchOptionFieldEnum.FROM,
                            should: MatchOptionShouldEnum.CONTAIN,
                            value: `root@auth0.com`,
                        },
                    ],
                },
                count: 1,
                inboxId: `aa226cd3-042c-4f9d-82d1-884d632766f6`,
                timeout: 30000,
                sort: WaitForMatchingEmailsSortEnum.DESC,
            },
        )
        console.log(`subject: ${matchingEmails[0].subject}`)
        const emailId = matchingEmails[0].id
        const em = await ms.getEmail(emailId)
        console.log(`OTP: ${this.extractVerificationCode(em.body)}`)
        const code = this.extractVerificationCode(em.body)
        for (const i in code) {
            const selectorNum = Number(i) + 1
            await this.actions.enterElementText(`form >> input >> nth=${selectorNum}`, code[i])
        }
        await this.actions.clickElement(`form >> text=/Submit/`)
        await this.delay(5000)
        await this.actions.clickElement(`section >> button >> nth=0`)
        console.log(`Signed in`)
    }

    extractVerificationCode(body) {
        const regex = /Your verification code is: <strong[^>]*>(\d+)<\/strong>/
        const match = body.match(regex)
        return match ? match[1] : null
    }

    async checkProfile(): Promise<void> {
        await this.actions.verifyElementAttribute(`body >> input >> nth=2`, `value`, process.env.ACCOUNT_USERNAME)
        await this.actions.verifyElementAttribute(`body >> input >> nth=3`, `value`, process.env.ACCOUNT_USERNAME)
    }

    async check_tag_list(row: number, col: number, text: string): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`tbody >> tr >> nth=${row} >> td >> nth=${col} >> text=/${text}/`)
    }

    async checkNotificationItem(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`table >> tr >> nth=1 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`table >> tr >> nth=1 >> text=/ETH.*balance/`)
        await this.actions.verifyElementIsDisplayed(`table >> tr >> nth=1 >> text=/Net.*worth/`)
    }

    async clickListRow(row: number, col: number): Promise<void> {
        await this.actions.clickElement(`tbody >> tr >> nth=${row} >> td >> nth=${col} >> div >> a`)
    }

    async addAddressTag(address: string, name: string): Promise<void> {
        await this.actions.clickElement(this.ADDRESS_TAGS_TAB_ADD_ADDRESS)
        await this.actions.enterElementText(this.ADDRESS_TAGS_ADDRESS_INPUT, address)
        await this.actions.enterElementText(this.ADDRESS_TAGS_NAME_INPUT, name)
        await this.actions.focusElement(this.SAVE_BTN)
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
        await this.actions.focusElement(this.SAVE_BTN)
        await this.actions.clickElement(this.SAVE_BTN)
    }

    async addAPIKey(name: string): Promise<void> {
        await this.actions.clickElement(this.API_KEYS_ADD_BTN)
        await this.actions.enterElementText(this.API_KEYS_NAME_INPUT, name)
        await this.actions.focusElement(this.SAVE_BTN)
        await this.actions.clickElement(this.SAVE_BTN)
    }

    async deleteRow(): Promise<void> {
        await this.page.reload()
        await this.actions.clickElement(this.DELETE_ROW_ICON)
        await this.actions.clickElement(this.SAVE_BTN)
        await this.actions.delay(5000)
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

    async deleteAddressWatch(): Promise<void> {
        await this.actions.clickElement(`table >> button[aria-label="delete"] >> nth=0`)
        await this.actions.clickElement(`section[role="dialog"] >> nth=5 >> button >> nth=1`)
        await expect(this.page.locator(`table`)).toBeVisible({ visible: false })
    }

    async checkValidationWarn(asserts: string[]): Promise<void> {
        for (const a of asserts) {
            await this.actions.verifyElementIsDisplayed(`text=${a}`, `validation warning not found`)
        }
    }
}
