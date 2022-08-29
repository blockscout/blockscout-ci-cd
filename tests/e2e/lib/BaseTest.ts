import { test as baseTest } from '@playwright/test'
import { HomePage } from '@pages/Home'
import { BlocksPage } from '@pages/Blocks'
import { TransactionPage } from '@pages/Transaction'
import { TokensPage } from '@pages/Tokens'
import { TokenPage } from '@pages/Token'
import { AddressPage } from '@pages/Address'
import { AuthorizedArea } from '@pages/Login'
import { CommonPage } from '@pages/Common'
import MailSlurp from 'mailslurp-client'
import { GnosisHome } from '@pages/HomeGnosis'
import { ETHHome } from '@pages/HomeETH'
import Contracts from './Contracts'
import testConfig from '../testConfig'

const test = baseTest.extend<{
    commonPage: CommonPage,
    ethHomePage: ETHHome,
    gnosisHomePage: GnosisHome,
    authorized: AuthorizedArea,
    transactionPage: TransactionPage,
    blocksPage: BlocksPage,
    tokensPage: TokensPage
    tokenPage: TokenPage,
    addressPage: AddressPage,
}>({
    commonPage: async ({ page }, use) => {
        await use(new CommonPage(page))
    },
    ethHomePage: async ({ page }, use) => {
        await use(new ETHHome(page))
    },
    gnosisHomePage: async ({ page }, use) => {
        await use(new GnosisHome(page))
    },
    authorized: async ({ browser }, use) => {
        const ctx = await browser.newContext({ storageState: `state.json` })
        const page = await ctx.newPage()
        await use(new AuthorizedArea(page, new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY }), new Contracts(testConfig.networkURL)))
    },
    transactionPage: async ({ page }, use) => {
        await use(new TransactionPage(page))
    },
    blocksPage: async ({ page }, use) => {
        await use(new BlocksPage(page))
    },
    tokensPage: async ({ page }, use) => {
        await use(new TokensPage(page))
    },
    tokenPage: async ({ page }, use) => {
        await use(new TokenPage(page))
    },
    addressPage: async ({ page }, use) => {
        await use(new AddressPage(page))
    },
})

export default test
