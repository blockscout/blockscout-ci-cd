/* eslint-disable dot-notation */
import test from '@lib/BaseTest'
import { BlockDescriptionProps } from '@pages/Blocks'

test(`@Ethereum @Blocks @Data @k8s Blocks cheks`, async ({
    blocksPage,
}) => {
    await test.step(`Check contract creation props`, async () => {
        await blocksPage.open(process.env.DATA_TX_1_BLOCK_NUMBER)
        await blocksPage.check_block_description({
            blockHeight: [`Block Height`],
        } as BlockDescriptionProps)
    })
})
