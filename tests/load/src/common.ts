/* eslint-disable no-undef */
import { Httpx } from 'https://jslib.k6.io/httpx/0.0.3/index.js'
import {
    Scenario,
} from 'k6/options'

import { SharedArray } from 'k6/data'

export const defaultSession = () => {
    const session = new Httpx({
        baseURL: __ENV.BASE_URL,
        headers: {
            'User-Agent': `K6 Load Testing Tool/1.0`,
        },
        timeout: __ENV.TIMEOUT, // milliseconds
    })

    session.addTags({
        apiType: `rpc`,
    })
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

export const defaultStressStages = {
    stages: [
        { target: 10, duration: `150s` },
        { target: 20, duration: `150s` },
        { target: 30, duration: `150s` },
        { target: 40, duration: `150s` },
    ],
}

export const defaultAPITestSettings = {
    executor: `constant-arrival-rate`,
    preAllocatedVUs: 50,
}

export const defaultAPISoakSettings = {
    executor: `constant-arrival-rate`,
    duration: `1h`,
    rate: 3,
    preAllocatedVUs: 10,
}

export const defaultProfileStages = {
    stages: [
        { target: 3, duration: `30s` },
        { target: 3, duration: `30m` },
    ],
}

export const defaultThresholds = {
    http_req_failed: [`rate<0.01`], // http errors should be less than 1%
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
    case `baselineFrontend`:
        return GeneratePerAPIBaselineSuite(
            defaultAPITestSettings,
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
    case `stressBackendV2V1`:
        return GeneratePerAPIBaselineSuite(
            defaultAPITestSettings,
            [
                `backendV2GasPriceOracle`,
                `backendV2AddressesLogs`,
                `backendV2AddressesInternalTx`,
                `backendV2TXInternal`,
                `backendV2TokenTransfers`,
                `backendV2TokenInstances`,
                `backendV2AddressesTokenTransfers`,
                `backendV2Transactions`,
                `backendV2RecentTransactions`,
                `backendV2Search`,
                `backendV2SearchRedirect`,
                `backendV2AddressesTransactions`,
                `backendV2AddressesTokensERC20`,
                `backendV2AddressesTokensERC721`,
                `backendV2AddressesTokensERC1155`,
                `backendV1TXInternal`,
                `backendV1AddressTXs`,
                `backendV1AddressTokenTransfers`,
                // new
                `backendV2AddressesTabCounters`,
                `backendV2Addresses`,
                `backendV2TXTokenTransfers`,
                `backendV2TXLogs`,
                `backendV2TXRawTrace`,
                `backendV2TXStateChanges`,
                `backendV2Tokens`,
                `backendV2Blocks`,
                `backendV2SmartContracts`,
                `backendV2SmartContractsVerificationConfig`,
                `backendAccountAddressHash`,
                `backendAddressBalance`,
                `backendETHSupply`,
                `backendTokenSupply`,
                `backendGetToken`,
                // not working? v1
                // `backendGetTokenHolders`,
                `backendTokenBalance`,
                `backendGetLogs`,
                // util
                // `backendV2BackendVersion`,
                // `backendV2JSONRPCURL`,
            ],
            10,
            10,
            1,
        )
    case `txActions`:
        return GeneratePerAPIBaselineSuite(
            defaultAPITestSettings,
            [`backendTXActions`],
            10,
            10,
            1,
        )
    case `stressBensV1`:
        return GeneratePerAPIBaselineSuite(
            defaultAPITestSettings,
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
    default:
        throw Error(`no such scenario: ${scenarioName}`)
    }
}
