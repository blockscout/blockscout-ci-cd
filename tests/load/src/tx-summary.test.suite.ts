import { check, fail, group } from 'k6'
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import { SharedArray } from 'k6/data'
import { defaultSession } from './common.js'
import { shoot } from './gun.js'

// Load test data from an environment variable
const testFile = new SharedArray(`users`, () => JSON.parse(open(__ENV.TEST_DATA_FILE)))
const testData = testFile[0]

// Initialize session
const session = defaultSession()

// Define options for the test
export const options = {
    scenarios: {
        plain: {
            executor: `constant-arrival-rate`,
            preAllocatedVUs: 20,
            rate: 5,
            exec: `backendTXActions`,
        },
    },
    thresholds: {
        http_req_duration: [`p(95)<5000`],
    },
}

// Define the backend transaction actions
export function backendTXActions() {
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

        // Check if the response status is 200
        check(res, {
            'is status 200': (r) => r.status === 200,
        })

        // Fail the test if the status is not 200
        if (res.status !== 200) {
            fail(`TXSummary (backend) has failed`)
        }
    })
}
