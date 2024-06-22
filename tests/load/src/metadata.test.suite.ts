import { check, fail, group } from 'k6'
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import { defaultSession, testData } from './common'

import { shoot } from './gun'

const session = defaultSession()

function getRandomItems(arr: any, n: any) {
    if (n > arr.length) {
        throw new Error(`N cannot be greater than the length of the array`)
    }

    // Shuffle the array using Fisher-Yates shuffle algorithm
    const shuffled = arr.slice() // Make a copy of the original array
    for (let i = shuffled.length - 1; i > 0; i--) {
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
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Metadata for addresses has failed!`)
        }
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
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Addresses for metadata has failed!`)
        }
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
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Tags search has failed!`)
        }
    })
}
