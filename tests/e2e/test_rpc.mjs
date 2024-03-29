// Import the ethers library
import chalk from 'chalk'
import fetch from 'node-fetch'

import { providers } from 'ethers'

const ethNodeUrl = process.env.RPC_TEST_URL
const address = process.env.RPC_TEST_ADDRESS;
const tx = process.env.RPC_TEST_TX
const codeAddr = process.env.RPC_TEST_CONTRACT
const staticBn = parseInt(process.env.RPC_TEST_BLOCK_NUMBER)

const provider = new providers.JsonRpcProvider(ethNodeUrl);

async function checkEthBlockNumber() {
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

async function checkEthGetBalance(address) {
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

async function checkEthGetBlockByNumberOrHash(num) {
  try {
    console.log(`block number: ${num}`)
    const blockInfo = await provider.getBlock(num)
    console.log(chalk.yellow(`GetBlockByNumber API result: ${JSON.stringify(blockInfo)}`))
    for (const field of [`hash`, `parentHash`, `number`, `timestamp`, `nonce`, `difficulty`, `gasLimit`, `gasUsed`, `miner`, `extraData`, `transactions`, `baseFeePerGas`, `_difficulty`]) {
      if (field in blockInfo) {
        console.log(chalk.green(`field ${field} is present`))
      } else {
        console.log(chalk.red(`field ${field} not found`))
      }
    }
    return blockInfo
  } catch (error) {
    console.error('Error fetching:', error)
  }
}

async function checkEthGetTransactionByHash(hash) {
  try {
    const txInfo = await provider.getTransaction(hash)
    console.log(chalk.yellow(`GetTransactionByHash API result: ${JSON.stringify(txInfo)}`))
    // opt fields `accessList`, `maxPriorityFeePerGas`, `maxFeePerGas`
    console.log(chalk.blue(txInfo.type))
    for (const field of [`hash`, `type`, `accessList`, `blockHash`, `blockNumber`, `transactionIndex`, `confirmations`, `from`, `gasPrice`, `maxPriorityFeePerGas`, `maxFeePerGas`, `gasLimit`, `to`, `value`, `nonce`, `data`, `r`, `s`, `v`, `creates`, `chainId`]) {
      if (field in txInfo) {
        console.log(chalk.green(`field ${field} is present`))
      } else {
        console.log(chalk.red(`field ${field} not found`))
      }
    }
    return txInfo
  } catch (error) {
    console.error('Error fetching:', error)
  }
}

async function checkEthGetTransactionReceipt(hash) {
  try {
    const txInfo = await provider.getTransactionReceipt(hash)
    console.log(chalk.yellow(`GetTransactionReceipt API result: ${JSON.stringify(txInfo)}`))
    for (const field of [`to`, `from`, `contractAddress`, `transactionIndex`, `gasUsed`, `logsBloom`, `blockHash`, `transactionHash`, `logs`, `blockNumber`, `confirmations`, `cumulativeGasUsed`, `effectiveGasPrice`, `status`, `type`, `byzantium`]) {
      if (field in txInfo) {
        console.log(chalk.green(`field ${field} is present`))
      } else {
        console.log(chalk.red(`field ${field} not found`))
      }
    }
    return txInfo
  } catch (error) {
    console.error('Error fetching:', error)
  }
}

async function checkEthGetCode(addr) {
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

async function checkEthGetLogs(addr, from, to) {
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
        console.log(chalk.green(`field ${field} is present`))
      } else {
        console.log(chalk.red(`field ${field} not found`))
      }
    }
  } catch (error) {
    console.error('Error fetching:', error)
  }
}

async function checkGetTransactionByBlockHashOrNumberAndIndex(method, blockNumOrHash, transactionIndex) {
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
        console.log(chalk.green(`field ${field} is present`))
      } else {
        console.log(chalk.red(`field ${field} not found`))
      }
    }
  } catch (error) {
    console.error('Error fetching:', error)
  }
}

async function checkGetUncleByBlockHashAndIndex(bh, index) {
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
        console.log(chalk.green(`field ${field} is present`))
      } else {
        console.log(chalk.red(`field ${field} not found`))
      }
    }
  } catch (error) {
    console.error('Error fetching:', error)
  }
}

async function findAllAddresses(bs, bn) {
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


async function scanBlocks(from, to) {
  const addrs = await findAllAddresses(from, to)
  console.log(`addresses: ${JSON.stringify(addrs)}`)
  for (let addr of addrs) {
    await checkEthGetLogs(addr, from, to)
  }
}

// txpool_content

// curl -X POST  -H "Content-Type: application/json"  \
// --data '{"jsonrpc":"2.0", "id":2, "method": "debug_traceBlockByHash", "params": ["0x794367b0292ff04e182ee76ce1a07caffdd533490f4c652d14dc34b40aa14079"] }' \
// "https://rpc-testnet.cyclenetwork.io"

// await scanBlocks(30, 31)
// await checkEthBlockNumber()
// const blockInfo = await checkEthGetBlockByNumberOrHash(staticBn)
// await checkEthGetBlockByNumberOrHash(blockInfo.hash)
// await checkEthGetTransactionByHash(blockInfo.transactions[0])
// await checkGetTransactionByBlockHashOrNumberAndIndex(`eth_getTransactionByBlockHashAndIndex`, blockInfo.hash, "0x0")
// await checkGetTransactionByBlockHashOrNumberAndIndex(`eth_getTransactionByBlockNumberAndIndex`, `0x${blockInfo.number.toString(16)}`, "0x0")
// await checkEthGetTransactionReceipt(blockInfo.transactions[0])
// await checkEthGetBalance(address)
// await checkEthGetCode(codeAddr)
// await checkEthGetLogs(codeAddr, staticBn-1, staticBn)
// await checkGetUncleByBlockHashAndIndex(`0x9b8c8a7091ffabba8450b495504a0db905c7f32fa99fa386bcde8d8aa912a1df`, "0x0")
