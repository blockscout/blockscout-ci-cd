import test from '@lib/BaseTest'
import chalk from "chalk"
import { readFileSync } from "fs"

test.describe.configure({ mode: `parallel` })
/*
    these tests are for common smoke functionality across all priority envs
    they do not interact with contract deployments, checking static data
    test logic is common, however we separate the tests for visibility
*/

const url = process.env.BLOCKSCOUT_URL
const COMMON_TOKEN_NAME = `USDT`
const COMMON_TOKEN_FULL_NAME = `Tether USD \\(USDT\\)`

let staticData

test.beforeAll(async () => {
    const fileName = url.split(`//`)[1].split(`.`).slice(0, -2).join(`.`)
    staticData = JSON.parse(readFileSync(`static/${fileName}.json`).toString())
})

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
    await newHomePage.open_custom(url)
    if (await newHomePage.isENSEnabled()) {
        await newHomePage.open_custom(`${url}/name-domains?only_active=true`)
        await newHomePage.checkENSHeader()
        await newHomePage.checkENSRow()
    } else {
        console.log(chalk.yellow(`ENS Services are OFF!`))
    }
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

test(`@OnDemandSmoke Check blobs`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`${url}/txs`)
    if (await newHomePage.BlobIsOn()) {
        await newHomePage.checkBlobTransactions()
        await newHomePage.checkParticularBlob(url, `0x671cc5e15f140d220c36b0abaf0f76afd108c23c83cc63bb8ded37de1ffffc5b`)
    } else {
        console.log(chalk.yellow(`Blob txns is OFF!`))
    }
})

test(`@OnDemandSmoke Check read contract tabs`, async ({ newHomePage }) => {
    await newHomePage.openFirstVerifiedContract(url)
    await newHomePage.checkContractReadTabs()
})

test(`@OnDemandSmoke Check write contract tabs`, async ({ newHomePage }) => {
    await newHomePage.openFirstVerifiedContract(url)
    if (await newHomePage.hasWriteContractTab()) {
        await newHomePage.checkContractsWriteTabs()
    } else {
        console.log(chalk.yellow(`Contract doesn't have any write methods!`))
    }
})

test(`@OnDemandSmoke Check contracts code tabs`, async ({ newHomePage }) => {
    await newHomePage.openFirstVerifiedContract(url)
    await newHomePage.checkContractsCodeTab()
    await newHomePage.checkContractUMLDiagram()
})

test(`@OnDemandSmoke Check ERC-721 inventory tab`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`${url}/token/${staticData.erc721.address}`)
    await newHomePage.checkERC721Inventory(staticData.erc721)
    await newHomePage.open_custom(`${url}/token/${staticData.erc721.address}/instance/${staticData.erc721.instance}`)
    await newHomePage.checkInventoryERC721Element(staticData.erc721)
    await newHomePage.checkInventoryERC721MetadataTab(staticData.erc721)
})

test(`@OnDemandSmoke Check ERC-404 inventory tab`, async ({ newHomePage }) => {
    if (staticData.erc404 === undefined) {
        console.log(`no erc-404 tokens exist`)
        return
    }
    await newHomePage.open_custom(`${url}/token/${staticData.erc404.address}`)
    await newHomePage.checkERC404Inventory(staticData.erc404)
    await newHomePage.open_custom(`${url}/token/${staticData.erc404.address}/instance/${staticData.erc404.instance}`)
    await newHomePage.checkInventoryERC404Element(staticData.erc404)
    await newHomePage.checkInventoryERC404MetadataTab(staticData.erc404)
})

test(`@OnDemandSmoke Check ERC-1155 inventory tab`, async ({ newHomePage }) => {
    await newHomePage.open_custom(`${url}/token/${staticData.erc1155.address}`)
    await newHomePage.checkERC1155Inventory(staticData.erc1155)
    await newHomePage.open_custom(`${url}/token/${staticData.erc1155.address}/instance/${staticData.erc1155.instance}`)
    await newHomePage.checkInventoryERC1155Element(staticData.erc1155)
    await newHomePage.checkInventoryERC1155MetadataTab(staticData.erc1155)
})
