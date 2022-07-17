/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'
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

export class LoginPage extends CommonPage {
    readonly page: Page

    actions: WebActions

    SIGN_IN = `text=Sign in`

    AUTH0_SIGN_UP = `text=Sign up`

    AUTH0_INPUT_EMAIL = `input[name="email"]`

    AUTH0_INPUT_USERNAME = `input[name="username"]`

    AUTH0_INPUT_PASSWORD = `input[name="password"]`

    AUTH0_SUBMIT = `button[name="action"]`

    AUTH0_ACCEPT = `text=Accept`

    ACCOUNT_MENU = `#navbarBlocksDropdown >> nth=1`

    LOGGED_IN_AS = `text=Signed in as`

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(options?: Object): Promise<void> {
        await this.actions.navigateToURL(`/`, options)
        await this.actions.clickElement(this.SIGN_IN)
    }

    async signUp(email: string, password: string): Promise<void> {
        await this.actions.clickElement(this.AUTH0_SIGN_UP)
        await this.actions.enterElementText(this.AUTH0_INPUT_EMAIL, email)
        await this.actions.enterElementText(this.AUTH0_INPUT_PASSWORD, password)
        await this.actions.clickElement(this.AUTH0_SUBMIT)
        await this.actions.clickElement(this.AUTH0_ACCEPT)
    }

    async signIn(email: string, password: string): Promise<void> {
        await this.actions.enterElementText(this.AUTH0_INPUT_USERNAME, email)
        await this.actions.enterElementText(this.AUTH0_INPUT_PASSWORD, password)
        await this.actions.clickElement(this.AUTH0_SUBMIT)
    }

    async isSignedIn(): Promise<void> {
        await this.actions.clickElement(this.ACCOUNT_MENU)
        await this.actions.verifyElementIsDisplayed(this.LOGGED_IN_AS, `login failed`)
    }
}
