/* eslint-disable dot-notation */
import { faker } from '@faker-js/faker'
import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

const envURL = `https://admin-ts-test.k8s-dev.blockscout.com`

test.beforeEach(async ({ adminPage }) => {
    adminPage.setBaseURL(envURL)
    await adminPage.open()
    await adminPage.login(process.env.ADMIN_ACCOUNT_USERNAME, process.env.ADMIN_ACCOUNT_PASSWORD)
})

test(`@Admin Delete/Create SuperSubmission`, async ({ tokenPage, newHomeGoerli, adminPage }) => {
    await adminPage.selectSuperUserTab()
    await adminPage.selectSuperUserTabSubmissions()
    await adminPage.clearMySubmissions(process.env.ADMIN_ACCOUNT_USERNAME)
    await adminPage.closeFilterPanel()
    const iconURL = `https://cdn-icons-png.flaticon.com/128/2989/2989898.png`
    const uniqueSupportURL = faker.random.alphaNumeric(8)
    const tokenAddr = `0xcf2195871809ea72ad11ff8549e8483a0be672a9`
    await adminPage.createNewAdminSubmission({
        ChainID: `Goerli`,
        TokenAddress: tokenAddr,
        BlockscoutUserEmail: process.env.ADMIN_ACCOUNT_USERNAME,
        RequesterName: `test_submission_user`,
        RequesterEmail: process.env.ADMIN_ACCOUNT_USERNAME,
        ProjectName: uniqueSupportURL,
        ProjectWebSite: `https://ya.ru`,
        IconURL: iconURL,
        ProjectDescription: `desc`,
        ProjectEmail: process.env.ADMIN_ACCOUNT_USERNAME,
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
        BlockscoutUserEmail: process.env.ADMIN_ACCOUNT_USERNAME,
        RequesterName: `test_submission_user`,
        ProjectName: `test_project`,
        ProjectWebSite: `https://ya.ru`,
        ProjectDescription: `desc`,
        IconURL: iconURL,
        ProjectEmail: process.env.ADMIN_ACCOUNT_USERNAME,
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

test(`@Admin Create Public tag, bind to address and check`, async ({ adminPage, newHomePage }) => {
    const bindAddress = `0x7cF5b79bfe291A67AB02b393E456cCc4c266F753`
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
    await adminPage.delay(1000)

    await adminPage.actions.clickElement(`text=/Address Public Tags/`)
    await adminPage.delay(1000)
    await adminPage.actions.clickElement(`section >> nth=5 >> text=/Create new/`)
    await adminPage.actions.clickElement(`section >> nth=5 >> input >> nth=0`)
    await adminPage.actions.clickElement(`text=/Sepolia/`)
    await adminPage.actions.enterElementText(`section >> nth=5 >> input >> nth=1`, bindAddress)
    await adminPage.delay(1000)
    await adminPage.actions.clickElement(`section >> nth=5 >> text=/0x/ >> nth=1`)
    await adminPage.actions.enterElementText(`section >> nth=5 >> input >> nth=2`, publicTag)
    await adminPage.delay(1000)
    await adminPage.actions.clickElement(`section >> nth=5 >> text=/${publicTag}/ >> nth=1`)
    await adminPage.delay(1000)
    await adminPage.actions.clickElement(`section >> nth=5 >> text=/Save/`)

    await newHomePage.open_custom(`https://eth-sepolia.k8s-dev.blockscout.com/address/${bindAddress}`)
    await newHomePage.actions.verifyElementIsDisplayed(`text=/${publicTag}/`)

    await adminPage.open()
    await adminPage.login(process.env.ADMIN_ACCOUNT_USERNAME, process.env.ADMIN_ACCOUNT_PASSWORD)

    await adminPage.actions.clickElement(`section >> nth=1 >> text=/^Public Tags/`)
    await adminPage.filterByInputRef(`filter-name`, publicTag)
    await adminPage.delay(3000)
    await adminPage.selectFirstListElement()
    await adminPage.delay(3000)
    await adminPage.actions.verifyElementIsDisplayed(`text=/${publicTag}/`)
    await adminPage.actions.clickElement(`section >> nth=5 >> text=/Delete/`)
    await adminPage.delay(3000)
    await adminPage.actions.clickElement(`button[label="Confirm"]`)
    await adminPage.page.waitForLoadState(`networkidle`)
})
