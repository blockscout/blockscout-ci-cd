/* eslint-disable dot-notation */
import test from '@lib/BaseTest'
import { faker } from '@faker-js/faker'
import { WatchListSpec } from '@pages/Login'

test.describe.configure({ mode: `parallel` })

test(`@AccountImage @Authorized @SignUp Sign up`, async ({ commonPage }) => {
    const randomEmail = faker.internet.email()
    const securePwd = `sa1djfhSKDJFH28372!@#`
    await commonPage.signUp(randomEmail, securePwd)
    await commonPage.isSignedIn()
})

test(`@AccountImage @Authorized Check profile info`, async ({ loginPage }) => {
    await loginPage.openAccount()
    await loginPage.checkProfile()
})

test(`@AccountImage @Authorized Check invalid address not allowed`, async ({ loginPage }) => {
    await loginPage.openAccount()
    await loginPage.addAddressWatch({
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
    await loginPage.checkValidationWarn([`is invalid`])
})

test(`@AccountImage @Authorized Check required fields`, async ({ loginPage }) => {
    await loginPage.openAccount()
    await loginPage.addAddressWatch({
        address: ``,
        name: ``,
    } as WatchListSpec)
    await loginPage.checkValidationWarn([`Required`])
})

test(`@AccountImage @Authorized Check not a personal address`, async ({ loginPage }) => {
    const {
        TestTokenAddress,
    } = process.env
    await loginPage.openAccount()
    await loginPage.addAddressWatch({
        address: TestTokenAddress,
        name: `test-token-1`,
    } as WatchListSpec)
    await loginPage.checkValidationWarn([`This address isn't personal`])
})

// test(`@AccountImage @Authorized Check notification received on Ether transfer`, async ({ loginPage }) => {
//     const { TestTokenHolder } = process.env
//     await loginPage.openAccount()
//     await loginPage.addAddressWatch({
//         address: TestTokenHolder,
//         name: `test-token-1`,
//     } as WatchListSpec)
//     await loginPage.checkWatchListRow([`test-token-1`, `0xf39`, `1.158E+59 Ether`, `Edit`])
//     await loginPage.delay(9999999)
// })
