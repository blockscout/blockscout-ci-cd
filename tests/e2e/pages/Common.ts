/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { APIActions } from "@lib/APIActions"
import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'

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

    apiActions: APIActions

    HEADER_STATS = `main >> div >> nth=8 >> div >> div`

    SIGN_IN = `body >> div[data-label="hero plate"] >> a >> nth=0`

    SIGNED_IN = `body >> div[data-label="hero plate"] >> div >> nth=2`

    ACCOUNT_MENU = `#navbarBlocksDropdown >> nth=1`

    AUTH0_SIGN_UP = `text=Sign up`

    AUTH0_INPUT_EMAIL = `input[name="email"]`

    AUTH0_INPUT_USERNAME = `input[name="username"]`

    AUTH0_INPUT_PASSWORD = `input[name="password"]`

    AUTH0_SUBMIT = `button[type="submit"] >> nth=0`

    LOGGED_IN_AS = `text=Signed in as`

    VERIFY_MSG = `To see accurate decoded input data, the contract must be verified`

    TX = `[data-test='chain_transaction']`

    TX_STATUS = `[data-test='transaction_status']`

    TX_HASH = `[data-test='transaction_hash_link']`

    TX_ADDR_BAR = `[data-test='address_hash_link']`

    TX_INTERNAL = `[data-test='internal_transaction']`

    CARD_BODY_KEYS = `[class='card-body fs-14'] >> dt`

    CARD_BODY_VALUES = `[class='card-body fs-14'] >> dd`

    TOKEN_TILES = `[class='tile tile-type-token-transfer fade-in']`

    TOKEN_HOLDERS_TAB = `[data-test='token_holders_tab']`

    TX_LOGS_TAB = `[data-test='transaction_logs_link']`

    INTERNAL_TXS_TAB = `[data-test='internal_transactions_tab_link']`

    TX_RAW_TRACE_TAB = `text=Raw Trace`

    TOKEN_HOLDERS_LIST = `[data-test='token_holders']`

    VERIFY_ALERT_ROW = `[data-items] >> [class='alert alert-info'] >> nth=0`

    TABLE_TABPANEL_DIV = `[role="tabpanel"] >> div >> nth=`

    DETAILS_TAB_FOOTER = `text=View details`

    ALERT_DIV = `[role="alert"]`

    HEADER_TX_AD = `main >> div >> nth=0 >> a`

    LOG_DIV = `div[role="tabpanel"] >> div >> nth=`

    NETWORK_MENU = `[aria-label="Network menu"]`

    NETWORK_GROUP_MAINNETS = `text=mainnets`

    NETWORK_GROUP_TESTNETS = `text=testnets`

    NETWORK_GROUP_OTHER = `text=other`

    NETWORK_LIST_ITEM = `section >> ul >> li >> nth=`

    constructor(page: Page) {
        this.page = page
        this.actions = new WebActions(this.page)
        this.apiActions = new APIActions()
    }

    replaceAll(str: string, find: string, replace: string) {
        return str.replace(new RegExp(find, `g`), replace)
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
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}8 >> text=Astar (EVM)`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}9 >> text=Shiden (EVM)`)

        await this.actions.clickElementJS(this.NETWORK_GROUP_TESTNETS)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}0 >> text=Base Sepolia`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}1 >> text=Base Göerli`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}2 >> text=Goerli`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}3 >> text=Sepolia`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}4 >> text=Optimism Goerli`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}5 >> text=Optimism Sepolia`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}6 >> text=Optimism Bedrock Beta`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}7 >> text=ZetaChain testnet`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}8 >> text=LightLink Pegasus`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}9 >> text=Neon Devnet`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}10 >> text=Gnosis Chiado`)
        await this.actions.verifyElementIsDisplayed(`${this.NETWORK_LIST_ITEM}11 >> text=Shibuya (EVM)`)
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

    async check_table_element(header: string, nth: number, text:string, err?: string): Promise<void> {
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

    async check_tx_list_row(row: number, col: number, text: string): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`table >> tr >> nth=${row} >> td >> nth=${col} >> text=/${text}/`)
    }

    async check_header_tx_ad(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(this.HEADER_TX_AD)
    }

    async signUp(email: string, password: string): Promise<void> {
        await this.actions.navigateToURL(process.env.BLOCKSCOUT_URL)
        await this.actions.clickElement(this.SIGN_IN)
        await this.actions.clickElement(this.AUTH0_SIGN_UP)
        await this.actions.enterElementText(this.AUTH0_INPUT_EMAIL, email)
        await this.actions.enterElementText(this.AUTH0_INPUT_PASSWORD, password)
        await this.actions.clickElement(this.AUTH0_SUBMIT)
    }

    async alert_div_has_text(text: string): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.ALERT_DIV} >> text=${text}`)
    }

    async delay(amount: number): Promise<void> {
        await this.actions.delay(amount)
    }

    async hasText(text: string): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`text=${text}`, `failed to find text on the page`)
    }

    async waitBlocksSynced(): Promise<void> {
        await this.waitNoText(`indexing this chain right now`)
    }

    async waitNoText(status: string): Promise<void> {
        await this.actions.waitReloadNoText(`text=${status}`)
    }

    async select_token_holders_tab(): Promise<void> {
        await this.actions.clickElement(this.TOKEN_HOLDERS_TAB)
    }

    async select_internal_txs_tab(): Promise<void> {
        await this.actions.clickElement(this.INTERNAL_TXS_TAB)
    }

    async select_logs_tab(): Promise<void> {
        await this.actions.clickElement(this.TX_LOGS_TAB)
    }

    async select_trace_tab(): Promise<void> {
        await this.actions.clickElement(this.TX_RAW_TRACE_TAB)
    }

    async check_verify_alert(): Promise<void> {
        await this.actions.verifyElementContainsText(this.VERIFY_ALERT_ROW, this.VERIFY_MSG)
    }

    // checks tx fields across different pages when it displayed as a tile
    async check_tx_in_list(): Promise<void> {
        await this.check_tx_list_row(2, 1, `0x.*ago`)
        await this.check_tx_list_row(2, 2, `Contract call.*Failed`)
        await this.check_tx_list_row(2, 3, `alwaysReverts`)
        await this.check_tx_list_row(2, 4, `\\d+`)
        await this.check_tx_list_row(2, 5, `0x`)
        await this.check_tx_list_row(2, 5, `EPIC`)
        await this.check_tx_list_row(2, 6, `\\d+`)
        await this.check_tx_list_row(2, 7, `\\d+`)

        await this.check_tx_list_row(3, 1, `0x.*ago`)
        await this.check_tx_list_row(3, 2, `Token transfer.*Success`)
        await this.check_tx_list_row(3, 3, `mint`)
        await this.check_tx_list_row(3, 4, `\\d+`)
        await this.check_tx_list_row(3, 5, `0x`)
        await this.check_tx_list_row(3, 5, `EPIC`)
        await this.check_tx_list_row(3, 6, `\\d+`)
        await this.check_tx_list_row(3, 7, `\\d+`)

        await this.check_tx_list_row(4, 1, `0x.*ago`)
        await this.check_tx_list_row(4, 2, `Contract creation.*Success`)
        await this.check_tx_list_row(4, 3, ``)
        await this.check_tx_list_row(4, 4, `\\d+`)
        await this.check_tx_list_row(4, 5, `0x`)
        await this.check_tx_list_row(4, 5, `EPIC`)
        await this.check_tx_list_row(4, 6, `\\d+`)
        await this.check_tx_list_row(4, 7, `\\d+`)
    }

    async check_tx_logs(): Promise<void> {
        await this.actions.verifyElementIsDisplayed(`${this.LOG_DIV}1 >> text=/Transaction/`)
        await this.actions.verifyElementIsDisplayed(`${this.LOG_DIV}3 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.LOG_DIV}4 >> text=/Topics/`)
        await this.actions.verifyElementIsDisplayed(`${this.LOG_DIV}7 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.LOG_DIV}11 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.LOG_DIV}20 >> text=/Data/`)
        await this.actions.verifyElementIsDisplayed(`${this.LOG_DIV}21 >> text=/0x/`)

        await this.actions.verifyElementIsDisplayed(`${this.LOG_DIV}23 >> text=/Transaction/`)
        await this.actions.verifyElementIsDisplayed(`${this.LOG_DIV}24 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.LOG_DIV}26 >> text=/Topics/`)
        await this.actions.verifyElementIsDisplayed(`${this.LOG_DIV}29 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.LOG_DIV}33 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.LOG_DIV}42 >> text=/Data/`)
        await this.actions.verifyElementIsDisplayed(`${this.LOG_DIV}43 >> text=/0x/`)

        await this.actions.verifyElementIsDisplayed(`${this.LOG_DIV}45 >> text=/Transaction/`)
        await this.actions.verifyElementIsDisplayed(`${this.LOG_DIV}46 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.LOG_DIV}48 >> text=/Topics/`)
        await this.actions.verifyElementIsDisplayed(`${this.LOG_DIV}51 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.LOG_DIV}55 >> text=/0x/`)
        await this.actions.verifyElementIsDisplayed(`${this.LOG_DIV}60 >> text=/Data/`)
        await this.actions.verifyElementIsDisplayed(`${this.LOG_DIV}61 >> text=/0x/`)
    }

    async check_decoded_tx_logs(num: number, p: TXDecodedLogProps): Promise<void> {
        await this.actions.verifyElementContainsText(`[data-items] >> dd >> table >> nth=0 >> tr >> nth=0 >> td >> nth=0`, p.methodIDText)
        await this.actions.verifyElementContainsText(`[data-items] >> dd >> table >> nth=0 >> tr >> nth=0 >> td >> nth=1`, p.methodID)
        await this.actions.verifyElementContainsText(`[data-items] >> dd >> table >> nth=0 >> tr >> nth=1 >> td >> nth=0`, p.callText)
        await this.actions.verifyElementContainsText(`[data-items] >> dd >> table >> nth=0 >> tr >> nth=1 >> td >> nth=1`, p.call)
        for (const rowIdx in p.logFields) {
            for (const colIdx in p.logFields[rowIdx]) {
                await this.actions.verifyElementContainsText(`[data-items] >> dd >> table >> nth=1 >> tr >> nth=${2 + Number(rowIdx)} >> td >> nth=${colIdx}`, p.logFields[rowIdx][colIdx])
            }
        }
    }

    async check_decoded_inputs(num: number, p: TXDecodedLogProps): Promise<void> {
        await this.actions.verifyElementContainsText(`[class="card-body"] >> nth=1 >> table >> nth=0 >> tr >> nth=0 >> td >> nth=0`, p.methodIDText)
        await this.actions.verifyElementContainsText(`[class="card-body"] >> nth=1 >> table >> nth=0 >> tr >> nth=0 >> td >> nth=1`, p.methodID)
        await this.actions.verifyElementContainsText(`[class="card-body"] >> nth=1 >> table >> nth=0 >> tr >> nth=1 >> td >> nth=0`, p.callText)
        await this.actions.verifyElementContainsText(`[class="card-body"] >> nth=1 >> table >> nth=0 >> tr >> nth=1 >> td >> nth=1`, p.call)
        for (const rowIdx in p.logFields) {
            for (const colIdx in p.logFields[rowIdx]) {
                await this.actions.verifyElementContainsText(`[class="card-body"] >> nth=1 >> table >> nth=1 >> tr >> nth=${2 + Number(rowIdx)} >> td >> nth=${colIdx}`, p.logFields[rowIdx][colIdx])
            }
        }
    }

    async isSignedIn(): Promise<void> {
        await this.page.reload()
        await this.actions.clickElement(this.SIGNED_IN)
        await this.actions.verifyElementIsDisplayed(this.LOGGED_IN_AS, `login failed`)
    }
}
