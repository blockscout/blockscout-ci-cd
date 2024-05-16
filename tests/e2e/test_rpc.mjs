// Import the ethers library
import chalk from 'chalk'
import fetch from 'node-fetch'

import {providers} from 'ethers'

const ethNodeUrl = process.env.RPC_TEST_URL
const address = process.env.RPC_TEST_ADDRESS;
const tx = process.env.RPC_TEST_TX
const codeAddr = process.env.RPC_TEST_CONTRACT
const staticBn = parseInt(process.env.RPC_TEST_BLOCK_NUMBER)
const fastEnoughRPC = 500 // milliseconds

const provider = new providers.JsonRpcProvider(ethNodeUrl);

function checkEthBlockNumber() {
    const EthBlockNumber = async function () {
        try {
            const block = await provider.getBlockNumber(`latest`)
            console.log(chalk.yellow(`Block number API result: ${block}`));
            if (block > 0) {
                console.log(chalk.green(`Block number API is correct!`))
            } else {
                console.log(chalk.red(`Block number API is not working!`))
            }
            return block
        } catch (error) {
            console.error('Error fetching:', error);
        }
    }
    return EthBlockNumber
}

function checkEthGetBalance(address) {
    const EthGetBalance = async function () {
        try {
            const block = await provider.getBalance(address)
            console.log(chalk.yellow(`GetBalance API result: ${block}`))
            if (block > 0) {
                console.log(chalk.green(`GetBalance API is correct!`))
            } else {
                console.log(chalk.red(`GetBalance API is not working!`))
            }
        } catch (error) {
            console.error('Error fetching:', error)
        }
    }
    return EthGetBalance
}

function checkEthGetBlockByNumberOrHash(num) {
    const EthGetBlockByNumberOrHash = async function () {
        try {
            console.log(`block number: ${num}`)
            const blockInfo = await provider.getBlock(num)
            console.log(chalk.yellow(`GetBlockByNumber API result: ${JSON.stringify(blockInfo)}`))
            for (const field of [`hash`, `parentHash`, `number`, `timestamp`, `nonce`, `difficulty`, `gasLimit`, `gasUsed`, `miner`, `extraData`, `transactions`, `baseFeePerGas`, `_difficulty`]) {
                if (field in blockInfo) {
                    console.log(chalk.green(`field ${field} OK`))
                } else {
                    console.log(chalk.red(`field ${field} not found`))
                }
            }
            return blockInfo
        } catch (error) {
            console.error('Error fetching:', error)
        }
    }
    return EthGetBlockByNumberOrHash
}

function checkEthGetTransactionByHash(hash) {
    const EthGetTransactionByHash = async function () {
        try {
            const txInfo = await provider.getTransaction(hash)
            console.log(chalk.yellow(`GetTransactionByHash API result: ${JSON.stringify(txInfo)}`))
            // opt fields `accessList`, `maxPriorityFeePerGas`, `maxFeePerGas`
            console.log(chalk.blue(txInfo.type))
            for (const field of [`hash`, `type`, `accessList`, `blockHash`, `blockNumber`, `transactionIndex`, `confirmations`, `from`, `gasPrice`, `maxPriorityFeePerGas`, `maxFeePerGas`, `gasLimit`, `to`, `value`, `nonce`, `data`, `r`, `s`, `v`, `creates`, `chainId`]) {
                if (field in txInfo) {
                    console.log(chalk.green(`field ${field} OK`))
                } else {
                    console.log(chalk.red(`field ${field} not found`))
                }
            }
            return txInfo
        } catch (error) {
            console.error('Error fetching:', error)
        }
    }
    return EthGetTransactionByHash
}

function checkEthGetTransactionReceipt(hash) {
    const EthGetTransactionReceipt = async function () {
        try {
            const txInfo = await provider.getTransactionReceipt(hash)
            console.log(chalk.yellow(`GetTransactionReceipt API result: ${JSON.stringify(txInfo)}`))
            for (const field of [`to`, `from`, `contractAddress`, `transactionIndex`, `gasUsed`, `logsBloom`, `blockHash`, `transactionHash`, `logs`, `blockNumber`, `confirmations`, `cumulativeGasUsed`, `effectiveGasPrice`, `status`, `type`, `byzantium`]) {
                if (field in txInfo) {
                    console.log(chalk.green(`field ${field} OK`))
                } else {
                    console.log(chalk.red(`field ${field} not found`))
                }
            }
            return txInfo
        } catch (error) {
            console.error('Error fetching:', error)
        }
    }
    return EthGetTransactionReceipt
}

function checkEthGetCode(addr) {
    const EthGetCode = async function () {
        try {
            const code = await provider.getCode(addr)
            console.log(chalk.yellow(`GetCode API result: ${JSON.stringify(code)}`))
            if (code.startsWith(`0x`) && code.length > 10) {
                console.log(chalk.green(`GetCode API is correct!`))
            } else {
                console.log(chalk.red(`GetCode API is not working!`))
            }
            return code
        } catch (error) {
            console.error('Error fetching:', error)
        }
    }
    return EthGetCode
}

function checkEthGetLogs(addr, from, to) {
    const EthGetLogs =  async function () {
        try {
            const filter = {
                address: addr,
                fromBlock: from,
                toBlock: to,
            };
            console.log(`from: ${from}, to: ${to}`)
            const data = await provider.getLogs(filter)
            console.log(chalk.yellow(`GetLogs API result: ${JSON.stringify(data)}`))
            for (const field of [`blockNumber`, `blockHash`, `transactionIndex`, `removed`, `address`, `data`, `topics`, `transactionHash`, `logIndex`]) {
                if (field in data[0]) {
                    console.log(chalk.green(`field ${field} OK`))
                } else {
                    console.log(chalk.red(`field ${field} not found`))
                }
            }
        } catch (error) {
            console.error('Error fetching:', error)
        }
    }
    return EthGetLogs
}

function checkEthGetTransactionByBlockHashOrNumberAndIndex(method, blockNumOrHash, transactionIndex) {
    const EthGetTransactionByBlockHashOrNumberAndIndex =  async function () {
        try {
            const response = await fetch(ethNodeUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    method: method,
                    params: [blockNumOrHash, transactionIndex],
                    id: Math.floor(Math.random() * 10000),
                }),
            });

            const data = await response.json();
            console.log(chalk.yellow(`${method} API result: ${JSON.stringify(data)}`))
            for (const field of [`hash`, `type`, `accessList`, `blockHash`, `blockNumber`, `transactionIndex`, `from`, `gasPrice`, `maxPriorityFeePerGas`, `maxFeePerGas`, `to`, `value`, `nonce`, `r`, `s`, `v`, `chainId`]) {
                if (field in data.result) {
                    console.log(chalk.green(`field ${field} OK`))
                } else {
                    console.log(chalk.red(`field ${field} not found`))
                }
            }
        } catch (error) {
            console.error('Error fetching:', error)
        }
    }
    return EthGetTransactionByBlockHashOrNumberAndIndex
}

function checkGetUncleByBlockHashAndIndex(bh, index) {
    const EthGetUncleByBlockHashAndIndex =  async function () {
        try {
            const response = await fetch(ethNodeUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    method: `eth_getUncleByBlockHashAndIndex`,
                    params: [bh, index],
                    id: Math.floor(Math.random() * 10000),
                }),
            });

            const data = await response.json();
            console.log(chalk.yellow(`eth_getUncleByBlockHashAndIndex API result: ${JSON.stringify(data)}`))
            for (const field of [`hash`, `type`, `accessList`, `blockHash`, `blockNumber`, `transactionIndex`, `from`, `gasPrice`, `maxPriorityFeePerGas`, `maxFeePerGas`, `to`, `value`, `nonce`, `r`, `s`, `v`, `chainId`]) {
                if (field in data.result) {
                    console.log(chalk.green(`field ${field} OK`))
                } else {
                    console.log(chalk.red(`field ${field} not found`))
                }
            }
        } catch (error) {
            console.error('Error fetching:', error)
        }
    }
    return EthGetUncleByBlockHashAndIndex
}

function findAllAddresses(bs, bn) {
    return async function () {
        const addresses = []
        for (let i = bs; i <= bn; i++) {
            const blockInfo = await checkEthGetBlockByNumberOrHash(i)
            for (let tx of blockInfo.transactions) {
                const txInfo = await checkEthGetTransactionReceipt(tx)
                addresses.push(txInfo.to)
                addresses.push(txInfo.from)
                // console.log(`to: ${txInfo.to}, from: ${txInfo.from}, contractAddress: ${txInfo.contractAddress}`)
            }
        }
        return addresses
    }
}

async function measureTime(f) {
    const startTime = performance.now()
    const result = await f()
    const endTime = performance.now()
    const elapsedTime = endTime - startTime
    if (elapsedTime > fastEnoughRPC) {
        console.log(chalk.red(`${f.name} is slow (>500ms): ${elapsedTime}`))
        return result
    }
    console.log(chalk.green(`${f.name} performance is OK: ${elapsedTime}`))
    return result
}


async function scanBlocks(from, to) {
    const addrs = await findAllAddresses(from, to)
    console.log(`addresses: ${JSON.stringify(addrs)}`)
    for (let addr of addrs) {
        await checkEthGetLogs(addr, from, to)
    }
}

// curl -X POST  -H "Content-Type: application/json"  \
// --data '{"jsonrpc":"2.0", "id":2, "method": "debug_traceBlockByNumber", "params": ["0xCE"] }' \
// "https://sepolia-rpc.kakarot.org"
//
// curl -X POST  -H "Content-Type: application/json"  \
// --data '{"jsonrpc":"2.0", "id":2, "method": "debug_traceBlockByHash", "params": ["0x0419753d7a4a911b7d9d79731ea4dd225cfb523ba6be7c368c5d5d4add5b3989"] }' \
// "https://sepolia-rpc.kakarot.org"
//
// curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"txpool_content","params":[],"id":1}' \
// "https://sepolia-rpc.kakarot.org"
//
// curl -X POST  -H "Content-Type: application/json"  \
// --data '{"jsonrpc":"2.0", "id":2, "method": "debug_traceTransaction", "params": ["0xa74d4d6d1f5a131928b8d6048a98f942ace730fed981577eb1660b36427824ed"] }' \
// "https://sepolia-rpc.kakarot.org"

// await scanBlocks(30, 31)
await measureTime(checkEthBlockNumber())
const blockInfo = await measureTime(checkEthGetBlockByNumberOrHash(staticBn))
await measureTime(checkEthGetBlockByNumberOrHash(blockInfo.hash))
await measureTime(checkEthGetTransactionByHash(blockInfo.transactions[0]))
await measureTime(checkEthGetTransactionByBlockHashOrNumberAndIndex(`eth_getTransactionByBlockHashAndIndex`, blockInfo.hash, "0x0"))
await measureTime(checkEthGetTransactionByBlockHashOrNumberAndIndex(`eth_getTransactionByBlockNumberAndIndex`, `0x${blockInfo.number.toString(16)}`, "0x0"))
await measureTime(checkEthGetTransactionReceipt(blockInfo.transactions[0]))
await measureTime(checkEthGetBalance(address))
await measureTime(checkEthGetCode(codeAddr))
// await measureTime(checkEthGetLogs(codeAddr, staticBn-1, staticBn))
// await checkGetUncleByBlockHashAndIndex(`0x9b8c8a7091ffabba8450b495504a0db905c7f32fa99fa386bcde8d8aa912a1df`, "0x0")
