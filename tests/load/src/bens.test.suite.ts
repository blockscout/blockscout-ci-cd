import { check, fail, group } from 'k6'
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import { defaultSession, testData } from './common'

import { shoot } from './gun'

const session = defaultSession()

export const batchResolveBens = () => {
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
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Batch resolve V1 has failed`)
        }
    })
}

export const addressesLookupBens = () => {
    group(`api/v1/{}/addresses:lookup?address={}&resolved_to=true&owned_by=false`, () => {
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
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Addresses resolve V1 has failed`)
        }
    })
}

export const domainsBens = () => {
    group(`api/v1/{}/domains/{}`, () => {
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
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Domains V1 has failed`)
        }
    })
}

export const domainEventsBens = () => {
    group(`api/v1/{}/domains/{}/events`, () => {
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
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Domain Events V1 has failed`)
        }
    })
}

export const domainsLookupBens = () => {
    group(`api/v1/{}/domains:lookup?name={}`, () => {
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
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Domains Lookup V1 has failed`)
        }
    })
}

// utility calls (blockscout)
export const backendVersion = () => {
    group(`/v2/config/backend-version`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/config/backend-version`,
            params: {
                tags: {
                    name: `Backend version (backendV2)`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Backend version (backendV2) has failed`)
        }
    })
}
