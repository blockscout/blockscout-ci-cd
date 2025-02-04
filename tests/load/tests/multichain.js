import { check, group } from 'k6'
import { randomItem, randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import { SharedArray } from "k6/data"
import { shoot } from './common/gun.js'
import {
    check200, p5, r20, sane, t30,
} from "./common/profile.js"
import { defaultSession } from "./common/common.js"

const testDatas = []

for (let i = 1; i < 15; i += 1) {
    const testFile = new SharedArray(`data${i}`, () => JSON.parse(open(__ENV[`TEST_DATA_FILE_${i}`])))
    testDatas.push(testFile[0])
}

const session = defaultSession()

const authHeaders = {
    'Content-Type': `application/json`,
    "x-quicknode-id": __ENV.QUICKNODE_ID,
    "x-instance-id": __ENV.QUICKNODE_INSTANCE,
}

export const options = {
    scenarios: {
        Eth: Object.assign({}, r20, { exec: `Eth` }),
        Blast: Object.assign({}, r20, { exec: `Blast` }),
        Etherlink: Object.assign({}, r20, { exec: `Etherlink` }),
        Gnosis: Object.assign({}, r20, { exec: `Gnosis` }),
        Neon: Object.assign({}, r20, { exec: `Neon` }),
        Nova: Object.assign({}, r20, { exec: `Nova` }),
        Optimism: Object.assign({}, r20, { exec: `Optimism` }),
        Rootstock: Object.assign({}, r20, { exec: `Rootstock` }),
        Shibarium: Object.assign({}, r20, { exec: `Shibarium` }),
        Zora: Object.assign({}, r20, { exec: `Zora` }),
        Astar: Object.assign({}, r20, { exec: `Astar` }),
        Redstone: Object.assign({}, r20, { exec: `Redstone` }),
        Zkevm: Object.assign({}, r20, { exec: `Zkevm` }),
        Zksyncera: Object.assign({}, r20, { exec: `Zksyncera` }),
        // Zksyncsepolia: Object.assign({}, r20, { exec: `Zksyncsepolia` }),
    },
    thresholds: sane,
}

const callByHash = (dataFile) => group(`bs_getTransactionByHash`, () => {
    console.log(`file: ${JSON.stringify(dataFile.bs_getTransactionByHash[0])}`)
    const data = randomItem(dataFile.bs_getTransactionByHash)
    console.log(`data params: ${JSON.stringify(data.params)}`)
    const res = shoot(session, {
        method: `POST`,
        url: `/rpc`,
        body: JSON.stringify({
            method: `bs_getTransactionByHash`,
            params: data.params,
            id: randomIntBetween(1, 999999),
            jsonrpc: `2.0`,
        }),
        params: {
            headers: authHeaders,
            tags: {
                name: `bs_getTransactionByHash`,
            },
            timeout: t30,
        },
    })
    check(res, check200)
})

// ../bin_k6/k6-tsdb-darwin \
// --env BASE_URL=https://quicknode-marketplace-integration.services.blockscout.com \
// --env QUICKNODE_ID=${QUICKNODE_ID} \
// --env QUICKNODE_INSTANCE=${QUICKNODE_INSTANCE} \
// --env TEST_DATA_FILE_1=data/multichain.json \
// --env TEST_DATA_FILE_2=data/multichain-blast.json \
// --env TEST_DATA_FILE_3=data/multichain-etherlink.json \
// --env TEST_DATA_FILE_4=data/multichain-gnosis.json \
// --env TEST_DATA_FILE_5=data/multichain-neon.json \
// --env TEST_DATA_FILE_6=data/multichain-nova.json \
// --env TEST_DATA_FILE_7=data/multichain-optimism.json \
// --env TEST_DATA_FILE_8=data/multichain-rootstock.json \
// --env TEST_DATA_FILE_9=data/multichain-shibarium.json \
// --env TEST_DATA_FILE_10=data/multichain-astar.json \
// --env TEST_DATA_FILE_11=data/multichain-redstone.json \
// --env TEST_DATA_FILE_12=data/multichain-zkevm.json \
// --env TEST_DATA_FILE_13=data/multichain-zksync-sepolia.json \
// --env TEST_DATA_FILE_14=data/multichain-zksync-era.json \
// --env LOKI_GUN_DEBUG=none \
// --out ${K6_OUT_FILE} \
// --out ${K6_OUT} \
// --verbose \
// run \
// --tag testid="multichain-search-debug" \
// --log-output=stdout \
// --no-usage-report \
// multichain.js

export function Eth() {
    callByHash(testDatas[0])
}

export function Blast() {
    callByHash(testDatas[1])
}

export const Etherlink = () => {
    callByHash(testDatas[2])
}

export const Gnosis = () => {
    callByHash(testDatas[3])
}

export const Neon = () => {
    callByHash(testDatas[4])
}

export const Nova = () => {
    callByHash(testDatas[5])
}

export const Optimism = () => {
    callByHash(testDatas[6])
}

export const Rootstock = () => {
    callByHash(testDatas[7])
}

export const Shibarium = () => {
    callByHash(testDatas[8])
}

export const Zora = () => {
    callByHash(testDatas[9])
}

export const Astar = () => {
    callByHash(testDatas[10])
}

export const Redstone = () => {
    callByHash(testDatas[11])
}

export const Zkevm = () => {
    callByHash(testDatas[12])
}

export const Zksyncera = () => {
    callByHash(testDatas[13])
}

export const Zksyncsepolia = () => {
    callByHash(testDatas[14])
}
