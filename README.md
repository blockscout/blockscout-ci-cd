# Blockscout infrastructure and E2E testing

[![E2E Prod tests](https://github.com/blockscout/blockscout-ci-cd/actions/workflows/e2e_prod.yaml/badge.svg)](https://github.com/blockscout/blockscout-ci-cd/actions/workflows/e2e_prod.yaml)
[![E2E Testnet tests (Rollup)](https://github.com/blockscout/blockscout-ci-cd/actions/workflows/e2e_rollup.yaml/badge.svg)](https://github.com/blockscout/blockscout-ci-cd/actions/workflows/e2e_rollup.yaml)
[![E2E K8s](https://github.com/blockscout/blockscout-ci-cd/actions/workflows/e2e_account.yaml/badge.svg)](https://github.com/blockscout/blockscout-ci-cd/actions/workflows/e2e_account.yaml)
[![Load baseline](https://github.com/blockscout/blockscout-ci-cd/actions/workflows/load_baseline.yaml/badge.svg)](https://github.com/blockscout/blockscout-ci-cd/actions/workflows/load_baseline.yaml)

The goal of this repository is to contain:
- Infra deployments for EKS cluster and other testing infra
- Applications [deployments](./charts/blockscout-stack/values) for testing (e2e, testing gnosis stand)
- Comparison tests (Etherscan)
- UI/API [tests](./tests/e2e/README.md)
- Load [tests](./tests/load/README.md)
- Chaos tests
- Blockscout-stack [helm chart](./charts/blockscout-stack/README.md)

To setup `k8s` locally, read [this](https://k3d.io/v5.4.7/)

To debug CI locally you can use [act](https://github.com/nektos/act)
