/* eslint-disable dot-notation */
import test from '@lib/BaseTest'
import { AddressProps } from '@pages/Address'
import { TXLogProps, TXProps } from '@pages/Common'

test.describe.configure({ mode: `parallel` })

test(`@Ethereum @Address @Data @PublicImage Check address page`, async ({ addressPage }) => {
    await test.step(`Check address page`, async () => {
        const { TestTokenSymbol, TestTokenName, TestTokenAddress } = process.env
        await addressPage.open(TestTokenAddress)
        await addressPage.check_address_description({
            token: [`Token`, `${TestTokenName} (${TestTokenSymbol})`],
            creator: [`Creator`, `0x`, `at`],
            balance: [`Balance`, `Ether`],
            tokens: [`Tokens`, `tokens`],
            transactions: [`Transactions`, `Transactions`],
            transfers: [`Transfers`, `Transfers`],
            gasUsed: [`Gas Used`],
            lastBalanceUpdate: [`Last Balance Update`],
        } as AddressProps)
        await addressPage.check_tx_in_list(0, {
            name: `Contract Call`,
            status: `Error: execution reverted`,
            from1: `0x`,
            to1: `0x`,
            nativeAmount: `0`,
            nativeName: `Ether`,
        } as TXProps)
        await addressPage.check_tx_in_list(1, {
            name: `Contract Call`,
            status: `Success`,
            from1: `0x`,
            to1: `0x`,
            nativeAmount: `0`,
            nativeName: `Ether`,
        } as TXProps)
        await addressPage.check_tx_in_list(2, {
            name: `Contract Creation`,
            status: `Success`,
            from1: `0x`,
            to1: `0x`,
            nativeAmount: `0`,
            nativeName: `Ether`,
        } as TXProps)
        await addressPage.select_internal_txs_tab()
        await addressPage.check_internal_txs_list(0, {
            name: `Internal Transaction`,
            status: `Create`,
            from1: `0x`,
            to1: `0x`,
            nativeAmount: `0`,
            nativeName: `Ether`,
        } as TXProps)
        await addressPage.select_logs_tab()
        await addressPage.check_tx_logs(0, {
            address: [`Transaction`, `0x`],
            topics: [`Topics`, `[0]`, `[1]`, `[2]`],
            data: [`Data`, `0x0000000000000000000000000000000000000000000000000000000000002710`],
        } as TXLogProps)
        await addressPage.check_tx_logs(1, {
            address: [`Transaction`, `0x`],
            topics: [`Topics`, `[0]`, `[1]`, `[2]`, `[3]`],
            data: [`Data`, `0x`],
        } as TXLogProps)
        await addressPage.check_tx_logs(2, {
            address: [`Transaction`, `0x`],
            topics: [`Topics`, `[0]`, `[1]`, `[2]`, `[3]`],
            data: [`Data`, `0x`],
        } as TXLogProps)
        await addressPage.check_verify_alert()
    })
})

test(`@Ethereum @Address @Data @AccountImage Check address page`, async ({ addressPage }) => {
    await test.step(`Check address page`, async () => {
        const { TestTokenSymbol, TestTokenName, TestTokenAddress } = process.env
        await addressPage.open(TestTokenAddress)
        await addressPage.check_address_description({
            token: [`Token`, `${TestTokenName} (${TestTokenSymbol})`],
            creator: [`Creator`, `0x`, `at`],
            balance: [`Balance`, `Ether`],
            tokens: [`Tokens`, `tokens`],
            transactions: [`Transactions`, `Transactions`],
            transfers: [`Transfers`, `Transfers`],
            gasUsed: [`Gas Used`],
            lastBalanceUpdate: [`Last Balance Update`],
        } as AddressProps)
        await addressPage.check_tx_in_list(0, {
            name: `Contract Call`,
            status: `Error: execution reverted`,
            from1: `0x`,
            to1: `0x`,
            nativeAmount: `0`,
            nativeName: `Ether`,
        } as TXProps)
        await addressPage.check_tx_in_list(1, {
            name: `Contract Call`,
            status: `Success`,
            from1: `0x`,
            to1: `0x`,
            nativeAmount: `0`,
            nativeName: `Ether`,
        } as TXProps)
        await addressPage.check_tx_in_list(2, {
            name: `Contract Creation`,
            status: `Success`,
            from1: `0x`,
            to1: `0x`,
            nativeAmount: `0`,
            nativeName: `Ether`,
        } as TXProps)
        await addressPage.select_internal_txs_tab()
        await addressPage.check_internal_txs_list(0, {
            name: `Internal Transaction`,
            status: `Create`,
            from1: `0x`,
            to1: `0x`,
            nativeAmount: `0`,
            nativeName: `Ether`,
        } as TXProps)
        await addressPage.select_logs_tab()
        await addressPage.check_tx_logs(0, {
            address: [`Transaction`, `0x`],
            topics: [`Topics`, `[0]`, `[1]`, `[2]`],
            data: [`Data`, `0x0000000000000000000000000000000000000000000000000000000000002710`],
        } as TXLogProps)
        await addressPage.check_tx_logs(1, {
            address: [`Transaction`, `0x`],
            topics: [`Topics`, `[0]`, `[1]`, `[2]`, `[3]`],
            data: [`Data`, `0x`],
        } as TXLogProps)
        await addressPage.check_tx_logs(2, {
            address: [`Transaction`, `0x`],
            topics: [`Topics`, `[0]`, `[1]`, `[2]`, `[3]`],
            data: [`Data`, `0x`],
        } as TXLogProps)
        await addressPage.check_verify_alert()
    })
})
