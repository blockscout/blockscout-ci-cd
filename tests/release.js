#!/usr/bin/env node

const {MultiSelect, Select} = require('enquirer')
const c = require('ansi-colors')
const Airtable = require('airtable')
const {URL} = require('url')
const fs = require('fs')
const path = require('path')
const {execSync} = require('child_process')

const TEST_DATA_DIR = `./data`
const BASE = `appHToklbHSEswU8U`
const TABLE = `tblqKw4KgJZxkDKOg`
const VIEW = `viw3n1kPAZER9a10M`

const groupByClient = (data) => data.reduce((acc, rec) => ((acc[rec.Client] ||= []).push(rec), acc), {})

const testDataFileBoilerplate = [
    {
        Load: {},
        API: {},
        UI: {
            search: {
                query: "",
                result: ""
            },
            erc721: {
                address: "",
                instance: "",
                metadata: ""
            },
            erc404: {
                address: "",
                instance: "",
                metadata: ""
            },
            erc1155: {
                address: "",
                instance: "",
                metadata: ""
            }
        },
    }
]

// Initialize Airtable
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(BASE)

async function getAirtableRecords(table, view) {
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

function createFilesFromUrls(urls, directory) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, {recursive: true})
    }

    urls.forEach(url => {
        const filename = urlToFilename(url)
        if (filename) {
            const filePath = path.join(directory, filename + ".json")
            if (fs.existsSync(filePath)) {
                console.log(`Skipping: ${filePath} (Already exists)`)
                return
            }
            fs.writeFileSync(filePath, JSON.stringify(testDataFileBoilerplate, null, ""), "utf8")
        }
    })
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
            const outFileName = `${td}-${currentReleaseTag}`
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
                {stdio: 'inherit', env: { ...process.env, BLOCKSCOUT_URLS: urls}}
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
        } catch (error) {
            console.log(c.red(`${record.URL.padEnd(50)} Error: ${error.message.padEnd(20)}`))
        }
    })

    await Promise.all(requests)
}

let currentReleaseTag

(async () => {
    console.log(c.green(`Loading environments data...`))
    const records = (await getAirtableRecords(TABLE, VIEW))
    const mainnets = records.filter((record) => record["Is testnet"] === undefined)
    const testnets = records.filter((record) => record["Is testnet"] === true)
    const clients = groupByClient(records)
    clients["All"] = records
    const urls = records.map((record) => record.URL)
    for (const r in clients) {
        console.log(`Record: ${JSON.stringify(r, null, "")}`)
    }
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
        await createFilesFromUrls(urls, TEST_DATA_DIR)
        process.exit(0)
    }

    const typePrompt = new Select({
        name: 'type',
        message: 'Select the group:',
        choices: Object.keys(clients),
    })

    const selectedClient = await typePrompt.run()
    console.log(`clients: ${JSON.stringify(clients[selectedClient], null, "")}`)
    const selectedURLs = clients[selectedClient].map((client) => client.URL)

    const environmentPrompt = new MultiSelect({
        name: 'environment',
        message: 'Select the environment:',
        choices: selectedURLs,
    })

    const testTypePrompt = new MultiSelect({
        name: 'testType',
        message: 'What needs to be tested?',
        choices: ['API', 'UI', 'Load', 'Versions', 'CreateTestData'],
        hint: '(Use space to select, enter to confirm)'
    })
    const selectedEnvURL = await environmentPrompt.run()
    const testType = await testTypePrompt.run()
    console.log(`test type: ${testType.length}`)

    console.log('Selected client:', selectedEnvURL)
    console.log('Selected environment:', selectedEnvURL)
    console.log('Selected test type:', testType)
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