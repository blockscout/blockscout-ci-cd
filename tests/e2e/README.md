# E2E UI/API tests

## Setup
```
npm install
npm install-deps
```

## Local tests (WIP)
Spin up an environment in k8s as described [here](../../blockscout/README.md)

Debug mode, only Chrome
```
npm run test:test:smoke:debug
```
The whole suite
```
npm run test:test:smoke
```
Network oriented tests, network + k8s
```
WALLET="..." npm run test:test:geth
```
And then
```
npm run report
```

## Prod tests (WIP)
Debug mode, only Chrome
```
npm run test:prod:smoke:debug
```
The whole suite
```
npm run test:prod:smoke
```
And then
```
npm run report
```

## Manual Lighthouse check
```
LIGHTHOUSE_URL="https://blockscout.com/poa/core" npm run lighthouse
```

## Debug
You can use [VSCode addon](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright), run or more logging in `customReporter.ts` or just use `:debug` mode
