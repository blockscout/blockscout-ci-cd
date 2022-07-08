import { readFileSync, writeFileSync, promises as fsPromises } from 'fs'
import testConfig from './testConfig'
import Contracts from './lib/Contracts'
import { TestToken } from '../contracts/typechain/contracts/TestToken'

const CONTRACTS_DATA_FILE = `contracts_data.env`

// shareData shares contracts data with both env for current test run and dumps to a file
const shareData = (data: Object) => {
    Object.assign(process.env, process.env, data)
    writeFileSync(CONTRACTS_DATA_FILE, JSON.stringify(data))
}

// setupContracts sets test contracts up
const setupContracts = async (): Promise<void> => {
    const contracts = new Contracts(testConfig.networkURL)
    console.log(`deploying ERC20 contract`)
    const token = await contracts.deploy(`TestToken`, `erc20`) as TestToken
    console.log(`minting tokens`)
    const tx1 = await token.mint(contracts.wallet.address, 1)
    const receipt1 = await tx1.wait()
    console.log(`creating reverted tx`)
    const tx2 = await token.alwaysReverts({ gasLimit: 250000 })

    shareData({
        TestTokenDeployTX: token.deployTransaction.hash,
        DATA_TX_1: tx1.hash,
        DATA_TX_1_BLOCK_NUMBER: receipt1.blockNumber.toString(),
        DATA_TX_2: tx2.hash,
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
    if (process.env.WALLET) {
        if (process.env.LOAD_CONTRACTS_DATA === `1`) {
            console.log(`loading contracts data`)
            Object.assign(process.env, process.env, JSON.parse(readFileSync(CONTRACTS_DATA_FILE).toString()))
        } else {
            console.log(`setting up contracts and transactions`)
            await setupContracts()
        }
    }
}
export default globalSetup
