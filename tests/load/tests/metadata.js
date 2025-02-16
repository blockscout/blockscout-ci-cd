import { check, group } from 'k6'
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import { SharedArray } from "k6/data"
import { defaultSession } from './common/common.js'

import { shoot } from './common/gun.js'
import {
    check200, p1, sane, t30,
} from "./common/profile.js"

const session = defaultSession()

const testData = new SharedArray(`users`, () => JSON.parse(open(__ENV.TEST_DATA_FILE)))[0].Load

export const options = {
    scenarios: {
        metadata: Object.assign({}, p1, { exec: `metadata` }),
        addresses: Object.assign({}, p1, { exec: `addresses` }),
        tagsSearch: Object.assign({}, p1, { exec: `tagsSearch` }),
    },
    thresholds: sane,
}

function getRandomItems(arr, n) {
    if (n > arr.length) {
        throw new Error(`N cannot be greater than the length of the array`)
    }

    // Shuffle the array using Fisher-Yates shuffle algorithm
    const shuffled = arr.slice() // Make a copy of the original array
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    // Return the first N items from the shuffled array
    return shuffled.slice(0, n)
}

export const metadata = () => {
    group(`/api/v1/metadata`, () => {
        // const addr = randomItem(testData.addresses)
        // const randomItems = getRandomItems(testData.addresses, 50)
        const addr = testData.addresses.join(`,`)
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v1/metadata?tagLimit=100&addresses=${addr}&chainId=11155111`,
            params: {
                headers: {
                    'Content-Type': `application/json`,
                },
                tags: {
                    name: `Metadata for addresses`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const addresses = () => {
    group(`/api/v1/addresses`, () => {
        const slug = randomItem(testData.slugs)
        const tagType = randomItem(testData.tagTypes)
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v1/addresses?slug=${slug}&tagType=${tagType}`,
            params: {
                headers: {
                    'Content-Type': `application/json`,
                },
                tags: {
                    name: `Addresses for metadata`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const tagsSearch = () => {
    group(`/api/v1/tags:search`, () => {
        const slug = randomItem(testData.slugs)
        const tagType = randomItem(testData.tagTypes)
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v1/tags:search?chainId=11155111&tagTypes=${tagType}&slug=${slug}&exact=false`,
            params: {
                headers: {
                    'Content-Type': `application/json`,
                },
                tags: {
                    name: `Tags search for metadata`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}
