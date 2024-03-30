import test from '@lib/BaseTest'
import chalk from "chalk"

test.describe.configure({ mode: `parallel` })
/*
    these tests are for common smoke functionality across all priority envs
    they do not interact with contract deployments, checking static data
    test logic is common, however we separate the tests for visibility
*/

const url = process.env.BLOCKSCOUT_URL
const COMMON_TOKEN_NAME = `USDT`
const COMMON_TOKEN_FULL_NAME = `Tether USD \\(USDT\\)`

test(`@OnDemandSmoke Main page components`, async ({ newHomePage }) => {
    await newHomePage.open_custom(url)
    await newHomePage.checkIndexing()
    await newHomePage.checkHeader()
    await newHomePage.checkBlocksWidget()
    await newHomePage.checkDailyTransactions()
})

test(`@OnDemandSmoke Check blocks`, async ({ context, newHomePage }) => {
    await newHomePage.open_custom(`${url}/blocks`)
    await newHomePage.checkBlocks(context)
})

test(`@OnDemandSmoke Check transactions`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`${url}/txs`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
})

test(`@OnDemandSmoke Check search`, async ({ newHomePage }) => {
    await newHomePage.open_custom(url)
    await newHomePage.search(COMMON_TOKEN_NAME)
    await newHomePage.findInSearchItems(COMMON_TOKEN_FULL_NAME)
})

test(`@OnDemandSmoke Check stats`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`${url}/stats`)
    await newHomePage.checkStatsCounters()
    await newHomePage.checkStatsGraphsDisplayed()
})

test(`@OnDemandSmoke Check accounts`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`${url}/accounts`)
    await newHomePage.checkNativeAccountsNoPerc()
})

test(`@OnDemandSmoke Check verified contracts`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`${url}/verified-contracts`)
    await newHomePage.checkVerifiedContractsStats()
})

test(`@OnDemandSmoke Check ENS`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`${url}/name-domains?only_active=true`)
    await newHomePage.checkENSHeader()
    await newHomePage.checkENSRow()
})

test(`@OnDemandSmoke Check gas tracker`, async ({ newHomePage }) => {
    await newHomePage.open_custom(url)
    if (await newHomePage.isGasTrackerOn()) {
        await newHomePage.checkGasTrackerBar()
        await newHomePage.checkGasTrackerPopup()
        await newHomePage.checkGasTrackerView()
    } else {
        console.log(chalk.yellow(`Gas Tracker is OFF!`))
    }
})

test(`@OnDemandSmoke Check market`, async ({ marketplace }) => {
    await marketplace.open(url)
    if (await marketplace.isOn()) {
        await marketplace.openMarketplace()
        // await marketplace.checkDefaultAppsList()
        await marketplace.checkAllFeaturesOn()
    } else {
        console.log(chalk.yellow(`DApps Marketplace is OFF!`))
    }
})

test(`@OnDemandSmoke Check user operations`, async ({ newHomePage }) => {
    await newHomePage.open_custom(url)
    if (await newHomePage.UserOpsIsOn()) {
        await newHomePage.open_custom(`${url}/ops`)
        await newHomePage.checkUserOpsHeader()
        await newHomePage.checkUserOpsRow()
    } else {
        console.log(chalk.yellow(`User Operations are OFF!`))
    }
})
