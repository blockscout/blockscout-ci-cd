import { check, fail, group } from 'k6'
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import { defaultSession } from './common'

import { shoot } from './gun'

const session = defaultSession()

export const randomTestAPICall = () => {
    // const randomURL = randomString(500)
    group(`random url`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/`,
            // body: JSON.stringify({
            //     addresses: data.batchAddresses,
            // }),
            params: {
                headers: {
                    'Content-Type': `application/json`,
                    // 'Custom-Header': randomString(10000),
                },
                tags: {
                    name: `Random GET request`,
                },
            },
        })
        check(res, {
            'is status 404': (r) => r.status === 404,
        })
        if (res.status !== 404) {
            fail(`Random GET request failed`)
        }
    })
}
