/* eslint-disable dot-notation */
import test from '@lib/BaseTest'
import { faker } from '@faker-js/faker'
import { PublicTagSpec, WatchListSpec } from '@pages/Login'

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

test(`@AccountImage @Authorized Check address tag`, async ({ authorized }) => {
    const {
        TestTokenAddress,
    } = process.env
    await authorized.openAccount()
    await authorized.selectAddressTagTab()
    const tagName = faker.random.alphaNumeric(8)
    await authorized.addAddressTag(TestTokenAddress, tagName)
    await authorized.checkListRow(0, [tagName, `0x`, `Remove Tag`])
    await authorized.clickListRow(0, 1)
    await authorized.hasText(tagName)
})

test(`@AccountImage @Authorized Check transaction tag`, async ({ authorized }) => {
    const {
        TestTokenTXMintHash,
    } = process.env
    await authorized.openAccount()
    await authorized.selectTXTagTab()
    const tagName = faker.random.alphaNumeric(8)
    await authorized.addTXTag(TestTokenTXMintHash, tagName)
    await authorized.checkListRow(0, [tagName, `0x`, `Remove Tag`])
    await authorized.clickListRow(0, 1)
    await authorized.hasText(tagName)
})

test(`@AccountImage @Authorized Check API keys creation`, async ({ authorized }) => {
    await authorized.openAccount()
    await authorized.selectAPIKeysTab()
    const keyName = faker.random.alphaNumeric(8)
    await authorized.addAPIKey(keyName)
    await authorized.checkListRow(0, [keyName, `-`, `Remove`, `Edit`])
    // TODO: check key perms by using it?
})

test(`@AccountImage @Authorized Check public tags creation`, async ({ authorized }) => {
    const {
        TestTokenAddress, TestNFTAddress,
    } = process.env
    await authorized.openAccount()
    await authorized.selectPublicTagsTab()
    const tagName1 = faker.random.alphaNumeric(8)
    const tagName2 = faker.random.alphaNumeric(8)
    await authorized.addPublicTag({
        myProjectCheckBox: true,
        tagsString: `${tagName1};${tagName2}`,
        addresses: [TestTokenAddress, TestNFTAddress],
        description: `skldfhskdjfha`,
    } as PublicTagSpec)
    await authorized.checkListRow(0, [[tagName1, tagName2], TestTokenAddress])
    // TODO: how to approve it now?
})
