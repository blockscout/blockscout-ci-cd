/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'
import { CommonPage } from "./Common"

export interface BlockDescriptionProps {
    blockHeight: string[]
    timestamp: string[]
    transactions: string[]
    miner: string[]
    size: string[]
    hash: string[]
    parentHash: string[]
    difficulty: string[]
    totalDifficulty: string[]
    gasUsed: string[]
    gasLimit: string[]
    nonce: string[]
    baseFeePerGas: string[]
    burntFees: string[]
    priorityFeeTip: string[]
}

export class BlocksPage extends CommonPage {
    readonly page: Page

    actions: WebActions

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(bn: string): Promise<void> {
        await this.actions.navigateToURL(`${process.env.BLOCKSCOUT_URL}/block/${bn}/transactions`)
    }

    async check_block_description(p: BlockDescriptionProps): Promise<void> {
        let row = 0
        for (const field in p) {
            const [name, ...assertions] = p[field]
            console.log(`field: ${field}`)
            await this.actions.verifyElementContainsText(`${this.CARD_BODY_KEYS} >> nth=${row}`, p[field][0])
            for (const a of assertions) {
                console.log(`assertion: ${a}`)
                await this.actions.verifyElementContainsText(`${this.CARD_BODY_VALUES} >> nth=${row}`, a)
            }
            row += 1
        }
    }
}
