# Blockscout deployment

## Setup
You need a `k8s` cluster to run that deployment, either setup [k3d](k3d.md) for a local run or edit your `~/.kube/config` to connect to any cluster
Also you need [kubectl](https://kubernetes.io/docs/tasks/tools/) to be installed

Install deps
```
npm install
```
## Local usage
```
export NAMESPACE_NAME=e2e-test-local
export RESOURCE_MODE=e2e
export PUBLIC=false

export PORT=4001
export PORT_PG=5432
export PORT_NETWORK_HTTP=8544
export PORT_NETWORK_WS=8546

export ACCOUNT_USERNAME=fahrbss@gmail.com
export ACCOUNT_PASSWORD=318zceqadwx8N372

export IMAGE=blockscout/blockscout:latest
export VARIANT=geth
export HTTP_URL=http://localhost:${PORT_NETWORK_HTTP}
export WS_URL=ws://localhost:${PORT_NETWORK_WS}
export ETHEREUM_JSONRPC_TRACE_URL=http://localhost:${PORT_NETWORK_HTTP}
export COIN=DAI

export K8S_LOCAL_PORT=9443 
export NETWORK_URL=http://localhost:${PORT_NETWORK_HTTP}
// default Geth devmode key
export WALLET="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"

npm run start
```
Then shutdown
```
npm run stop
```
## CI usage
```
npm run start
```
## Developing
Lint
```
npm run lint
```
Running snapshot tests
```
npm run test
```
Updating snapshots
```
npx jest --updateSnapshot
```