import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test(`@Smoke Eth main page components`, async ({ context, ethHomePage }) => {
    await ethHomePage.open()
    await ethHomePage.checkIndexing()
    await ethHomePage.check_heaader()
    await ethHomePage.check_blocks_widget()
})

test(`@AccountImage @Main Check network options are present`, async ({ newHomePage }) => {
    await newHomePage.open()
    await newHomePage.check_network_menu()
})
