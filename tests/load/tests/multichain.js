import { check, group } from 'k6'
import { randomItem, randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import { SharedArray } from "k6/data"
import { shoot } from './common/gun.js'
import {
    check200, p5, sane, t30,
} from "./common/profile.js"
import { defaultSession } from "./common/common.js"

const testDatas = []

for (let i = 1; i < 11; i += 1) {
    // eslint-disable-next-line no-loop-func
    const testFile = new SharedArray(`users`, () => JSON.parse(open(__ENV[`TEST_DATA_FILE_${i}`])))
    testDatas.push(testFile[0])
}

const session = defaultSession()

const authHeaders = {
    'Content-Type': `application/json`,
    "x-quicknode-id": __ENV.QUICKNODE_ID,
    "x-instance-id": __ENV.QUICKNODE_INSTANCE,
}

export const options = {
    scenarios: {
        Eth: Object.assign({}, p5, { exec: `EthByHash` }),
        Optimish: Object.assign({}, p5, { exec: `OptimismByHash` }),
    },
    thresholds: sane,
}

const callByHash = (dataFile) => group(`bs_getTransactionByHash`, () => {
    const data = randomItem(dataFile.bs_getTransactionByHash)
    const res = shoot(session, {
        method: `POST`,
        url: `/rpc`,
        body: JSON.stringify({
            method: `bs_getTransactionByHash`,
            params: data.params,
            id: randomIntBetween(1, 999999),
            jsonrpc: `2.0`,
        }),
        params: {
            headers: authHeaders,
            tags: {
                name: `bs_getTransactionByHash`,
            },
            timeout: t30,
        },
    })
    check(res, check200)
})

export const EthByHash = () => {
    callByHash(testDatas[0])
}

export const OptimismByHash = () => {
    callByHash(testDatas[1])
}
