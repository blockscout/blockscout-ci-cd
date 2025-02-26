#!/usr/bin/env node

const {MultiSelect, Select} = require('enquirer')
const c = require('ansi-colors')
const Airtable = require('airtable')
const {URL} = require('url')
const fs = require('fs')
const path = require('path')
const {execSync} = require('child_process')

const LoadTestClientName = `zzz-dev-sepolia`
const AllMainnets = `all-mainnets`
const AllTestnets = `all-testnets`
const TEST_DATA_DIR = `./data`
const BASE = `appHToklbHSEswU8U`
const TABLE = `tblqKw4KgJZxkDKOg`
const VIEW = `viw3n1kPAZER9a10M`

const groupByClient = (data) => data.reduce((acc, rec) => ((acc[rec.Client] ||= []).push(rec), acc), {})

const fetchTokenData = async (url, type) => {
    console.log(c.green(`loading ${type} token for ${url}`))
    const response = await fetch(`${url}/api/v2/tokens?type=${type}`)
    if (!response.ok) {
        throw new Error(`Failed to fetch tokens, status: ${response.status}`)
    }
    const data = await response.json()
    if (data.items.length >= 1) {
        const t = data.items[0]
        const respInstances = await fetch(`${url}/api/v2/tokens/${t.address}/instances`)
        const instData = await respInstances.json()
        console.log(c.green(`found token of type: ${type} for ${url}`))
        return {
            name: t.name,
            address: t.address,
            instance: instData.items[0].id,
        }
    } else {
        console.log(c.yellow(`failed to find any ${type} tokens for ${url}`))
    }
}

const fetchLoadTransactions = async (url) => {
    const resp = await fetch(`${url}/api/v2/transactions`)
    const data = await resp.json()
    return data.items.map((d) => d.hash)
}

const fetchLoadBlocks = async (url) => {
    const resp = await fetch(`${url}/api/v2/blocks`)
    const data = await resp.json()
    return data.items.map((d) => d.height)
}

const fetchLoadTokensERC20 = async (url) => {
    const resp = await fetch(`${url}/api/v2/tokens?type=ERC-20`)
    const data = await resp.json()
    return data.items.map((d) => d.address)
}

const fetchLoadTokensERC721Instances = async (url, addresses) => {
    const fetchInst = async (url, address) => {
        const instResp = await fetch(`${url}/api/v2/tokens/${address}/instances`)
        const instData = await instResp.json()
        return instData.items.map((item) => item.id)
    }
    const insts = await Promise.all([
        fetchInst(url, addresses[0]),
        fetchInst(url, addresses[1]),
        fetchInst(url, addresses[2]),
    ])
    return [
        {
            addr: addresses[0],
            instances: insts[0],
        },
        {
            addr: addresses[1],
            instances: insts[1],
        },
        {
            addr: addresses[2],
            instances: insts[2],
        }
    ]
}

const fetchLoadTokensERC721 = async (url) => {
    const resp = await fetch(`${url}/api/v2/tokens?type=ERC-721`)
    const data = await resp.json()
    const addresses = data.items.map((d) => d.address)
    return await fetchLoadTokensERC721Instances(url, addresses)
}

const fetchLoadVerifiedContracts = async (url) => {
    const resp = await fetch(`${url}/api/v2/smart-contracts`)
    const data = await resp.json()
    return data.items.map((d) => d.address.hash)
}

// Data generation
const generateTestData = async (url) => {
    try {
        // token data and search query
        const results = await Promise.all([
            fetchTokenData(url, `ERC-721`),
            fetchTokenData(url, `ERC-1155`),
            fetchTokenData(url, `ERC-404`),
        ])
        const loadResults = await Promise.all([
            fetchLoadTransactions(url),
            fetchLoadBlocks(url),
            fetchLoadTokensERC20(url),
            fetchLoadTokensERC721(url),
            fetchLoadVerifiedContracts(url)
        ])
        // console.log(`results: ${JSON.stringify(loadResults, null, " ")}`)
        const fullData = {
            Load: {
                txs: loadResults[0],
                blocks: loadResults[1],
                tokens: loadResults[2],
                verifiedContracts: loadResults[3],
            },
            API: {
                txs: loadResults[0]
            },
            UI: {
                search: {
                    query: results[0].name,
                    result: results[0].name,
                },
                erc721: results[0],
                erc1155: results[1],
                erc404: results[2],
            }
        }
        return [fullData]
    } catch (error) {
        console.error('Error fetching token:', error)
        throw error
    }
}

// Initialize Airtable

async function getAirtableRecords(base, table, view) {
    const records = []
    await base(table).select({
        view: view
    }).eachPage((pageRecords, fetchNextPage) => {
        pageRecords.forEach(record => {
            records.push(record.fields)
        })
        fetchNextPage()
    })
    return records
}

function urlToFilename(rawUrl) {
    try {
        const parsedUrl = new URL(rawUrl)
        let filename = parsedUrl.hostname
        if (parsedUrl.pathname && parsedUrl.pathname !== "/") {
            filename += "_" + parsedUrl.pathname.replace(/\//g, "_")
        }
        return filename.replace(/[<>:"/\\|?*]/g, "_")
    } catch (error) {
        console.error("Invalid URL:", rawUrl)
        return null
    }
}

function createTestDataFilesFromURL(url, directory, data) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, {recursive: true})
    }

    const filename = urlToFilename(url)
    if (filename) {
        const filePath = path.join(directory, filename + ".json")
        if (fs.existsSync(filePath)) {
            console.log(`Skipping: ${filePath} (Already exists)`)
            return
        }
        console.log(c.green(`New environment: ${filePath}`))
        fs.writeFileSync(filePath, JSON.stringify(data, null, " "), "utf8")
    }
}

const BLOCKSCOUT_URLS = process.env.BLOCKSCOUT_URLS ? process.env.BLOCKSCOUT_URLS.split(',') : []
const TEST_DATA_FILES = process.env.TEST_DATA_FILES ? process.env.TEST_DATA_FILES.split(',') : []
const LOAD_TAGS = process.env.LOAD_TAGS ? process.env.LOAD_TAGS.split(',') : []
const K6_OUT_FILE = process.env.K6_OUT_FILE || 'output.json'
const K6_OUT = process.env.K6_OUT || 'stdout'

// Function to run API tests
function runApiTests(urls) {
    console.log('Running API tests...')
    try {
        execSync('cd e2e && npm run test:api', {stdio: 'inherit', env: {...process.env, BLOCKSCOUT_URL: urls}})
    } catch (error) {
        console.error('Error running API tests:', error.message)
    }
}

function runUiTests(urls) {
    console.log('Running UI tests...')
    try {
        execSync('cd e2e && npm run test:ondemand', {stdio: 'inherit', env: {...process.env, BLOCKSCOUT_URL: urls}})
    } catch (error) {
        console.error('Error running UI tests:', error.message)
    }
}

function runLoadTests(urls) {
    console.log('Running Load tests...')
    if (
        BLOCKSCOUT_URLS.length !== TEST_DATA_FILES.length ||
        BLOCKSCOUT_URLS.length !== LOAD_TAGS.length
    ) {
        console.error(
            'Error: BLOCKSCOUT_URLS, TEST_DATA_FILES, and LOAD_TAGS arrays must have the same length.'
        )
        return
    }

    for (const url of urls) {
        try {
            const td = urlToFilename(url)
            const outFileName = `${td}-${currentReleaseTag}-v1-api`
            execSync(
                `cd load/tests && ../bin_k6/k6-tsdb-darwin \
        --env BASE_URL="${url}" \
        --env TEST_DATA_FILE="../../data/${td}.json" \
        --env LOKI_GUN_DEBUG=none \
        --out json=../../releases/${outFileName}.json \
        --out ${K6_OUT} \
        --verbose \
        run \
        --tag testid="${outFileName}" \
        --log-output=stdout \
        --no-usage-report \
        blockscoutv2.js`,
                {stdio: 'inherit', env: {...process.env, BLOCKSCOUT_URLS: urls}}
            )
        } catch (error) {
            console.error(`Error running Load test for ${url}:`, error.message)
        }
    }
}

async function getVersions(records) {
    console.log('Fetching versions...')
    console.log(`${'URL'.padEnd(50)} ${'Backend Version'.padEnd(20)}`)
    console.log(`${'-'.repeat(50)} ${'-'.repeat(20)}`)

    const requests = records.map(async (record) => {
        try {
            const response = await fetch(`${record.URL}/api/v2/config/backend-version`)
            if (!response.ok) throw new Error('Failed to retrieve data')

            const data = await response.json()
            console.log(`${record.URL.padEnd(50)} ${data.backend_version.padEnd(20)}`)
            // console.log(`"${record.URL}"`)
        } catch (error) {
            // console.log(`"${record.URL}"`)
            console.log(c.red(`${record.URL.padEnd(50)} Error: ${error.message.padEnd(20)}`))
        }
    })

    await Promise.all(requests)
}

let currentReleaseTag

(async () => {
    if (process.env.AIRTABLE_API_KEY === undefined || process.env.K6_OUT === undefined) {
        console.log(c.red(`AIRTABLE_API_KEY and K6_OUT must be set as environment variables first`))
        process.exit(1)
    }
    console.log(c.green(`Loading environments data...`))
    const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(BASE)
    const records = (await getAirtableRecords(base, TABLE, VIEW))
    const mainnets = records.filter((record) => record["Is testnet"] === undefined)
    const testnets = records.filter((record) => record["Is testnet"] === true)
    const clients = groupByClient(records)
    clients[LoadTestClientName] = [{Client: LoadTestClientName, URL: "https://eth-sepolia.k8s-dev.blockscout.com/"}]
    clients["Fantom"] = [{Client: "Fantom", URL: "https://ftmscout.com"}]
    console.log(`Total of ${records.length} networks`)
    console.log(`Mainnets: ${mainnets.length} networks`)
    console.log(`Testnets: ${testnets.length} networks`)

    if (process.argv[2] === 'new') {
        if (process.argv[3] === undefined) {
            console.log(c.red(`release tag can't be empty, usage: release.js new v1.0.0`))
            process.exit(1)
        }
        currentReleaseTag = process.argv[3]
    }

    if (process.argv[2] === 'status') {
        await getVersions(records)
        process.exit(0)
    }

    if (process.argv[2] === 'generate') {
        if (process.argv[3] === undefined) {
            console.log(c.red(`need an environment URL to generate data`))
            process.exit(1)
        }
        const url = process.argv[3]
        const resp = await generateTestData(url)
        console.log(c.green(`data generated for ${url}: ${JSON.stringify(resp, null, " ")}`))
        await createTestDataFilesFromURL(url, TEST_DATA_DIR, resp)
        process.exit(0)
    }

    const typePrompt = new Select({
        name: 'type',
        message: 'Select the group:',
        choices: Object.keys(clients),
    })

    const selectedClient = await typePrompt.run()
    const selectedURLs = clients[selectedClient].map((client) => client.URL)

    const environmentPrompt = new MultiSelect({
        name: 'environment',
        message: 'Select the environment:',
        choices: selectedURLs,
    })

    const testTypePrompt = new MultiSelect({
        name: 'testType',
        message: 'What needs to be tested?',
        choices: ['API', 'UI', 'Load'],
        hint: '(Use space to select, enter to confirm)'
    })
    const selectedEnvURL = await environmentPrompt.run()
    const testType = await testTypePrompt.run()
    console.log('Selected client:', selectedEnvURL)
    console.log('Selected environment:', selectedEnvURL)
    console.log('Selected test type:', testType)
    if (selectedEnvURL === undefined) {
        console.log(c.red(`no environment has been selected`))
        process.exit(1)
    }
    for (const t of testType) {
        switch (t) {
            case 'API':
                await runApiTests(selectedEnvURL)
                break
            case 'UI':
                await runUiTests(selectedEnvURL)
                break
            case 'Load':
                await runLoadTests(selectedEnvURL)
                break
            default:
                console.log('Invalid test type selected.')
        }
    }
})()