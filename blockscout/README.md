# Blockscout deployment

## Setup
You need a `k8s` cluster to run that deployment, either setup [k3d](k3d.md) for a local run or edit your `~/.kube/config` to connect to any cluster
Also you need [kubectl](https://kubernetes.io/docs/tasks/tools/) to be installed

Install deps
```
npm install
```
Set env vars
```
export K8S_LOCAL_PORT=...
export NAMESPACE_NAME=e2e-test
export VARIANT=geth
export HTTP_URL=...
export WS_URL=...
export NETWORK_URL="http://localhost:8544"
export WALLET="use default hardhat"
# e2e - non-stateful compact resources mode, just for e2e testing
# chaos - stateful set with compact resources
# load - non-stateful with more resources for load/soak/stress tests
export RESOURCE_MODE=e2e
```
## Local usage
```
npm run start
```
Default ports are now forwarded
```
app: localhost:4000
db: localhost:5432
network_http: 8544
network_ws: 8545
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