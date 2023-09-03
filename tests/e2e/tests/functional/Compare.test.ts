/* eslint-disable guard-for-in */
/* eslint-disable dot-notation */
import test from '@lib/BaseTest'
import {
    RequestBlocksData,
    RequestTransactionsData,
    compareAndPrintBalances,
    compareAndPrintBlocks,
    compareAndPrintTxs,
} from '@lib/Format'

test.describe.configure({ mode: `parallel` })

const topEOAs = [
    `0x242ba6d68FfEb4a098B591B32d370F973FF882B7`,
    `0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2`,
    `0xbEb5Fc579115071764c7423A4f12eDde41f106Ed`,
    `0x00000000219ab540356cBB839Cbe05303d7705Fa`,
    `0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8`,
    `0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf`,
    `0x40B38765696e3d5d8d9d834D8AaD4bB6e418E489`,
    `0x8315177aB297bA92A06054cE80a67Ed4DBd7ed3a`,
    `0xF977814e90dA44bFA03b6295A0616a897441aceC`,
    `0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503`,
    `0xE92d1A43df510F82C66382592a047d288f85226f`,
    `0xC61b9BB3A7a0767E3179713f3A5c7a9aeDCE193C`,
    `0x61EDCDf5bb737ADffE5043706e7C5bb1f1a56eEA`,
    `0xDf9Eb223bAFBE5c5271415C75aeCD68C21fE3D7F`,
    `0xcA8Fa8f0b631EcdB18Cda619C4Fc9d197c8aFfCa`,
    `0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe`,
    `0x3BfC20f0B9aFcAcE800D73D2191166FF16540258`,
    `0x8103683202aa8DA10536036EDef04CDd865C225E`,
    `0x78605Df79524164911C144801f41e9811B7DB73D`,
    `0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5`,
    `0x0a4c79cE84202b03e95B7a692E5D728d83C44c76`,
    `0x189B9cBd4AfF470aF2C0102f365FC1823d857965`,
]

test(`@Etherscan Compare address balance`, async ({ ethHomePage, etherscanMainnet }) => {
    const etherscanData = await etherscanMainnet.balance_data(topEOAs)
    const goerliData = await ethHomePage.balance_data(topEOAs)
    compareAndPrintBalances(etherscanData, goerliData)
})

test(`@Etherscan Compare address tokens`, async ({ ethHomePage, etherscanMainnet }) => {
    const etherscanData = await etherscanMainnet.tokens_data(topEOAs)
    const goerliData = await ethHomePage.tokens_data(topEOAs)
    compareAndPrintBalances(etherscanData, goerliData)
})
