/* eslint-disable dot-notation */
import test from '@lib/BaseTest'
import { faker } from '@faker-js/faker'
import { PublicTagSpec, WatchListSpec } from '@pages/Login'

test.describe.configure({ mode: `parallel` })

// auth bug with frontend
test.skip(`@AccountImage @Authorized @SignUp Sign up`, async ({ commonPage }) => {
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
    await authorized.check_tag_list(0, 0, TestTokenAddress)
    await authorized.check_tag_list(0, 1, tagName)
    await authorized.actions.verifyElementIsDisplayed(`text=${tagName} >> nth=1`, `failed to find text on the page`)
    await authorized.actions.focusElement(`text=${TestTokenAddress} >> nth=1`)
    await authorized.actions.clickElement(`text=${TestTokenAddress} >> nth=1`)
    await authorized.actions.verifyElementIsDisplayed(`text=${tagName} >> nth=1`, `failed to find text on the page`)

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
    await authorized.check_tag_list(0, 0, TestTokenDeployTXHash.toLowerCase())
    await authorized.check_tag_list(0, 1, tagName)
    await authorized.page.click(`text=${TestTokenDeployTXHash} >> nth=1`)
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
    await authorized.check_tag_list(0, 0, keyName)
    await authorized.deleteRow()
    // TODO: check key perms by using it?
})

test.skip(`@AccountImage @Authorized Check public tags creation`, async ({ authorized }) => {
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
    await authorized.check_tag_list(0, 0, TestTokenAddress)
    await authorized.check_tag_list(0, 0, TestNFTAddress)
    await authorized.check_tag_list(0, 1, tagName1)
    await authorized.check_tag_list(0, 1, tagName2)

    await authorized.deleteRow()
})
