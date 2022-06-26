import { HardhatUserConfig } from "hardhat/types"

import "@typechain/hardhat"
import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-waffle"

import "hardhat-gas-reporter"
import "@nomiclabs/hardhat-etherscan"

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
    solidity: {
        compilers: [
            {
                version: `0.8.6`,
            },
        ],
    },
    typechain: {
        outDir: `typechain`,
        target: `ethers-v5`,
    },
}

export default config
