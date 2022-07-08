import { test as baseTest } from '@playwright/test'
import { HomePage } from '@pages/Home'
import { BlocksPage } from '@pages/Blocks'
import TransactionPage from '@pages/Transaction'
import Contracts from './Contracts'

const test = baseTest.extend<{
    transactionPage: TransactionPage,
    homePage: HomePage,
    blocksPage: BlocksPage,
    contracts: Contracts,
}>({
    transactionPage: async ({ page }, use) => {
        await use(new TransactionPage(page))
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page))
    },
    blocksPage: async ({ page }, use) => {
        await use(new BlocksPage(page))
    },
})

export default test
