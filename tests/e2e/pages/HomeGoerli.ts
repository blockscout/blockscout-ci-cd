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

export class HomeGoerli extends CommonPage implements Comparable {
    readonly page: Page

    BASE_URL = `https://eth-goerli.blockscout.com`

    actions: WebActions

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async openAddress(addr: string): Promise<void> {
        await this.actions.navigateToURL(`${this.BASE_URL}/token/${addr}`)
    }

    async get_txs_data(data: RequestTransactionsData): Promise<ComparableData> {
        const d = { txs: [] } as ComparableData
        for (const i in data.txs) {
            await this.actions.navigateToURL(`${this.BASE_URL}/tx/${data.txs[i].hash}`, { waitUntil: `load` })
            const blockText = await this.actions.getTextFromWebElements(this.main_block_div(`Block`))
            const statusText = await this.actions.getTextFromWebElements(this.main_block_div(`Status`))
            const fromText = await this.actions.getTextFromWebElements(this.main_block_div(`From`))
            const toText = await this.actions.getTextFromWebElements(this.main_block_div(`Interacted with contract`, `span`))
            const b = this.transform_transaction({
                hash: data.txs[i].hash,
                texts: {
                    blockText: blockText[0],
                    statusText: statusText[0],
                    fromText: fromText[0],
                    toText: toText[0],
                },
            } as Transaction)
            d.txs.push(b)
        }
        return d
    }

    transform_transaction(t: Transaction): Transaction {
        console.log(`transforming tx: ${t.hash}`)
        console.log(`tx before parsing: ${JSON.stringify(t)}`)
        const [, block] = t.texts.blockText.match(/(.*)\|/)
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

    async get_blocks_data(data: RequestBlocksData): Promise<ComparableData> {
        const d = { blocks: [] } as ComparableData
        for (const i in data.blocks) {
            await this.open_block(data.blocks[i].num)
            const sizeText = await this.actions.getTextFromWebElements(this.table_div(`Size`))
            const transactionsText = await this.actions.getTextFromWebElements(this.table_div(`Transactions`))
            const feeRecipientText = await this.actions.getTextFromWebElements(this.table_div(`Validated by`))
            const rewardText = await this.actions.getTextFromWebElements(this.table_div(`Block reward`))
            const gasUsedText = await this.actions.getTextFromWebElements(this.table_div(`Gas used`))
            const baseFeePerGasText = await this.actions.getTextFromWebElements(this.table_div(`Base fee per gas`))
            const burntFeesText = await this.actions.getTextFromWebElements(this.table_div(`Burnt fees`))
            const b = this.transform_block({
                num: data.blocks[i].num,
                texts: {
                    sizeText: sizeText[0],
                    transactionsText: transactionsText[0],
                    feeRecipient: feeRecipientText[0],
                    rewardText: rewardText[0],
                    gasUsedText: gasUsedText[0],
                    baseFeePerGasText: baseFeePerGasText[0],
                    burntFeesText: burntFeesText[0],
                },
            } as Block)
            d.blocks.push(b)
        }
        return d
    }

    transform_block(b: Block): Block {
        console.log(`transforming block: ${b.num}`)
        console.log(`block before parsing: ${JSON.stringify(b)}`)
        const [, txs] = b.texts.transactionsText.match(/(\d+) transact.*/)
        const [, feeRecipient] = b.texts.feeRecipient.match(/(.*)/)
        const [, reward] = b.texts.rewardText.match(/(\d\.\d+) ETH/)
        const [, absGasUsed, percGasUsed, _] = b.texts.gasUsedText.match(/(.*)(\d{2}\.\d{0,2})%.*(\d{2}\.\d{0,2})\s%/)
        const [, baseFeePerGasETH, baseFeePerGasGwei] = b.texts.baseFeePerGasText.match(/(.*)\sETH\s+\((.*)\sGwei/)
        const [, burntFees] = b.texts.burntFeesText.match(/(\d\.\d+)\s+ETH/)
        return {
            ...b,
            size: b.texts.sizeText,
            txs,
            feeRecipient,
            reward,
            absGasUsed,
            percGasUsed,
            baseFeePerGasETH,
            baseFeePerGasGwei,
            burntFees,
        } as Block
    }

    async open(): Promise<void> {
        await this.actions.navigateToURL(this.BASE_URL)
    }

    async open_block(num: number): Promise<void> {
        await this.actions.navigateToURL(`${this.BASE_URL}/block/${num}`)
    }
}
