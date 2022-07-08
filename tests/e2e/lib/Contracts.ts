import { readFile } from 'fs/promises'
import {
    Contract, ContractFactory, ethers, providers, Wallet,
} from 'ethers'

const ARTIFACTS_PATH = `../contracts/artifacts/contracts`

export default class Contracts {
    readonly providerURL: string

    readonly provider: providers.JsonRpcProvider

    deployedContracts: Map<string, Contract> = new Map()

    data: Map<string, string> = new Map()

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

    async deploy(contractName: string, instanceName: string) {
        const artifactPath = `${ARTIFACTS_PATH}/${contractName}.sol/${contractName}.json`
        console.log(`reading artifact: ${artifactPath}`)
        const content = await readFile(artifactPath)
        const artifact = JSON.parse(content.toString())

        const factory = new ContractFactory(artifact.abi, artifact.bytecode, this.wallet)
        const contract = await factory.deploy()
        await contract.deployed()
        console.log(`deployed contract:\nName: ${instanceName}\nArtifact:${artifact.contractName}\nAddress:${contract.address}`)
        this.deployedContracts[instanceName] = contract
        process.env.TestTokenDeployTX = contract.deployTransaction.hash
        return contract
    }
}
