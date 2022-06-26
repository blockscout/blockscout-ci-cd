import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'
import testConfig from '../testConfig'

let actions: WebActions

export class BlocksPageObjects {
    BLOCK_TILES = `[class="tile-label"]`

    FIRST_BLOCK_TILE = `:nth-match(:text("#"), 1)`
}

export class BlocksPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
        actions = new WebActions(this.page)
    }

    po = new BlocksPageObjects()

    async open(): Promise<void> {
        await actions.navigateToURL(`/blocks`)
    }

    async getAllBlockTiles(): Promise<void> {
        await actions.getTextFromWebElements(this.po.BLOCK_TILES)
    }

    async clickFirstBlockTile(): Promise<void> {
        await actions.clickElement(this.po.FIRST_BLOCK_TILE)
    }
}
