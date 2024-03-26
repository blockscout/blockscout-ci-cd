import { browser } from 'k6/experimental/browser'

export const options = {
    scenarios: {
        ui: {
            executor: `shared-iterations`,
            iterations: 10,
            vus: 10,
            options: {
                browser: {
                    type: `chromium`,
                },
            },
        },
    },
}

const checkBlocks = async () => {
    const context = browser.newContext()
    const page = context.newPage()

    try {
        await page.goto(`https://eth-sepolia.blockscout.com/blocks`)
        page.screenshot({ path: `screenshots/screenshot.png` })
    } finally {
        page.close()
    }
}

export function handleSummary(data) {
    console.log(JSON.stringify(data, undefined, 2))
}

export default async function () {
    await checkBlocks()
}
