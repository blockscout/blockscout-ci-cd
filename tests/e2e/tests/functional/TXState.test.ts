import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test.skip(`@Etherscan TXState change`, async ({ context, newHomeMainDev }) => {
    await newHomeMainDev.open_state_change(`0xb477108f6b59899fc9273d59804cbb3c942969e5efbe79597cd48d028bb0abe3`)
    await newHomeMainDev.assert_row(1, `validator0x3D...29C47.410493964555978776 ETH7.410971663555978776 ETH + 0.000477699`)
    await newHomeMainDev.assert_row(2, `0xe5...33320.25000008 ETH0.25000016 ETH + 0.00000008`)
    await newHomeMainDev.assert_row(3, `0xEA...8fA20.263127014423758667 ETH0.212335269159520705 ETH - 0.050791745264237962`)
    await newHomeMainDev.assert_row(4, `0xEA...8fA2750,000 USDC250,000 USDC - 500,000`)
    await newHomeMainDev.assert_row(5, `0xeF...319b36,772,729,461,999,090 USDC36,772,729,462,499,090 USDC + 500,000`)
})
