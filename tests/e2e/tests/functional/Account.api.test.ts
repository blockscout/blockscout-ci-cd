/* eslint-disable dot-notation */
import test from '@lib/BaseTest'
import { expect } from '@playwright/test'

test.describe.configure({ mode: `parallel` })

test(`@AccountImage @API Test API`, async ({ loginPage }) => {
    await test.step(`Sign in`, async () => {
        const { ACCOUNT_USERNAME, ACCOUNT_PASSWORD } = process.env
        const apiCtx = await loginPage.newAPIContext(ACCOUNT_USERNAME, ACCOUNT_PASSWORD)

        const userInfo = await apiCtx.get(`api/account/v1/user/info`)
        const body = (await userInfo.body()).toString()
        expect(JSON.parse(body)).toMatchObject({
            avatar: `https://s.gravatar.com/avatar/1ae0442cd257387f9c1b77cda29eb243?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Ffa.png`,
            email: `fahrbss@gmail.com`,
            name: `fahrbss@gmail.com`,
            nickname: `fahrbss`,
        })
        // TODO: add API tests when there will be different public API than we use in UI
    })
})
