/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
import { WebActions } from "@lib/WebActions"
import type { BrowserContext, Page } from 'playwright'
import {
    Block,
    Comparable,
    ComparableData,
    RequestBlocksData,
    RequestTransactionsData,
    Transaction,
    TokenBalanceAssertionData,
} from "@lib/Format"
import { HomePage } from "./Home"
import { NewHomePage } from "./NewHome"

export class ETHHome extends NewHomePage implements Comparable {
    readonly page: Page

    BASE_URL = `https://eth.blockscout.com`

    actions: WebActions

    HEADER_TOTAL_BLOCKS = `:below(:text("Total blocks")) >> nth=0`

    HEADER_AVG_BLOCK_TIME = `:below(:text("Average block time")) >> nth=3`

    HEADER_TOTAL_TXNS = `:below(:text("Total transactions")) >> nth=0`

    HEADER_WALLETS = `:below(:text("Wallet addresses")) >> nth=0`

    HEADER_GAS_TRACKER = `:below(:text("Gas tracker")) >> nth=0`

    ADDR_TOTAL_BALANCE = `text=/.* ETH/`

    TOKENS_TOTAL_BALANCE_BUTTON = `[aria-label="Token select"]`

    TOKENS_TOTAL_BALANCE_AREA = `section >> a >> div >> div >> text=/\\d+.*/`

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(): Promise<void> {
        await this.actions.navigateToURL(this.BASE_URL)
    }

    async get_txs_data(data: RequestTransactionsData): Promise<ComparableData> {
        const d = { txs: [] } as ComparableData
        return d
    }

    transform_transaction(t: Transaction): Transaction {
        console.log(`transforming tx: ${t.hash}`)
        console.log(`tx before parsing: ${JSON.stringify(t)}`)
        const [, block] = t.texts.blockText.match(/(\d+)/)
        const [, status] = t.texts.statusText.match(/(.*)/)
        const [, from] = t.texts.fromText.match(/(.*)/)
        const [, to] = t.texts.toText.match(/(.*)/)
        return {
            ...t,
            block,
            status,
            from,
            to,
        } as Transaction
    }

    mtable_div(num: number, path?: string): string {
        return path ? `#ContentPlaceHolder1_maintable >> div >> nth=${num} >> ${path}` : `#ContentPlaceHolder1_maintable >> div >> nth=${num}`
    }

    async get_blocks_data(data: RequestBlocksData): Promise<ComparableData> {
        const d = { txs: [] } as ComparableData
        return d
    }

    transform_block(b: Block): Block {
        console.log(`transforming block: ${b.num}`)
        console.log(`block before parsing: ${JSON.stringify(b)}`)
        const [, feeRecipient] = b.texts.feeRecipient.match(/(.*)\s{2}/)
        // const [, slot, epoch] = b.texts.proposedText.match(/Block proposed on slot (\d+), epoch (\d+)/)
        const [, txs, _] = b.texts.transactionsText.match(/(\d+) transact.* and (\d+) contract internal trans/)
        const [, reward] = b.texts.rewardText.match(/(\d\.\d+) ETH/)
        const [, size] = b.texts.sizeText.match(/(.*) bytes/)
        const [, absGasUsed, percGasUsed] = b.texts.gasUsedText.match(/(.*)\s{2}\((.*)%\)/)
        const [, baseFeePerGasETH, baseFeePerGasGwei] = b.texts.baseFeePerGasText.match(/(.*)\sETH\s\((.*)\sGwei/)
        const [, burntFees] = b.texts.burntFeesText.match(/(\d\.\d+)\sETH/)
        return {
            ...b,
            feeRecipient,
            // slot,
            // epoch,
            // internalTxs,
            txs,
            reward,
            size,
            absGasUsed,
            percGasUsed,
            baseFeePerGasETH,
            baseFeePerGasGwei,
            burntFees,
        } as Block
    }

    async balance_data(addrs: string[]): Promise<TokenBalanceAssertionData> {
        const data: TokenBalanceAssertionData = { nativeBalances: [], tokenBalances: new Map<string, number>() }
        for (const addr of addrs) {
            await this.actions.navigateToURL(`${this.BASE_URL}/address/${addr}`)
            const balance = await this.actions.getTextFromWebElements(this.ADDR_TOTAL_BALANCE)
            const b = Number(balance[0].replace(`ETH`, ` `).replace(`,`, ``).replace(`,`, ``).trim()).toPrecision(9)
            console.log(b)
            console.log(`checking addr: ${addrs[0]}`)
            console.log(`Total native balance on Etherscan: ${b}`)
            data.nativeBalances.push({ address: addr, balance: Number(b) })
        }
        return data
    }

    async tokens_data(addrs: string[]): Promise<TokenBalanceAssertionData> {
        const data: TokenBalanceAssertionData = { nativeBalances: [], tokenBalances: new Map<string, number>() }
        for (const addr of addrs) {
            await this.actions.navigateToURL(`${this.BASE_URL}/address/${addr}`)
            await this.actions.clickElement(this.TOKENS_TOTAL_BALANCE_BUTTON)
            const texts = await this.actions.getTextFromWebElements(this.TOKENS_TOTAL_BALANCE_AREA)
            for (const t of texts) {
                if (t.includes(`ERC-20 TOKEN*`)) {
                    continue
                }
                // console.log(`element text: ${t}`)
                const [amount, tokenName] = t.split(` `)
                data.tokenBalances[`${addr}/${tokenName}`] = Number(amount.replace(`,`, ``).replace(`,`, ``).replace(`,`, ``).replace(`,`, ``)).toPrecision(9)
            }
            for (const e of Object.entries(data.tokenBalances)) {
                // console.log(`token balance: ${e[0]}, ${e[1]}`)
            }
        }
        return data
    }
}
