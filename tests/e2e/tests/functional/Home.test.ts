import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test(`@Smoke Eth main page components`, async ({ context, ethHomePage }) => {
    await test.step(`Check ETH main page`, async () => {
        await ethHomePage.open()
        await ethHomePage.verifyComponents(context)
    })
})

test(`@Smoke Gnosis main page components`, async ({ context, gnosisHomePage }) => {
    await test.step(`Check Gnosis main page`, async () => {
        await gnosisHomePage.open()
        await gnosisHomePage.verifyComponents(context)
    })
})

test(`@Smoke Gnosis Optimism main page components`, async ({ context, gnosisOptimismHomePage }) => {
    await test.step(`Check Gnosis Optimism main page`, async () => {
        await gnosisOptimismHomePage.open()
        await gnosisOptimismHomePage.verifyComponents(context)
    })
})
