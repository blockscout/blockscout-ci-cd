import { check, fail, group } from 'k6'
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import { SharedArray } from 'k6/data'
import {DefaultRequestTimeout, defaultSession} from './common/common.js'

import { shoot } from './common/gun.js'

// Load test data from an environment variable
const testFile = new SharedArray(`users`, () => JSON.parse(open(__ENV.TEST_DATA_FILE)))
const testData = testFile[0]
const APIKey = __ENV.BLOCKSCOUT_API_KEY
const startBlock = __ENV.START_BLOCK
const endBlock = __ENV.END_BLOCK
const v1Offset = 100
const pagination = {
    pages: [0],
    offsets: [0],
}

const session = defaultSession()

export const options = {
    scenarios: {
        plain: {
            executor: `constant-arrival-rate`,
            preAllocatedVUs: 20,
            rate: 1,
            exec: `v2TXLogs`,
            duration: `30s`,
        },
    },
    thresholds: {
        http_req_duration: [`p(95)<5000`],
    },
}

//                `v2TXDetails`,
//                 `v2GasPriceOracle`,
//                 `v2TXInternal`,
//                 `v2TXInternalCurrentBlock`,
//                 `v2TokenTransfers`,
//                 `v2TokenInstances`,
//                 `v2TransactionsList`,
//                 `v2RecentTransactions`,
//                 `v2Search`,
//                 `v2SearchRedirect`,
//                 `v2AddressesTokenTransfers`,
//                 `v2AddressesLogs`,
//                 `v2AddressesInternalTx`,
//                 `v2AddressesTransactions`,
//                 `v2AddressesTokensERC20`,
//                 `v2AddressesTokensERC721`,
//                 `v2AddressesTokensERC1155`,
//                 `backendV1AddressTXs`,
//                 `backendV1AddressTokenTransfers`,
//                 `v2AddressesTabCounters`,
//                 `v2Addresses`,
//                 `v2AddressesCoinBalanceHistory`,
//                 `v2AddressesCoinBalanceHistoryByDay`,
//                 `backendAccountAddressHash`,
//                 `backendAddressBalance`,
//                 `backendV1TXInternal`,
//                 `v2TXTokenTransfers`,
//                 `v2TXLogs`,
//                 `v2TXRawTrace`,
//                 `v2TXStateChanges`,
//                 `v2Tokens`,
//                 `v2Blocks`,
//                 `v2SmartContracts`,
//                 `v2SmartContractsVerificationConfig`,
//                 `backendETHSupply`,
//                 `backendTokenSupply`,
//                 // // not working? v1
//                 // // `backendGetTokenHolders`,
//                 `backendTokenBalance`,
//                 `backendV1GetLogs`,
//                 // util
//                 // `v2BackendVersion`,
//                 // `v2JSONRPCURL`,

export const backendV1TXInternal = () => {
    group(`/api?module=account&action=txlistinternal&txhash={}&startblock={}&endblock={}&page={}&offset={}&sort=asc&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api?module=account&action=txlistinternal&txhash=${randomItem(testData.txs)}&startblock=${startBlock}&endblock=${endBlock}&page=${randomItem(pagination.pages)}&offset=${v1Offset}&sort=asc&apikey=${APIKey}`,
            params: {
                tags: {
                    name: `Internal TXs (v1)`,
                },
                timeout: DefaultRequestTimeout,
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
    group(`/api?module=account&action=txlist&address={}&startblock={}&endblock={}&page={}&offset={}&sort=asc&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api?module=account&action=txlist&address=${randomItem(testData.addresses)}&startblock=${startBlock}&endblock=${endBlock}&page=${randomItem(pagination.pages)}&offset=${v1Offset}&sort=asc&apikey=${APIKey}`,
            params: {
                tags: {
                    name: `Address TXs (v1)`,
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
    group(`/api?module=account&action=tokentx&address={}&startblock={}&endblock={}&offset={}&page={}&sort=asc&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api?module=account&action=tokentx&address=${randomItem(testData.addresses)}&startblock=${startBlock}&endblock=${endBlock}&offset=${v1Offset}&page=${randomItem(pagination.pages)}&sort=asc&apikey=${APIKey}`,
            params: {
                tags: {
                    name: `AddressTokenTransfers (v1)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`AddressTokenTransfers (v1) has failed`)
        }
    })
}

// per API calls for backend V2

export const v2GasPriceOracle = () => {
    group(`/v1/gas-price-oracle`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v1/gas-price-oracle?apikey=${APIKey}`,
            params: {
                tags: {
                    name: `GasPriceOracle (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`GasPriceOracle (v2) has failed`)
        }
    })
}

export const v2AddressesCoinBalanceHistory = () => {
    group(`/api/v2/addresses/{}/coin-balance-history?apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/addresses/${randomItem(testData.addresses)}/coin-balance-history?apikey=${APIKey}`,
            params: {
                tags: {
                    name: `CoinBalanceHistory (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`CoinBalanceHistory (v2) has failed`)
        }
    })
}

export const v2AddressesCoinBalanceHistoryByDay = () => {
    group(`/api/v2/addresses/{}/coin-balance-history-by-day?apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/addresses/${randomItem(testData.addresses)}/coin-balance-history-by-day?apikey=${APIKey}`,
            params: {
                tags: {
                    name: `CoinBalanceHistoryByDay (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`CoinBalanceHistoryByDay (v2) has failed`)
        }
    })
}

export const v2AddressesLogs = () => {
    group(`/v2/addresses/{}/logs?apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/addresses/${randomItem(testData.addresses)}/logs?apikey=${APIKey}`,
            params: {
                tags: {
                    name: `AddressesLogs (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            console.log(`url: ${res.url}, status: ${res.status}`)
            fail(`AddressesLogs (v2) has failed`)
        }
    })
}

export const v2AddressesInternalTx = () => {
    group(`/v2/addresses/{}/internal-transactions?apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/addresses/${randomItem(testData.addresses)}/internal-transactions?apikey=${APIKey}`,
            params: {
                tags: {
                    name: `AddressesInternalTx (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`AddressesInternalTx (v2) has failed`)
        }
    })
}

export const v2TXInternalCurrentBlock = () => {
    group(`/v2/internal-transactions?apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/internal-transactions?apikey=${APIKey}`,
            params: {
                tags: {
                    name: `Last Block Internal Transactions (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`LastBlock Internal Transactions (v2) has failed`)
        }
    })
}
export const v2TXInternal = () => {
    group(`/v2/transactions/{}/internal-transactions?apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/transactions/${randomItem(testData.txs)}/internal-transactions?apikey=${APIKey}`,
            params: {
                tags: {
                    name: `TXInternal (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`TXInternal (v2) has failed`)
        }
    })
}

export const v2TokenTransfersPrivate = () => {
    group(`/v2/tokens/{}/transfers with key`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/tokens/${randomItem(testData.tokens)}/transfers?apikey=2aV6rpIkjqA74W0lGXpulm29KprMbEg7`,
            params: {
                tags: {
                    name: `TokenTransfers (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`TokenTransfers (v2) has failed`)
        }
    })
}

export const v2TokenTransfers = () => {
    group(`/v2/tokens/{}/transfers?apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/tokens/${randomItem(testData.tokens)}/transfers?apikey=${APIKey}`,
            params: {
                tags: {
                    name: `TokenTransfers (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`TokenTransfers (v2) has failed`)
        }
    })
}

export const v2TokenInstances = () => {
    group(`/v2/tokens/{}/instances/{}?apikey={}`, () => {
        const ri = randomItem(testData.nfts)
        const rii = randomItem(ri.instances)
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/tokens/${ri.addr}/instances/${rii}?apikey=${APIKey}`,
            params: {
                tags: {
                    name: `TokenInstances (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`TokenInstances (v2) has failed`)
        }
    })
}

export const v2TransactionsList = () => {
    group(`/v2/transactions?filter=validated&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/transactions?filter=validated&apikey=${APIKey}`,
            params: {
                tags: {
                    name: `Transactions (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Transactions (v2) has failed`)
        }
    })
}

export const v2RecentTransactions = () => {
    group(`/v2/transactions?block_number={}&index={}&items_count=50&filter=validated&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/transactions?block_number=${startBlock}&index=${randomItem(pagination.pages)}&items_count=50&filter=validated&apikey=${APIKey}`,
            params: {
                tags: {
                    name: `RecentTransactions (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`RecentTransactions (v2) has failed`)
        }
    })
}

export const v2Search = () => {
    group(`/v2/search/quick?q={}&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/search/quick?q=${randomItem(testData.txs)}&apikey=${APIKey}`,
            params: {
                tags: {
                    name: `Search (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Search (v2) has failed`)
        }
    })
}

export const v2SearchRedirect = () => {
    group(`/v2/search/check-redirect?q={}&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/search/check-redirect?q=${randomItem(testData.txs)}&apikey=${APIKey}`,
            params: {
                tags: {
                    name: `SearchRedirect (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`SearchRedirect (v2) has failed`)
        }
    })
}

export const v2AddressesTransactions = () => {
    group(`/v2/addresses/{}/transactions?apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/addresses/${randomItem(testData.addresses)}/transactions?apikey=${APIKey}`,
            params: {
                tags: {
                    name: `Addresses Transactions (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Addresses Transactions (v2) has failed`)
        }
    })
}

export const v2AddressesTokensERC20 = () => {
    group(`/v2/addresses/{}/tokens?type=ERC-20&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/addresses/${randomItem(testData.addresses)}/tokens?type=ERC-20&apikey=${APIKey}`,
            params: {
                tags: {
                    name: `Addresses Tokens ERC20 (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Addresses Tokens ERC20 (v2) has failed`)
        }
    })
}

export const v2AddressesTokensERC721 = () => {
    group(`/v2/addresses/{}/tokens?type=ERC-721&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/addresses/${randomItem(testData.addresses)}/tokens?type=ERC-721&apikey=${APIKey}`,
            params: {
                tags: {
                    name: `Addresses Tokens ERC721 (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Addresses Tokens ERC721 (v2) has failed`)
        }
    })
}

export const v2AddressesTokensERC1155 = () => {
    group(`/v2/addresses/{}/tokens?type=ERC-1155&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/addresses/${randomItem(testData.addresses)}/tokens?type=ERC-1155&apikey=${APIKey}`,
            params: {
                tags: {
                    name: `Addresses Tokens ERC1155 (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Addresses Tokens ERC1155 (v2) has failed`)
        }
    })
}

export const v2BlocksList = () => {
    group(`/api/v2/blocks`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/blocks`,
            params: {
                tags: {
                    name: `Blocks List (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Blocks List has failed`)
        }
    })
}
export const v2Blocks = () => {
    group(`/api/v2/blocks/{}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/blocks/${randomItem(testData.blocks)}`,
            params: {
                tags: {
                    name: `Blocks (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Blocks (v2) has failed`)
        }
    })
}

export const v2SmartContractsVerificationConfig = () => {
    group(`/api/v2/smart-contracts/verification/config`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/smart-contracts/verification/config`,
            params: {
                tags: {
                    name: `SmartContractsVerificationConfig (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`SmartContractsVerificationConfig (v2) has failed`)
        }
    })
}

export const v2SmartContracts = () => {
    group(`/api/v2/smart-contracts/{}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/smart-contracts/${randomItem(testData.verifiedContracts)}`,
            params: {
                tags: {
                    name: `SmartContracts (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`SmartContracts (v2) has failed`)
        }
    })
}

export const v2AddressesTokenTransfers = () => {
    group(`/v2/addresses/{}/token-transfers?apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/addresses/${randomItem(testData.tokens)}/token-transfers?apikey=${APIKey}`,
            params: {
                tags: {
                    name: `AddressesTokenTransfers (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`AddressesTokenTransfers (v2) has failed`)
        }
    })
}

export const v2VerifiedContractsList = () => {
    group(`/api/v2/verified-contracts`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/verified-contracts`,
            params: {
                tags: {
                    name: `Verified Contracts List (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Verified Contracts List has failed`)
        }
    })
}
export const v2TokenTransfersList = () => {
    group(`/api/v2/token-transfers`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/token-transfers`,
            params: {
                tags: {
                    name: `Tokens Transfers List (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Token Transfers List has failed`)
        }
    })
}
export const v2TokensList = () => {
    group(`/api/v2/tokens`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/tokens`,
            params: {
                tags: {
                    name: `Tokens List (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Tokens List has failed`)
        }
    })
}
export const v2Tokens = () => {
    group(`/api/v2/tokens/{}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/tokens/${randomItem(testData.tokens)}`,
            params: {
                tags: {
                    name: `Tokens (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Tokens (v2) has failed`)
        }
    })
}

export const v2TXStateChanges = () => {
    group(`/api/v2/transactions/{}/state-changes`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/transactions/${randomItem(testData.txs)}/state-changes`,
            params: {
                tags: {
                    name: `TXStateChanges (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`TXStateChanges (v2) has failed`)
        }
    })
}

export const v2TXRawTrace = () => {
    group(`/api/v2/transactions/{}/raw-trace`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/transactions/${randomItem(testData.txs)}/raw-trace`,
            params: {
                tags: {
                    name: `TXRawTrace (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`TXRawTrace (v2) has failed`)
        }
    })
}

export const v2TXLogs = () => {
    group(`/api/v2/transactions/{}/logs`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/transactions/${randomItem(testData.txs)}/logs`,
            params: {
                tags: {
                    name: `TXLogs (v2)`,
                },
                timeout: DefaultRequestTimeout,
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`TXLogs (v2) has failed`)
        }
    })
}

export const v2TXDetails = () => {
    group(`/api/v2/transactions/{}/summary`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/transactions/${randomItem(testData.txs)}/summary?apikey=${APIKey}`,
            params: {
                tags: {
                    name: `TXDetails`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`TXDetails (v2) has failed`)
        }
    })
}

export const v2TXTokenTransfers = () => {
    group(`/api/v2/transactions/{}/token-transfers`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/transactions/${randomItem(testData.txs)}/token-transfers`,
            params: {
                tags: {
                    name: `TXTokenTransfers (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`TXTokenTransfers (v2) has failed`)
        }
    })
}

export const v2AddressesTabCounters = () => {
    group(`/api/v2/addresses/{}/tabs-counters`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/addresses/${randomItem(testData.addresses)}/tabs-counters`,
            params: {
                tags: {
                    name: `Addresses counter tab (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Addresses counter tab (v2) has failed`)
        }
    })
}

export const v2Addresses = () => {
    group(`/api/v2/addresses/{}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/addresses/${randomItem(testData.addresses)}`,
            params: {
                tags: {
                    name: `Addresses (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Addresses (v2) has failed`)
        }
    })
}

export const v2JSONRPCURL = () => {
    group(`/api/v2/config/json-rpc-url`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/config/json-rpc-url`,
            params: {
                tags: {
                    name: `JSONRPCURL (v2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`JSONRPCURL (v2) has failed`)
        }
    })
}

// per API calls for VUs, backend

export const backendV1GetLogs = () => {
    group(`/api?module=logs&action=getLogs&fromBlock={}&toBlock={}&address={}&apikey={}`, () => {
        const block = randomItem(testData.blocks)
        const res = shoot(session, {
            method: `GET`,
            url: `/api?module=logs&action=getLogs&fromBlock=${block}&toBlock=${block + 1}&address=${randomItem(testData.addresses)}&apikey=${APIKey}`,
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
    group(`/api?module=account&action=tokenbalance&contractaddress={}&address={}&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api?module=account&action=tokenbalance&contractaddress=${randomItem(testData.tokens)}&address=${randomItem(testData.addresses)}&apikey=${APIKey}`,
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
    group(`/api?module=token&action=getTokenHolders&contractaddress={}&page={}&offset={}&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api?module=token&action=getTokenHolders&contractaddress=${randomItem(testData.tokens)}&page=${randomItem(pagination.pages)}&offset=${randomItem(pagination.offsets)}&apikey=${APIKey}`,
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

export const backendV1GetToken = () => {
    group(`/api?module=token&action=getToken&contractaddress={}&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api?module=token&action=getToken&contractaddress=${randomItem(testData.tokens)}&apikey=${APIKey}`,
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
    group(`/api?module=stats&action=tokensupply&contractaddress={}&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api?module=stats&action=tokensupply&contractaddress=${randomItem(testData.tokens)}&apikey=${APIKey}`,
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
    group(`/api?module=stats&action=ethsupply&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api?module=stats&action=ethsupply&apikey=${APIKey}`,
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
    group(`account/api?module=account&action=txlist&address={}&page={}&offset={}&apikey={}ddress (backend)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api?module=account&action=txlist&address=${randomItem(testData.addresses)}&page=${randomItem(pagination.pages)}&offset=${randomItem(pagination.offsets)}&apikey=${APIKey}`,
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
    group(`/api?module=account&action=balance&address={}&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api?module=account&action=balance&address=${randomItem(testData.addresses)}&apikey=${APIKey}`,
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
