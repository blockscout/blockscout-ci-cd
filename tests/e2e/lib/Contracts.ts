import { readFile } from 'fs/promises'
import {
    Contract, ContractFactory, ethers, providers, Wallet,
} from 'ethers'

const ARTIFACTS_PATH = `../contracts/artifacts/contracts`

export default class Contracts {
    readonly providerURL: string

    readonly provider: providers.JsonRpcProvider

    wallet: Wallet

    constructor(providerURL: string) {
        this.providerURL = providerURL
        this.provider = new providers.JsonRpcProvider(this.providerURL)
        let walletAddr: string
        try {
            walletAddr = process.env.WALLET
        } catch (e) {
            throw Error(`please, set WALLET=... env var to your root network wallet: ${e}`)
        }
        this.wallet = new ethers.Wallet(walletAddr, this.provider)
    }

    async deploy(contractName: string, symbol: string, contractFileName: string): Promise<Contract> {
        const artifactPath = `${ARTIFACTS_PATH}/${contractFileName}.sol/${contractFileName}.json`
        console.log(`reading artifact: ${artifactPath}`)
        const content = await readFile(artifactPath)
        const artifact = JSON.parse(content.toString())

        const factory = new ContractFactory(artifact.abi, artifact.bytecode, this.wallet)
        const d = await factory.deploy(contractName, symbol)
        const contract = await d.deployed()
        console.log(`deployed contract:\nName: ${contractName}\nArtifact: ${contractFileName}\nAddress: ${contract.address}\nSymbol: ${symbol}`)
        return contract
    }
}
