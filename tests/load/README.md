
# Blockscout load tests

## Install
Install packages
```
npm install
```

Build `xk6` binary for your platform
```
Darwin

docker run --rm -it -e GOOS=darwin -u "$(id -u):$(id -g)" -v "${PWD}:/xk6" grafana/xk6 build v0.43.1 \
  --with github.com/avitalique/xk6-file@latest \
  --with github.com/grafana/xk6-output-timescaledb

Linux 
docker run --rm -it -u "$(id -u):$(id -g)" -v "${PWD}:/xk6" grafana/xk6 build v0.43.1 \
  --with github.com/avitalique/xk6-file@latest \
  --with github.com/grafana/xk6-output-timescaledb
```

See other docs in [tests](tests/README.md) folder.

## Dashboards & Debug data
Check the [manual](./dashboards/README.md)

Feel free to use `console.debug` or `console.warn` methods, all the logs are aggregated to `Loki` , for more info visit [k6 docs](https://k6.io/docs/cloud/analyzing-results/logs/)