const REMOVED = `removed by test`

// LOKI_GUN_DEBUG=all must be used only in rare cases where nothing else can help
// LOKI_GUN_DEBUG=meta should be used while developing and debugging
export const shoot = (client, req) => {
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
    case `none`:
        break
    default:
        throw Error(`unknown LOKI_DEBUG type: ${__ENV.LOKI_GUN_DEBUG}`)
    }
    return resp
}
