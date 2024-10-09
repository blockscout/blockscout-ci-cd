import test from '@lib/BaseTest'
import chalk from "chalk"
import { readFileSync } from "fs"
import { expect } from "@playwright/test"

test.describe.configure({ mode: `parallel` })
/*
    these tests are for common smoke functionality across all priority envs
    they do not interact with contract deployments, checking static data
    test logic is common, however we separate the tests for visibility
*/

// Fetch the BLOCKSCOUT_URLS environment variable and split it into an array
const urls = (process.env.BLOCKSCOUT_URL || ``).split(`,`)

let staticData

const loadDataFile = (url: string) => {
    if (process.env.ENV === `test` || process.env.ENV === `scoutcloud`) {
        return
    }
    const u = url.endsWith(`/`) ? url.slice(0, -1) : url
    const fileName = u.split(`//`)[1].split(`.`).slice(0, -1).join(`.`)
    try {
        staticData = JSON.parse(readFileSync(`static/${fileName}.json`).toString())
    } catch (err) {
        console.log(chalk.red(`Error reading static data for ${fileName}, file should be named as first two domain sections of URL: ${u}, err: ${err}`))
    }
}

urls.forEach((url: string) => {
    loadDataFile(url)
    test(`@Live @MainPage ${url} Main page components`, async ({ newHomePage }) => {
        await newHomePage.checkRequests(newHomePage.page)
        await newHomePage.open_custom(url)
        await newHomePage.checkIndexing()
        await newHomePage.checkHeader()
        await newHomePage.checkBlocksWidget()
        await newHomePage.checkDailyTransactions()
    })

    test(`@Live @Blocks ${url} Check blocks`, async ({ context, newHomePage }) => {
        await newHomePage.checkRequests(newHomePage.page)
        await newHomePage.open_custom(`${url}/blocks`)
        // TODO: make it header dependent
        if (url.includes(`explorer`) || url.includes(`www`)) {
            return
        }
        await newHomePage.checkBlocks()
    })

    test(`@Live @Tx ${url} Check transactions`, async ({ newHomePage }) => {
        await newHomePage.checkRequests(newHomePage.page)
        await newHomePage.open_custom(`${url}/txs`)
        await newHomePage.actions.verifyElementIsDisplayed(`text=/0x/`)
    })
    test(`@Live @Search ${url} Check search`, async ({ newHomePage }) => {
        await newHomePage.checkRequests(newHomePage.page)
        await newHomePage.open_custom(url)
        await newHomePage.search(staticData.search.query)
        await newHomePage.findInSearchItems(staticData.search.result)
    })
    test(`@Live @Stats ${url} Check stats`, async ({ newHomePage }) => {
        // await newHomePage.checkRequests(newHomePage.page)
        await newHomePage.open_custom(url)
        if (await newHomePage.isStatsEnabled()) {
            await newHomePage.open_custom(`${url}/stats`)
            await newHomePage.checkStatsCounters()
            await newHomePage.checkStatsGraphsDisplayed()
        } else {
            console.log(chalk.yellow(`Stats Services are OFF!`))
        }
    })
    test(`@Live @VerifiedContracts ${url} Check verified contracts`, async ({ newHomePage }) => {
        await newHomePage.checkRequests(newHomePage.page)
        await newHomePage.open_custom(`${url}/verified-contracts`)
        await newHomePage.checkVerifiedContractsStats()
    })
    test(`@Live @ENS ${url} Check ENS`, async ({ newHomePage }) => {
        await newHomePage.checkRequests(newHomePage.page)
        await newHomePage.open_custom(url)
        if (await newHomePage.isENSEnabled()) {
            await newHomePage.open_custom(`${url}/name-domains?only_active=true`)
            await newHomePage.checkENSHeader()
            await newHomePage.checkENSRow()
        } else {
            console.log(chalk.yellow(`ENS Services are OFF!`))
        }
    })
    test(`@Live @GasTracker ${url} Check gas tracker`, async ({ newHomePage }) => {
        await newHomePage.checkRequests(newHomePage.page)
        await newHomePage.open_custom(url)
        if (await newHomePage.isGasTrackerOn()) {
            await newHomePage.checkGasTrackerBar()
            await newHomePage.checkGasTrackerPopup()
            await newHomePage.checkGasTrackerView(url)
        } else {
            console.log(chalk.yellow(`Gas Tracker is OFF!`))
        }
    })
    test(`@Live @Market ${url} Check market`, async ({ marketplace }) => {
        await marketplace.checkRequests(marketplace.page)
        await marketplace.open(url)
        if (await marketplace.isOn()) {
            await marketplace.openMarketplace()
            // await marketplace.checkDefaultAppsList()
            await marketplace.checkAllFeaturesOn()
        } else {
            console.log(chalk.yellow(`DApps Marketplace is OFF!`))
        }
    })
    test(`@Live @UserOps ${url} Check user operations`, async ({ newHomePage }) => {
        await newHomePage.checkRequests(newHomePage.page)
        await newHomePage.open_custom(url)
        if (await newHomePage.UserOpsIsOn()) {
            await newHomePage.open_custom(`${url}/ops`)
            await newHomePage.checkUserOpsHeader()
            await newHomePage.checkUserOpsRow()
        } else {
            console.log(chalk.yellow(`User Operations are OFF!`))
        }
    })
    test(`@Live @Blobs ${url} Check blobs`, async ({ newHomePage }) => {
        await newHomePage.checkRequests(newHomePage.page)
        await newHomePage.open_custom(`${url}/txs`)
        if (await newHomePage.BlobIsOn()) {
            if (staticData.blob === undefined) {
                console.log(chalk.red(`Blobs can't be loaded, either summary service is off or it's not working!`))
                return
            }
            await newHomePage.checkBlobTransactions()
            await newHomePage.checkParticularBlob(url, staticData.blob)
        } else {
            console.log(chalk.yellow(`Blob txns are OFF!`))
        }
    })
    test(`@Live @ContractsRead ${url} Check read contract tabs`, async ({ newHomePage }) => {
        await newHomePage.checkRequests(newHomePage.page)
        await newHomePage.openFirstVerifiedContract(url)
        await newHomePage.checkContractReadTabs()
    })
    test(`@Live @ContractsWrite ${url} Check write contract tabs`, async ({ newHomePage }) => {
        await newHomePage.checkRequests(newHomePage.page)
        await newHomePage.openFirstVerifiedContract(url)
        if (await newHomePage.hasWriteContractTab()) {
            await newHomePage.checkContractsWriteTabs()
        } else {
            console.log(chalk.yellow(`Contract doesn't have any write methods!`))
        }
    })
    test(`@Live @ContractsCode ${url} Check contracts code tabs`, async ({ newHomePage }) => {
        await newHomePage.checkRequests(newHomePage.page)
        await newHomePage.openFirstVerifiedContract(url)
        await newHomePage.checkContractsCodeTab()
        await newHomePage.checkContractUMLDiagram()
    })
    test(`@Live @ERC-721 ${url} Check ERC-721 inventory tab`, async ({ newHomePage }) => {
        await newHomePage.checkRequests(newHomePage.page)
        if (!staticData.erc721) {
            console.log(`no erc-721 tokens exist`)
            return
        }
        await newHomePage.open_custom(`${url}/token/${staticData.erc721.address}`)
        await newHomePage.checkERC721Inventory(staticData.erc721)
        await newHomePage.open_custom(`${url}/token/${staticData.erc721.address}/instance/${staticData.erc721.instance}`)
        await newHomePage.checkInventoryERC721Element(staticData.erc721)
        await newHomePage.checkInventoryERC721MetadataTab(staticData.erc721)
    })
    test(`@Live @ERC-404 ${url} Check ERC-404 inventory tab`, async ({ newHomePage }) => {
        await newHomePage.checkRequests(newHomePage.page)
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
    test(`@Live @ERC-1155 ${url} Check ERC-1155 inventory tab`, async ({ newHomePage }) => {
        await newHomePage.checkRequests(newHomePage.page)
        if (staticData.erc404 === undefined) {
            console.log(`no erc-1155 tokens exist`)
            return
        }
        await newHomePage.open_custom(`${url}/token/${staticData.erc1155.address}`)
        await newHomePage.checkERC1155Inventory(staticData.erc1155)
        await newHomePage.open_custom(`${url}/token/${staticData.erc1155.address}/instance/${staticData.erc1155.instance}`)
        await newHomePage.checkInventoryERC1155Element(staticData.erc1155)
        await newHomePage.checkInventoryERC1155MetadataTab(staticData.erc1155)
    })
    test(`@Live @L2Deposits ${url} Check L1->L2 Deposits`, async ({ newHomePage }) => {
        await newHomePage.checkRequests(newHomePage.page)
        await newHomePage.open_custom(url)
        if (await newHomePage.isL1L2DepositsEnabled()) {
            await newHomePage.open_custom(`${url}/deposits`)
        } else {
            console.log(chalk.yellow(`L1->L2 Deposits are OFF!`))
            return
        }
        const header = await newHomePage.actions.page.locator(`table >> tr >> nth=0`).textContent()
        const row = await newHomePage.actions.page.locator(`table >> tr >> nth=1 >> td`).all()
        if (url.includes(`www`)) {
            expect(header).toEqual(`L1 block NoL1 txn hashL2 txn hashUserAge`)
            expect(await row[0].textContent()).toMatch(/\d+/)
            expect(await row[1].textContent()).toMatch(/0x.*/)
            expect(await row[2].textContent()).toMatch(/0x.*/)
            expect(await row[3].textContent()).toMatch(/0x.*/)
            expect(await row[4].textContent()).toMatch(/.*ago/)
        }
        if (url.includes(`arbitrum`)) {
            expect(header).toEqual(`L1 blockMessage #L2 transactionAgeStatusL1 transaction`)
            expect(await row[0].textContent()).toMatch(/\d+/)
            expect(await row[1].textContent()).toMatch(/\d+/)
            expect(await row[2].textContent()).toMatch(/N\/A|0x.*/)
            expect(await row[3].textContent()).toMatch(/.*ago/)
            expect(await row[4].textContent()).toMatch(/Pending|Finalized|Waiting/)
            expect(await row[5].textContent()).toMatch(/0x.*/)
        }
        if (url.includes(`optimism`)) {
            expect(header).toEqual(`L1 block NoL2 txn hashAgeL1 txn hashL1 txn originGas limit`)
            expect(await row[0].textContent()).toMatch(/\d+/)
            expect(await row[1].textContent()).toMatch(/0x.*/)
            expect(await row[2].textContent()).toMatch(/ago.*/)
            expect(await row[3].textContent()).toMatch(/0x.*/)
            expect(await row[4].textContent()).toMatch(/0x.*/)
            expect(await row[5].textContent()).toMatch(/\d+/)
        }
        if (url.includes(`base`)) {
            expect(header).toEqual(`L1 block NoL2 txn hashAgeL1 txn hashL1 txn originGas limit`)
            expect(await row[0].textContent()).toMatch(/\d+/)
            expect(await row[1].textContent()).toMatch(/0x.*/)
            expect(await row[2].textContent()).toMatch(/ago.*/)
            expect(await row[3].textContent()).toMatch(/0x.*/)
            expect(await row[4].textContent()).toMatch(/\d+/)
        }
        if (url.includes(`zkevm`)) {
            expect(header).toEqual(`L1 blockIndexL1 txn hashAgeL2 txn hashValueToken`)
            expect(await row[0].textContent()).toMatch(/\d+/)
            expect(await row[1].textContent()).toMatch(/\d+/)
            expect(await row[2].textContent()).toMatch(/0x.*/)
            expect(await row[3].textContent()).toMatch(/.*ago/)
            expect(await row[4].textContent()).toMatch(/0x.*|Pending Claim/)
            expect(await row[5].textContent()).toMatch(/\d+/)
            expect(await row[6].textContent()).toMatch(/.*/)
        }
    })
    test(`@Live @L2Withdrawals ${url} Check L1->L2 Withdrawals`, async ({ newHomePage }) => {
        await newHomePage.checkRequests(newHomePage.page)
        await newHomePage.open_custom(url)
        if (await newHomePage.isL1L2WithdrawalsEnabled()) {
            await newHomePage.open_custom(`${url}/withdrawals`)
        } else {
            console.log(chalk.yellow(`L1->L2 Withdrawals are OFF!`))
            return
        }
        const header = await newHomePage.actions.page.locator(`table >> tr >> nth=0`).textContent()
        const row = await newHomePage.actions.page.locator(`table >> tr >> nth=1 >> td`).all()
        if (url.includes(`www`)) {
            expect(header).toEqual(`L2 block NoL2 txn hashL1 txn hashUserAge`)
            expect(await row[0].textContent()).toMatch(/\d+/)
            expect(await row[1].textContent()).toMatch(/0x.*/)
            expect(await row[2].textContent()).toMatch(/0x.*/)
            expect(await row[3].textContent()).toMatch(/0x.*/)
            expect(await row[4].textContent()).toMatch(/.*ago|.*/)
        }

        if (url.includes(`arbitrum`)) {
            expect(header).toEqual(`FromMessage #L2 transactionAgeStatusL1 transaction`)
            expect(await row[0].textContent()).toMatch(/0x.*/)
            expect(await row[1].textContent()).toMatch(/\d+/)
            expect(await row[2].textContent()).toMatch(/0x.*/)
            expect(await row[3].textContent()).toMatch(/.*ago/)
            expect(await row[4].textContent()).toMatch(/Pending|Finalized|Waiting/)
            expect(await row[5].textContent()).toMatch(/N\/A/)
        }
        if (url.includes(`optimism`)) {
            expect(header).toEqual(`Msg nonceFromL2 txn hashAgeStatusL1 txn hashTime left`)
            expect(await row[0].textContent()).toMatch(/\d+/)
            expect(await row[1].textContent()).toMatch(/0x.*|N\/A/)
            expect(await row[2].textContent()).toMatch(/0x.*/)
            expect(await row[3].textContent()).toMatch(/.*ago|N\/A/)
            expect(await row[4].textContent()).toMatch(/Waiting.*|Ready to prove/)
            expect(await row[5].textContent()).toMatch(/N\/A/)
        }
        if (url.includes(`base`)) {
            expect(header).toEqual(`Msg nonceFromL2 txn hashAgeStatusL1 txn hashTime left`)
            expect(await row[0].textContent()).toMatch(/\d+/)
            expect(await row[1].textContent()).toMatch(/0x.*/)
            expect(await row[2].textContent()).toMatch(/0x.*/)
            expect(await row[3].textContent()).toMatch(/ago.*/)
            expect(await row[4].textContent()).toMatch(/Waiting.*|Ready to prove|In challenge period/)
            expect(await row[5].textContent()).toMatch(/N\/A/)
        }
        if (url.includes(`zkevm`)) {
            expect(header).toEqual(`BlockIndexL2 txn hashAgeL1 txn hashValueToken`)
            expect(await row[0].textContent()).toMatch(/\d+/)
            expect(await row[1].textContent()).toMatch(/\d+/)
            expect(await row[2].textContent()).toMatch(/0x.*/)
            expect(await row[3].textContent()).toMatch(/ago.*/)
            expect(await row[4].textContent()).toMatch(/Pending Claim|0x.*/)
            expect(await row[5].textContent()).toMatch(/\d+/)
            expect(await row[6].textContent()).toMatch(/ETH/)
        }
    })
    test(`@Live @L2TxnBatches ${url} Check L1->L2 Txn batches`, async ({ newHomePage }) => {
        await newHomePage.checkRequests(newHomePage.page)
        await newHomePage.open_custom(url)
        if (await newHomePage.isL1L2TxnBatchesEnabled()) {
            await newHomePage.open_custom(`${url}/batches`)
        } else {
            console.log(chalk.yellow(`L1->L2 Txn batches are OFF!`))
            return
        }
        const header = await newHomePage.actions.page.locator(`table >> tr >> nth=0`).textContent()
        const row = await newHomePage.actions.page.locator(`table >> tr >> nth=1 >> td`).all()
        if (url.includes(`arbitrum`)) {
            expect(header).toEqual(`Batch #L1 statusL1 blockBlock countL1 transactionAgeTxn count`)
            expect(await row[0].textContent()).toMatch(/\d+/)
            expect(await row[1].textContent()).toMatch(/Unfinalizedblob|Finalizedblob/)
            expect(await row[2].textContent()).toMatch(/\d+/)
            expect(await row[3].textContent()).toMatch(/\d+/)
            expect(await row[4].textContent()).toMatch(/0x.*/)
            expect(await row[5].textContent()).toMatch(/\d+/)
        }
        if (url.includes(`optimism`)) {
            expect(header).toEqual(`Batch IDStorageAgeL1 txn countL2 blocksTxn`)
            expect(await row[0].textContent()).toMatch(/\d+/)
            expect(await row[1].textContent()).toMatch(/EIP-4844 blob/)
            expect(await row[2].textContent()).toMatch(/.*ago/)
            expect(await row[3].textContent()).toMatch(/\d+/)
            expect(await row[4].textContent()).toMatch(/\d+/)
            expect(await row[5].textContent()).toMatch(/\d+/)
        }
        if (url.includes(`base`)) {
            expect(header).toEqual(`Batch IDStorageAgeL1 txn countL2 blocksTxn`)
            expect(await row[0].textContent()).toMatch(/\d+/)
            expect(await row[1].textContent()).toMatch(/EIP-4844 blob/)
            expect(await row[2].textContent()).toMatch(/.*ago/)
            expect(await row[3].textContent()).toMatch(/\d+/)
            expect(await row[4].textContent()).toMatch(/\d+/)
            expect(await row[5].textContent()).toMatch(/\d+/)
        }
        if (url.includes(`zkevm`)) {
            expect(header).toEqual(`Batch #StatusAgeTxn countVerify tx hashSequence hash`)
            expect(await row[0].textContent()).toMatch(/\d+/)
            expect(await row[1].textContent()).toMatch(/Unfinalized|L1 Sequence Confirmed|Finalized/)
            expect(await row[2].textContent()).toMatch(/Undefined|.*ago/)
            expect(await row[3].textContent()).toMatch(/\d+/)
            expect(await row[4].textContent()).toMatch(/Pending|0x.*/)
            expect(await row[5].textContent()).toMatch(/Pending|0x.*/)
        }
        if (url.includes(`zksync`)) {
            expect(header).toEqual(`Batch #StatusAgeTxn countCommit txProve tx`)
            expect(await row[0].textContent()).toMatch(/\d+/)
            expect(await row[1].textContent()).toMatch(/Sealed on L2|Sent to L1|Validated on L1/)
            expect(await row[2].textContent()).toMatch(/.*ago/)
            expect(await row[3].textContent()).toMatch(/\d+/)
            expect(await row[4].textContent()).toMatch(/Pending|0x.*/)
            expect(await row[5].textContent()).toMatch(/Pending|0x.*/)
        }
    })
    test(`@Live @L2Roots ${url} Check L1->L2 Output roots`, async ({ newHomePage }) => {
        await newHomePage.checkRequests(newHomePage.page)
        await newHomePage.open_custom(url)
        if (await newHomePage.isL1L2OutputRootsEnabled()) {
            await newHomePage.open_custom(`${url}/output-roots`)
        } else {
            console.log(chalk.yellow(`L1->L2 output roots are OFF!`))
            return
        }
        const header = await newHomePage.actions.page.locator(`table >> tr >> nth=0`).textContent()
        const row = await newHomePage.actions.page.locator(`table >> tr >> nth=1 >> td`).all()
        expect(header).toEqual(`L2 output indexAgeL2 block #L1 txn hashOutput root`)
        expect(await row[0].textContent()).toMatch(/\d+/)
        expect(await row[1].textContent()).toMatch(/.*ago/)
        expect(await row[2].textContent()).toMatch(/\d+/)
        expect(await row[3].textContent()).toMatch(/0x.*/)
        expect(await row[4].textContent()).toMatch(/0x.*/)
    })
    test(`@Live @L2Games ${url} Check L1->L2 Optimism dispute games`, async ({ newHomePage }) => {
        if (url.includes(`optimism`)) {
            await newHomePage.checkRequests(newHomePage.page)
            await newHomePage.open_custom(`${url}/dispute-games`)
            const header = await newHomePage.actions.page.locator(`table >> tr >> nth=0`).textContent()
            const row = await newHomePage.actions.page.locator(`table >> tr >> nth=1 >> td`).all()
            expect(header).toEqual(`IndexGame typeAddressL2 block #AgeStatusResolution age`)
            expect(await row[0].textContent()).toMatch(/\d+/)
            expect(await row[1].textContent()).toMatch(/\d+/)
            expect(await row[2].textContent()).toMatch(/0x.*/)
            expect(await row[3].textContent()).toMatch(/\d+/)
            expect(await row[4].textContent()).toMatch(/.*ago/)
            expect(await row[5].textContent()).toMatch(/In progress|Defender wins/)
            expect(await row[6].textContent()).toMatch(/N\/A/)
        }
    })
    test(`@Live @Accounts ${url} Check top accounts`, async ({ newHomePage }) => {
        await newHomePage.checkRequests(newHomePage.page)
        await newHomePage.open_custom(`${url}/accounts`, { waitUntil: `load`, delay: 10000 })
        const header = await newHomePage.actions.page.locator(`table >> tr >> nth=0`).textContent()
        const row = await newHomePage.actions.page.locator(`table >> tr >> nth=1 >> td`).all()
        if (url.includes(`k8s-dev`)) {
            expect(header).toEqual(`RankAddressBalance ETHTxn count`)
        }
        if (url.includes(`eth.blockscout`)) {
            expect(header).toEqual(`RankAddressBalance ETHPercentageTxn count`)
            expect(await row[4].textContent()).toMatch(/\d+/)
        }
        if (url.includes(`gnosis`)) {
            expect(header).toEqual(`RankAddressBalance XDAITxn count`)
        }
        if (url.includes(`optimism`)) {
            expect(header).toEqual(`RankAddressBalance ETHPercentageTxn count`)
            expect(await row[4].textContent()).toMatch(/\d+/)
        }
        if (url.includes(`base`) || url.includes(`zkevm`) || url.includes(`zksync`) || url.includes(`zora`)) {
            expect(header).toEqual(`RankAddressBalance ETHTxn count`)
        }
        if (url.includes(`polygon`)) {
            expect(header).toEqual(`RankAddressBalance POLPercentageTxn count`)
            expect(await row[4].textContent()).toMatch(/\d+/)
        }
        if (url.includes(`neon`)) {
            expect(header).toEqual(`RankAddressBalance NEONTxn count`)
        }
        if (url.includes(`rootstock`)) {
            expect(header).toEqual(`RankAddressBalance RBTCPercentageTxn count`)
            expect(await row[4].textContent()).toMatch(/\d+/)
        }
        if (url.includes(`immutable`)) {
            expect(header).toEqual(`RankAddressBalance IMXTxn count`)
        }
        if (url.includes(`shibarium`)) {
            expect(header).toEqual(`RankAddressBalance BONEPercentageTxn count`)
            expect(await row[4].textContent()).toMatch(/\d+/)
        }
        expect(await row[0].textContent()).toMatch(/\d+/)
        expect(await row[1].textContent()).toMatch(/\w+/)
        expect(await row[2].textContent()).toMatch(/\d+/)
        expect(await row[3].textContent()).toMatch(/\d+/)
    })
})
