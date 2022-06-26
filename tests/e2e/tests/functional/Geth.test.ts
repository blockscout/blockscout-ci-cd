import test from '@lib/BaseTest'
import { TestToken } from '../../../contracts/typechain/contracts/TestToken'

test(`@Geth Can deploy a contract on Ethereum and check transactions processed correctly`, async ({ context, homePage, contracts }) => {
    await test.step(`Deploy all required contracts`, async () => {
        // use default suite contracts
        await contracts.deployDefaultSuite()
        await contracts.get(`token1`).mint(contracts.wallet.address, 1)
        // or deploy a contract from ../contracts/artifacts/contracts by name to check deployment txns
        const token: TestToken = await contracts.deploy(`TestToken`, `token3`) as TestToken
        await token.mint(contracts.wallet.address, 1)
    })

    await test.step(`Check blocks rendering`, async () => {
        // TODO
    })

    await test.step(`Check transactions rendering`, async () => {
        // TODO
    })
})
