import { check, fail, group } from 'k6'
import { randomItem, randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import {
    defaultSession,
    testData,
    testData1, testData10,
    testData2,
    testData3,
    testData4,
    testData5,
    testData6,
    testData7, testData8, testData9,
} from './common'

import { shoot } from './gun'

const session = defaultSession()

// eslint-disable-next-line camelcase
export const bs_getTransactionByHash_eth = () => {
    group(`bs_getTransactionByHash`, () => {
        const data = randomItem(testData1.bs_getTransactionByHash)
        const res = shoot(session, {
            method: `POST`,
            url: `/rpc`,
            body: JSON.stringify({
                method: "bs_getTransactionByHash",
                params: data.params,
                id: randomIntBetween(1, 999999),
                jsonrpc: "2.0",
            }),
            params: {
                headers: {
                    'Content-Type': `application/json`,
                    "x-quicknode-id": `9469f6bfc411b1c23f0f3677bcd22b890a4a755273dc2c0ad38559f7e1eb2700`,
                    "x-instance-id": `2c03e048-3125778-32132312314944-b804-0de77df9363a`,
                },
                tags: {
                    name: `bs_getTransactionByHash`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`bs_getTransactionByHash has failed`)
        }
    })
}
export const bs_getTransactionByHash_optimism = () => {
    group(`bs_getTransactionByHash`, () => {
        const data = randomItem(testData2.bs_getTransactionByHash)
        const res = shoot(session, {
            method: `POST`,
            url: `/rpc`,
            body: JSON.stringify({
                method: "bs_getTransactionByHash",
                params: data.params,
                id: randomIntBetween(1, 999999),
                jsonrpc: "2.0",
            }),
            params: {
                headers: {
                    'Content-Type': `application/json`,
                    "x-quicknode-id": `9469f6bfc411b1c23f0f3677bcd22b890a4a755273dc2c0ad38559f7e1eb2700`,
                    "x-instance-id": `2c03e048-3125778-32132312314944-b804-0de77df9363a`,
                },
                tags: {
                    name: `bs_getTransactionByHash`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`bs_getTransactionByHash has failed`)
        }
    })
}
export const bs_getTransactionByHash_rootstock = () => {
    group(`bs_getTransactionByHash`, () => {
        const data = randomItem(testData3.bs_getTransactionByHash)
        const res = shoot(session, {
            method: `POST`,
            url: `/rpc`,
            body: JSON.stringify({
                method: "bs_getTransactionByHash",
                params: data.params,
                id: randomIntBetween(1, 999999),
                jsonrpc: "2.0",
            }),
            params: {
                headers: {
                    'Content-Type': `application/json`,
                    "x-quicknode-id": `9469f6bfc411b1c23f0f3677bcd22b890a4a755273dc2c0ad38559f7e1eb2700`,
                    "x-instance-id": `2c03e048-3125778-32132312314944-b804-0de77df9363a`,
                },
                tags: {
                    name: `bs_getTransactionByHash`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`bs_getTransactionByHash has failed`)
        }
    })
}
export const bs_getTransactionByHash_gnosis = () => {
    group(`bs_getTransactionByHash`, () => {
        const data = randomItem(testData4.bs_getTransactionByHash)
        const res = shoot(session, {
            method: `POST`,
            url: `/rpc`,
            body: JSON.stringify({
                method: "bs_getTransactionByHash",
                params: data.params,
                id: randomIntBetween(1, 999999),
                jsonrpc: "2.0",
            }),
            params: {
                headers: {
                    'Content-Type': `application/json`,
                    "x-quicknode-id": `9469f6bfc411b1c23f0f3677bcd22b890a4a755273dc2c0ad38559f7e1eb2700`,
                    "x-instance-id": `2c03e048-3125778-32132312314944-b804-0de77df9363a`,
                },
                tags: {
                    name: `bs_getTransactionByHash`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`bs_getTransactionByHash has failed`)
        }
    })
}
export const bs_getTransactionByHash_shibarium = () => {
    group(`bs_getTransactionByHash`, () => {
        const data = randomItem(testData5.bs_getTransactionByHash)
        const res = shoot(session, {
            method: `POST`,
            url: `/rpc`,
            body: JSON.stringify({
                method: "bs_getTransactionByHash",
                params: data.params,
                id: randomIntBetween(1, 999999),
                jsonrpc: "2.0",
            }),
            params: {
                headers: {
                    'Content-Type': `application/json`,
                    "x-quicknode-id": `9469f6bfc411b1c23f0f3677bcd22b890a4a755273dc2c0ad38559f7e1eb2700`,
                    "x-instance-id": `2c03e048-3125778-32132312314944-b804-0de77df9363a`,
                },
                tags: {
                    name: `bs_getTransactionByHash`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`bs_getTransactionByHash has failed`)
        }
    })
}

export const bs_getTransactionByHash_neon = () => {
    group(`bs_getTransactionByHash`, () => {
        const data = randomItem(testData6.bs_getTransactionByHash)
        const res = shoot(session, {
            method: `POST`,
            url: `/rpc`,
            body: JSON.stringify({
                method: "bs_getTransactionByHash",
                params: data.params,
                id: randomIntBetween(1, 999999),
                jsonrpc: "2.0",
            }),
            params: {
                headers: {
                    'Content-Type': `application/json`,
                    "x-quicknode-id": `9469f6bfc411b1c23f0f3677bcd22b890a4a755273dc2c0ad38559f7e1eb2700`,
                    "x-instance-id": `2c03e048-3125778-32132312314944-b804-0de77df9363a`,
                },
                tags: {
                    name: `bs_getTransactionByHash`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`bs_getTransactionByHash has failed`)
        }
    })
}

export const bs_getTransactionByHash_zora = () => {
    group(`bs_getTransactionByHash`, () => {
        const data = randomItem(testData7.bs_getTransactionByHash)
        const res = shoot(session, {
            method: `POST`,
            url: `/rpc`,
            body: JSON.stringify({
                method: "bs_getTransactionByHash",
                params: data.params,
                id: randomIntBetween(1, 999999),
                jsonrpc: "2.0",
            }),
            params: {
                headers: {
                    'Content-Type': `application/json`,
                    "x-quicknode-id": `9469f6bfc411b1c23f0f3677bcd22b890a4a755273dc2c0ad38559f7e1eb2700`,
                    "x-instance-id": `2c03e048-3125778-32132312314944-b804-0de77df9363a`,
                },
                tags: {
                    name: `bs_getTransactionByHash`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`bs_getTransactionByHash has failed`)
        }
    })
}

export const bs_getTransactionByHash_blast = () => {
    group(`bs_getTransactionByHash`, () => {
        const data = randomItem(testData8.bs_getTransactionByHash)
        const res = shoot(session, {
            method: `POST`,
            url: `/rpc`,
            body: JSON.stringify({
                method: "bs_getTransactionByHash",
                params: data.params,
                id: randomIntBetween(1, 999999),
                jsonrpc: "2.0",
            }),
            params: {
                headers: {
                    'Content-Type': `application/json`,
                    "x-quicknode-id": `9469f6bfc411b1c23f0f3677bcd22b890a4a755273dc2c0ad38559f7e1eb2700`,
                    "x-instance-id": `2c03e048-3125778-32132312314944-b804-0de77df9363a`,
                },
                tags: {
                    name: `bs_getTransactionByHash`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`bs_getTransactionByHash has failed`)
        }
    })
}

export const bs_getTransactionByHash_etherlink = () => {
    group(`bs_getTransactionByHash`, () => {
        const data = randomItem(testData9.bs_getTransactionByHash)
        const res = shoot(session, {
            method: `POST`,
            url: `/rpc`,
            body: JSON.stringify({
                method: "bs_getTransactionByHash",
                params: data.params,
                id: randomIntBetween(1, 999999),
                jsonrpc: "2.0",
            }),
            params: {
                headers: {
                    'Content-Type': `application/json`,
                    "x-quicknode-id": `9469f6bfc411b1c23f0f3677bcd22b890a4a755273dc2c0ad38559f7e1eb2700`,
                    "x-instance-id": `2c03e048-3125778-32132312314944-b804-0de77df9363a`,
                },
                tags: {
                    name: `bs_getTransactionByHash`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`bs_getTransactionByHash has failed`)
        }
    })
}

export const bs_getTransactionByHash_nova = () => {
    group(`bs_getTransactionByHash`, () => {
        const data = randomItem(testData10.bs_getTransactionByHash)
        const res = shoot(session, {
            method: `POST`,
            url: `/rpc`,
            body: JSON.stringify({
                method: "bs_getTransactionByHash",
                params: data.params,
                id: randomIntBetween(1, 999999),
                jsonrpc: "2.0",
            }),
            params: {
                headers: {
                    'Content-Type': `application/json`,
                    "x-quicknode-id": `9469f6bfc411b1c23f0f3677bcd22b890a4a755273dc2c0ad38559f7e1eb2700`,
                    "x-instance-id": `2c03e048-3125778-32132312314944-b804-0de77df9363a`,
                },
                tags: {
                    name: `bs_getTransactionByHash`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`bs_getTransactionByHash has failed`)
        }
    })
}
