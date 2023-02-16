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
import { VerificationPage } from '@pages/Verification'
import { TransactionsListPage } from '@pages/TransactionsList'
import { GnosisOptimismHome } from '@pages/HomeOptimismGnosis'
import { BlockListPage } from '@pages/BlocksList'
import { MarketplacePage } from '@pages/Marketplace'
import { NewHomePage } from '@pages/NewHome'
import { Etherscan } from '@pages/Etherscan'
import Contracts from './Contracts'
import testConfig from '../testConfig'

const test = baseTest.extend<{
    commonPage: CommonPage,
    newHomePage: NewHomePage,
    marketplace: MarketplacePage,
    homePage: HomePage,
    ethHomePage: ETHHome,
    gnosisHomePage: GnosisHome,
    gnosisOptimismHomePage: GnosisOptimismHome,
    authorized: AuthorizedArea,
    transactionPage: TransactionPage,
    transactionsListPage: TransactionsListPage,
    blocksPage: BlocksPage,
    blocksListPage: BlockListPage,
    tokensPage: TokensPage
    tokenPage: TokenPage,
    addressPage: AddressPage,
    verificationPage: VerificationPage,
    etherscanPage: Etherscan,
}>({
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
    ethHomePage: async ({ page }, use) => {
        await use(new ETHHome(page))
    },
    gnosisHomePage: async ({ page }, use) => {
        await use(new GnosisHome(page))
    },
    gnosisOptimismHomePage: async ({ page }, use) => {
        await use(new GnosisOptimismHome(page))
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
    etherscanPage: async ({ page }, use) => {
        await use(new Etherscan(page))
    },
})

export default test
