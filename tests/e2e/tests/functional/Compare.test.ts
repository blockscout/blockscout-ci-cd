/* eslint-disable dot-notation */
import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

test.skip(`@Ethereum @AccountImage Compare address tokens to Etherscan`, async ({ addressPage, etherscanPage }) => {
    const data = [{
        addr: `0x3475b84d7f2c3a183b718351e5eb925f80f35724`,
    }]
    const etherscanData = await etherscanPage.address_data(data[0].addr)
    console.log(`Etherscan data: ${JSON.stringify(etherscanData)}`)
    // await addressPage.open(data[0].addr)
    // await addressPage.check_address_description()
    // await addressPage.check_tx_in_list()
    // await addressPage.select_logs_tab()
    // await addressPage.check_tx_logs()
})
