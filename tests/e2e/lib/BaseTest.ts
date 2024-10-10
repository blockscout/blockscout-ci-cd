import { test as baseTest } from '@playwright/test'
import { HomePage } from '@pages/Home'
import { TransactionPage } from '@pages/Transaction'
import { TokensPage } from '@pages/Tokens'
import { TokenPage } from '@pages/Token'
import { AuthorizedArea } from '@pages/Login'
import { CommonPage } from '@pages/Common'
import MailSlurp from 'mailslurp-client'
import { AdminPage } from '@pages/Admin'

import { VerificationPage } from '@pages/Verification'
import { TransactionsListPage } from '@pages/TransactionsList'
import { MarketplacePage } from '@pages/Marketplace'
import { NewHomePage } from '@pages/NewHome'
import { EtherscanGoerliPage } from '@pages/EtherscanGoerli'
import { EtherscanMainnetPage } from '@pages/EtherscanMainnet'
import Contracts from './Contracts'
import testConfig from '../testConfig'

const test = baseTest.extend<{
    adminPage: AdminPage,
    commonPage: CommonPage,
    newHomePage: NewHomePage,
    marketplace: MarketplacePage,
    homePage: HomePage,
    authorized: AuthorizedArea,
    transactionPage: TransactionPage,
    transactionsListPage: TransactionsListPage,
    tokensPage: TokensPage
    tokenPage: TokenPage,
    verificationPage: VerificationPage,
    etherscanGoerliPage: EtherscanGoerliPage,
    etherscanMainnet: EtherscanMainnetPage,
}>({
    adminPage: async ({ page }, use) => {
        await use(new AdminPage(page))
    },
    commonPage: async ({ page }, use) => {
        await use(new CommonPage(page))
    },
    newHomePage: async ({ page }, use) => {
        await use(new NewHomePage(page))
    },
    marketplace: async ({ page }, use) => {
        await use(new MarketplacePage(page))
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page))
    },
    authorized: async ({ browser }, use) => {
        const ctx = await browser.newContext({ storageState: `state.json` })
        const page = await ctx.newPage()
        await use(new AuthorizedArea(page, new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY }), new Contracts(testConfig.networkURL)))
    },
    transactionPage: async ({ page }, use) => {
        await use(new TransactionPage(page))
    },
    transactionsListPage: async ({ page }, use) => {
        await use(new TransactionsListPage(page))
    },
    tokensPage: async ({ page }, use) => {
        await use(new TokensPage(page))
    },
    tokenPage: async ({ page }, use) => {
        await use(new TokenPage(page))
    },
    verificationPage: async ({ page }, use) => {
        await use(new VerificationPage(page))
    },
    etherscanGoerliPage: async ({ page }, use) => {
        await use(new EtherscanGoerliPage(page))
    },
    etherscanMainnet: async ({ page }, use) => {
        await use(new EtherscanMainnetPage(page))
    },
})

export default test
