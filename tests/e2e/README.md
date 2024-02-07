# E2E UI/API tests

## Setup
    ```
    npm install
    npm install-deps
    ```

## Deploy environment
To deploy the whole `blockscout` stack for test use
    ```
    helm secrets upgrade --install  bs-local-tests . -f ./values/e2e/values.yaml -f ./values/e2e/secrets.yaml -n bs-local-tests --create-namespace --set global.env=local
    kubectl get secret regcred -o yaml | sed 's/namespace: .*/namespace: bs-local-tests/' | kubectl apply -f -
    ```

## Run tests
Run tests for prod
    ```
    ENV=prod npm run test:prod:smoke 
    ```
Run tests for k8s with generating contracts data
    ```
    source .env && npm run test:smoke:account
    ```
You can also reuse authorization token wiht adding `LOAD_AUTH_CTX=1`
Deployed contract addresses are also reusable `LOAD_CONTRACTS_DATA=1`

Run verification service suite
    ```
    source .env && npm run test:smoke:verification
    ```
Run comparison tests between Etherscan and Blockscout (Goerli)
    ```
    source .env && npm run test:etherscan
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

## Debug
You can use [VSCode addon](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright), or set `PWDEBUG=1` and run any target
