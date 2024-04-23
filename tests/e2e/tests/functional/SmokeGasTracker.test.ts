import chalk from 'chalk'
import test from '@lib/BaseTest'

test.describe.configure({ mode: `parallel` })

const urls = [
    [`https://eth.blockscout.com`, `@SmokeEthMainnet`],
    [`http://gnosis.blockscout.com`, `@SmokeEthGnosisMainnet`],
    [`https://gnosis-chiado.blockscout.com`, `@SmokeEthGnosisChiado`],
    [`https://blockscout.com/astar`, `@SmokeEthAstar`],
    [`https://blockscout.com/shiden`, `@SmokeEthShiden`],
    [`https://blockscout.com/shibuya`, `@SmokeEthShibuya`],
    [`https://neon.blockscout.com`, `@SmokeEthNeonMainnet`],
    [`https://neon-devnet.blockscout.com`, `@SmokeEthNeonDevnet`],
    [`https://zetachain-athens-3.blockscout.com`, `@SmokeEthZetaAthens3`],
    [`https://pegasus.lightlink.io`, `@SmokeEthLightlinkPegasus`],
    [`https://phoenix.lightlink.io`, `@SmokeEthLightlinkPhoenix`],
    [`https://explorer.testnet.immutable.com`, `@SmokeEthImmutable`],
    [`https://www.shibariumscan.io`, `@SmokeEthShibariumMainnet`],
    [`https://explorer.fuse.io`, `@SmokeEthFuse`],
    [`https://explorer.fusespark.io`, `@SmokeEthFuseTestnet`],
    [`https://puppyscan.shib.io`, `@SmokeEthShibariumTestnet`],
    [`https://optimism.blockscout.com`, `@SmokeEthOptimismMainnet`],
    [`https://optimism-goerli.blockscout.com`, `@SmokeEthOptimismGoerli`],
    [`https://optimism-sepolia.blockscout.com`, `@SmokeEthOptimismSepolia`],
    [`https://rootstock.blockscout.com`, `@SmokeEthRootstock`],
    [`https://base.blockscout.com`, `@SmokeEthBaseMainnet`],
    [`https://base-sepolia.blockscout.com`, `@SmokeEthBaseSepolia`],
    [`https://etc-mordor.blockscout.com`, `@SmokeEthETCMordor`],
    [`https://etc.blockscout.com`, `@SmokeEthETCMainnet`],
    [`https://explorer.evm.shimmer.network`, `@SmokeEthIotaShimmer`],
    [`https://explorer.evm.testnet.shimmer.network`, `@SmokeEthIotaShimmer`],
    [`https://zksync-era-mainnet.blockscout.com`, `@SmokeEthzkSync`],
    [`https://stability-betanet.blockscout.com`, `@SmokeEthStability`],
]

for (const [url, tag] of urls) {
    test(`${url} @GasTracker ${tag} GasTracker Smoke Test`, async ({ newHomePage }) => {
        await newHomePage.open_custom(url)
        if (await newHomePage.isGasTrackerOn()) {
            await newHomePage.checkGasTrackerBar()
            await newHomePage.checkGasTrackerPopup()
            await newHomePage.checkGasTrackerView()
        } else {
            console.log(chalk.yellow(`Gas Tracker is OFF!`))
        }
    })
}
