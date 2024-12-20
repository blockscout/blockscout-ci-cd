/* eslint-disable no-undef */
import { Httpx } from 'https://jslib.k6.io/httpx/0.1.0/index.js'
import {
    Scenario,
} from 'k6/options'

import { SharedArray } from 'k6/data'
import { randomTestAPICall } from "./random.test.suite"
import { advfilterMain } from "./advanced.tx.test.suite"

export const defaultSession = () => {
    const session = new Httpx({
        baseURL: __ENV.BASE_URL,
        // headers: {
        //     'User-Agent': ``,
        // },
        timeout: __ENV.TIMEOUT, // milliseconds
    })

    session.addTags({
        apiType: `rpc`,
    })
    session.clearHeader(`User-Agent`)
    return session
}

export const loadTestData = (td: any) => {
    const tdd = td[0]
    let apiKey = ``
    if (__ENV.BASE_URL.includes(`sepolia`)) {
        apiKey = __ENV.API_KEY_SEPOLIA
    } else if (__ENV.BASE_URL.includes(`goerli`)) {
        apiKey = __ENV.API_KEY_GOERLI
    } else if (__ENV.BASE_URL.includes(`alloy`)) {
        apiKey = __ENV.API_KEY_GOERLI_ALLOY
    } else if (__ENV.BASE_URL.includes(`gnosis`)) {
        apiKey = __ENV.API_KEY_GNOSIS
    } else {
        apiKey = __ENV.API_KEY_ETH
    }
    // console.log(`test data loaded ${JSON.stringify(testData)}`)
    return {
        ...tdd,
        APIKey: apiKey,
        startBlock: __ENV.START_BLOCK,
        endBlock: __ENV.END_BLOCK,
        v1Offset: 100,
        pagination: {
            pages: [0],
            offsets: [0],
        },
    }
}

// eslint-disable-next-line no-restricted-globals
const dataSharedArrray = new SharedArray(`users`, () => JSON.parse(open(__ENV.TEST_DATA_FILE)))
export const testData = loadTestData(dataSharedArrray)

export const SmokeStrategy = {
    executor: `constant-arrival-rate`,
    preAllocatedVUs: 50,
}

export const RampingStrategy = {
    executor: `ramping-arrival-rate`,
    stages: [
        { duration: `30s`, target: 10 },
        { duration: `30s`, target: 20 },
        { duration: `30s`, target: 30 },
        { duration: `30s`, target: 40 },
        { duration: `30s`, target: 50 },
        { duration: `30s`, target: 60 },
        { duration: `30s`, target: 70 },
        { duration: `30s`, target: 80 },
        { duration: `30s`, target: 90 },
        { duration: `30s`, target: 100 },
    ],
    preAllocatedVUs: 50,
}

const rampPublicUser = (name: string) => ({
    executor: `ramping-arrival-rate`,
    stages: [
        // { duration: `1m`, target: 1 },
        // { duration: `1m`, target: 2 },
        // { duration: `1m`, target: 3 },
        // { duration: `1m`, target: 4 },
        { duration: `2m`, target: 50 },
        { duration: `5m`, target: 50 },

        // { duration: `1m`, target: 25 },
        // { duration: `1m`, target: 50 },
        // { duration: `1m`, target: 75 },
        // { duration: `1m`, target: 100 },
        // { duration: `1m`, target: 125 },
        // { duration: `1m`, target: 150 },
        // { duration: `1m`, target: 175 },
        // { duration: `1m`, target: 200 },
    ],
    preAllocatedVUs: 120,
    exec: name,
} as Scenario)

const rampPrivateUser = (name: string) => ({
    executor: `ramping-arrival-rate`,
    stages: [
        { duration: `5m`, target: 3 },
    ],
    preAllocatedVUs: 10,
    exec: name,
} as Scenario)

export const defaultAPISoakSettings = {
    executor: `constant-arrival-rate`,
    duration: `1h`,
    rate: 3,
    preAllocatedVUs: 10,
}

export const defaultThresholds = {
    http_req_failed: [`rate<0.1`], // http errors should be less than 1%
    http_req_duration: [`p(95)<20000`], // 95% of requests should be below 20s, just for CI debug for now
}

export const defaultScenarioSettings = {
    gracefulStop: `30s`,
    timeUnit: `1s`,
    preAllocatedVUs: 40,
    maxVUs: 500,
} as Scenario

export const options = {
    iterations: 1,
}

interface Suites {
    [key: string]: any
}

// generatePerAPISuite
export const GeneratePerAPIStressSuite = (strategy: any, apis: string[], duration: number, rate: number): Suites => {
    const obj: Suites = {}
    for (const api of apis) {
        obj[api] = {
            ...strategy,
            exec: api,
            rate,
            duration: `${duration.toString()}s`,
        } as Scenario
    }
    return obj
}

// generatePerAPISuite
export const GeneratePerAPIBaselineSuite = (strategy: any, apis: string[], delayBetween: number, duration: number, rate: number): Suites => {
    const obj: Suites = {}
    let startTime: number = 0
    for (const api of apis) {
        obj[api] = {
            ...strategy,
            exec: api,
            rate,
            duration: `${duration.toString()}s`,
            startTime: `${startTime.toString()}s`,
        } as Scenario
        if (delayBetween !== 0) {
            startTime += delayBetween
        }
    }
    return obj
}

export const selectScenario = (scenarioName: string): { [name: string]: Scenario } => {
    switch (scenarioName) {
    case `randomURL`:
        return {
            test: {
                executor: `ramping-arrival-rate`,
                stages: [
                    { duration: `2m`, target: 20 },
                    { duration: `2m`, target: 30 },
                    { duration: `2m`, target: 40 },
                    { duration: `2m`, target: 50 },
                    { duration: `2m`, target: 60 },
                ],
                preAllocatedVUs: 100,
                exec: `randomTestAPICall`,
            },
        }
    case `frontendBrowser`:
        return {
            abc: {
                executor: `shared-iterations`,
            },
        }
    case `baselineFrontend`:
        return GeneratePerAPIBaselineSuite(
            SmokeStrategy,
            [
                `frontendBlocks`,
                `frontendBlockDetails`,
                `frontendTxs`,
                `frontendBlocks`,
                `frontendTxDetails`,
                `frontendAddressDetails`,
                `frontendTokenDetails`,
                `frontendTokenHoldersDetails`,
            ],
            10,
            10,
            1,
        )
    case `ramp`:
        return {
            testPrivateUser: rampPrivateUser(`backendV2TokenTransfersPrivate`),
            testPublicUser: rampPublicUser(`backendV2AddressesInternalTx`),
        }
    case `advfilter`:
        return GeneratePerAPIBaselineSuite(
            SmokeStrategy,
            [
                `advfilter`,
                // token types
                `advfilterERC20`,
                `advfilterERC721`,
                `advfilterERC1155`,
                `advfilterERC404`,
                `advfilterCoinTransfer`,
                // methods
                `advfilterMethodTransfer`,
                `advfilterMethodMint`,
                `advfilterMethodApprove`,
                `advfilterMethodBuy`,
                `advfilterMethodExecute`,
                `advfilterMethodWithdraw`,
                `advfilterMethodDeposit`,
                // age
                `advfilterAge7d`,
                `advfilterAge1m`,
                // address relation
                `advfilterAndRelation`,
                // from/to
                `advfilterFrom`,
                `advfilterTo`,
            ],
            30,
            30,
            5,
        )
    case `smoke`:
        return GeneratePerAPIBaselineSuite(
            SmokeStrategy,
            [
                `backendV2TXDetails`,
                `backendV2GasPriceOracle`,
                `backendV2TXInternal`,
                `backendV2TokenTransfers`,
                `backendV2TokenInstances`,
                `backendV2Transactions`,
                `backendV2RecentTransactions`,
                `backendV2Search`,
                `backendV2SearchRedirect`,
                `backendV2AddressesTokenTransfers`,
                `backendV2AddressesLogs`,
                `backendV2AddressesInternalTx`,
                `backendV2AddressesTransactions`,
                `backendV2AddressesTokensERC20`,
                `backendV2AddressesTokensERC721`,
                `backendV2AddressesTokensERC1155`,
                `backendV1AddressTXs`,
                `backendV1AddressTokenTransfers`,
                `backendV2AddressesTabCounters`,
                `backendV2Addresses`,
                `backendV2AddressesCoinBalanceHistory`,
                `backendV2AddressesCoinBalanceHistoryByDay`,
                `backendAccountAddressHash`,
                `backendAddressBalance`,
                `backendV1TXInternal`,
                `backendV2TXTokenTransfers`,
                `backendV2TXLogs`,
                `backendV2TXRawTrace`,
                `backendV2TXStateChanges`,
                `backendV2Tokens`,
                `backendV2Blocks`,
                `backendV2SmartContracts`,
                `backendV2SmartContractsVerificationConfig`,
                `backendETHSupply`,
                `backendTokenSupply`,
                // // not working? v1
                // // `backendGetTokenHolders`,
                `backendTokenBalance`,
                `backendV1GetLogs`,
                // util
                // `backendV2BackendVersion`,
                // `backendV2JSONRPCURL`,
            ],
            300,
            300,
            5,
        )
    case `txActions`:
        return GeneratePerAPIBaselineSuite(
            SmokeStrategy,
            [`backendTXActions`],
            180,
            600,
            5,
        )
    case `stressBensV1`:
        return GeneratePerAPIBaselineSuite(
            SmokeStrategy,
            [
                `batchResolveBens`,
                `addressesLookupBens`,
                `domainsBens`,
                `domainEventsBens`,
                `domainsLookupBens`,
            ],
            10,
            10,
            5,
        )
    case `stressMetadata`:
        return GeneratePerAPIBaselineSuite(
            SmokeStrategy,
            [
                `metadata`,
                `addresses`,
                `tagsSearch`,
            ],
            120,
            120,
            50,
        )
    default:
        throw Error(`no such scenario: ${scenarioName}`)
    }
}
