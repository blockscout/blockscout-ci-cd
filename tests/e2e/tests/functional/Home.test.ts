import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test(`@Smoke Eth main page components`, async ({ context, ethHomePage }) => {
    await ethHomePage.open()
    await ethHomePage.verifyComponents(context)
})

test(`@Smoke Gnosis main page components`, async ({ context, gnosisHomePage }) => {
    await gnosisHomePage.open()
    await gnosisHomePage.verifyComponents(context)
})

test(`@Smoke Gnosis Optimism main page components`, async ({ context, gnosisOptimismHomePage }) => {
    await gnosisOptimismHomePage.open()
    await gnosisOptimismHomePage.verifyComponents(context)
})
