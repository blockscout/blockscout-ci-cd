/* eslint-disable dot-notation */
import test from '@lib/BaseTest'
import { faker } from '@faker-js/faker'
import { PublicTagSpec, WatchListSpec } from '@pages/Login'

test.describe.configure({ mode: `parallel` })

test(`@AccountImage @Authorized @SignUp Sign up`, async ({ commonPage }) => {
    const randomEmail = faker.internet.email()
    const securePwd = `sa1djfhSKDJFH28372!@#`
    await commonPage.signUp(randomEmail, securePwd)
    await commonPage.isSignedIn()
})

test(`@AccountImage @Authorized Check profile info`, async ({ authorized }) => {
    await authorized.openAccount()
    await authorized.checkProfile()
})

test(`@AccountImage @Authorized Check address tag`, async ({ authorized }) => {
    const {
        TestTokenAddress,
    } = process.env
    await authorized.openAccount()
    await authorized.selectPrivateTagsTab()
    await authorized.selectAddressTagTab()
    const tagName = faker.random.alphaNumeric(8)
    await authorized.addAddressTag(TestTokenAddress, tagName)
    await authorized.delay(3000)
    await authorized.checkListRow(0, [TestTokenAddress.toLowerCase(), tagName])
    await authorized.hasText(tagName)
    await authorized.page.click(`text=${TestTokenAddress}`)
    await authorized.hasText(tagName)

    await authorized.openAccount()
    await authorized.selectPrivateTagsTab()
    await authorized.selectAddressTagTab()
    await authorized.deleteRow()
})

test(`@AccountImage @Authorized Check transaction tag`, async ({ authorized }) => {
    const {
        TestTokenDeployTXHash,
    } = process.env
    await authorized.openAccount()
    await authorized.selectPrivateTagsTab()
    await authorized.selectTXTagTab()
    const tagName = faker.random.alphaNumeric(8)
    await authorized.addTXTag(TestTokenDeployTXHash, tagName)
    await authorized.checkListRow(0, [TestTokenDeployTXHash.toLowerCase(), tagName])
    await authorized.page.click(`text=${TestTokenDeployTXHash}`)
    await authorized.hasText(tagName)

    await authorized.openAccount()
    await authorized.selectPrivateTagsTab()
    await authorized.selectTXTagTab()
    await authorized.deleteRow()
})

test(`@AccountImage @Authorized Check API keys creation`, async ({ authorized }) => {
    await authorized.openAccount()
    await authorized.selectAPIKeysTab()
    const keyName = faker.random.alphaNumeric(8)
    await authorized.addAPIKey(keyName)
    await authorized.checkListRow(0, [keyName])
    await authorized.deleteRow()
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
        name: `my_public_tag`,
        email: `sff2f@gmail.com`,
        companyName: `QQQ LLC`,
        companyWebSite: `https://qqq.llc.com`,
        tags: [tagName1, tagName2],
        addresses: [TestTokenAddress, TestNFTAddress],
        description: `skldfhskdjfha`,
    } as PublicTagSpec)
    await authorized.checkListRow(0, [[TestTokenAddress.toLowerCase(), TestNFTAddress.toLowerCase()], [tagName1, tagName2]])

    await authorized.deleteRow()
})
