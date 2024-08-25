# Blockscout E2E testing

[![Production](https://github.com/blockscout/blockscout-ci-cd/actions/workflows/e2e_prod.yaml/badge.svg)](https://github.com/blockscout/blockscout-ci-cd/actions/workflows/e2e_prod.yaml)
[![Testnets (Rollup)](https://github.com/blockscout/blockscout-ci-cd/actions/workflows/e2e_rollup.yaml/badge.svg)](https://github.com/blockscout/blockscout-ci-cd/actions/workflows/e2e_rollup.yaml)
[![K8s](https://github.com/blockscout/blockscout-ci-cd/actions/workflows/e2e_account.yaml/badge.svg)](https://github.com/blockscout/blockscout-ci-cd/actions/workflows/e2e_account.yaml)
[![Admin console tests](https://github.com/blockscout/blockscout-ci-cd/actions/workflows/e2e_admin.yaml/badge.svg)](https://github.com/blockscout/blockscout-ci-cd/actions/workflows/e2e_admin.yaml)
[![ScoutCloud](https://github.com/blockscout/blockscout-ci-cd/actions/workflows/e2e_scoutcloud.yaml/badge.svg)](https://github.com/blockscout/blockscout-ci-cd/actions/workflows/e2e_scoutcloud.yaml)

This repo contains E2E and stress/load tests for Blockscout APIs

## Production tests
To add your environment to the E2E tests suite you need to:
1. Create a new JSON file for static data under `tests/e2e/data/static`
2. Fill different entities data (tokens/blobs/etc), [eth-sepolia.json](tests/e2e/static/eth-sepolia.json)
3. Add your environment URL to [e2e_matrix](.github/workflows/e2e_matrix.yaml)

## Production tests debug
```
export BLOCKSCOUT_URL=...
export PWDEBUG=0 # 1 - debug, 0 - no debug
source .envrc && npm run test:ondemand
```