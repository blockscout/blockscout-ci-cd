## Load tests

### Configuring

Crucial parameters to vary in tests are:
- `TEST_DATA_FILE` - your test data file, JSON array
- `--tag testid` - test id tag for TSDB [dashboard](https://grafana.k8s-dev.blockscout.com/d/a21-pyAWz/k6-load-test-view?orgId=1&from=now-5m&to=now&var-testid=eth-tx-summary-debug&timezone=browser&editIndex=0)

You can add `  --http-debug=full \` before `run` for full HTTP debug.

### Comparing between releases
```
BEFORE=release1.json NOW=release2.json node common/compare.js
```
Commit successful releases under `releases` in format `$product-vX.X.X-$profile.json`


### Blockscout API v1 (Baseline)
```
../bin_k6/k6-tsdb-darwin \
--env BASE_URL=https://eth.blockscout.com \
--env TEST_DATA_FILE=data/ethereum.json \
--env LOKI_GUN_DEBUG=none \
--out ${K6_OUT_FILE} \
--out ${K6_OUT} \
--verbose \
run \
--tag testid="eth-blockscout-v1-api-debug" \
--log-output=stdout \
--no-usage-report \
blockscout.js
```

### Blockscout API v2 (Baseline)
```
../bin_k6/k6-tsdb-darwin \
--env BASE_URL=https://eth.blockscout.com \
--env TEST_DATA_FILE=data/ethereum.json \
--env LOKI_GUN_DEBUG=none \
--out ${K6_OUT_FILE} \
--out ${K6_OUT} \
--verbose \
run \
--tag testid="eth-blockscout-v2-api-debug" \
--log-output=stdout \
--no-usage-report \
blockscoutv2.js
```

## Blockscout Frontend v2 (Baseline)
```
../bin_k6/k6-tsdb-darwin \
--env BASE_URL=https://eth.blockscout.com \
--env TEST_DATA_FILE=data/ethereum.json \
--env LOKI_GUN_DEBUG=none \
--out ${K6_OUT_FILE} \
--out ${K6_OUT} \
--verbose \
run \
--tag testid="eth-blockscout-frontend-debug" \
--log-output=stdout \
--no-usage-report \
frontend.js
```

### Advanced Filtering (Baseline)
```
../bin_k6/k6-tsdb-darwin \
--env BASE_URL=https://eth.blockscout.com \
--env LOKI_GUN_DEBUG=none \
--out ${K6_OUT_FILE} \
--out ${K6_OUT} \
--verbose \
run \
--tag testid="eth-blockscout-advanced-filter-api-debug" \
--log-output=stdout \
--no-usage-report \
advanced-tx-filter.js
```

### Multi-chain Search (Baseline)
```
../bin_k6/k6-tsdb-darwin \
--env BASE_URL=https://quicknode-marketplace-integration.k8s-dev.blockscout.com \
--env QUICKNODE_ID=${QUICKNODE_ID} \
--env QUICKNODE_INSTANCE=${QUICKNODE_INSTANCE} \
--env TEST_DATA_FILE_1=data/multichain.json \
--env TEST_DATA_FILE_2=data/multichain-blast.json \
--env TEST_DATA_FILE_3=data/multichain-etherlink.json \
--env TEST_DATA_FILE_4=data/multichain-gnosis.json \
--env TEST_DATA_FILE_5=data/multichain-neon.json \
--env TEST_DATA_FILE_6=data/multichain-nova.json \
--env TEST_DATA_FILE_7=data/multichain-optimism.json \
--env TEST_DATA_FILE_8=data/multichain-rootstock.json \
--env TEST_DATA_FILE_9=data/multichain-shibarium.json \
--env TEST_DATA_FILE_10=data/multichain-astar.json \
--env TEST_DATA_FILE_11=data/multichain-redstone.json \
--env TEST_DATA_FILE_12=data/multichain-zkevm.json \
--env TEST_DATA_FILE_13=data/multichain-zksync-sepolia.json \
--env TEST_DATA_FILE_14=data/multichain-zksync-era.json \
--env LOKI_GUN_DEBUG=none \
--out ${K6_OUT_FILE} \
--out ${K6_OUT} \
--verbose \
run \
--tag testid="multichain-search-debug" \
--log-output=stdout \
--no-usage-report \
multichain.js
```

### Metadata Service (Baseline)
```
../bin_k6/k6-tsdb-darwin \
--env BASE_URL=https://metadata-test.k8s-dev.blockscout.com \
--env TEST_DATA_FILE=data/metadata-sepolia.json \
--env LOKI_GUN_DEBUG=none \
--out ${K6_OUT_FILE} \
--out ${K6_OUT} \
--verbose \
run \
--tag testid="eth-metadata-sepolia" \
--log-output=stdout \
--no-usage-report \
metadata.js
```

### BENS (Baseline)
```
../bin_k6/k6-tsdb-darwin \
--env BASE_URL=https://bens.k8s-dev.blockscout.com \
--env TEST_DATA_FILE=data/bens.json \
--env LOKI_GUN_DEBUG=none \
--out ${K6_OUT_FILE} \
--out ${K6_OUT} \
--verbose \
run \
--tag testid="eth-metadata-sepolia" \
--log-output=stdout \
--no-usage-report \
bens.js
```

### TX Summary API

```
../bin_k6/k6-tsdb-darwin \
--env BASE_URL=https://eth.blockscout.com \
--env TEST_DATA_FILE=data/eth-tx-summary.json \
--env LOKI_GUN_DEBUG=none \
--out ${K6_OUT_FILE} \
--out ${K6_OUT} \
--verbose \
run \
--tag testid="eth-tx-summary-debug" \
--log-output=stdout \
--no-usage-report \
tx-summary.js
```

### TX Summary API (custom)

```
../bin_k6/k6-tsdb-darwin \
--env BASE_URL=https://eth.blockscout.com \
--env TEST_DATA_FILE=data/eth-tx-summary-txs-random.json \
--env LOKI_GUN_DEBUG=none \
--out ${K6_OUT_FILE} \
--out ${K6_OUT} \
--verbose \
run \
--tag testid="eth-tx-summary-set-1-no-cache-random" \
--log-output=stdout \
--no-usage-report \
tx-summary-custom.js
```
