/* eslint-disable dot-notation */
import test from '@lib/BaseTest'
import { NativeCurrencyProps, TokenRowProps } from '@pages/Tokens'

test.describe.configure({ mode: `parallel` })

test(`@Ethereum @Tokens @Data @PublicImage @AccountImage Search token by the name`, async ({ tokensPage }) => {
    await test.step(`Search token by the name`, async () => {
        const { TestTokenName, TestTokenSymbol } = process.env
        await tokensPage.open()
        await tokensPage.search(TestTokenSymbol)
        await tokensPage.check_token_row(0, {
            position: `1`,
            fill: ``,
            name: `${TestTokenName} (${TestTokenSymbol})`,
            address: [TestTokenName, `0x`],
            totalSupply: `0.00000000000001 ${TestTokenSymbol}`,
            holdersCount: `1`,
        } as TokenRowProps)
    })
})

test(`@Ethereum @Tokens @Data @PublicImage @AccountImage Search a token by the symbol`, async ({ tokensPage }) => {
    await test.step(`Search a token by the symbol`, async () => {
        const { TestTokenName, TestTokenSymbol } = process.env
        await tokensPage.open()
        await tokensPage.search(TestTokenName)
        await tokensPage.check_token_row(0, {
            position: `1`,
            fill: ``,
            name: `${TestTokenName} (${TestTokenSymbol})`,
            address: [TestTokenName, `0x`],
            totalSupply: `0.00000000000001 ${TestTokenSymbol}`,
            holdersCount: `1`,
        } as TokenRowProps)
    })
})

test(`@Ethereum @Tokens @Data @PublicImage Check native currency list`, async ({ tokensPage }) => {
    await test.step(`Check native currency list`, async () => {
        const { MinerAddress } = process.env
        await tokensPage.openAccounts()
        await tokensPage.check_native_row(0, {
            position: `1`,
            address: MinerAddress,
            balance: `Ether`,
            percentage: `% Market Cap`,
            txnCount: `Transactions sent`,
        } as NativeCurrencyProps)
    })
})
