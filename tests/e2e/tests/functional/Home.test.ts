import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test(`@AccountImage @Main Check network options are present`, async ({ newHomePage }) => {
    await newHomePage.open()
    await newHomePage.delay(1000)
    await newHomePage.check_network_menu()
})
