/* eslint-disable dot-notation */
import { faker } from '@faker-js/faker'
import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

// test(`@Admin Delete/Create TokenInfo`, async ({ adminPage }) => {

// })

test(`@Admin Delete/Create SuperSubmission`, async ({ tokenPage, newHomeGoerli, adminPage }) => {
    await adminPage.open()
    await adminPage.login(process.env.ACCOUNT_USERNAME, process.env.ACCOUNT_PASSWORD)
    await adminPage.selectSuperUserTab()
    await adminPage.selectSuperUserTabSubmissions()
    await adminPage.clearMySubmissions(process.env.ACCOUNT_USERNAME)
    const iconURL = `https://cdn-icons-png.flaticon.com/128/2989/2989898.png`
    const uniqueSupportURL = faker.random.alphaNumeric(8)
    const tokenAddr = `0xcf2195871809ea72ad11ff8549e8483a0be672a9`
    await adminPage.createNewAdminSubmission({
        ChainID: `5`,
        TokenAddress: tokenAddr,
        BlockscoutUserEmail: process.env.ACCOUNT_USERNAME,
        RequesterName: `test_submission_user`,
        RequesterEmail: process.env.ACCOUNT_USERNAME,
        ProjectName: `test_project`,
        ProjectWebSite: `https://ya.ru`,
        IconURL: iconURL,
        ProjectEmail: process.env.ACCOUNT_USERNAME,
        ProjectSector: `DeFi`,
        Comment: `comment`,
        Docs: `docs`,
        Github: iconURL,
        Telegram: iconURL,
        Linkedin: iconURL,
        Discord: iconURL,
        Slack: iconURL,
        Twitter: iconURL,
        OpenSea: iconURL,
        Facebook: iconURL,
        Medium: iconURL,
        Reddit: iconURL,
        Support: uniqueSupportURL,
        CMCTickerURL: iconURL,
        CGTickerURL: iconURL,
        LlamaTickerURL: iconURL,
    })
    await adminPage.filterMySubmissions(process.env.ACCOUNT_USERNAME)
    await adminPage.selectFirstSubmission()
    await adminPage.openSubmissions()
    await adminPage.selectTokenServicesTab()
    await adminPage.selectTODOSubmissions()
    await adminPage.selectFirstSubmission()
    await adminPage.approve()
    await adminPage.delay(2000)
    await newHomeGoerli.openAddress(tokenAddr)
    await tokenPage.selectProjectInfo()
    await tokenPage.actions.verifyElementIsDisplayed(`text=${uniqueSupportURL}`)
})
