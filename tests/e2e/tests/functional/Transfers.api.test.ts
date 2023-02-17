/* eslint-disable dot-notation */
import test from '@lib/BaseTest'
import Contracts from '@lib/Contracts'
import { expect } from '@playwright/test'
import { JsonRpcProvider } from '@ethersproject/providers'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { ethers } from 'ethers'
import { TestToken } from '../../../contracts/typechain/contracts/TestToken'

test.describe.configure({ mode: `parallel` })

const RECEIPT_RETRIES = 5

const shortID = (): string => {
    // I generate the UID from two parts here
    // to ensure the random number provide enough bits.
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
    for (let i = 0; i < RECEIPT_RETRIES; i++) {
        // eslint-disable-next-line no-await-in-loop
        const r = await provider.getTransaction(hash)
        if (r.blockNumber) {
            return r
        }
    }
    throw Error(`tx ${hash} is not mined in any block`)
}

const setupToken = async (contracts: Contracts, name: string, share: number): Promise<TestToken> => {
    console.log(`deploying ERC20 contract`)
    const contractName = `TestToken`
    const tokenName = name
    const tokenSymbol = `TT`
    const token = await contracts.deploySymbolContract(tokenName, tokenSymbol, contractName) as TestToken
    await waitReceiptWithBlock(contracts.provider, token.deployTransaction.hash)

    console.log(`minting tokens`)
    const tx1 = await token.mint(contracts.wallet.address, share)
    await tx1.wait()
    return token
}

// this test is for manual checking for token/native data
test(`@TransferTokens Test token transfers`, async () => {
    const contracts = new Contracts(process.env.NETWORK_URL)

    const HOLDERS = 30
    const TOTAL_SHARE = 3000000000000000
    const HOLDER_SHARE = TOTAL_SHARE / HOLDERS

    for (let j = 0; j < 1; j++) {
        const holders = []
        for (let i = 0; i < HOLDERS; i++) {
            const w = contracts.newWallet()
            holders.push(w)
        }

        // eslint-disable-next-line no-await-in-loop
        const token = await setupToken(contracts, shortID(), TOTAL_SHARE)

        for (const h of holders) {
            console.log(`transferring token to: ${h.address}`)
            // eslint-disable-next-line no-await-in-loop
            await token.connect(contracts.wallet).transfer(h.address, HOLDER_SHARE)
            // eslint-disable-next-line no-await-in-loop
            const tx = {
                to: h.address,
                value: ethers.utils.parseEther(`1`),
            }
            console.log(`transferring Ether to: ${h.address}`)
            // eslint-disable-next-line no-await-in-loop
            await contracts.wallet.sendTransaction(tx)
            // eslint-disable-next-line no-await-in-loop
            await contracts.wallet.sendTransaction(tx)
        }
        for (const h of holders) {
            console.log(`asserting balances`)
            // eslint-disable-next-line no-await-in-loop
            const b = await token.balanceOf(h.address)
            console.log(`holder: ${h.address}: ${b}`)
        }
    }
})
