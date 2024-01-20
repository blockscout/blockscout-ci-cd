/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import { fail, check, group } from 'k6'
import { Options } from 'k6/options'

import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import { SharedArray } from 'k6/data'
import {
    defaultSession, selectScenario, selectThresholds,
} from './common'

import { shoot } from './gun'

const session = defaultSession()

export const options: Options = {
    noCookiesReset: true,
    thresholds: selectThresholds(__ENV.SCENARIO),
    userAgent: `MyK6UserAgentString/1.0`,
    // managed by Loki debug in gun.ts
    discardResponseBodies: false,
    scenarios: selectScenario(__ENV.SCENARIO),
}

const loadTestData = (td: any) => {
    const tdd = td[0]
    let apiKey = ``
    if (__ENV.BASE_URL.includes(`sepolia`)) {
        apiKey = __ENV.API_KEY_SEPOLIA
    } else if (__ENV.BASE_URL.includes(`goerli`)) {
        apiKey = __ENV.API_KEY_GOERLI
    } else if (__ENV.BASE_URL.includes(`gnosis`)) {
        apiKey = __ENV.API_KEY_GNOSIS
    } else {
        apiKey = __ENV.API_KEY_ETH
    }
    const testData = {
        ...tdd,
        APIKey: apiKey,
        startBlock: __ENV.START_BLOCK,
        endBlock: __ENV.END_BLOCK,
        v1Offset: 100,
        pagination: {
            pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            offsets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
    }
    // console.log(`test data loaded ${JSON.stringify(testData)}`)
    return testData
}

const dataSharedArrray = new SharedArray(`users`, () => JSON.parse(open(__ENV.TEST_DATA_FILE)))

const testData = loadTestData(dataSharedArrray)

// RPC API per request entrypoints, must be defined in the test file so k6 can import properly

export function setup() {
    console.warn(`test started`)
}

export function teardown(data: any) {
    console.warn(`'test finished with data: ${JSON.stringify(data)}'`)
}

// BENS

export const batchResolveBens = () => {
    group(`/api/v1/{}/addresses:batch-resolve-names`, () => {
        const chainID = randomItem(testData.chainIDs)
        const data = testData[chainID]
        const res = shoot(session, {
            method: `POST`,
            url: `/api/v1/${chainID}/addresses:batch-resolve-names`,
            body: JSON.stringify({
                addresses: data.batchAddresses,
            }),
            params: {
                headers: {
                    'Content-Type': `application/json`,
                },
                tags: {
                    name: `Batch resolve V1`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Batch resolve V1 has failed`)
        }
    })
}

export const addressesLookupBens = () => {
    group(`api/v1/{}/addresses:lookup?address={}&resolved_to=true&owned_by=false`, () => {
        const chainID = randomItem(testData.chainIDs)
        const data = testData[chainID]
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v1/${chainID}/addresses:lookup?address=${randomItem(data.addressesLookup)}&resolved_to=true&owned_by=false`,
            params: {
                tags: {
                    name: `Addresses Lookup V1`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Addresses resolve V1 has failed`)
        }
    })
}

export const domainsBens = () => {
    group(`api/v1/{}/domains/{}`, () => {
        const chainID = randomItem(testData.chainIDs)
        const data = testData[chainID]
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v1/${chainID}/domains/${randomItem(data.domains)}`,
            params: {
                tags: {
                    name: `Domains V1`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Domains V1 has failed`)
        }
    })
}

export const domainEventsBens = () => {
    group(`api/v1/{}/domains/{}/events`, () => {
        const chainID = randomItem(testData.chainIDs)
        const data = testData[chainID]
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v1/${chainID}/domains/${randomItem(data.domains)}/events`,
            params: {
                tags: {
                    name: `Domain Events V1`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Domain Events V1 has failed`)
        }
    })
}

export const domainsLookupBens = () => {
    group(`api/v1/{}/domains:lookup?name={}`, () => {
        const chainID = randomItem(testData.chainIDs)
        const data = testData[chainID]
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v1/${chainID}/domains:lookup?name=${randomItem(data.domains)}`,
            params: {
                tags: {
                    name: `Domains Lookup V1`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Domains Lookup V1 has failed`)
        }
    })
}

// utility calls (blockscout)
export const backendVersion = () => {
    group(`/v2/config/backend-version`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/v2/config/backend-version`,
            params: {
                tags: {
                    name: `Backend version (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Backend version (backendV2) has failed`)
        }
    })
}

// per API calls for backend V1

export const backendV1TXInternal = () => {
    group(`?module=account&action=txlistinternal&txhash={}&startblock={}&endblock={}&page={}&offset={}&sort=asc&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `?module=account&action=txlistinternal&txhash=${randomItem(testData.txs)}&startblock=${testData.startBlock}&endblock=${testData.endBlock}&page=${randomItem(testData.pagination.pages)}&offset=${testData.v1Offset}&sort=asc&apikey=${testData.APIKey}`,
            params: {
                tags: {
                    name: `Internal TXs (backendV1)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Internal TXs (backendV1) has failed`)
        }
    })
}

export const backendV1AddressTXs = () => {
    group(`?module=account&action=txlist&address={}&startblock={}&endblock={}&page={}&offset={}&sort=asc&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `?module=account&action=txlist&address=${randomItem(testData.addresses)}&startblock=${testData.startBlock}&endblock=${testData.endBlock}&page=${randomItem(testData.pagination.pages)}&offset=${testData.v1Offset}&sort=asc&apikey=${testData.APIKey}`,
            params: {
                tags: {
                    name: `Address TXs (backendV1)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Address TXs (backendV1) has failed`)
        }
    })
}

export const backendV1AddressTokenTransfers = () => {
    group(`?module=account&action=tokentx&address={}&startblock={}&endblock={}&offset={}&page={}&sort=asc&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `?module=account&action=tokentx&address=${randomItem(testData.addresses)}&startblock=${testData.startBlock}&endblock=${testData.endBlock}&offset=${testData.v1Offset}&page=${randomItem(testData.pagination.pages)}&sort=asc&apikey=${testData.APIKey}`,
            params: {
                tags: {
                    name: `AddressTokenTransfers (backendV1)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`AddressTokenTransfers (backendV1) has failed`)
        }
    })
}

// per API calls for backend V2

export const backendV2TXInternal = () => {
    group(`/v2/transactions/{}/internal-transactions?apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/v2/transactions/${randomItem(testData.txs)}/internal-transactions?apikey=${testData.APIKey}`,
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
            fail(`TXInternal (backendV2) has failed`)
        }
    })
}

export const backendV2TokenTransfers = () => {
    group(`/v2/tokens/{}/transfers?apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/v2/tokens/${randomItem(testData.tokens)}/transfers?apikey=${testData.APIKey}`,
            params: {
                tags: {
                    name: `TokenTransfers (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`TokenTransfers (backendV2) has failed`)
        }
    })
}

export const backendV2TokenInstances = () => {
    group(`/v2/tokens/{}/instances/{}?apikey={}`, () => {
        const ri = randomItem(testData.nfts)
        const rii = randomItem(ri.instances)
        const res = shoot(session, {
            method: `GET`,
            url: `/v2/tokens/${ri.addr}/instances/${rii}?apikey=${testData.APIKey}`,
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
            fail(`TokenInstances (backendV2) has failed`)
        }
    })
}

export const backendV2Transactions = () => {
    group(`/v2/transactions?filter=validated&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/v2/transactions?filter=validated&apikey=${testData.APIKey}`,
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
            fail(`Transactions (backendV2) has failed`)
        }
    })
}

export const backendV2RecentTransactions = () => {
    group(`/v2/transactions?block_number={}&index={}&items_count=50&filter=validated&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/v2/transactions?block_number=${testData.startBlock}&index=${randomItem(testData.pagination.pages)}&items_count=50&filter=validated&apikey=${testData.APIKey}`,
            params: {
                tags: {
                    name: `RecentTransactions (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`RecentTransactions (backendV2) has failed`)
        }
    })
}

export const backendV2Search = () => {
    group(`/v2/search/quick?q={}&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/v2/search/quick?q=${randomItem(testData.txs)}&apikey=${testData.APIKey}`,
            params: {
                tags: {
                    name: `Search (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Search (backendV2) has failed`)
        }
    })
}

export const backendV2SearchRedirect = () => {
    group(`/v2/search/check-redirect?q={}&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/v2/search/check-redirect?q=${randomItem(testData.txs)}&apikey=${testData.APIKey}`,
            params: {
                tags: {
                    name: `SearchRedirect (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`SearchRedirect (backendV2) has failed`)
        }
    })
}

export const backendV2AddressesTransactions = () => {
    group(`/v2/addresses/{}/transactions?apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/v2/addresses/${randomItem(testData.addresses)}/transactions?apikey=${testData.APIKey}`,
            params: {
                tags: {
                    name: `Addresses Transactions (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Addresses Transactions (backendV2) has failed`)
        }
    })
}

export const backendV2AddressesTokensERC20 = () => {
    group(`/v2/addresses/{}/tokens?type=ERC-20&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/v2/addresses/${randomItem(testData.addresses)}/tokens?type=ERC-20&apikey=${testData.APIKey}`,
            params: {
                tags: {
                    name: `Addresses Tokens ERC20 (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Addresses Tokens ERC20 (backendV2) has failed`)
        }
    })
}

export const backendV2AddressesTokensERC721 = () => {
    group(`/v2/addresses/{}/tokens?type=ERC-721&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/v2/addresses/${randomItem(testData.addresses)}/tokens?type=ERC-721&apikey=${testData.APIKey}`,
            params: {
                tags: {
                    name: `Addresses Tokens ERC721 (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Addresses Tokens ERC721 (backendV2) has failed`)
        }
    })
}

export const backendV2AddressesTokensERC1155 = () => {
    group(`/v2/addresses/{}/tokens?type=ERC-1155&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/v2/addresses/${randomItem(testData.addresses)}/tokens?type=ERC-1155&apikey=${testData.APIKey}`,
            params: {
                tags: {
                    name: `Addresses Tokens ERC1155 (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Addresses Tokens ERC1155 (backendV2) has failed`)
        }
    })
}

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
            fail(`Blocks (backendV2) has failed`)
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
            fail(`SmartContractsVerificationConfig (backendV2) has failed`)
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
            fail(`SmartContracts (backendV2) has failed`)
        }
    })
}

export const backendV2AddressesTokenTransfers = () => {
    group(`/v2/addresses/{}/token-transfers?apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/v2/addresses/${randomItem(testData.tokens)}/token-transfers?apikey=${testData.APIKey}`,
            params: {
                tags: {
                    name: `AddressesTokenTransfers (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`AddressesTokenTransfers (backendV2) has failed`)
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
            fail(`Tokens (backendV2) has failed`)
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
            fail(`TXStateChanges (backendV2) has failed`)
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
            fail(`TXRawTrace (backendV2) has failed`)
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
            fail(`TXLogs (backendV2) has failed`)
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
            fail(`TXTokenTransfers (backendV2) has failed`)
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
            fail(`Addresses counter tab (backendV2) has failed`)
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
            fail(`Addresses (backendV2) has failed`)
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
            fail(`JSONRPCURL (backendV2) has failed`)
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
