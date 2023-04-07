/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'
import {
    Block,
    Comparable,
    ComparableData,
    RequestBlocksData,
    RequestTransactionsData,
    Transaction,
} from "@lib/Format"
import { CommonPage } from "./Common"

interface TokenBalanceAssertionData {
    tokens: number
    balance: number
}

export class EtherscanGoerliPage extends CommonPage implements Comparable {
    readonly page: Page

    actions: WebActions

    BASE_URL = `https://goerli.etherscan.io/`

    ADDR_TOTAL_TOKENS_BALANCE = `#availableBalanceDropdown`

    ADDR_TOTAL_TOKENS = `#availableBalanceDropdown >> span`

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async get_txs_data(data: RequestTransactionsData): Promise<ComparableData> {
        const d = { txs: [] } as ComparableData
        for (const i in data.txs) {
            await this.actions.navigateToURL(`${this.BASE_URL}/tx/${data.txs[i].hash}`, { waitUntil: `load` })
            const statusText = await this.actions.getTextFromWebElements(this.mtable_div(8))
            const blockText = await this.actions.getTextFromWebElements(this.mtable_div(11, `span`))
            const fromText = await this.actions.getTextFromWebElements(this.mtable_div(20))
            const toText = await this.actions.getTextFromWebElements(this.mtable_div(24))
            const t = this.transform_transaction({
                hash: data.txs[i].hash,
                texts: {
                    blockText: blockText[0],
                    statusText: statusText[0],
                    fromText: fromText[0],
                    toText: toText[0],
                },
            } as Transaction)
            d.txs.push(t)
        }
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
        const d = { blocks: [] } as ComparableData
        for (const i in data.blocks) {
            await this.actions.navigateToURL(`${this.BASE_URL}/block/${data.blocks[i].num}`, { waitUntil: `load` })
            const proposedText = await this.actions.getTextFromWebElements(this.mtable_div(17))
            const transactionsText = await this.actions.getTextFromWebElements(this.mtable_div(21))
            const feeRecipientText = await this.actions.getTextFromWebElements(this.mtable_div(28))
            const rewardText = await this.actions.getTextFromWebElements(this.mtable_div(31))
            const totalDifficultyText = await this.actions.getTextFromWebElements(this.mtable_div(34))
            const sizeText = await this.actions.getTextFromWebElements(this.mtable_div(37))

            const gasUsedText = await this.actions.getTextFromWebElements(this.mtable_div(40))
            const gasLimitText = await this.actions.getTextFromWebElements(this.mtable_div(45))
            const baseFeePerGasText = await this.actions.getTextFromWebElements(this.mtable_div(48))
            const burntFeesText = await this.actions.getTextFromWebElements(this.mtable_div(51))
            const extraDataText = await this.actions.getTextFromWebElements(this.mtable_div(54))
            const b = this.transform_block({
                num: data.blocks[i].num,
                texts: {
                    proposedText: proposedText[0],
                    transactionsText: transactionsText[0],
                    feeRecipient: feeRecipientText[0],
                    rewardText: rewardText[0],
                    totalDifficulty: totalDifficultyText[0],
                    sizeText: sizeText[0],
                    gasUsedText: gasUsedText[0],
                    gasLimitText: gasLimitText[0],
                    baseFeePerGasText: baseFeePerGasText[0],
                    burntFeesText: burntFeesText[0],
                    extraDataText: extraDataText[0],
                },
            } as Block)
            d.blocks.push(b)
        }
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

    async address_data(addr: string): Promise<TokenBalanceAssertionData> {
        await this.actions.navigateToURL(`${this.BASE_URL}/address/${addr}`)
        const tokensBalance = await this.actions.getTextFromWebElements(this.ADDR_TOTAL_TOKENS_BALANCE)
        const tokens = await this.actions.getTextFromWebElements(this.ADDR_TOTAL_TOKENS)
        const b = tokensBalance[0].split(`\n`)[0].slice(1, 0)
        console.log(b)
        console.log(`checking addr: ${addr}`)
        console.log(`Total token balance on Etherscan: ${tokensBalance[0].split(`\n`)[0]}`)
        console.log(`Total tokens Etherscan: ${tokens}`)
        return { tokens: Number(tokens), balance: Number(b) }
    }
}
