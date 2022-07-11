import { test as baseTest } from '@playwright/test'
import { HomePage } from '@pages/Home'
import { BlocksPage } from '@pages/Blocks'
import { TransactionPage } from '@pages/Transaction'
import { TokensPage } from '@pages/Tokens'
import { TokenPage } from '@pages/Token'
import { AddressPage } from '@pages/Address'

const test = baseTest.extend<{
    homePage: HomePage,
    transactionPage: TransactionPage,
    blocksPage: BlocksPage,
    tokensPage: TokensPage
    tokenPage: TokenPage,
    addressPage: AddressPage,
}>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page))
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
