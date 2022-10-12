/* eslint-disable dot-notation */
import test from '@lib/BaseTest'
import { expect } from '@playwright/test'

test.describe.configure({ mode: `parallel` })

test(`@AccountImage @API Test API`, async ({ authorized: loginPage }) => {
    // await test.step(`Sign in`, async () => {
    //     const { ACCOUNT_USERNAME, ACCOUNT_PASSWORD } = process.env
    //     const apiCtx = await loginPage.newAPIContext(ACCOUNT_USERNAME, ACCOUNT_PASSWORD)

    //     const userInfo = await apiCtx.get(`api/account/v1/user/info`)
    //     const body = (await userInfo.body()).toString()
    //     expect(JSON.parse(body)).toMatchObject({
    //         avatar: `https://s.gravatar.com/avatar/a979a010b450d801bef3eb9f1e687b8c?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2F3c.png`,
    //         email: `3cad691b-44e3-4613-bab2-c3ef59ae1f03@mailslurp.com`,
    //         name: `3cad691b-44e3-4613-bab2-c3ef59ae1f03@mailslurp.com`,
    //         nickname: `3cad691b-44e3-4613-bab2-c3ef59ae1f03`,
    //     })
    //     // TODO: add API tests when there will be different public API than we use in UI
    // })
})
