/* eslint-disable dot-notation */
import test from '@lib/BaseTest'
import { TokenHoldersProps, TXTokenProps } from '@pages/Common'
import { TokenPage, TokenProps } from '@pages/Token'

test.describe.configure({ mode: `parallel` })

test(`@Ethereum @TokenPage @Data @PublicImage @AccountImage Check token page`, async ({ tokenPage }) => {
    await test.step(`Check token page`, async () => {
        const { TestTokenSymbol, TestTokenAddress, TestTokenHolder } = process.env
        await tokenPage.open(TestTokenAddress)
        await tokenPage.check_token({
            contract: [`Contract`, TestTokenAddress.toLowerCase()],
            totalSupply: [`Total supply`, `0.00000000000001 ${TestTokenSymbol}`],
            holders: [`Holders`, `1 Addresses`],
            transfers: [`Transfers`, `1 Transfers`],
            decimals: [`Decimals`, `18`],
            tokenType: [`Token type`, `ERC-20`],
        } as TokenProps)
        await tokenPage.check_token_txs_list(0, {
            name: `Token Minting`,
            from1: `0x`,
            to1: `0x`,
            tokenAmount: `0.00000000000001`,
            tokenSymbol: TestTokenSymbol,
        } as TXTokenProps)
        await tokenPage.select_token_holders_tab()
        await tokenPage.check_token_holders(0, {
            holder: [TestTokenHolder],
            value: [`0.00000000000001 ${TestTokenSymbol}`, `100.0000%`],
        } as TokenHoldersProps)
    })
})
