/* eslint-disable no-undef */
import { Httpx } from 'https://jslib.k6.io/httpx/0.0.3/index.js'
import {
    RampingArrivalRateScenario, ConstantArrivalRateScenario, Scenario,
} from 'k6/options'

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
    duration: `1m`,
    rate: 5,
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

export const selectScenario = (scenarioName: string): { [name: string]: Scenario } => {
    switch (scenarioName) {
        case `txActions`:
            return {
                backendTXActions: {
                    ...defaultScenarioSettings,
                    ...defaultStressStages,
                    executor: `ramping-arrival-rate`,
                    exec: `backendTXActions`,
                } as Scenario
            }
        case `stressBensV1`:
            return {
                batchResolveBens: {
                    ...defaultAPITestSettings,
                    exec: `batchResolveBens`,
                } as Scenario,
                addressesLookup: {
                    ...defaultAPITestSettings,
                    exec: `addressesLookupBens`,
                    startTime: `60s`,
                } as Scenario,
                domains: {
                    ...defaultAPITestSettings,
                    exec: `domainsBens`,
                    startTime: `120s`,
                } as Scenario,
                domainEvents: {
                    ...defaultAPITestSettings,
                    exec: `domainEventsBens`,
                    startTime: `180s`,
                } as Scenario,
                domainsLookupBens: {
                    ...defaultAPITestSettings,
                    exec: `domainsLookupBens`,
                    startTime: `240s`,
                } as Scenario,
            }
        case `stressBackendV1`:
            return {
                backendVersion: {
                    ...defaultAPITestSettings,
                    exec: `backendVersion`,
                } as Scenario,
                txInternal: {
                    ...defaultAPITestSettings,
                    exec: `backendV1TXInternal`,
                    startTime: `60s`,
                } as Scenario,
                addressTXs: {
                    ...defaultAPITestSettings,
                    rate: 1,
                    exec: `backendV1AddressTXs`,
                    startTime: `120s`,
                } as Scenario,
                addressTokenTransfers: {
                    ...defaultAPITestSettings,
                    exec: `backendV1AddressTokenTransfers`,
                    startTime: `180s`,
                } as Scenario,
            }
        case `soakBackendV2`:
            return {
                gasPriceOracle: {
                    ...defaultAPISoakSettings,
                    exec: `backendV2GasPriceOracle`
                } as Scenario,
                addressesLogs: {
                    ...defaultAPISoakSettings,
                    exec: `backendV2AddressesLogs`,
                } as Scenario,
                addressesInternalTx: {
                    ...defaultAPISoakSettings,
                    exec: `backendV2AddressesInternalTx`,
                } as Scenario,
                txInternal: {
                    ...defaultAPISoakSettings,
                    exec: `backendV2TXInternal`,
                } as Scenario,
                tokenTransfers: {
                    ...defaultAPISoakSettings,
                    exec: `backendV2TokenTransfers`,
                } as Scenario,
                tokenInstances: {
                    ...defaultAPISoakSettings,
                    exec: `backendV2TokenInstances`,
                } as Scenario,
                addressesTokenTransfers: {
                    ...defaultAPISoakSettings,
                    exec: `backendV2AddressesTokenTransfers`,
                } as Scenario,
                transactions: {
                    ...defaultAPISoakSettings,
                    exec: `backendV2Transactions`,
                } as Scenario,
                recentTransactions: {
                    ...defaultAPISoakSettings,
                    exec: `backendV2RecentTransactions`,
                } as Scenario,
                search: {
                    ...defaultAPISoakSettings,
                    exec: `backendV2Search`,
                } as Scenario,
                searchRedirect: {
                    ...defaultAPISoakSettings,
                    exec: `backendV2SearchRedirect`,
                } as Scenario,
                addressesTransactions: {
                    ...defaultAPISoakSettings,
                    exec: `backendV2AddressesTransactions`,
                } as Scenario,
                addressesTokensERC20: {
                    ...defaultAPISoakSettings,
                    exec: `backendV2AddressesTokensERC20`,
                } as Scenario,
                addressesTokensERC721: {
                    ...defaultAPISoakSettings,
                    exec: `backendV2AddressesTokensERC721`,
                } as Scenario,
                addressesTokensERC1155: {
                    ...defaultAPISoakSettings,
                    exec: `backendV2AddressesTokensERC1155`,
                } as Scenario,
            }
        case `stressBackendV2V1`:
            return {
                gasPriceOracle: {
                    ...defaultAPITestSettings,
                    exec: `backendV2GasPriceOracle`
                } as Scenario,
                addressesLogs: {
                    ...defaultAPITestSettings,
                    exec: `backendV2AddressesLogs`,
                    startTime: `60s`,
                } as Scenario,
                addressesInternalTx: {
                    ...defaultAPITestSettings,
                    exec: `backendV2AddressesInternalTx`,
                    startTime: `120s`,
                } as Scenario,
                txInternal: {
                    ...defaultAPITestSettings,
                    exec: `backendV2TXInternal`,
                    startTime: `180s`,
                } as Scenario,
                tokenTransfers: {
                    ...defaultAPITestSettings,
                    exec: `backendV2TokenTransfers`,
                    startTime: `240s`,
                } as Scenario,
                tokenInstances: {
                    ...defaultAPITestSettings,
                    exec: `backendV2TokenInstances`,
                    startTime: `300s`,
                } as Scenario,
                addressesTokenTransfers: {
                    ...defaultAPITestSettings,
                    exec: `backendV2AddressesTokenTransfers`,
                    startTime: `360s`,
                } as Scenario,
                transactions: {
                    ...defaultAPITestSettings,
                    exec: `backendV2Transactions`,
                    startTime: `420s`,
                } as Scenario,
                recentTransactions: {
                    ...defaultAPITestSettings,
                    exec: `backendV2RecentTransactions`,
                    startTime: `480s`,
                } as Scenario,
                search: {
                    ...defaultAPITestSettings,
                    exec: `backendV2Search`,
                    startTime: `540s`,
                } as Scenario,
                searchRedirect: {
                    ...defaultAPITestSettings,
                    exec: `backendV2SearchRedirect`,
                    startTime: `600s`,
                } as Scenario,
                addressesTransactions: {
                    ...defaultAPITestSettings,
                    exec: `backendV2AddressesTransactions`,
                    startTime: `660s`,
                } as Scenario,
                addressesTokensERC20: {
                    ...defaultAPITestSettings,
                    exec: `backendV2AddressesTokensERC20`,
                    startTime: `720s`,
                } as Scenario,
                addressesTokensERC721: {
                    ...defaultAPITestSettings,
                    exec: `backendV2AddressesTokensERC721`,
                    startTime: `780s`,
                } as Scenario,
                addressesTokensERC1155: {
                    ...defaultAPITestSettings,
                    exec: `backendV2AddressesTokensERC1155`,
                    startTime: `840s`,
                } as Scenario,
                txInternalV1: {
                    ...defaultAPITestSettings,
                    exec: `backendV1TXInternal`,
                    startTime: `900s`,
                } as Scenario,
                addressTXsV1: {
                    ...defaultAPITestSettings,
                    rate: 1,
                    exec: `backendV1AddressTXs`,
                    startTime: `960s`,
                } as Scenario,
                addressTokenTransfersV1: {
                    ...defaultAPITestSettings,
                    exec: `backendV1AddressTokenTransfers`,
                    startTime: `1020s`,
                } as Scenario,

                // jsonrpcurl: {
                //     iterations: 300,
                //     vus: 1,
                //     executor: `per-vu-iterations`,
                //     exec: `backendV2JSONRPCURL`,
                // } as PerVUIterationsScenario,
                // backendVersion: {
                //     iterations: 300,
                //     vus: 1,
                //     executor: `per-vu-iterations`,
                //     exec: `backendV2BackendVersion`,
                //     // startTime: `30s`,
                // } as PerVUIterationsScenario,
                // addressesCounters: {
                //     ...defaultAPITestSettings,
                //     exec: `backendV2AddressesTabCounters`,
                // },
                // addresses: {
                //     ...defaultAPITestSettings,
                //     exec: `backendV2Addresses`,
                // },
                // txTokenTransfers: {
                //     ...defaultAPITestSettings,
                //     exec: `backendV2TXTokenTransfers`,
                // },
                // txLogs: {
                //     ...defaultAPITestSettings,
                //     exec: `backendV2TXLogs`,
                // },
                // txRawTrace: {
                //     ...defaultAPITestSettings,
                //     exec: `backendV2TXRawTrace`,
                // },
                // txStateChanges: {
                //     ...defaultAPITestSettings,
                //     exec: `backendV2TXStateChanges`,
                // },
                // tokens: {
                //     ...defaultAPITestSettings,
                //     exec: `backendV2Tokens`,
                // },
                // blocks: {
                //     ...defaultAPITestSettings,
                //     exec: `backendV2Blocks`,
                // },

                // smartContracts: {
                //     iterations: 300,
                //     vus: 1,
                //     executor: `per-vu-iterations`,
                //     exec: `backendV2SmartContracts`,
                //     startTime: `330s`,
                // } as PerVUIterationsScenario,
                // smartContractsVerConfig: {
                //     iterations: 300,
                //     vus: 1,
                //     executor: `per-vu-iterations`,
                //     exec: `backendV2SmartContractsVerificationConfig`,
                //     startTime: `360s`,
                // } as PerVUIterationsScenario,
            }
        case `stressBackend`:
            return {
                addressHash: {
                    ...defaultScenarioSettings,
                    ...defaultStressStages,
                    exec: `backendAccountAddressHash`,
                    executor: `ramping-arrival-rate`,
                } as Scenario,
                addressBalance: {
                    ...defaultScenarioSettings,
                    ...defaultStressStages,
                    exec: `backendAddressBalance`,
                    executor: `ramping-arrival-rate`,
                } as Scenario,
                ETHSupply: {
                    ...defaultScenarioSettings,
                    ...defaultStressStages,
                    exec: `backendETHSupply`,
                    executor: `ramping-arrival-rate`,
                } as Scenario,
                tokenSupply: {
                    ...defaultScenarioSettings,
                    ...defaultStressStages,
                    exec: `backendTokenSupply`,
                    executor: `ramping-arrival-rate`,
                } as Scenario,
                getToken: {
                    ...defaultScenarioSettings,
                    ...defaultStressStages,
                    exec: `backendGetToken`,
                    executor: `ramping-arrival-rate`,
                } as Scenario,
                getTokenHolders: {
                    ...defaultScenarioSettings,
                    ...defaultStressStages,
                    exec: `backendGetTokenHolders`,
                    executor: `ramping-arrival-rate`,
                } as Scenario,
                tokenBalance: {
                    ...defaultScenarioSettings,
                    ...defaultStressStages,
                    exec: `backendTokenBalance`,
                    executor: `ramping-arrival-rate`,
                } as Scenario,
                // disabled due to getLogs bug
                // getLogs: {
                //     ...defaultScenarioSettings,
                //     ...defaultStressStages,
                //     exec: `backendGetLogs`,
                //     executor: `ramping-arrival-rate`,
                // } as Scenario,
            }
        case `stressFrontend`:
            return {
                blocks: {
                    ...defaultScenarioSettings,
                    ...defaultStressStages,
                    exec: `frontendBlocks`,
                    executor: `ramping-arrival-rate`,
                } as Scenario,
                blocksDetails: {
                    ...defaultScenarioSettings,
                    ...defaultStressStages,
                    exec: `frontendBlockDetails`,
                    executor: `ramping-arrival-rate`,
                } as Scenario,
                txs: {
                    ...defaultScenarioSettings,
                    ...defaultStressStages,
                    exec: `frontendTxs`,
                    executor: `ramping-arrival-rate`,
                } as Scenario,
                txDetails: {
                    ...defaultScenarioSettings,
                    ...defaultStressStages,
                    exec: `frontendTxDetails`,
                    executor: `ramping-arrival-rate`,
                } as Scenario,
                addressDetails: {
                    ...defaultScenarioSettings,
                    ...defaultStressStages,
                    exec: `frontendAddressDetails`,
                    executor: `ramping-arrival-rate`,
                } as Scenario,
                tokenDetails: {
                    ...defaultScenarioSettings,
                    ...defaultStressStages,
                    exec: `frontendTokenDetails`,
                    executor: `ramping-arrival-rate`,
                } as Scenario,
                tokenHoldersDetails: {
                    ...defaultScenarioSettings,
                    ...defaultStressStages,
                    exec: `frontendTokenHoldersDetails`,
                    executor: `ramping-arrival-rate`,
                } as Scenario,
            }
        case `profile`:
            return {
                blocks: {
                    ...defaultScenarioSettings,
                    ...defaultProfileStages,
                    exec: `frontendBlocks`,
                    executor: `ramping-arrival-rate`,
                } as RampingArrivalRateScenario,
                blocksDetails: {
                    ...defaultScenarioSettings,
                    ...defaultProfileStages,
                    exec: `frontendBlockDetails`,
                    executor: `ramping-arrival-rate`,
                } as RampingArrivalRateScenario,
                txs: {
                    ...defaultScenarioSettings,
                    ...defaultProfileStages,
                    exec: `frontendTxs`,
                    executor: `ramping-arrival-rate`,
                } as RampingArrivalRateScenario,
                txDetails: {
                    ...defaultScenarioSettings,
                    ...defaultProfileStages,
                    exec: `frontendTxDetails`,
                    executor: `ramping-arrival-rate`,
                } as RampingArrivalRateScenario,
                addressDetails: {
                    ...defaultScenarioSettings,
                    ...defaultProfileStages,
                    exec: `frontendAddressDetails`,
                    executor: `ramping-arrival-rate`,
                } as RampingArrivalRateScenario,
                tokenDetails: {
                    ...defaultScenarioSettings,
                    ...defaultProfileStages,
                    exec: `frontendTokenDetails`,
                    executor: `ramping-arrival-rate`,
                } as RampingArrivalRateScenario,
                tokenHoldersDetails: {
                    ...defaultScenarioSettings,
                    ...defaultProfileStages,
                    exec: `frontendTokenHoldersDetails`,
                    executor: `ramping-arrival-rate`,
                } as RampingArrivalRateScenario,
            }
        default:
            throw Error(`no such scenario: ${scenarioName}`)
    }
}

export const selectThresholds = (scenarioName: string) => {
    switch (scenarioName) {
        case `txActions`:
            return defaultThresholds
        case `stressBensV1`:
            return defaultThresholds
        case `stressFrontend`:
            return defaultThresholds
        case `stressBackendV1`:
            return defaultThresholds
        case `soakBackendV2`:
            return defaultThresholds
        case `stressBackendV2V1`:
            return defaultThresholds
        case `stressBackend`:
            return defaultThresholds
        case `baseline`:
            return defaultThresholds
        case `profile`:
            return defaultThresholds
        default:
            throw Error(`no such scenario: ${scenarioName}`)
    }
}
