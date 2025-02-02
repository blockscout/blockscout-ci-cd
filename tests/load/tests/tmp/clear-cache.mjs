import fetch from 'node-fetch'
import fs from 'fs'

// Basic Auth credentials
const username = __ENV.CACHE_USERNAME
const password = __ENV.CACHE_PASSWORD
const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString(`base64`)}`

// Function to read transaction hashes from a JSON file
function readTxHashesFromFile(filePath) {
    try {
        const fileData = fs.readFileSync(filePath, `utf8`)
        const jsonData = JSON.parse(fileData)
        return jsonData[0].txs
    } catch (error) {
        console.error(`Error reading or parsing the JSON file:`, error)
        process.exit(1) // Exit the script if there's an error
    }
}

// Function to call the API for a single transaction hash
async function deleteCacheForTx(txHash) {
    const url = `https://eth-tx-summary-api.services.blockscout.com/cache/delete/${txHash}`
    try {
        const response = await fetch(url, {
            method: `DELETE`,
            headers: {
                Authorization: authHeader,
                'Content-Type': `application/json`,
            },
        })

        const data = await response.json()
        console.log(data.message)
    } catch (error) {
        console.error(`Error for ${txHash}:`, error)
    }
}

async function processAllTransactions(txHashes) {
    for (const txHash of txHashes) {
        // eslint-disable-next-line no-await-in-loop
        await deleteCacheForTx(txHash)
    }
}

async function main() {
    const filePath = `data/eth-tx-summary-txs.json`
    const txHashes = readTxHashesFromFile(process.env.FILEPATH)
    console.log(txHashes)
    await processAllTransactions(txHashes)
}

main()
