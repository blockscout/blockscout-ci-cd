import { check, fail, group } from 'k6'
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import { SharedArray } from 'k6/data'
import { defaultSession } from './common/common.js'
import {
    check200, p1, p5Seq, sane, t30,
} from "./common/profile.js"

import { shoot } from './common/gun.js'

const testData = new SharedArray(`users`, () => JSON.parse(open(__ENV.TEST_DATA_FILE)))[0].Load
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
        txInternalCurrentBlock: Object.assign({}, p5Seq(), { exec: `v2TXInternalCurrentBlock` }),
        v2gas: Object.assign({}, p5Seq(), { exec: `v2GasPriceOracle` }),
        v2txInternal: Object.assign({}, p5Seq(), { exec: `v2TXInternal` }),
        v2tokenTransfers: Object.assign({}, p5Seq(), { exec: `v2TokenTransfers` }),
        v2tokenInstances: Object.assign({}, p5Seq(), { exec: `v2TokenInstances` }),
        v2txList: Object.assign({}, p5Seq(), { exec: `v2TransactionsList` }),
        v2recentTransactions: Object.assign({}, p5Seq(), { exec: `v2RecentTransactions` }),
        v2search: Object.assign({}, p5Seq(), { exec: `v2Search` }),
        v2searchRedirect: Object.assign({}, p5Seq(), { exec: `v2SearchRedirect` }),
        v2addressTokenTransfers: Object.assign({}, p5Seq(), { exec: `v2AddressesTokenTransfers` }),
        v2addressLogs: Object.assign({}, p5Seq(), { exec: `v2AddressesLogs` }),
        v2addressInternalTx: Object.assign({}, p5Seq(), { exec: `v2AddressesInternalTx` }),
        v2addrTxs: Object.assign({}, p5Seq(), { exec: `v2AddressesTransactions` }),
        v2addrTokensERC20: Object.assign({}, p5Seq(), { exec: `v2AddressesTokensERC20` }),
        v2addrTokensERC721: Object.assign({}, p5Seq(), { exec: `v2AddressesTokensERC721` }),
        v2addrTokensERC1155: Object.assign({}, p5Seq(), { exec: `v2AddressesTokensERC1155` }),
        v2addrTabCounter: Object.assign({}, p5Seq(), { exec: `v2AddressesTabCounters` }),
        v2addresses: Object.assign({}, p5Seq(), { exec: `v2Addresses` }),
        v2addrCoinBalanceHistory: Object.assign({}, p5Seq(), { exec: `v2AddressesCoinBalanceHistory` }),
        v2addrCoinBalanceHistoryByDay: Object.assign({}, p5Seq(), { exec: `v2AddressesCoinBalanceHistoryByDay` }),
        v2TokenTransfers: Object.assign({}, p5Seq(), { exec: `v2TXTokenTransfers` }),
        v2TxLogs: Object.assign({}, p5Seq(), { exec: `v2TXLogs` }),
        v2TxRawTrace: Object.assign({}, p5Seq(), { exec: `v2TXRawTrace` }),
        v2TxStateChanges: Object.assign({}, p5Seq(), { exec: `v2TXStateChanges` }),
        v2Token: Object.assign({}, p5Seq(), { exec: `v2Tokens` }),
        v2Blocks: Object.assign({}, p5Seq(), { exec: `v2Blocks` }),
        v2SmartContracts: Object.assign({}, p5Seq(), { exec: `v2SmartContracts` }),
        v2SmartContractsVerConfig: Object.assign({}, p5Seq(), { exec: `v2SmartContractsVerificationConfig` }),
    },
    thresholds: sane,
}

export const v2GasPriceOracle = () => {
    group(`/v1/gas-price-oracle`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v1/gas-price-oracle?apikey=${APIKey}`,
            params: {
                tags: {
                    name: `GasPriceOracle (v2)`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
    })
}
