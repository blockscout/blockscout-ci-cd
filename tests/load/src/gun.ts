/* eslint-disable no-undef */
import { Params, Response } from 'k6/http'

// https://k6.io/docs/javascript-api/jslib/httpx/request, no types with that import available so it's duplicated here
export interface Request {
    method: `GET` | `POST` | `PUT` | `PATCH` | `OPTIONS` | `HEAD`
    url: string
    body?: string | object | ArrayBuffer
    params?: Params
}

const REMOVED = `removed by test`

// LOKI_GUN_DEBUG=all must be used only in rare cases where nothing else can help
// LOKI_GUN_DEBUG=meta should be used while developing and debugging
export const shoot = (client: any, req: Request): Response => {
    const resp = client.request(req.method, req.url, req.body, req.params)
    switch (__ENV.LOKI_GUN_DEBUG) {
    case `meta`:
        resp.body = REMOVED
        resp.request.body = REMOVED
        console.debug(JSON.stringify(resp))
        break
    case `all`:
        console.debug(JSON.stringify(resp))
        break
    case undefined:
        break
    default:
        throw Error(`unknown LOKI_DEBUG type: ${__ENV.LOKI_GUN_DEBUG}`)
    }
    return resp
}
