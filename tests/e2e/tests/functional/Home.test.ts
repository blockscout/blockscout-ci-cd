import test from '@lib/BaseTest'

test(`@Smoke Can open the main page and verify components`, async ({ context, homePage }) => {
    await test.step(`Check ETH main page`, async () => {
        await homePage.open()
        await homePage.verifyComponents(context)
    })
})
