/* eslint-disable dot-notation */
import { faker } from '@faker-js/faker'
import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

const envURL = `https://admin-ts-test.k8s-dev.blockscout.com`

test.beforeEach(async ({ adminPage }) => {
    adminPage.setBaseURL(envURL)
    await adminPage.open()
    await adminPage.login(process.env.ACCOUNT_USERNAME, process.env.ACCOUNT_PASSWORD)
})

test(`@Admin Delete/Create SuperSubmission`, async ({ tokenPage, newHomeGoerli, adminPage }) => {
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
        ProjectName: uniqueSupportURL,
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
    await adminPage.filterByEmailProjectName(uniqueSupportURL)
    await adminPage.selectFirstListElement()
    await adminPage.openSubmissions()
    await adminPage.selectTokenServicesTab()
    await adminPage.selectTODOSubmissions()
    await adminPage.filterByEmailProjectName(uniqueSupportURL)
    await adminPage.selectFirstListElement()
    await adminPage.approve()
    // await adminPage.delay(10000)

    // await newHomeGoerli.openAddress(tokenAddr)
    // await tokenPage.selectProjectInfo()
    // await tokenPage.actions.verifyElementIsDisplayed(`text=${uniqueSupportURL}`)
})

test(`@Admin Delete/Create TokenInfo`, async ({ newHomeGoerli, tokenPage, adminPage }) => {
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

    // await newHomeGoerli.openAddress(tokenAddr)
    // await newHomeGoerli.delay(3000)
    // await tokenPage.selectProjectInfo()
    // await tokenPage.actions.verifyElementIsDisplayed(`text=${uniqueSupportURL}`)
})

test.skip(`@Admin Delete/Create Address`, async ({ adminPage }) => {
    const addr = `0x54FA517F05e11Ffa87f4b22AE87d91Cec0C2D7E1`

    await adminPage.actions.clickElement(`section >> nth=1 >> text=/Metadata/`)
    await adminPage.actions.clickElement(`section >> nth=1 >> text=/Addresses/`)

    await adminPage.filterByAddress(addr)
    await adminPage.selectFirstListElement()
    await adminPage.actions.clickElement(`section >> nth=5 >> text=/Delete/`)
    await adminPage.actions.clickElement(`button[label="Confirm"]`)
    await adminPage.closeFilterPanel()

    await adminPage.actions.clickElement(`section >> nth=5 >> text=/Create new/`)
    await adminPage.actions.enterElementText(`input >> nth=0`, addr)
    await adminPage.actions.clickElement(`section >> nth=5 >> text=/Save/`)
})

test(`@Admin Create Public tag`, async ({ adminPage }) => {
    const publicTag = `PlaywrightTestTag`
    const slug = faker.random.alphaNumeric(8)
    await adminPage.actions.clickElement(`section >> nth=1 >> text=/Metadata/`)
    await adminPage.actions.clickElement(`section >> nth=1 >> text=/^Public Tags/`)
    await adminPage.actions.clickElement(`section >> nth=5 >> text=/Create new/`)
    await adminPage.actions.enterElementText(`input[name="name"]`, publicTag)
    await adminPage.actions.enterElementText(`input[name="slug"]`, slug)
    await adminPage.actions.enterElementText(`input[name="ordinal"]`, `0`)
    await adminPage.actions.clickElement(`input[id="react-select-4-input"]`)
    await adminPage.actions.clickElement(`section >> nth=5 >> text=/classifier/ >> nth=1`)
    await adminPage.actions.clickElement(`section >> nth=5 >> text=/Save/`)

    await adminPage.filterByInputRef(`filter-slug`, slug)
    await adminPage.selectFirstListElement()
    await adminPage.actions.clickElement(`section >> nth=5 >> text=/Delete/`)
    await adminPage.actions.clickElement(`button[label="Confirm"]`)
})
