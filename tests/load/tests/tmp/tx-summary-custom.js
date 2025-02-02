import { check, group } from 'k6'
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import { SharedArray } from 'k6/data'
import { defaultSession } from './common/common.js'
import { shoot } from './common/gun.js'
import {
    check200, p5, r30, sane, t30,
} from "./common/profile.js"

const testFile = new SharedArray(`users`, () => JSON.parse(open(__ENV.TEST_DATA_FILE)))
const testData = testFile[0]

const session = defaultSession()

export const options = {
    scenarios: {
        txSummaryCustom: Object.assign({}, p5, { exec: `txSummaryCustom` }),
        // txSummaryCustom2: Object.assign({}, r30, { exec: `txSummaryCustom` }),
    },
    thresholds: sane,
}

export function txSummaryCustom() {
    group(`/api/v2/transactions/{}/summary`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/transactions/${randomItem(testData.txs)}/summary?just_request_body=true`,
            // url: `/api/v2/transactions/${randomItem(testData.txs)}/summary`,
            params: {
                tags: {
                    name: `TXSummaryBody`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}
