import test from '@lib/BaseTest'

test(`@Smoke Can open the main page and verify components`, async ({ context, ethHomePage, gnosisHomePage }) => {
    await test.step(`Check ETH main page`, async () => {
        await ethHomePage.open()
        await ethHomePage.verifyComponents(context)
    })
    await test.step(`Check Gnosis main page`, async () => {
        await gnosisHomePage.open()
        await gnosisHomePage.verifyComponents(context)
    })
})
