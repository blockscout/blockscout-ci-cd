/* eslint-disable dot-notation */
import test from '@lib/BaseTest'
import { faker } from '@faker-js/faker'
import { WatchListSpec } from '@pages/Login'
import { MatchOptionFieldEnum, MatchOptionShouldEnum } from 'mailslurp-client'
import { TestToken } from '../../../contracts/typechain/contracts/TestToken'
import { TestNFT } from '../../../contracts/typechain/contracts/TestNFT'

const emailTimeout = 30000

test(`@Notifications Check notification received on Ether transfer`, async ({ authorized }) => {
    const { TestTokenAddress } = process.env
    await authorized.openAccount()

    const token = await authorized.contracts.loadContract(`TestToken`, TestTokenAddress) as TestToken
    const recipient = authorized.contracts.newWallet()
    console.log(`created recipient address: ${recipient.address}`)

    const watchName = faker.random.alphaNumeric(8)

    await authorized.addAddressWatch({
        address: recipient.address.toLowerCase(),
        name: watchName,
    } as WatchListSpec)
    await authorized.check_tag_list(0, 0, watchName)
    await authorized.check_tag_list(0, 1, `0x`)
    await authorized.check_tag_list(0, 1, `(N/A)`)
    await authorized.check_tag_list(0, 1, `Edit`)
    await authorized.delay(5000)
    await authorized.contracts.sendEther(recipient.address, `0.01`)

    await authorized.ms.waitForMatchingEmails(
        { matches: [{ field: MatchOptionFieldEnum.SUBJECT, should: MatchOptionShouldEnum.CONTAIN, value: watchName }] },
        1,
        process.env.MAILSLURP_EMAIL_ID,
        emailTimeout,
    )
})

test.skip(`@Notifications Check notification received on ERC20 transfer`, async ({ authorized }) => {
    const { TestTokenAddress } = process.env
    await authorized.openAccount()

    const token = await authorized.contracts.loadContract(`TestToken`, TestTokenAddress) as TestToken
    const recipient = authorized.contracts.newWallet()
    console.log(`created recipient address: ${recipient.address}`)

    const watchName = faker.random.alphaNumeric(8)

    await authorized.addAddressWatch({
        address: recipient.address.toLowerCase(),
        name: watchName,
    } as WatchListSpec)
    await authorized.check_tag_list(0, 0, watchName)
    await authorized.check_tag_list(0, 1, `0x`)
    await authorized.check_tag_list(0, 1, `(N/A)`)
    await authorized.check_tag_list(0, 1, `Edit`)
    await authorized.delay(5000)
    const receipt = await (await token.transfer(recipient.address, 1)).wait()
    console.log(`receipt: ${JSON.stringify(receipt)}`)

    await authorized.ms.waitForMatchingEmails(
        { matches: [{ field: MatchOptionFieldEnum.SUBJECT, should: MatchOptionShouldEnum.CONTAIN, value: watchName }] },
        1,
        process.env.MAILSLURP_EMAIL_ID,
        emailTimeout,
    )
})

test.skip(`@Notifications Check notification received on NFT transfer`, async ({ authorized }) => {
    const { TestNFTAddress } = process.env
    await authorized.openAccount()

    const nft = await authorized.contracts.loadContract(`TestNFT`, TestNFTAddress) as TestNFT
    const recipient = authorized.contracts.newWallet()
    console.log(`created recipient address: ${recipient.address}`)

    const watchName = faker.random.alphaNumeric(8)

    await authorized.addAddressWatch({
        address: recipient.address.toLowerCase(),
        name: watchName,
    } as WatchListSpec)
    await authorized.check_tag_list(0, 0, watchName)
    await authorized.check_tag_list(0, 1, `0x`)
    await authorized.check_tag_list(0, 1, `(N/A)`)
    await authorized.check_tag_list(0, 1, `Edit`)
    await authorized.delay(5000)
    const receipt = await (await nft.transferOwnership(recipient.address)).wait()
    console.log(`receipt: ${JSON.stringify(receipt)}`)

    await authorized.ms.waitForMatchingEmails(
        { matches: [{ field: MatchOptionFieldEnum.SUBJECT, should: MatchOptionShouldEnum.CONTAIN, value: watchName }] },
        1,
        process.env.MAILSLURP_EMAIL_ID,
        emailTimeout,
    )
})
