# Temporary Tests

These tests are used to debug some custom things and may be moved to the parent directory or removed.

### TX Summary API (custom)

```
../../bin_k6/k6-tsdb-darwin \
--env BASE_URL=https://eth.blockscout.com \
--env TEST_DATA_FILE=eth-tx-summary-txs-random.json \
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

### Clear TX Summary Cache
```
FILEPATH=eth-tx-summary-txs.json node clear-cache.mjs
```
