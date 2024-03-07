/* eslint-disable dot-notation */
import { faker } from '@faker-js/faker'
import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test(`@Admin Delete/Create SuperSubmission`, async ({ tokenPage, newHomeGoerli, adminPage }) => {
    adminPage.setBaseURL(`https://admin.services.blockscout.com`)
    await adminPage.open()
    await adminPage.login(process.env.ACCOUNT_USERNAME, process.env.ACCOUNT_PASSWORD)
    await adminPage.selectSuperUserTab()
    await adminPage.selectSuperUserTabSubmissions()
    await adminPage.clearMySubmissions(process.env.ACCOUNT_USERNAME)
    await adminPage.closeFilterPanel()
    const iconURL = `https://cdn-icons-png.flaticon.com/128/2989/2989898.png`
    const uniqueSupportURL = faker.random.alphaNumeric(8)
    const tokenAddr = `0xcf2195871809ea72ad11ff8549e8483a0be672a9`
    await adminPage.createNewAdminSubmission({
        ChainID: `Goerli`,
        TokenAddress: tokenAddr,
        BlockscoutUserEmail: process.env.ACCOUNT_USERNAME,
        RequesterName: `test_submission_user`,
        RequesterEmail: process.env.ACCOUNT_USERNAME,
        ProjectName: `test_project`,
        ProjectWebSite: `https://ya.ru`,
        IconURL: iconURL,
        ProjectDescription: `desc`,
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
    await adminPage.filterByEmail(process.env.ACCOUNT_USERNAME)
    await adminPage.selectFirstSubmission()
    await adminPage.openSubmissions()
    await adminPage.selectTokenServicesTab()
    await adminPage.selectTODOSubmissions()
    await adminPage.filterByEmail(process.env.ACCOUNT_USERNAME)
    await adminPage.selectLastSubmissionSorted()
    await adminPage.approve()
    await adminPage.delay(10000)

    await newHomeGoerli.openAddress(tokenAddr)
    await tokenPage.selectProjectInfo()
    await tokenPage.actions.verifyElementIsDisplayed(`text=${uniqueSupportURL}`)
})

test(`@Admin Delete/Create TokenInfo`, async ({ newHomeGoerli, tokenPage, adminPage }) => {
    adminPage.setBaseURL(`https://admin.services.blockscout.com`)
    await adminPage.open()
    await adminPage.login(process.env.ACCOUNT_USERNAME, process.env.ACCOUNT_PASSWORD)
    await adminPage.selectTokenServicesTab()
    await adminPage.selectTokenInfosTab()
    const iconURL = `https://cdn-icons-png.flaticon.com/128/2989/2989898.png`
    const uniqueSupportURL = faker.random.alphaNumeric(8)
    const tokenAddr = `0xdd73477aa8cbb4210799b90c82539947e3d21b6a`

    await adminPage.clearTokenInfo(tokenAddr)
    await adminPage.closeFilterPanel()

    await adminPage.createNewTokenInfo({
        IsUserSubmitted: true,
        ChainID: `Goerli`,
        TokenAddress: tokenAddr,
        BlockscoutUserEmail: process.env.ACCOUNT_USERNAME,
        RequesterName: `test_submission_user`,
        ProjectName: `test_project`,
        ProjectWebSite: `https://ya.ru`,
        ProjectDescription: `desc`,
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

    await newHomeGoerli.openAddress(tokenAddr)
    await newHomeGoerli.delay(3000)
    await tokenPage.selectProjectInfo()
    await tokenPage.actions.verifyElementIsDisplayed(`text=${uniqueSupportURL}`)
})
