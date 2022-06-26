import { readFile } from 'fs/promises'
import { NotionAPI } from 'notion-client'

export {}

(async () => {
    const api = new NotionAPI({
        apiBaseUrl: `https://www.notion.so/`,
        // authToken: process.env.NOTION_TOKEN,
    })
    try {
        const page = await api.getPage(`QA-Roadmap-Testing-strategy-c0ade89f9f18469db471e67091495883`)
    } catch (e) {
        throw Error(`failed to connect to Notion: ${e}`)
    }

    // TODO: make automated upload of regenerated docs
})()