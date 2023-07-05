import { HardhatUserConfig } from "hardhat/types"

import "@typechain/hardhat"
import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-waffle"

import "hardhat-gas-reporter"
import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-vyper"

const chainIds = {
    hardhat: 31337,
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
    defaultNetwork: `hardhat`,
    networks: {
        hardhat: {
            chainId: chainIds.hardhat,
        },
    },
    vyper: {
        compilers: [{ version: `0.2.1` }, { version: `0.3.7` }],
    },
    solidity: {
        version: `0.8.17`,
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
        compilers: [
            {
                version: `0.8.17`,
            },
            {
                version: `0.5.0`,
            },
        ],
    },
    typechain: {
        outDir: `typechain`,
        target: `ethers-v5`,
    },
}

export default config
