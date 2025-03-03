/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'
import chalk from "chalk"

export interface TXDecodedLogProps {
    methodIDText: string
    methodID: string
    callText: string
    call: string
    logFields: string[][]
}

export class CommonPage {
    readonly page: Page

    actions: WebActions

    HEADER_STATS = `main >> div >> nth=8 >> div >> div`

    AUTH0_SIGN_UP = `text=Sign up`

    AUTH0_INPUT_EMAIL = `input[name="email"]`

    AUTH0_INPUT_USERNAME = `input[name="username"]`

    AUTH0_INPUT_PASSWORD = `input[name="password"]`

    AUTH0_SUBMIT = `button[data-action-button-primary="true"]`

    LOGGED_IN_AS = `text=Signed in as`

    TX_LOGS_TAB = `[data-test='transaction_logs_link']`

    TABLE_TABPANEL_DIV = `[role="tabpanel"] >> div >> nth=`

    DETAILS_TAB_FOOTER = `text=View details`

    NETWORK_MENU = `[aria-label="Network menu"]`

    NETWORK_GROUP_MAINNETS = `text=Mainnets`

    NETWORK_GROUP_TESTNETS = `text=Testnets`

    NETWORK_GROUP_OTHER = `text=other`

    NETWORK_LIST_ITEM = `section >> ul >> li >> nth=`

    constructor(page: Page) {
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async checkRequests(page): Promise<void> {
        await page.route(`/**`, async (route) => {
            try {
                const response = await route.fetch()
                if (response.status() >= 399 && response.status() <= 499) {
                    console.log(chalk.yellow(`${response.status()} ${response.url()}`))
                } else if (response.status() >= 500) {
                    console.log(chalk.red(`${response.status()} ${response.url()}`))
                    throw new Error(`>500 request detected: ${response.status()} ${response.url()}`)
                }
                await route.fulfill({ response })
            } catch (error) {
                if (error.message.includes(`route.fetch: Test ended`)) {
                    return
                }
                if (error.message.includes(`getaddrinfo ENOTFOUND`)) {
                    return
                }
                throw error
            }
        })
    }

    async displayed_in_parent(locator: string, selector: string, parentNum: number, error: string = ``): Promise<void> {
        let parentLoc = this.page.locator(locator)
        for (let i = 0; i < parentNum; i += 1) {
            parentLoc = parentLoc.locator(`..`)
        }
        // eslint-disable-next-line no-underscore-dangle
        await this.actions.verifyElementIsDisplayed(`${parentLoc._selector} >> ${selector}`, error)
    }

    async check_network_menu(): Promise<void> {
        await this.actions.clickElementJS(this.NETWORK_MENU)
        await this.actions.clickElementJS(this.NETWORK_GROUP_MAINNETS)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}0 >> text=Ethereum`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}1 >> text=Optimism`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}2 >> text=Base chain`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}3 >> text=RSK`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}4 >> text=LightLink Phoenix`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}5 >> text=Neon`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}6 >> text=Ethereum classic`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}7 >> text=Gnosis Chain`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}8 >> text=Zora`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}9 >> text=Astar (EVM)`)

        await this.actions.clickElementJS(this.NETWORK_GROUP_TESTNETS)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}0 >> text=Goerli`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}1 >> text=Sepolia`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}2 >> text=Holesky`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}3 >> text=Base Göerli`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}4 >> text=Base Sepolia`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}5 >> text=Optimism Goerli`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}6 >> text=Optimism Sepolia`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}7 >> text=Optimism Bedrock Beta`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}8 >> text=ZetaChain testnet`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}9 >> text=LightLink Pegasus`)
        await this.actions.clickElementJS(this.NETWORK_GROUP_OTHER)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}0 >> text=Optimism Opcraft`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}1 >> text=/ARTIS/`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}2 >> text=/LUKSO/`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}3 >> text=/POA/`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}4 >> text=/POA Sokol/`)
    }

    async check_selector(sel: string, err?: string): Promise<void> {
        await this.actions.verifyElementIsDisplayed(sel, err)
    }

    async check_table_element(header: string, nth: number, text: string, err?: string): Promise<void> {
        await this.actions.verifyElementIsDisplayed(this.div_right_of_with_text(header, nth, text), err)
    }

    div_right_of_with_text(of: string, nth: number, text: string): string {
        return `div:right-of(:text("${of}")) >> nth=${nth} >> text=/${text}/`
    }

    table_div(text: string): string {
        return `div:right-of(:text("${text}")) >> nth=0`
    }

    main_block_div(text: string, path?: string): string {
        return path ? `main >> div:right-of(:text("${text}")) >> nth=0 >> ${path}` : `main >> div:right-of(:text("${text}")) >> nth=0`
    }

    async mock_ads(): Promise<void> {
        await this.page.route(`https://request-global.czilladx.com/serve/native.php?z=19260bf627546ab7242`, async (route) => {
            const duck = {
                ad: {
                    name: `Hello utia!`,
                    description_short: `Utia is the best! Go with utia! Utia is the best! Go with utia!`,
                    thumbnail: `https://utia.utia`,
                    url: `https://test.url`,
                    cta_button: `Click me!`,
                },
            }
            await route.fulfill({ status: 200, body: JSON.stringify(duck) })
        })
    }

    async signUp(email: string, password: string): Promise<void> {
        await this.actions.navigateToURL(process.env.BLOCKSCOUT_URL)
        await this.page.getByRole(`link`, { name: `profile menu` }).click()
        await this.actions.clickElement(this.AUTH0_SIGN_UP)
        await this.actions.enterElementText(this.AUTH0_INPUT_EMAIL, email)
        await this.actions.enterElementText(this.AUTH0_INPUT_PASSWORD, password)
        await this.actions.clickElement(this.AUTH0_SUBMIT)
    }

    async delay(amount: number): Promise<void> {
        await this.actions.delay(amount)
    }

    async hasText(text: string): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`text=${text}`, `failed to find text on the page`)
    }

    async isSignedIn(): Promise<void> {
        await this.page.reload()
        await this.page.getByRole(`link`, { name: `profile menu` }).click()
        await this.actions.verifyElementIsDisplayed(this.LOGGED_IN_AS, `login failed`)
    }
}
