# E2E UI/API tests

## Live (production) tests
To add your environment to the E2E tests suite you need to:
1. Create a new JSON file for static data under `tests/e2e/data/static`.
   File should be called by first 2 domain words, for example for `https://eth-sepolia.blockscout.com` file should have name `eth-sepolia.blockscout.json`
2. Fill different entities data (tokens/blobs/etc), [eth-sepolia.blockscout.json](tests/e2e/static/eth-sepolia.blockscout.json)
3. Add your environment URL to [e2e_matrix](.github/workflows/e2e_matrix.yaml)

To configure tests we are using `.envrc` format, put all your vars there and `source .envrc` before running tests

# How to run

## Live (production) UI Tests
```
export BLOCKSCOUT_URL=...

source .envrc && npm run test:ondemand
```

Examples to run particular set of tests on multiple environments
```
BLOCKSCOUT_URLS=(
  "https://eth-sepolia.k8s-dev.blockscout.com"
  "https://eth.blockscout.com"
)
export BLOCKSCOUT_URL=$(IFS=,; echo "${BLOCKSCOUT_URLS[*]}")

source .envrc && npx playwright test --project=Chrome --grep=@Live --grep=@Accounts --retries=0 --timeout=60000
```

## Live (production) API Tests
```
BLOCKSCOUT_URLS=(
  "https://eth-sepolia.k8s-dev.blockscout.com"
  "https://eth.blockscout.com"
)
export BLOCKSCOUT_URL=$(IFS=,; echo "${BLOCKSCOUT_URLS[*]}")

source .envrc && npx playwright test --project=Chrome --grep=@Live --grep=@Api --retries=0 --timeout=120000
```

## E2E Account Tests
```
export BLOCKSCOUT_URL=
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
export LOAD_AUTH_CTX=1 # use 0 to authorize and save new cookie
export LOAD_CONTRACTS_DATA=1 # use 0 to deploy new set of contracts

source .envrc && npm run test:smoke:account
```

## Run Admin Panel Tests
```
export ENV=test
export BLOCKSCOUT_URL=
export ADMIN_PANEL_URL=
export ADMIN_ACCOUNT_USERNAME=
export ADMIN_ACCOUNT_PASSWORD=

source .envrc && npm run test:admin
```

## Run RPC Compatibility Tests
Add vars to `.envrc`
```
export RPC_TEST_URL=
export RPC_TEST_BLOCK_NUMBER=
export RPC_TEST_ADDRESS=
export RPC_TEST_TX=
export RPC_TEST_CONTRACT=

source .envrc && node test_rpc.mjs
```

## CI runs
- [Live matrix](../../.github/workflows/e2e_matrix.yaml)
- [E2E Account (internal env)](../../.github/workflows/e2e_new.yaml)
- [Admin panel tests](../../.github/workflows/e2e_admin.yaml)

## Playwright Debug
You can use [VSCode addon](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright), or set `PWDEBUG=1` and run any target
```
export PWDEBUG=0 # 1 - debug, 0 - no debug
```
