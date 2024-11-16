import { readFileSync } from "fs"
import chalk from "chalk"
import { expect, request } from "@playwright/test"

export const LoadDataFile = (url: string): any => {
    if (process.env.ENV === `test` || process.env.ENV === `scoutcloud`) {
        console.log(`static data was not loaded, have you set ENV param?`)
        return
    }
    const u = url.endsWith(`/`) ? url.slice(0, -1) : url
    const fileName = u.split(`//`)[1].split(`.`).slice(0, -1).join(`.`)
    try {
        // eslint-disable-next-line consistent-return
        return JSON.parse(readFileSync(`static/${fileName}.json`).toString())
    } catch (err) {
        console.log(chalk.red(`Error reading static data for ${fileName}, file should be named as first two domain sections of URL: ${u}, err: ${err}`))
    }
}

const newReqCtx = async (url: string) => request.newContext({
    baseURL: url,
    extraHTTPHeaders: {},
})

export const paginationToQuery = (params: { [key: string]: any }): string => {
    const filteredParams = Object.entries(params)
        .map(([key, value]) => {
            // If value is undefined or an empty string, set it explicitly as null
            if (value === undefined || value === ``) {
                // eslint-disable-next-line no-param-reassign
                value = `null`
            }
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        })
    return filteredParams.length ? `${filteredParams.join(`&`)}` : ``
}

export const LoadTokens = async (url: string, type: string, pages: number): Promise<any> => {
    const r = await newReqCtx(url)
    const data = {
        tokens: [],
    }
    if (type !== `ERC-20` && type !== `ERC-721` && type !== `ERC-1155` && type !== `ERC-404`) {
        throw Error(`invalid types, allowed types are ERC-20/721/1155/404`)
    }
    let pageParams = ``
    let urlWithParams = ``
    for (let i = 0; i < pages; i += 1) {
        urlWithParams = `${url}/api/v2/tokens?type=${type}&${pageParams}`
        // console.log(`url with params: ${urlWithParams}`)
        // eslint-disable-next-line no-await-in-loop
        const resp = await r.get(urlWithParams)
        expect(resp.ok()).toBeTruthy()
        expect(resp.status()).toBe(200)
        // eslint-disable-next-line no-await-in-loop
        const body = await resp.json()
        pageParams = paginationToQuery(body.next_page_params)
        data.tokens.push(...body.items)
    }
    return data
}
