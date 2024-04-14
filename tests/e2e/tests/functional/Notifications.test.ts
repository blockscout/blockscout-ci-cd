/* eslint-disable dot-notation */
import test from '@lib/BaseTest'
import { faker } from '@faker-js/faker'
import { WatchListSpec } from '@pages/Login'
import { MatchOptionFieldEnum, MatchOptionShouldEnum } from 'mailslurp-client'
import { expect } from "@playwright/test"
import { TestToken } from '../../../contracts/typechain/contracts/TestToken'
import { TestNFT } from '../../../contracts/typechain/contracts/TestNFT'

const emailTimeout = 30000

test(`@AccountImage @Notifications Check notification received on Ether transfer`, async ({ authorized }) => {
    await authorized.openWatchlist()
    const recipient = authorized.contracts.newWallet()
    console.log(`created recipient address: ${recipient.address}`)

    const watchName = faker.random.alphaNumeric(8)

    await authorized.addAddressWatch({
        address: recipient.address.toLowerCase(),
        name: watchName,
    } as WatchListSpec)
    await authorized.checkNotificationItem()
    console.log(`sending Ether to recipient`)
    await authorized.contracts.sendEther(recipient.address, `0.01`)
    console.log(`awaiting blockscout indexing`)
    await authorized.delay(30000)

    const emailResult = await authorized.ms.waitForMatchingEmails(
        { matches: [{ field: MatchOptionFieldEnum.SUBJECT, should: MatchOptionShouldEnum.CONTAIN, value: watchName }] },
        1,
        process.env.MAILSLURP_EMAIL_ID,
        emailTimeout,
    )
    console.log(`Received email: ${JSON.stringify(emailResult)}`)
    expect(emailResult[0].subject).toContain(`[Address Watch Alert] 0.01 ETH received at ${recipient.address.toLowerCase()} ${watchName}`)
    expect(emailResult[0].from).toContain(`noreply@blockscout.com`)
    await authorized.deleteAddressWatch()
})

test(`@AccountImage @Notifications Check notification received on ERC20 transfer`, async ({ authorized }) => {
    const { TestTokenAddress } = process.env
    await authorized.openWatchlist()

    const token = await authorized.contracts.loadContract(`TestToken`, TestTokenAddress) as TestToken
    const recipient = authorized.contracts.newWallet()
    console.log(`created recipient address: ${recipient.address}`)

    const watchName = faker.random.alphaNumeric(8)

    await authorized.addAddressWatch({
        address: recipient.address.toLowerCase(),
        name: watchName,
    } as WatchListSpec)
    await authorized.checkNotificationItem()
    console.log(`sending ERC20 tokens to recipient`)
    const receipt = await (await token.transfer(recipient.address, 1)).wait()
    console.log(`receipt: ${JSON.stringify(receipt)}`)
    console.log(`awaiting blockscout indexing`)
    await authorized.delay(30000)

    const emailResult = await authorized.ms.waitForMatchingEmails(
        { matches: [{ field: MatchOptionFieldEnum.SUBJECT, should: MatchOptionShouldEnum.CONTAIN, value: watchName }] },
        1,
        process.env.MAILSLURP_EMAIL_ID,
        emailTimeout,
    )
    console.log(`Received email: ${JSON.stringify(emailResult)}`)
    expect(emailResult[0].subject).toContain(`[Address Watch Alert] 0.000000000000000001 EPIC received at ${recipient.address.toLowerCase()} ${watchName}`)
    expect(emailResult[0].from).toContain(`noreply@blockscout.com`)
    await authorized.deleteAddressWatch()
})

test.skip(`@AccountImage @Notifications Check notification received on NFT transfer`, async ({ authorized }) => {
    const { TestNFTAddress, TestTokenHolder } = process.env
    await authorized.openWatchlist()

    const nft = await authorized.contracts.loadContract(`TestNFT`, TestNFTAddress) as TestNFT
    const recipient = authorized.contracts.newWallet()
    console.log(`created recipient address: ${recipient.address}`)

    const watchName = faker.random.alphaNumeric(8)

    await authorized.addAddressWatch({
        address: recipient.address.toLowerCase(),
        name: watchName,
    } as WatchListSpec)
    await authorized.checkNotificationItem()
    await authorized.delay(5000)
    // const receipt = await (await nft.transferOwnership(recipient.address)).wait()
    // console.log(`transferred ownership: ${JSON.stringify(receipt)}`)
    const receipt = await (await nft.mintNFT(recipient.address, watchName)).wait()
    console.log(`minted new token for recipient: ${JSON.stringify(receipt)}`)

    const emailResult = await authorized.ms.waitForMatchingEmails(
        { matches: [{ field: MatchOptionFieldEnum.SUBJECT, should: MatchOptionShouldEnum.CONTAIN, value: watchName }] },
        1,
        process.env.MAILSLURP_EMAIL_ID,
        emailTimeout,
    )
    expect(emailResult[0].subject).toContain(`[Address Watch Alert] 0.000000000000000001 NFT received at ${recipient} ${watchName}`)
    expect(emailResult[0].from).toContain(`noreply@blockscout.com`)
    console.log(`Received email: ${JSON.stringify(emailResult)}`)
})
