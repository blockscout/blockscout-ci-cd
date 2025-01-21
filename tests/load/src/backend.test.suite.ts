import { check, fail, group } from 'k6'
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import { defaultSession, testData } from './common'

import { shoot } from './gun'

const session = defaultSession()

export const backendV1TXInternal = () => {
    group(`/api?module=account&action=txlistinternal&txhash={}&startblock={}&endblock={}&page={}&offset={}&sort=asc&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api?module=account&action=txlistinternal&txhash=${randomItem(testData.txs)}&startblock=${testData.startBlock}&endblock=${testData.endBlock}&page=${randomItem(testData.pagination.pages)}&offset=${testData.v1Offset}&sort=asc&apikey=${testData.APIKey}`,
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
    group(`/api?module=account&action=txlist&address={}&startblock={}&endblock={}&page={}&offset={}&sort=asc&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api?module=account&action=txlist&address=${randomItem(testData.addresses)}&startblock=${testData.startBlock}&endblock=${testData.endBlock}&page=${randomItem(testData.pagination.pages)}&offset=${testData.v1Offset}&sort=asc&apikey=${testData.APIKey}`,
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
    group(`/api?module=account&action=tokentx&address={}&startblock={}&endblock={}&offset={}&page={}&sort=asc&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api?module=account&action=tokentx&address=${randomItem(testData.addresses)}&startblock=${testData.startBlock}&endblock=${testData.endBlock}&offset=${testData.v1Offset}&page=${randomItem(testData.pagination.pages)}&sort=asc&apikey=${testData.APIKey}`,
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

export const backendV2GasPriceOracle = () => {
    group(`/v1/gas-price-oracle`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v1/gas-price-oracle?apikey=${testData.APIKey}`,
            params: {
                tags: {
                    name: `GasPriceOracle (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`GasPriceOracle (backendV2) has failed`)
        }
    })
}

export const backendV2AddressesCoinBalanceHistory = () => {
    group(`/api/v2/addresses/{}/coin-balance-history?apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/addresses/${randomItem(testData.addresses)}/coin-balance-history?apikey=${testData.APIKey}`,
            params: {
                tags: {
                    name: `CoinBalanceHistory (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`CoinBalanceHistory (backendV2) has failed`)
        }
    })
}

export const backendV2AddressesCoinBalanceHistoryByDay = () => {
    group(`/api/v2/addresses/{}/coin-balance-history-by-day?apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/addresses/${randomItem(testData.addresses)}/coin-balance-history-by-day?apikey=${testData.APIKey}`,
            params: {
                tags: {
                    name: `CoinBalanceHistoryByDay (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`CoinBalanceHistoryByDay (backendV2) has failed`)
        }
    })
}

export const backendV2AddressesLogs = () => {
    group(`/v2/addresses/{}/logs?apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/addresses/${randomItem(testData.addresses)}/logs?apikey=${testData.APIKey}`,
            params: {
                tags: {
                    name: `AddressesLogs (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            console.log(`url: ${res.url}, status: ${res.status}`)
            fail(`AddressesLogs (backendV2) has failed`)
        }
    })
}

export const backendV2AddressesInternalTx = () => {
    group(`/v2/addresses/{}/internal-transactions?apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/addresses/${randomItem(testData.addresses)}/internal-transactions?apikey=${testData.APIKey}`,
            params: {
                tags: {
                    name: `AddressesInternalTx (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`AddressesInternalTx (backendV2) has failed`)
        }
    })
}

export const backendV2TXInternal = () => {
    group(`/v2/transactions/{}/internal-transactions?apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/transactions/${randomItem(testData.txs)}/internal-transactions?apikey=${testData.APIKey}`,
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

export const backendV2TokenTransfersPrivate = () => {
    group(`/v2/tokens/{}/transfers with key`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/tokens/${randomItem(testData.tokens)}/transfers?apikey=2aV6rpIkjqA74W0lGXpulm29KprMbEg7`,
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

export const backendV2TokenTransfers = () => {
    group(`/v2/tokens/{}/transfers?apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/tokens/${randomItem(testData.tokens)}/transfers?apikey=${testData.APIKey}`,
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
            url: `/api/v2/tokens/${ri.addr}/instances/${rii}?apikey=${testData.APIKey}`,
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

export const backendV2TransactionsList = () => {
    group(`/v2/transactions?filter=validated&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/transactions?filter=validated&apikey=${testData.APIKey}`,
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
            url: `/api/v2/transactions?block_number=${testData.startBlock}&index=${randomItem(testData.pagination.pages)}&items_count=50&filter=validated&apikey=${testData.APIKey}`,
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
            url: `/api/v2/search/quick?q=${randomItem(testData.txs)}&apikey=${testData.APIKey}`,
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
            url: `/api/v2/search/check-redirect?q=${randomItem(testData.txs)}&apikey=${testData.APIKey}`,
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
            url: `/api/v2/addresses/${randomItem(testData.addresses)}/transactions?apikey=${testData.APIKey}`,
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
            url: `/api/v2/addresses/${randomItem(testData.addresses)}/tokens?type=ERC-20&apikey=${testData.APIKey}`,
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
            url: `/api/v2/addresses/${randomItem(testData.addresses)}/tokens?type=ERC-721&apikey=${testData.APIKey}`,
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
            url: `/api/v2/addresses/${randomItem(testData.addresses)}/tokens?type=ERC-1155&apikey=${testData.APIKey}`,
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

export const backendV2BlocksList = () => {
    group(`/api/v2/blocks`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/blocks`,
            params: {
                tags: {
                    name: `Blocks List (backendV2)`,
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
export const backendV2Blocks = () => {
    group(`/api/v2/blocks/{}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/blocks/${randomItem(testData.blocks)}`,
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
    group(`/api/v2/smart-contracts/verification/config`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/smart-contracts/verification/config`,
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
    group(`/api/v2/smart-contracts/{}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/smart-contracts/${randomItem(testData.verifiedContracts)}`,
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
            url: `/api/v2/addresses/${randomItem(testData.tokens)}/token-transfers?apikey=${testData.APIKey}`,
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

export const backendV2VerifiedContractsList = () => {
    group(`/api/v2/verified-contracts`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/verified-contracts`,
            params: {
                tags: {
                    name: `Verified Contracts List (backendV2)`,
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
export const backendV2TokenTransfersList = () => {
    group(`/api/v2/token-transfers`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/token-transfers`,
            params: {
                tags: {
                    name: `Tokens Transfers List (backendV2)`,
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
export const backendV2TokensList = () => {
    group(`/api/v2/tokens`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/tokens`,
            params: {
                tags: {
                    name: `Tokens List (backendV2)`,
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
export const backendV2Tokens = () => {
    group(`/api/v2/tokens/{}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/tokens/${randomItem(testData.tokens)}`,
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
    group(`/api/v2/transactions/{}/state-changes`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/transactions/${randomItem(testData.txs)}/state-changes`,
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
    group(`/api/v2/transactions/{}/raw-trace`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/transactions/${randomItem(testData.txs)}/raw-trace`,
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
    group(`/api/v2/transactions/{}/logs`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/transactions/${randomItem(testData.txs)}/logs`,
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

export const backendV2TXDetails = () => {
    group(`/api/v2/transactions/{}/summary`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/transactions/${randomItem(testData.txs)}/summary?apikey=${testData.APIKey}`,
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
            fail(`TXDetails (backendV2) has failed`)
        }
    })
}

export const backendV2TXTokenTransfers = () => {
    group(`/api/v2/transactions/{}/token-transfers`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/transactions/${randomItem(testData.txs)}/token-transfers`,
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
    group(`/api/v2/addresses/{}/tabs-counters`, () => {
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
    group(`/api/v2/addresses/{}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/addresses/${randomItem(testData.addresses)}`,
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
    group(`/api/v2/config/json-rpc-url`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/config/json-rpc-url`,
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

export const backendV1GetLogs = () => {
    group(`/api?module=logs&action=getLogs&fromBlock={}&toBlock={}&address={}&apikey={}`, () => {
        const block = randomItem(testData.blocks)
        const res = shoot(session, {
            method: `GET`,
            url: `/api?module=logs&action=getLogs&fromBlock=${block}&toBlock=${block + 1}&address=${randomItem(testData.addresses)}&apikey=${testData.APIKey}`,
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
            url: `/api?module=account&action=tokenbalance&contractaddress=${randomItem(testData.tokens)}&address=${randomItem(testData.addresses)}&apikey=${testData.APIKey}`,
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
            url: `/api?module=token&action=getTokenHolders&contractaddress=${randomItem(testData.tokens)}&page=${randomItem(testData.pagination.pages)}&offset=${randomItem(testData.pagination.offsets)}&apikey=${testData.APIKey}`,
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
            url: `/api?module=token&action=getToken&contractaddress=${randomItem(testData.tokens)}&apikey=${testData.APIKey}`,
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
            url: `/api?module=stats&action=tokensupply&contractaddress=${randomItem(testData.tokens)}&apikey=${testData.APIKey}`,
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
            url: `/api?module=stats&action=ethsupply&apikey=${testData.APIKey}`,
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
            url: `/api?module=account&action=txlist&address=${randomItem(testData.addresses)}&page=${randomItem(testData.pagination.pages)}&offset=${randomItem(testData.pagination.offsets)}&apikey=${testData.APIKey}`,
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
            url: `/api?module=account&action=balance&address=${randomItem(testData.addresses)}&apikey=${testData.APIKey}`,
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
