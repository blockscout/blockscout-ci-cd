## Load tests

### Configuring

To simplify scripts creation we are using JS instead of TS(Webpack) and just raw commands.

Crucial parameters to vary in tests are:
- `TEST_DATA_FILE` - your test data file, JSON array
- `--tag testid` - test id tag for TSDB dashboard

You can add `  --http-debug=full \` before `run` for full HTTP debug.

### Comparing between releases
```
BEFORE=release1.json NOW=release2.json node common/compare.js
```

### TX Summary API

```
../bin_k6/k6-tsdb-darwin \
  --env K6_OUT=${K6_OUT} \
  --env BASE_URL=https://eth.blockscout.com/ \
  --env LOKI_GUN_DEBUG=none \
  --env TEST_DATA_FILE=../test_data/eth-tx-summary.json \
  --out json=release2.json \
  --verbose \
  run \
  --tag testid="raw-test-1" \
  --log-output=stdout \
  --no-usage-report \
  tx-summary.js
```

### Blockscout API
```
../bin_k6/k6-tsdb-darwin \
  --env K6_OUT=${K6_OUT} \
  --env BASE_URL=https://eth.blockscout.com/ \
  --env LOKI_GUN_DEBUG=none \
  --env TEST_DATA_FILE=data/ethereum.json \
  --out json=release2.json \
  --verbose \
  run \
  --tag testid="raw-test-1" \
  --log-output=stdout \
  --no-usage-report \
  blockscout.js
```