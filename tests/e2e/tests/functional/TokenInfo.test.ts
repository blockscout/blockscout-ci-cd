import test from '@lib/BaseTest'
import { faker } from '@faker-js/faker'

test.describe.configure({ mode: `parallel` })

test(`@Verification Can update token info for a static verified address`, async ({ authorized, adminPage, tokenPage }) => {
    const iconURL = `https://cdn-icons-png.flaticon.com/128/2989/2989898.png`
    const uniqueSupportURL = `https://${faker.random.alpha(8)}.com`
    await authorized.open()
    await authorized.openVerifiedAddresses()
    await authorized.addAddressDetails({
        requesterName: `qqq`,
        requesterEmail: `blockscouttest@blockscout.com`,
        projectName: `qqq`,
        projectEmail: `blockscouttest@blockscout.com`,
        projectWebsite: `https://ya.ru`,
        docs: `https://ya.ru`,
        support: uniqueSupportURL,
        iconURL,
        projectDescription: `My test project`,
    })
    adminPage.setBaseURL(`https://admin-ts-test.k8s-dev.blockscout.com`)
    await adminPage.open()
    await adminPage.login(process.env.ACCOUNT_USERNAME, process.env.ACCOUNT_PASSWORD)
    await adminPage.openSubmissions()
    await adminPage.selectTokenServicesTab()
    await adminPage.selectTODOSubmissions()
    await adminPage.approveTestUserSubmission(process.env.ACCOUNT_USERNAME)
    await tokenPage.open(`0xE75e556d685D7428C8242eaF331A5eF80FCACa1f`)
    await tokenPage.selectProjectInfo()
    await tokenPage.verifyProjectInfo(uniqueSupportURL)
})
