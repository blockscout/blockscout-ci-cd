# E2E UI/API tests

## Setup
```
npm install
npm install-deps
```

## Run tests
Spin up an environment in k8s as described [here](../../blockscout/README.md)

Run tests for prod
```
ENV=prod npm run test:prod:smoke 
```
Run tests for k8s with generating contracts data
```
source ${your_env_file}

npm run test:smoke
```
You can also skip creating contracts data and load it from `contracts_data.env` after first run, add `LOAD_CONTRACTS_DATA=1`
```
export LOAD_CONTRACTS_DATA=1 
npm run test:smoke
```
Show report
```
npm run report
```

## Manual Lighthouse check
```
LIGHTHOUSE_URL="https://blockscout.com/poa/core" npm run lighthouse
```

## Debug
You can use [VSCode addon](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright), or set `PWDEBUG=1` and run any target