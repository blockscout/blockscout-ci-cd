import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test(`TXState change`, async ({ context, newHomeMainDev }) => {
    await newHomeMainDev.open()
})
