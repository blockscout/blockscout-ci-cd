# Blockscout infrastructure and E2E testing

[![E2E Prod tests](https://github.com/blockscout/blockscout-ci-cd/actions/workflows/e2e_prod.yaml/badge.svg)](https://github.com/blockscout/blockscout-ci-cd/actions/workflows/e2e_prod.yaml)
[![E2E K8s](https://github.com/blockscout/blockscout-ci-cd/actions/workflows/e2e_account.yaml/badge.svg)](https://github.com/blockscout/blockscout-ci-cd/actions/workflows/e2e_account.yaml)
[![Load baseline](https://github.com/blockscout/blockscout-ci-cd/actions/workflows/load_baseline.yaml/badge.svg)](https://github.com/blockscout/blockscout-ci-cd/actions/workflows/load_baseline.yaml)

The goal of this repository is to contain:
- Infra deployments for EKS cluster and other testing infra
- Applications [deployments](./blockscout) for testing
- UI/API [tests](tests/e2e)
- Load [tests](tests/load)
- Chaos tests

To setup `k8s` locally, read [this](./blockscout/k3d.md)

To debug CI please first use [act](https://github.com/nektos/act)
