import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test(`@Rollup Eth main page components`, async ({ context, newHomeMainDev }) => {
    await newHomeMainDev.open()
    await ethHomePage.verifyComponents(context)
})
