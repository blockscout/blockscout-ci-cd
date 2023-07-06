/* eslint-disable dot-notation */
import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test(`@AccountImage @AAdmin Delete/Create TokenInfo`, async ({ adminPage }) => {

})

test(`@AccountImage @Admin Delete/Create SuperSubmission`, async ({ adminPage }) => {
    await adminPage.open()
    await adminPage.login(process.env.ACCOUNT_USERNAME, process.env.ACCOUNT_PASSWORD)
    await adminPage.selectSuperUserTab()
    await adminPage.selectSuperUserTabSubmissions()
    await adminPage.clearMySubmissions(process.env.ACCOUNT_USERNAME)
    const iconURL = `https://cdn-icons-png.flaticon.com/128/2989/2989898.png`
    await adminPage.createNewAdminSubmission({
        ChainID: `5`,
        TokenAddress: `0xcf2195871809ea72ad11ff8549e8483a0be672a9`,
        BlockscoutUserEmail: process.env.ACCOUNT_USERNAME,
        RequesterName: `test_submission_user`,
        RequesterEmail: process.env.ACCOUNT_USERNAME,
        ProjectName: `test_project`,
        ProjectWebSite: `https://ya.ru`,
        IconURL: iconURL,
        ProjectDescription: `description`,
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
        Support: iconURL,
        CMCTickerURL: iconURL,
        CGTickerURL: iconURL,
        LlamaTickerURL: iconURL,
    })
    await adminPage.filterMySubmissions(process.env.ACCOUNT_USERNAME)
    await adminPage.selectFirstSubmission()
})
