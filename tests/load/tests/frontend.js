import { check, group } from 'k6'
import { SharedArray } from "k6/data"
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import { defaultSession } from './common/common.js'
import { shoot } from './common/gun.js'
import {
    check200, p1, sane, t30,
} from "./common/profile.js"

const session = defaultSession()
const testData = new SharedArray(`users`, () => JSON.parse(open(__ENV.TEST_DATA_FILE)))[0]

export const options = {
    scenarios: {
        blocks: Object.assign({}, p1, { exec: `blocks` }),
        blockDetails: Object.assign({}, p1, { exec: `blockDetails` }),
        txs: Object.assign({}, p1, { exec: `txs` }),
        txDetails: Object.assign({}, p1, { exec: `txDetails` }),
        addrDetails: Object.assign({}, p1, { exec: `addrDetails` }),
        accounts: Object.assign({}, p1, { exec: `accounts` }),
        verifiedContracts: Object.assign({}, p1, { exec: `verifiedContracts` }),
        ops: Object.assign({}, p1, { exec: `ops` }),
        tokenTransfers: Object.assign({}, p1, { exec: `tokenTransfers` }),
        tokens: Object.assign({}, p1, { exec: `tokens` }),
        tokenDetails: Object.assign({}, p1, { exec: `tokenDetails` }),
        tokenHolderDetails: Object.assign({}, p1, { exec: `tokenHolderDetails` }),
    },
    thresholds: sane,
}

export const blocks = () => {
    group(`/blocks`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/blocks`,
            params: {
                tags: {
                    name: `blocks (frontend)`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const blockDetails = () => {
    group(`/block/{}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/block/${randomItem(testData.blocks)}`,
            params: {
                tags: {
                    name: `block details (frontend)`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const txs = () => {
    group(`/txs`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/txs`,
            params: {
                tags: {
                    name: `txs (frontend)`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const txDetails = () => {
    group(`/tx/{}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/tx/${randomItem(testData.txs)}`,
            params: {
                tags: {
                    name: `tx details (frontend)`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const addrDetails = () => {
    group(`/address/{}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/address/${randomItem(testData.addresses)}`,
            params: {
                tags: {
                    name: `address details (frontend)`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const accounts = () => {
    group(`/accounts`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/accounts`,
            params: {
                tags: {
                    name: `accounts list (frontend)`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const verifiedContracts = () => {
    group(`/verified-contracts`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/verified-contracts`,
            params: {
                tags: {
                    name: `ops list (frontend)`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}
export const ops = () => {
    group(`/ops`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/ops`,
            params: {
                tags: {
                    name: `ops list (frontend)`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}
export const tokenTransfers = () => {
    group(`/token-transfers`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/token-transfers`,
            params: {
                tags: {
                    name: `token transfers list (frontend)`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}
export const tokens = () => {
    group(`/tokens`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/tokens`,
            params: {
                tags: {
                    name: `tokens list (frontend)`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}
export const tokenDetails = () => {
    group(`/token/{}`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/token/${randomItem(testData.tokens)}`,
            params: {
                tags: {
                    name: `token details (frontend)`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const tokenHolderDetails = () => {
    group(`/token/{}?tab=holders`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/token/${randomItem(testData.tokens)}?tab=holders`,
            params: {
                tags: {
                    name: `token holders details (frontend)`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}
