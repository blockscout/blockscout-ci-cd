/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import { readFileSync, writeFileSync, promises as fsPromises } from 'fs'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { JsonRpcProvider } from '@ethersproject/providers'
import { chromium } from 'playwright'
import { AuthorizedArea } from '@pages/Login'
import testConfig from './testConfig'
import Contracts from './lib/Contracts'
import { TestToken } from '../contracts/typechain/contracts/TestToken'
import { TestNFT } from '../contracts/typechain/contracts/TestNFT'

const CONTRACTS_DATA_FILE = `contracts_data.env`
const RECEIPT_RETRIES = 100

// shareData shares contracts data with both env for current test run and dumps to a file
const shareData = (data: Object): void => {
    Object.assign(process.env, process.env, data)
    writeFileSync(CONTRACTS_DATA_FILE, JSON.stringify(data))
}

async function delay(time: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}

// waitReceiptWithBlock waits for tx receipt even if tx is reverted until it has block assigned
// safe tx.wait(), because original throws
const waitReceiptWithBlock = async (provider: JsonRpcProvider, hash: string): Promise<TransactionResponse> => {
    for (let i = 0; i < RECEIPT_RETRIES; i++) {
        const r = await provider.getTransaction(hash)
        if (r.blockNumber) {
            return r
        }
    }
    throw Error(`tx ${hash} is not mined in any block`)
}

// setupContracts sets test contracts up
const setupContracts = async (): Promise<void> => {
    const contracts = new Contracts(process.env.NETWORK_URL)

    console.log(`deploying ERC20 contract`)
    const contractName = `TestToken`
    const tokenName = `EPIC`
    const tokenSymbol = `EPC`
    const token = await contracts.deploySymbolContract(tokenName, tokenSymbol, contractName) as TestToken
    const receipt0 = await waitReceiptWithBlock(contracts.provider, token.deployTransaction.hash)

    console.log(`minting tokens`)
    const tx1 = await token.mint(contracts.wallet.address, 10000)
    const receipt1 = await tx1.wait()

    console.log(`creating reverted tx`)
    const tx2 = await token.alwaysReverts({ gasLimit: 250000 })
    const receipt2 = await waitReceiptWithBlock(contracts.provider, tx2.hash)

    console.log(`deploying NFT contract`)
    const contractNameNFT = `TestNFT`
    const tokenNameNFT = `NFT`
    const tokenSymbolNFT = `NFT`
    const nft = await contracts.deploySymbolContract(tokenNameNFT, tokenSymbolNFT, contractNameNFT) as TestNFT
    const receiptNFT = await waitReceiptWithBlock(contracts.provider, token.deployTransaction.hash)

    console.log(`minting NFT`)
    const txNFT1 = await nft.mintNFT(contracts.wallet.address, ``)
    const receiptNFT1 = await txNFT1.wait()

    // read flattened contracts, deploy separate contract pack for verification
    const TestTokenFlatContractCode = readFileSync(`../contracts/contracts/TestToken_flat.sol`).toString()
    const TestNFTFlatContractCode = readFileSync(`../contracts/contracts/TestNFT_flat.sol`).toString()

    console.log(`deploying ERC20 contract (verified)`)
    const tokenNameV = `EPICV`
    const tokenSymbolV = `EPICV`
    const tokenV = await contracts.deploySymbolContract(tokenNameV, tokenSymbolV, `TestToken`) as TestToken
    const receipt0V = await waitReceiptWithBlock(contracts.provider, token.deployTransaction.hash)

    console.log(`minting tokens`)
    const tx1V = await tokenV.mint(contracts.wallet.address, 10000)
    const receipt1V = await tx1V.wait()

    console.log(`creating reverted tx`)
    const tx2V = await tokenV.alwaysReverts({ gasLimit: 250000 })
    const receipt2V = await waitReceiptWithBlock(contracts.provider, tx2.hash)

    console.log(`deploying NFT contract`)
    const contractNameNFTV = `TestNFTV`
    const tokenNameNFTV = `NFTV`
    const tokenSymbolNFTV = `NFTV`
    const nftV = await contracts.deploySymbolContract(tokenNameNFTV, tokenSymbolNFTV, `TestNFT`) as TestNFT
    const receiptNFTV = await waitReceiptWithBlock(contracts.provider, tokenV.deployTransaction.hash)

    console.log(`minting NFT`)
    const txNFT1V = await nftV.mintNFT(contracts.wallet.address, ``)
    const receiptNFT1V = await txNFT1V.wait()

    // console.log(`transferring tokens`)
    // const w2 = contracts.newWallet()
    // await token.connect(contracts.wallet).transfer(w2.address, 10)
    // await nftV.connect(contracts.wallet).transferFrom(contracts.wallet.address, w2.address, 1)

    shareData({
        ZeroAddress: `0x0000000000000000000000000000000000000000`,
        MinerAddress: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`,

        TestTokenHolder: contracts.wallet.address,
        TestTokenAddress: token.address,
        TestTokenName: tokenName,
        TestTokenSymbol: tokenSymbol,
        TestTokenDeployTXHash: token.deployTransaction.hash,
        TestTokenDeployTXBlockNumber: receipt0.blockNumber,
        TestTokenTXMintHash: tx1.hash,
        TestTokenTXMintBlockNumber: receipt1.blockNumber.toString(),
        TestTokenTXRevertHash: tx2.hash,
        TestTokenTXRevertBlockNumber: receipt2.blockNumber.toString(),

        TestNFTAddress: nft.address,
        TestNFTName: tokenNameNFT,
        TestNFTSymbol: tokenSymbolNFT,
        TestNFTDeployTXHash: nft.deployTransaction.hash,
        TestNFTDeployTXBlockNumber: receiptNFT.blockNumber,
        TestNFTTXMintHash: txNFT1.hash,
        TestNFTTXMintBlockNumber: receiptNFT1.blockNumber.toString(),

        // verified
        TestTokenFlatContractCode,
        TestNFTFlatContractCode,

        TestTokenAddressV: tokenV.address,
        TestTokenNameV: tokenNameV,
        TestTokenSymbolV: tokenSymbolV,
        TestTokenDeployTXHashV: tokenV.deployTransaction.hash,
        TestTokenDeployTXBlockNumberV: receipt0V.blockNumber,
        TestTokenTXMintHashV: tx1V.hash,
        TestTokenTXMintBlockNumberV: receipt1V.blockNumber.toString(),
        TestTokenTXRevertHashV: tx2V.hash,
        TestTokenTXRevertBlockNumberV: receipt2V.blockNumber.toString(),

        TestNFTAddressV: nftV.address,
        TestNFTNameV: tokenNameNFTV,
        TestNFTSymbolV: tokenSymbolNFTV,
        TestNFTDeployTXHashV: nftV.deployTransaction.hash,
        TestNFTDeployTXBlockNumberV: receiptNFTV.blockNumber,
        TestNFTTXMintHashV: txNFT1V.hash,
        TestNFTTXMintBlockNumberV: receiptNFT1V.blockNumber.toString(),
    })
}

async function globalSetup(): Promise<void> {
    // we are creating all required blockchain data here because:
    // 1. We can't handle more that one tx at a time, or more than one signing key at a time, because of how this test harness works
    // 2. NonceManager of ethers lib won't help us, we are running tests in different processes
    // 3. Geth are working poorly with custom genesis and developer mode, if you'd like to have multiple keys prefunded Geth need to be started with mining
    //    and generating a real DAG, now way to workaround that
    //    In developer mode genesis is partially ignored, for example alloc clause, so we can't fund the keys
    // 4. We are exposing it using env vars because tests are running in different processes
    if (process.env.PROD === `1`) {
        return
    }
    if (process.env.WALLET) {
        if (process.env.LOAD_CONTRACTS_DATA === `1`) {
            console.log(`loading contracts data from: ${CONTRACTS_DATA_FILE}`)
            Object.assign(process.env, process.env, JSON.parse(readFileSync(CONTRACTS_DATA_FILE).toString()))
        } else {
            console.log(`setting up contracts and transactions`)
            await setupContracts()
        }
    }
    const storageStateFile = `state.json`
    if (process.env.ACCOUNT === `1` && process.env.LOAD_AUTH_CTX === `0`) {
        console.log(`creating authorization context for: ${storageStateFile}`)
        const browser = await chromium.launch()
        const ctx = await browser.newContext({ baseURL: process.env.BLOCKSCOUT_URL })
        const page = await ctx.newPage()
        const loginPage = new AuthorizedArea(page, null, null)
        const { ACCOUNT_USERNAME, ACCOUNT_PASSWORD } = process.env
        await loginPage.open()
        await loginPage.signIn(ACCOUNT_USERNAME, ACCOUNT_PASSWORD)
        await ctx.storageState({ path: `state.json` })
        console.log(`authorization context saved: ${storageStateFile}`)
        await browser.close()
    } else {
        console.log(`authorization context loaded from: ${storageStateFile}`)
    }
}
export default globalSetup
