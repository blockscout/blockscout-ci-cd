/* eslint-disable dot-notation */
import test from '@lib/BaseTest'
import { NativeCurrencyProps, TokenRowProps } from '@pages/Tokens'

test.describe.configure({ mode: `parallel` })

test(`@Ethereum @Tokens @Data @PublicImage @AccountImage Search token by the name`, async ({ tokensPage }) => {
    await test.step(`Search token by the name`, async () => {
        const { TestTokenSymbol, TestNFTSymbol } = process.env
        await tokensPage.open()
        await tokensPage.search(TestTokenSymbol)
        await tokensPage.check_token_row(1, {
            summary: [`1`, `EPIC (EPC)`, `0x`, `ERC-20`],
            price: `-`,
            marketCap: `-`,
            holders: `1`,
        } as TokenRowProps)
        await tokensPage.search(TestNFTSymbol)
        await tokensPage.check_token_row(1, {
            summary: [`1`, `NFT`, `0x`, `ERC-721`],
            price: `-`,
            marketCap: `-`,
            holders: `1`,
        } as TokenRowProps)
    })
})

test(`@Ethereum @Tokens @Data @PublicImage @AccountImage Search a token by symbol`, async ({ tokensPage }) => {
    await test.step(`Search a token by the symbol`, async () => {
        const { TestTokenName, TestNFTName } = process.env
        await tokensPage.open()
        await tokensPage.search(TestTokenName)
        await tokensPage.check_token_row(1, {
            summary: [`1`, `EPIC (EPC)`, `0x`, `ERC-20`],
            price: `-`,
            marketCap: `-`,
            holders: `1`,
        } as TokenRowProps)
        await tokensPage.search(TestNFTName)
        await tokensPage.check_token_row(1, {
            summary: [`1`, `NFT`, `0x`, `ERC-721`],
            price: `-`,
            marketCap: `-`,
            holders: `1`,
        } as TokenRowProps)
    })
})

test.skip(`@Ethereum @Tokens @Data @PublicImage @AccountImage Check native currency list`, async ({ tokensPage }) => {
    const { MinerAddress } = process.env
    await tokensPage.openAccounts()
    await tokensPage.check_native_row(0, {
        position: `1`,
        address: MinerAddress,
        balance: `Ether`,
        txnCount: `Transactions sent`,
    } as NativeCurrencyProps)
})
