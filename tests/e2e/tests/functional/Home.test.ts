import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test(`@Smoke Eth main page components`, async ({ context, ethHomePage }) => {
    await ethHomePage.open()
    await ethHomePage.check_heaader()
    await ethHomePage.check_blocks_widget()
})
