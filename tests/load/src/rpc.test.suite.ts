/* eslint-disable no-undef */
import { fail, check, group } from 'k6'
import { Options } from 'k6/options'

import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import {
    defaultSession, selectScenario, selectTestData, selectThresholds,
} from './common'

import { shoot } from './gun'

const session = defaultSession()

const testData = selectTestData(__ENV.SCENARIO)

export const options: Options = {
    noCookiesReset: true,
    thresholds: selectThresholds(__ENV.SCENARIO),
    userAgent: `MyK6UserAgentString/1.0`,
    // managed by Loki debug in gun.ts
    discardResponseBodies: false,
    scenarios: selectScenario(__ENV.SCENARIO),
}

// RPC API per request entrypoints, must be defined in the test file so k6 can import properly

export function setup() {
    console.warn(`test started`)
}

export function teardown(data: any) {
    console.warn(`'test finished with data: ${JSON.stringify(data)}'`)
}

// per API calls for backend V2

/*
/v2/smart-contracts/${address_hash}/...
*/

export const backendV2Blocks = () => {
    group(`Blocks (backendV2)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/v2/blocks/${randomItem(testData.blocks)}`,
            params: {
                tags: {
                    name: `Blocks (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Blocks (backend) has failed`)
        }
    })
}

export const backendV2SmartContractsVerificationConfig = () => {
    group(`SmartContractsVerificationConfig (backendV2)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/v2/smart-contracts/verification/config`,
            params: {
                tags: {
                    name: `SmartContractsVerificationConfig (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`SmartContractsVerificationConfig (backend) has failed`)
        }
    })
}

export const backendV2SmartContracts = () => {
    group(`SmartContracts (backendV2)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/v2/smart-contracts/${randomItem(testData.contracts)}`,
            params: {
                tags: {
                    name: `SmartContracts (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`SmartContracts (backend) has failed`)
        }
    })
}

export const backendV2TokenInstances = () => {
    group(`TokenInstances (backendV2)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/v2/tokens/${randomItem(testData.tokens)}/instances/76440`,
            params: {
                tags: {
                    name: `TokenInstances (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`TokenInstances (backend) has failed`)
        }
    })
}

export const backendV2Tokens = () => {
    group(`Tokens (backendV2)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/v2/tokens/${randomItem(testData.tokens)}`,
            params: {
                tags: {
                    name: `Tokens (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Tokens (backend) has failed`)
        }
    })
}

export const backendV2TXStateChanges = () => {
    group(`TXStateChanges (backendV2)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/v2/transactions/${randomItem(testData.txs)}/state-changes`,
            params: {
                tags: {
                    name: `TXStateChanges (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`TXStateChanges (backend) has failed`)
        }
    })
}

export const backendV2TXRawTrace = () => {
    group(`TXRawTrace (backendV2)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/v2/transactions/${randomItem(testData.txs)}/raw-trace`,
            params: {
                tags: {
                    name: `TXRawTrace (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`TXRawTrace (backend) has failed`)
        }
    })
}

export const backendV2TXLogs = () => {
    group(`TXLogs (backendV2)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/v2/transactions/${randomItem(testData.txs)}/logs`,
            params: {
                tags: {
                    name: `TXLogs (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`TXLogs (backend) has failed`)
        }
    })
}

export const backendV2TXInternal = () => {
    group(`TXInternal (backendV2)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/v2/transactions/${randomItem(testData.txs)}/internal-transactions`,
            params: {
                tags: {
                    name: `TXInternal (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`TXInternal (backend) has failed`)
        }
    })
}

export const backendV2TXTokenTransfers = () => {
    group(`TXTokenTransfers (backendV2)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/v2/transactions/${randomItem(testData.txs)}/token-transfers`,
            params: {
                tags: {
                    name: `TXTokenTransfers (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`TXTokenTransfers (backend) has failed`)
        }
    })
}

export const backendV2Transactions = () => {
    group(`Transactions (backendV2)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/v2/transactions/${randomItem(testData.txs)}`,
            params: {
                tags: {
                    name: `Transactions (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Transactions (backend) has failed`)
        }
    })
}

export const backendV2AddressesTabCounters = () => {
    group(`Addresses counter tab (backendV2)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/addresses/${randomItem(testData.addresses)}/tabs-counters`,
            params: {
                tags: {
                    name: `Addresses counter tab (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Addresses counter tab (backend) has failed`)
        }
    })
}

export const backendV2Addresses = () => {
    group(`Addresses (backendV2)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/v2/addresses/${randomItem(testData.addresses)}`,
            params: {
                tags: {
                    name: `Addresses (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Addresses (backend) has failed`)
        }
    })
}

export const backendV2BackendVersion = () => {
    group(`BackendVersion (backendV2)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/v2/config/backend-version`,
            params: {
                tags: {
                    name: `BackendVersion (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`BackendVersion (backend) has failed`)
        }
    })
}

export const backendV2JSONRPCURL = () => {
    group(`JSONRPCURL (backendV2)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/v2/config/json-rpc-url`,
            params: {
                tags: {
                    name: `JSONRPCURL (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`JSONRPCURL (backend) has failed`)
        }
    })
}

// per API calls for VUs, backend

export const backendGetLogs = () => {
    group(`getLogs (backend)`, () => {
        const block = randomItem(testData.blocks)
        const res = shoot(session, {
            method: `GET`,
            url: `?module=logs&action=getLogs&fromBlock=${block}&toBlock=${block + 1}&address=${randomItem(testData.addresses)}&apikey=${testData.APIKey}`,
            params: {
                tags: {
                    name: `getLogs (backend)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`getLogs (backend) has failed`)
        }
    })
}

export const backendTokenBalance = () => {
    group(`tokenBalance (backend)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `?module=account&action=tokenbalance&contractaddress=${randomItem(testData.contracts)}&address=${randomItem(testData.addresses)}&apikey=${testData.APIKey}`,
            params: {
                tags: {
                    name: `tokenBalance (backend)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`tokenBalance (backend) has failed`)
        }
    })
}

export const backendGetTokenHolders = () => {
    group(`getTokenHolders (backend)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `?module=token&action=getTokenHolders&contractaddress=${randomItem(testData.contracts)}&page=${randomItem(testData.pagination.pages)}&offset=${randomItem(testData.pagination.offsets)}&apikey=${testData.APIKey}`,
            params: {
                tags: {
                    name: `getTokenHolders (backend)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`getTokenHolders (backend) has failed`)
        }
    })
}

export const backendGetToken = () => {
    group(`getToken (backend)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `?module=token&action=getToken&contractaddress=${randomItem(testData.contracts)}&apikey=${testData.APIKey}`,
            params: {
                tags: {
                    name: `getToken (backend)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`getToken (backend) has failed`)
        }
    })
}

export const backendTokenSupply = () => {
    group(`tokenSupply (backend)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `?module=stats&action=tokensupply&contractaddress=${randomItem(testData.contracts)}&apikey=${testData.APIKey}`,
            params: {
                tags: {
                    name: `tokenSupply (backend)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`tokenSupply (backend) has failed`)
        }
    })
}

export const backendETHSupply = () => {
    group(`ETHSupply (backend)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `?module=stats&action=ethsupply&apikey=${testData.APIKey}`,
            params: {
                tags: {
                    name: `ETHSupply (backend)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`ETHSupply (backend) has failed`)
        }
    })
}

export const backendAccountAddressHash = () => {
    group(`accountAddress (backend)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `?module=account&action=txlist&address=${randomItem(testData.addresses)}&page=${randomItem(testData.pagination.pages)}&offset=${randomItem(testData.pagination.offsets)}&apikey=${testData.APIKey}`,
            params: {
                tags: {
                    name: `accountAddress (backend)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`accountAddress (backend) has failed`)
        }
    })
}

export const backendAddressBalance = () => {
    group(`addressBalance (backend)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `?module=account&action=balance&address=${randomItem(testData.addresses)}&apikey=${testData.APIKey}`,
            params: {
                tags: {
                    name: `addressBalance (backend)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`addressBalance (backend) has failed`)
        }
    })
}

// per API calls for VUs, frontend

export const frontendBlocks = () => {
    group(`blocks (frontend)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/blocks`,
            params: {
                tags: {
                    name: `blocks (frontend)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`blocks (frontend) has failed`)
        }
    })
}

export const frontendBlockDetails = () => {
    group(`block details (frontend)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/block/${randomItem(testData.blocks)}`,
            params: {
                tags: {
                    name: `block details (frontend)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`block details (frontend) has failed`)
        }
    })
}

export const frontendTxs = () => {
    group(`txs (frontend)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/txs`,
            params: {
                tags: {
                    name: `txs (frontend)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`txs (frontend) has failed`)
        }
    })
}

export const frontendTxDetails = () => {
    group(`tx details (frontend)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/tx/${randomItem(testData.txs)}`,
            params: {
                tags: {
                    name: `tx details (frontend)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`tx details (frontend) has failed`)
        }
    })
}

export const frontendAddressDetails = () => {
    group(`address details (frontend)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/address/${randomItem(testData.addresses)}`,
            params: {
                tags: {
                    name: `address details (frontend)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`address details (frontend) has failed`)
        }
    })
}

export const frontendTokenDetails = () => {
    group(`token details (frontend)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/token/${randomItem(testData.tokens)}`,
            params: {
                tags: {
                    name: `token details (frontend)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`token details (frontend) has failed`)
        }
    })
}

export const frontendTokenHoldersDetails = () => {
    group(`token holders details (frontend)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/token/${randomItem(testData.tokens)}?tab=holders`,
            params: {
                tags: {
                    name: `token holders details (frontend)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`token holders details (frontend) has failed`)
        }
    })
}
