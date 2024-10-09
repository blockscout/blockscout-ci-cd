# E2E UI/API tests

## Live (production) tests
To add your environment to the E2E tests suite you need to:
1. Create a new JSON file for static data under `tests/e2e/data/static`.
   File should be called by first 2 domain words, for example for `https://eth-sepolia.blockscout.com` file should have name `eth-sepolia.blockscout.json`
2. Fill different entities data (tokens/blobs/etc), [eth-sepolia.blockscout.json](tests/e2e/static/eth-sepolia.blockscout.json)
3. Add your environment URL to [e2e_matrix](.github/workflows/e2e_matrix.yaml)

## Live (production) tests debug
```
export BLOCKSCOUT_URL=...
export PWDEBUG=0 # 1 - debug, 0 - no debug
source .envrc && npm run test:ondemand
```

## E2E Environment tests (contract deployments)
```
export ENV=test
export NETWORK_URL=
export WALLET=
export ADMIN_ACCOUNT_USERNAME=
export ADMIN_ACCOUNT_PASSWORD=
export ACCOUNT_USERNAME=
export ACCOUNT_PASSWORD=
export MAILSLURP_API_KEY=
export MAILSLURP_EMAIL_ID=
export PROD=1
export PWDEBUG=0
export LOAD_AUTH_CTX=1 # use 0 to authorize and save new cookie
export LOAD_CONTRACTS_DATA=1 # use 0 to deploy new set of contracts

source .envrc && npm run test:smoke:account
```

## Run RPC compatibility tests
Add vars to `.envrc`
```
export RPC_TEST_URL="https://rpc.ankr.com/eth"
export RPC_TEST_BLOCK_NUMBER="19172504"
export RPC_TEST_ADDRESS="..."
export RPC_TEST_TX="..."
export RPC_TEST_CONTRACT="..."
source .envrc && node test_rpc.mjs
```

## Debug
You can use [VSCode addon](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright), or set `PWDEBUG=1` and run any target
