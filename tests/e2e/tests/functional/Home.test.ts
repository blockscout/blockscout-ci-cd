import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test(`@Smoke Eth main page components`, async ({ context, ethHomePage }) => {
    await ethHomePage.open()
    await ethHomePage.check_heaader()
    await ethHomePage.check_blocks_widget()
})

test(`@AccountImage @Main Check network options are present`, async ({ newHomePage }) => {
    await newHomePage.open()
    // page activity doesn't stop even after 'load' event, we don't have proper event to wait for
    // then if we click to early page re-renders after that
    // await newHomePage.delay(10000)
    await newHomePage.check_network_menu()
})
