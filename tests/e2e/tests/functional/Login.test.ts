/* eslint-disable dot-notation */
import test from '@lib/BaseTest'
import { faker } from '@faker-js/faker'

test.describe.configure({ mode: `parallel` })

test(`@AccountImage @Authorized @SignUp Sign up`, async ({ loginPage }) => {
    await test.step(`Sign up`, async () => {
        await loginPage.open()
        const randomEmail = faker.internet.email()
        console.log(`emaill: ${randomEmail}`)
        const securePwd = `sa1djfhSKDJFH28372!@#`
        await loginPage.signUp(randomEmail, securePwd)
        await loginPage.isSignedIn()
    })
})

test(`@AccountImage @Authorized @SignIn Sign in`, async ({ loginPage }) => {
    await test.step(`Sign in`, async () => {
        const { ACCOUNT_USERNAME, ACCOUNT_PASSWORD } = process.env
        await loginPage.open()
        await loginPage.signIn(ACCOUNT_USERNAME, ACCOUNT_PASSWORD)
        await loginPage.isSignedIn()
    })
})
