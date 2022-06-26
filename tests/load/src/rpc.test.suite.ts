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

// per API calls for VUs

export const blocksByAddrPerfBaseline = () => {
    group(`blocks_by_addr`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api?module=account&action=getminedblocks&address=${randomItem(testData.addresses)}`,
            params: {
                tags: {
                    name: `blocks_by_addr`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`blocks_by_addr failed`)
        }
    })
}

export const listOfTokensByAddrPerfBaseline = () => {
    group(`tokens_by_addr`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api?module=account&action=tokenlist&address=${randomItem(testData.addresses)}`,
            params: {
                tags: {
                    name: `tokens_by_addr`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`tokens_by_addr failed`)
        }
    })
}
