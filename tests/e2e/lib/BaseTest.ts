import { test as baseTest } from '@playwright/test'
import { HomePage } from '@pages/Home'
import { BlocksPage } from '@pages/Blocks'
import { TransactionPage } from '@pages/Transaction'
import { TokensPage } from '@pages/Tokens'
import { TokenPage } from '@pages/Token'
import { AddressPage } from '@pages/Address'
import { AuthorizedArea } from '@pages/Login'
import { CommonPage } from '@pages/Common'
import { HomeRollupBaseSepolia } from '@pages/HomeRollupBaseSepolia'
import { HomeRollupZKEvm } from '@pages/HomeRollupZKEvm'
import { RollupDepositsPage } from '@pages/RollupDeposits'
import { RollupWithdrawalsPage } from '@pages/RollupWithdrawals'
import MailSlurp from 'mailslurp-client'
import { AdminPage } from '@pages/Admin'

import { ETHHome } from '@pages/HomeETH'
import { HomeMainDev } from '@pages/HomeMainDev'
import { VerificationPage } from '@pages/Verification'
import { TransactionsListPage } from '@pages/TransactionsList'
import { BlockListPage } from '@pages/BlocksList'
import { MarketplacePage } from '@pages/Marketplace'
import { NewHomePage } from '@pages/NewHome'
import { EtherscanGoerliPage } from '@pages/EtherscanGoerli'
import { RollupTxnBatchesPage } from '@pages/RollupTxnBatches'
import { RollupOutputRootsPage } from '@pages/RollupOutputRoots'
import { HomeGoerli } from '@pages/HomeGoerli'
import { EtherscanMainnetPage } from '@pages/EtherscanMainnet'
import { RollupTxnBatchesPageZKEvm } from '@pages/RollupTxnBatchesZKEvm'
import Contracts from './Contracts'
import testConfig from '../testConfig'

const test = baseTest.extend<{
    adminPage: AdminPage,
    commonPage: CommonPage,
    newHomePage: NewHomePage,
    newHomeMainDev: HomeMainDev,
    newHomeGoerli: HomeGoerli,
    newHomeRollupBaseSepolia: HomeRollupBaseSepolia,
    newHomeRollupZKEvm: HomeRollupZKEvm,
    newRollupDeposits: RollupDepositsPage,
    newRollupWithdrawals: RollupWithdrawalsPage,
    newRollupTxnBatches: RollupTxnBatchesPage,
    newRollupTxnBatchesZKEvm: RollupTxnBatchesPageZKEvm,
    newRollupOutputRoots: RollupOutputRootsPage,
    marketplace: MarketplacePage,
    homePage: HomePage,
    ethHomePage: ETHHome,
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
    newHomeMainDev: async ({ page }, use) => {
        await use(new HomeMainDev(page))
    },
    newHomeRollupBaseSepolia: async ({ page }, use) => {
        await use(new HomeRollupBaseSepolia(page))
    },
    newHomeRollupZKEvm: async ({ page }, use) => {
        await use(new HomeRollupZKEvm(page))
    },
    newHomeGoerli: async ({ page }, use) => {
        await use(new HomeGoerli(page))
    },
    newRollupDeposits: async ({ page }, use) => {
        await use(new RollupDepositsPage(page))
    },
    newRollupWithdrawals: async ({ page }, use) => {
        await use(new RollupWithdrawalsPage(page))
    },
    newRollupTxnBatches: async ({ page }, use) => {
        await use(new RollupTxnBatchesPage(page))
    },
    newRollupTxnBatchesZKEvm: async ({ page }, use) => {
        await use(new RollupTxnBatchesPageZKEvm(page))
    },
    newRollupOutputRoots: async ({ page }, use) => {
        await use(new RollupOutputRootsPage(page))
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
    etherscanGoerliPage: async ({ page }, use) => {
        await use(new EtherscanGoerliPage(page))
    },
    etherscanMainnet: async ({ page }, use) => {
        await use(new EtherscanMainnetPage(page))
    },
})

export default test
