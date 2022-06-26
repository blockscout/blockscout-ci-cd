import { test as baseTest } from '@playwright/test'
import { HomePage } from '@pages/Home'
import { BlocksPage } from '@pages/Blocks'
import Contracts from './Contracts'
import { testConfig } from '../testConfig'

const test = baseTest.extend<{
    homePage: HomePage,
    blocksPage: BlocksPage,
    contracts: Contracts,
}>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page))
    },
    blocksPage: async ({ page }, use) => {
        await use(new BlocksPage(page))
    },
    contracts: async ({ page }, use) => {
        await use(new Contracts(testConfig.networkURL))
    },
})

export default test
