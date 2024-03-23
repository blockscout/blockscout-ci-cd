import { check, fail, group } from 'k6'
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import { defaultSession, testData } from './common'

import { shoot } from './gun'

const session = defaultSession()
// per API calls for VUs, frontend

export const frontendBlocks = () => {
    group(`/blocks`, () => {
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
    group(`/block/{}`, () => {
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
    group(`/txs`, () => {
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
    group(`/tx/{}`, () => {
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
    group(`/address/{}`, () => {
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
    group(`/token/{}`, () => {
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
    group(`/token/{}?tab=holders`, () => {
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
