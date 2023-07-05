/* eslint-disable dot-notation */
import test from '@lib/BaseTest'
import Contracts from '@lib/Contracts'
import { expect } from '@playwright/test'
import { JsonRpcProvider } from '@ethersproject/providers'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { ethers } from 'ethers'
import { TestToken } from '../../../contracts/typechain/contracts/TestToken'
import { TestNFT } from '../../../contracts/typechain/contracts/TestNFT'

test.describe.configure({ mode: `parallel` })

const RECEIPT_RETRIES = 5

const shortID = (): string => {
    // eslint-disable-next-line no-bitwise
    let firstPart = (Math.random() * 46656) | 0
    // eslint-disable-next-line no-bitwise
    let secondPart = (Math.random() * 46656) | 0
    firstPart = (`000${firstPart.toString(36)}`).slice(-3) as any
    secondPart = (`000${secondPart.toString(36)}`).slice(-3) as any
    const r = firstPart + secondPart
    return r.toString()
}

const waitReceiptWithBlock = async (provider: JsonRpcProvider, hash: string): Promise<TransactionResponse> => {
    for (let i = 0; i < RECEIPT_RETRIES; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const r = await provider.getTransaction(hash)
        if (r.blockNumber) {
            return r
        }
    }
    throw Error(`tx ${hash} is not mined in any block`)
}

const deployContract = async (contracts: Contracts, artifactName: string, contractName: string, contractSymbol: string): Promise<TestToken | TestNFT> => {
    console.log(`deploying contract`)
    const token = await contracts.deploySymbolContract(contractName, contractSymbol, artifactName) as TestToken
    await waitReceiptWithBlock(contracts.provider, token.deployTransaction.hash)
    return token
}

// manual on live/testnet networks

test(`@AddressOwners Deploy Vyper ERC20`, async () => {
    const contracts = new Contracts(process.env.NETWORK_URL)

    const token = await deployContract(
        contracts,
        `TestTokenVyper`,
        `TestTokenVyper`,
        shortID(),
    )
    await token.mint(contracts.wallet.address, 100)
})

test(`@AddressOwners Deploy ownable ERC20 token, verify addrress`, async () => {
    const contracts = new Contracts(process.env.NETWORK_URL)

    const token = await deployContract(
        contracts,
        `TestToken`,
        `VerifiedByCreatorContract`,
        shortID(),
    )
    await token.mint(contracts.wallet.address, 100)
})

test(`@AddressOwners Deploy ownable ERC20 token, manual signature verification`, async () => {
    const contracts = new Contracts(process.env.NETWORK_URL)

    // const token = await deployContract(
    //     contracts,
    //     `TestToken`,
    //     `VerifiedByManualSig`,
    //     shortID(),
    // )
    // await token.mint(contracts.wallet.address, 100)

    const signature = await contracts.wallet.signMessage(`[eth-goerli.blockscout.com] [2023-06-19 16:00:58] I, hereby verify that I am the owner/creator of the address [0x5bd57755f563c79a7580bc1fe56a06e94f77cdeb]`)
    console.log(`signature: ${signature}`)
    console.log(`signature: ${signature}`)
    console.log(`signature: ${signature}`)
    console.log(`signature: ${signature}`)
})
