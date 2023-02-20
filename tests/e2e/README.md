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

## Debug
You can use [VSCode addon](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright), or set `PWDEBUG=1` and run any target
