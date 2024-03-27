
# Blockscout load tests

## Install
Install packages
```
npm install
```

Build `xk6` binary for your platform
```
xk6 build --with github.com/grafana/xk6-output-timescaledb

or

docker run --rm -it -u "$(id -u):$(id -g)" -v "${PWD}:/xk6" grafana/xk6 build v0.43.1 \
  --with github.com/avitalique/xk6-file@latest \
  --with github.com/grafana/xk6-output-timescaledb
```

## Run
Production RPC suite, `scenarios` are:
- `warmUp` - just warm up all the APIs
- `baseline` - measure all APIs one by one after warm up
- `profile` - run one of a prod-like profile

You can configure and run a suite, choose a `K6_TEST_ID`, `SCENARIO` and and debug stream for Loki in `.env` files
```
CONFIG=.env.prod.baseline.local npm run test
```

## Dashboards & Debug data
Check the [manual](./dashboards/README.md)

Feel free to use `console.debug` or `console.warn` methods, all the logs are aggregated to `Loki` , for more info visit [k6 docs](https://k6.io/docs/cloud/analyzing-results/logs/)

## Writing the tests

Rules for writing tests are simple:
- The test code is located in `src` folder
- The entry points for the tests need to have ".test." word in the name to distinguish them from auxiliary files. You can change the entry [here](./webpack.config.js#L8). 
- If static files are required then add them to `./assets` folder. Its content gets copied to the destination folder (`dist`) along with compiled scripts.

If you want to learn more, check out [Bundling node modules in k6](https://k6.io/docs/using-k6/modules#bundling-node-modules).

### Useful libs for k6
- [js-libs](https://k6.io/docs/javascript-api/jslib/)

### Test data generation script
```
URL=https://eth-sepolia.blockscout.com FILENAME=sepolia npx node generate_data.mjs
```