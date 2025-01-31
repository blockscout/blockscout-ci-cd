/* eslint-disable no-undef */
import { Httpx } from 'https://jslib.k6.io/httpx/0.1.0/index.js'

export const DefaultRequestTimeout = 30000

export const defaultSession = () => {
    const session = new Httpx({
        baseURL: __ENV.BASE_URL,
        headers: {
            'User-Agent': `k6-test`,
        },
        timeout: __ENV.REQUEST_TIMEOUT,
    })

    session.addTags({
        apiType: `rpc`,
    })
    session.clearHeader(`User-Agent`)
    return session
}
