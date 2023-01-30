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
    noCookiesReset: true,
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

// per API calls for VUs, backend

export const backendBlocks = () => {
    group(`blocks (frontend)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/blocks`,
            params: {
                tags: {
                    name: `blocks (frontend)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`blocks (frontend) has failed`)
        }
    })
}

// per API calls for VUs, frontend

export const frontendBlocks = () => {
    group(`blocks (frontend)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/blocks`,
            params: {
                tags: {
                    name: `blocks (frontend)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`blocks (frontend) has failed`)
        }
    })
}

export const frontendBlockDetails = () => {
    group(`block details (frontend)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/block/${randomItem(testData.blocks)}`,
            params: {
                tags: {
                    name: `block details (frontend)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`block details (frontend) has failed`)
        }
    })
}

export const frontendTxs = () => {
    group(`txs (frontend)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/txs`,
            params: {
                tags: {
                    name: `txs (frontend)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`txs (frontend) has failed`)
        }
    })
}

export const frontendTxDetails = () => {
    group(`tx details (frontend)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/tx/${randomItem(testData.txs)}`,
            params: {
                tags: {
                    name: `tx details (frontend)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`tx details (frontend) has failed`)
        }
    })
}

export const frontendAddressDetails = () => {
    group(`address details (frontend)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/address/${randomItem(testData.addresses)}`,
            params: {
                tags: {
                    name: `address details (frontend)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`address details (frontend) has failed`)
        }
    })
}

export const frontendTokenDetails = () => {
    group(`token details (frontend)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/token/${randomItem(testData.tokens)}`,
            params: {
                tags: {
                    name: `token details (frontend)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`token details (frontend) has failed`)
        }
    })
}

export const frontendTokenHoldersDetails = () => {
    group(`token holders details (frontend)`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/token/${randomItem(testData.tokens)}?tab=holders`,
            params: {
                tags: {
                    name: `token holders details (frontend)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`token holders details (frontend) has failed`)
        }
    })
}
