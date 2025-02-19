import { check, group } from 'k6'
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import { SharedArray } from 'k6/data'
import { defaultSession } from './common/common.js'

import { shoot } from './common/gun.js'
import {
    check200, p5, p5Seq, sane, t30,
} from "./common/profile.js"

// Load test data from an environment variable
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
        v1AccountAddrHash: Object.assign({}, p5Seq(), { exec: `v1AccountAddrHash` }),
        v1TXInternal: Object.assign({}, p5Seq(), { exec: `v1TXInternal` }),
        v1AddrBalance: Object.assign({}, p5Seq(), { exec: `v1AddrBalance` }),
        v1EthSupply: Object.assign({}, p5Seq(), { exec: `v1EthSupply` }),
        v1TokenSupply: Object.assign({}, p5Seq(), { exec: `v1TokenSupply` }),
        v1AddrTxs: Object.assign({}, p5Seq(), { exec: `v1AddrTxs` }),
        v1AddrTokenTransfers: Object.assign({}, p5Seq(), { exec: `v1AddrTokenTransfers` }),
        v1GetLogs: Object.assign({}, p5Seq(), { exec: `v1GetLogs` }),
        v1TokenBalance: Object.assign({}, p5Seq(), { exec: `v1TokenBalance` }),
    },
    thresholds: sane,
}

export const v1TXInternal = () => {
    group(`/api?module=account&action=txlistinternal&txhash={}&startblock={}&endblock={}&page={}&offset={}&sort=asc&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api?module=account&action=txlistinternal&txhash=${randomItem(testData.txs)}&startblock=${startBlock}&endblock=${endBlock}&page=${randomItem(pagination.pages)}&offset=${v1Offset}&sort=asc&apikey=${APIKey}`,
            params: {
                tags: {
                    name: `Internal TXs (v1)`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const v1AddrTxs = () => {
    group(`/api?module=account&action=txlist&address={}&startblock={}&endblock={}&page={}&offset={}&sort=asc&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api?module=account&action=txlist&address=${randomItem(testData.addresses)}&startblock=${startBlock}&endblock=${endBlock}&page=${randomItem(pagination.pages)}&offset=${v1Offset}&sort=asc&apikey=${APIKey}`,
            params: {
                tags: {
                    name: `Address TXs (v1)`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const v1AddrTokenTransfers = () => {
    group(`/api?module=account&action=tokentx&address={}&startblock={}&endblock={}&offset={}&page={}&sort=asc&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api?module=account&action=tokentx&address=${randomItem(testData.addresses)}&startblock=${startBlock}&endblock=${endBlock}&offset=${v1Offset}&page=${randomItem(pagination.pages)}&sort=asc&apikey=${APIKey}`,
            params: {
                tags: {
                    name: `AddressTokenTransfers (v1)`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const v1GetLogs = () => {
    group(`/api?module=logs&action=getLogs&fromBlock={}&toBlock={}&address={}&apikey={}`, () => {
        const block = randomItem(testData.blocks)
        const res = shoot(session, {
            method: `GET`,
            url: `/api?module=logs&action=getLogs&fromBlock=${block}&toBlock=${block + 1}&address=${randomItem(testData.addresses)}&apikey=${APIKey}`,
            params: {
                tags: {
                    name: `getLogs (backend)`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const v1TokenBalance = () => {
    group(`/api?module=account&action=tokenbalance&contractaddress={}&address={}&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api?module=account&action=tokenbalance&contractaddress=${randomItem(testData.tokens)}&address=${randomItem(testData.addresses)}&apikey=${APIKey}`,
            params: {
                tags: {
                    name: `tokenBalance (backend)`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
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
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const v1TokenSupply = () => {
    group(`/api?module=stats&action=tokensupply&contractaddress={}&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api?module=stats&action=tokensupply&contractaddress=${randomItem(testData.tokens)}&apikey=${APIKey}`,
            params: {
                tags: {
                    name: `tokenSupply (backend)`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const v1EthSupply = () => {
    group(`/api?module=stats&action=ethsupply&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api?module=stats&action=ethsupply&apikey=${APIKey}`,
            params: {
                tags: {
                    name: `ETHSupply (backend)`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const v1AccountAddrHash = () => {
    group(`account/api?module=account&action=txlist&address={}&page={}&offset={}&apikey={}ddress (backend)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api?module=account&action=txlist&address=${randomItem(testData.addresses)}&page=${randomItem(pagination.pages)}&offset=${randomItem(pagination.offsets)}&apikey=${APIKey}`,
            params: {
                tags: {
                    name: `accountAddress (backend)`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const v1AddrBalance = () => {
    group(`/api?module=account&action=balance&address={}&apikey={}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api?module=account&action=balance&address=${randomItem(testData.addresses)}&apikey=${APIKey}`,
            params: {
                tags: {
                    name: `addressBalance (backend)`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}
