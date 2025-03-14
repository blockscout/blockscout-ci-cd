import { check, fail, group } from 'k6'
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import { SharedArray } from "k6/data"
import { defaultSession } from './common/common.js'

import { shoot } from './common/gun.js'
import {
    check200, p5, sane, t30,
} from "./common/profile.js"

const session = defaultSession()

const testData = new SharedArray(`users`, () => JSON.parse(open(__ENV.TEST_DATA_FILE)))[0]

export const options = {
    scenarios: {
        resolve: Object.assign({}, p5, { exec: `resolve` }),
        lookup: Object.assign({}, p5, { exec: `lookup` }),
        domains: Object.assign({}, p5, { exec: `domains` }),
        // domainEvent: Object.assign({}, p5, { exec: `domainEvent` }),
        domainsLookup: Object.assign({}, p5, { exec: `domainsLookup` }),
    },
    thresholds: sane,
}

export const resolve = () => {
    group(`/api/v1/{}/addresses:batch-resolve-names`, () => {
        const chainID = randomItem(testData.chainIDs)
        const data = testData[chainID]
        const res = shoot(session, {
            method: `POST`,
            url: `/api/v1/${chainID}/addresses:batch-resolve-names`,
            body: JSON.stringify({
                addresses: data.batchAddresses,
            }),
            params: {
                headers: {
                    'Content-Type': `application/json`,
                },
                tags: {
                    name: `Batch resolve V1`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const lookup = () => {
    group(`/api/v1/{}/addresses:lookup?address={}&resolved_to=true&owned_by=false`, () => {
        const chainID = randomItem(testData.chainIDs)
        const data = testData[chainID]
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v1/${chainID}/addresses:lookup?address=${randomItem(data.addressesLookup)}&resolved_to=true&owned_by=false`,
            params: {
                tags: {
                    name: `Addresses Lookup V1`,
                },
            },
        })
        check(res, check200)
    })
}

export const domains = () => {
    group(`/api/v1/{}/domains/{}`, () => {
        const chainID = randomItem(testData.chainIDs)
        const data = testData[chainID]
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v1/${chainID}/domains/${randomItem(data.domains)}`,
            params: {
                tags: {
                    name: `Domains V1`,
                },
            },
        })
        check(res, check200)
    })
}

export const domainEvent = () => {
    group(`/api/v1/{}/domains/{}/events`, () => {
        const chainID = randomItem(testData.chainIDs)
        const data = testData[chainID]
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v1/${chainID}/domains/${randomItem(data.domains)}/events`,
            params: {
                tags: {
                    name: `Domain Events V1`,
                },
            },
        })
        check(res, check200)
    })
}

export const domainsLookup = () => {
    group(`/api/v1/{}/domains:lookup?name={}`, () => {
        const chainID = randomItem(testData.chainIDs)
        const data = testData[chainID]
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v1/${chainID}/domains:lookup?name=${randomItem(data.domains)}`,
            params: {
                tags: {
                    name: `Domains Lookup V1`,
                },
            },
        })
        check(res, check200)
    })
}
