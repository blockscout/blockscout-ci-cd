/* eslint-disable dot-notation */
import test from '@lib/BaseTest'
import { faker } from '@faker-js/faker'
import { PublicTagSpec, WatchListSpec } from '@pages/Login'

test.describe.configure({ mode: `parallel` })

const checkAddressTag = async (authorized) => {
    console.log(`Checking address tag creation..`)
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
    await authorized.actions.verifyElementIsDisplayed(`text=${tagName} >> nth=0`, `failed to find text on the page`)

    await authorized.openAccount()
    await authorized.selectPrivateTagsTab()
    await authorized.selectAddressTagTab()
    await authorized.deleteRow()
}

const checkTxTag = async (authorized) => {
    console.log(`Checking tx tag creation..`)
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
}

const checkAPIKey = async (authorized) => {
    console.log(`Checking API key creation..`)
    await authorized.openAccount()
    await authorized.selectAPIKeysTab()
    const keyName = faker.random.alphaNumeric(8)
    await authorized.addAPIKey(keyName)
    await authorized.check_tag_list(0, 0, keyName)
    await authorized.deleteRow()
}

test.skip(`@AccountImage @Authorized Check all authorized functionality`, async ({ authorized }) => {
    const { ACCOUNT_USERNAME } = process.env
    await authorized.open({ timeout: 90000 })
    await authorized.signIn(ACCOUNT_USERNAME)
    await authorized.openAccount()
    await authorized.checkProfile()
    await checkAddressTag(authorized)
    await checkTxTag(authorized)
    await checkAPIKey(authorized)
})
