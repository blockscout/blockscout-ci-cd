import { check, fail, group } from 'k6'
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import { defaultSession, testData } from './common'

import { shoot } from './gun'

const session = defaultSession()

export const backendTXActions = () => {
    group(`/api/v2/transactions/{}/summary`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/transactions/${randomItem(testData.txs)}/summary`,
            params: {
                tags: {
                    name: `TXSummary`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`TXSummary (backend) has failed`)
        }
    })
}
