# E2E UI/API tests

## E2E Environment tests (contract deployments)
```
source .envrc && npm run test:smoke:account
```

## Debug
You can use [VSCode addon](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright), or set `PWDEBUG=1` and run any target

## Production tests
To add your environment to the E2E tests suite you need to:
1. Create a new JSON file for static data under `tests/e2e/data/static`.
   File should be called by domain, for example for `https://eth-sepolia.blockscout.com` file should have name `eth-sepolia.json`
2. Fill different entities data (tokens/blobs/etc), [eth-sepolia.json](tests/e2e/static/eth-sepolia.json)
3. Add your environment URL to [e2e_matrix](.github/workflows/e2e_matrix.yaml)

## Production tests debug
```
export BLOCKSCOUT_URL=...
export PWDEBUG=0 # 1 - debug, 0 - no debug
source .envrc && npm run test:ondemand
```

## Run RPC compatibility tests
Add vars to `.envrc`
```
export RPC_TEST_URL="https://rpc.ankr.com/eth"
export RPC_TEST_BLOCK_NUMBER="19172504"
export RPC_TEST_ADDRESS="0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
export RPC_TEST_TX="0x736e5575bca4d7b887d539dd404abc1d7e23239416c6e0885ab2e879ebf6609f"
export RPC_TEST_CONTRACT="0xdAC17F958D2ee523a2206206994597C13D831ec7"
source .envrc
```

Then run the test
```
node test_rpc.mjs
```
