/* eslint-disable dot-notation */
import test from '@lib/BaseTest'
import { faker } from '@faker-js/faker'
import { WatchListSpec } from '@pages/Login'

test.describe.configure({ mode: `parallel` })

test(`@AccountImage @Authorized @SignUp Sign up`, async ({ commonPage }) => {
    // TODO: separate, 500 inboxes a month limit if we create on slurp
    const randomEmail = faker.internet.email()
    const securePwd = `sa1djfhSKDJFH28372!@#`
    await commonPage.signUp(randomEmail, securePwd)
    await commonPage.isSignedIn()
})

test(`@AccountImage @Authorized Check profile info`, async ({ authorized }) => {
    await authorized.openAccount()
    await authorized.checkProfile()
})

test(`@AccountImage @Authorized Check invalid address not allowed`, async ({ authorized }) => {
    await authorized.openAccount()
    await authorized.addAddressWatch({
        address: `0x0`,
        name: `sldkfjsdkf`,
        excludeIncoming: {
            Ether: true,
            Tokens: true,
            NFT: true,
        },
        excludeOutgoing: {
            Ether: true,
            Tokens: true,
            NFT: true,
        },
        excludeNotifications: true,
    } as WatchListSpec)
    await authorized.checkValidationWarn([`is invalid`])
})

test(`@AccountImage @Authorized Check required fields`, async ({ authorized }) => {
    await authorized.openAccount()
    await authorized.addAddressWatch({
        address: ``,
        name: ``,
    } as WatchListSpec)
    await authorized.checkValidationWarn([`Required`])
})

test(`@AccountImage @Authorized Check not a personal address`, async ({ authorized }) => {
    const {
        TestTokenAddress,
    } = process.env
    await authorized.openAccount()
    await authorized.addAddressWatch({
        address: TestTokenAddress,
        name: `test-token-1`,
    } as WatchListSpec)
    await authorized.checkValidationWarn([`This address isn't personal`])
})
