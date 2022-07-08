import testConfig from './testConfig'
import Contracts from './lib/Contracts'
import { TestToken } from '../contracts/typechain/contracts/TestToken'

const setupContracts = async (): Promise<void> => {
    const contracts = new Contracts(testConfig.networkURL)
    const token = await contracts.deploy(`TestToken`, `erc20`) as TestToken
    const tx1 = await token.mint(contracts.wallet.address, 1)
    process.env.DATA_TX_1 = tx1.hash
    const tx2 = await token.alwaysReverts({ gasLimit: 250000 })
    process.env.DATA_TX_2 = tx2.hash
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
        console.log(`setting up contracts and transactions`)
        await setupContracts()
    }
}
export default globalSetup
