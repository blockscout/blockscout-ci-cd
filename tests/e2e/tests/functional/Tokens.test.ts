/* eslint-disable dot-notation */
import test from '@lib/BaseTest'
import { TokenPage } from '@pages/Token'
import { NativeCurrencyProps, TokenRowProps } from '@pages/Tokens'

test.describe.configure({ mode: `parallel` })

test(`@AccountImage @Token Search token by the name`, async ({ tokensPage }) => {
    const { TestTokenSymbol, TestNFTSymbol } = process.env
    await tokensPage.mock_ads()
    await tokensPage.open()
    await tokensPage.setFilter(`ERC-20`)
    await tokensPage.search(TestTokenSymbol)
    await tokensPage.check_token_row(1, {
        summary: [`1`, `EPIC (EPC)`, `0x`, `ERC-20`],
        price: ``,
        marketCap: ``,
        holders: `1`,
    } as TokenRowProps)
    await tokensPage.setFilter(`ERC-721`)
    await tokensPage.search(TestNFTSymbol)
    await tokensPage.check_token_row(1, {
        summary: [`1`, `NFT`, `0x`, `ERC-721`],
        price: ``,
        marketCap: ``,
        holders: `1`,
    } as TokenRowProps)
})

test(`@AccountImage @Token Search a token by symbol`, async ({ tokensPage }) => {
    const { TestTokenName, TestNFTName } = process.env
    await tokensPage.mock_ads()
    await tokensPage.open()
    await tokensPage.setFilter(`ERC-20`)
    await tokensPage.search(TestTokenName)
    await tokensPage.check_token_row(1, {
        summary: [`1`, `EPIC (EPC)`, `0x`, `ERC-20`],
        price: ``,
        marketCap: ``,
        holders: `1`,
    } as TokenRowProps)
    await tokensPage.setFilter(`ERC-721`)
    await tokensPage.search(TestNFTName)
    await tokensPage.check_token_row(1, {
        summary: [`1`, `NFT`, `0x`, `ERC-721`],
        price: ``,
        marketCap: ``,
        holders: `1`,
    } as TokenRowProps)
})

test.skip(`@AccountImage @Token Check native currency list`, async ({ tokensPage }) => {
    const { MinerAddress } = process.env
    await tokensPage.openAccounts()
    await tokensPage.check_native_row(0, {
        position: `1`,
        address: MinerAddress,
        balance: `Ether`,
        txnCount: `Transactions sent`,
    } as NativeCurrencyProps)
})
