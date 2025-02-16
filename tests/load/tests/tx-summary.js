import { check, group } from 'k6'
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import { SharedArray } from 'k6/data'
import { defaultSession } from './common/common.js'
import { shoot } from './common/gun.js'
import {
    check200, p5, sane, t30,
} from "./common/profile.js"

const testData = new SharedArray(`users`, () => JSON.parse(open(__ENV.TEST_DATA_FILE)))[0].Load

const session = defaultSession()

export const options = {
    scenarios: {
        txSummary: Object.assign({}, p5, { exec: `txSummary` }),
    },
    thresholds: sane,
}

export function txSummary() {
    group(`/api/v2/transactions/{}/summary`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/transactions/${randomItem(testData.txs)}/summary`,
            params: {
                tags: {
                    name: `TXSummary`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}
