/* eslint-disable no-undef */
import { Httpx } from 'https://jslib.k6.io/httpx/0.0.3/index.js'
import { RampingArrivalRateScenario, ConstantArrivalRateScenario, Scenario } from 'k6/options'

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

export const defaultWarmUpStages = {
    stages: [
        { target: 3, duration: `10s` },
        { target: 5, duration: `10s` },
        { target: 7, duration: `10s` },
    ],
}

export const defaultAPITestSettings = {
    executor: `constant-arrival-rate`,
    duration: `1m`,
    rate: 5,
}

export const defaultThresholds = {
    http_req_failed: [`rate<0.01`], // http errors should be less than 1%
    http_req_duration: [`p(95)<20000`], // 95% of requests should be below 20s, just for CI debug for now
}

export const defaultScenarioSettings = {
    gracefulStop: `30s`,
    timeUnit: `1s`,
    preAllocatedVUs: 50,
    maxVUs: 300,
} as Scenario

export const defaultTestData = {
    addresses: [
        `0x6E4F8fc73B93BA5160FADF914603a590D4676494`,
        `0xf1F51e933D6aAd056236E0a45c1cC5b335ca1A75`,
        `0x6E4F8fc73B93BA5160FADF914603a590D4676494`,
        `0xBC70E7A838eF3D468e25EfA5eCb8946d3D0f913B`,
        `0xC35B23b9E2952C99e1A4fac19f6494674AA9d739`,
        `0xdAd49e6CbDE849353ab27DeC6319E687BFc91A41`,
        `0xDfE10D55d9248B2ED66f1647df0b0A46dEb25165`,
    ],
}

export const selectScenario = (scenarioName: string): { [name: string]: Scenario } => {
    switch (scenarioName) {
    case `warmUp`:
        return {
        // all goes in parallel to warm up all the services
            warmUpBlocks: {
                ...defaultScenarioSettings,
                ...defaultWarmUpStages,
                exec: `blocksByAddrPerfBaseline`,
                executor: `ramping-arrival-rate`,

            } as RampingArrivalRateScenario,
            warmUpTokens: {
                ...defaultScenarioSettings,
                ...defaultWarmUpStages,
                exec: `listOfTokensByAddrPerfBaseline`,
                executor: `ramping-arrival-rate`,
            } as RampingArrivalRateScenario,
        }
    case `baseline`:
        return {
        // all goes sequential to receive release baseline metrics
            coldBlocks: {
                ...defaultScenarioSettings,
                ...defaultAPITestSettings,
                exec: `blocksByAddrPerfBaseline`,
                startTime: `0s`,
            } as ConstantArrivalRateScenario,
            coldTokens: {
                ...defaultScenarioSettings,
                ...defaultAPITestSettings,
                exec: `listOfTokensByAddrPerfBaseline`,
                startTime: `1m30s`,
            } as ConstantArrivalRateScenario,
        }
    case `profile`:
        return {
        // all goes sequential to receive release baseline metrics
            coldBlocks: {
                ...defaultScenarioSettings,
                ...defaultAPITestSettings,
                exec: `blocksByAddrPerfBaseline`,
            } as ConstantArrivalRateScenario,
            coldTokens: {
                ...defaultScenarioSettings,
                ...defaultAPITestSettings,
                exec: `listOfTokensByAddrPerfBaseline`,
            } as ConstantArrivalRateScenario,
        }
    default:
        throw Error(`no such scenario: ${scenarioName}`)
    }
}

export const selectTestData = (scenarioName: string) => {
    switch (scenarioName) {
    case `warmUp`:
        return defaultTestData
    case `baseline`:
        return defaultTestData
    case `profile`:
        return defaultTestData
    default:
        throw Error(`no such scenario: ${scenarioName}`)
    }
}

export const selectThresholds = (scenarioName: string) => {
    switch (scenarioName) {
    case `warmUp`:
        return defaultThresholds
    case `baseline`:
        return defaultThresholds
    case `profile`:
        return defaultThresholds
    default:
        throw Error(`no such scenario: ${scenarioName}`)
    }
}
