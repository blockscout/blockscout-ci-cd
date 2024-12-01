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
import { AdminPage } from '@pages/Admin'

import { VerificationPage } from '@pages/Verification'
import { TransactionsListPage } from '@pages/TransactionsList'
import { BlockListPage } from '@pages/BlocksList'
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
    blocksPage: BlocksPage,
    blocksListPage: BlockListPage,
    tokensPage: TokensPage
    tokenPage: TokenPage,
    addressPage: AddressPage,
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
        const ctx = await browser.newContext()
        const page = await ctx.newPage()
        await use(new AuthorizedArea(page, new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY }), new Contracts(testConfig.networkURL)))
    },
    transactionPage: async ({ page }, use) => {
        await use(new TransactionPage(page))
    },
    transactionsListPage: async ({ page }, use) => {
        await use(new TransactionsListPage(page))
    },
    blocksPage: async ({ page }, use) => {
        await use(new BlocksPage(page))
    },
    blocksListPage: async ({ page }, use) => {
        await use(new BlockListPage(page))
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
