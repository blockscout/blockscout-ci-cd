# Blockscout infrastructure and E2E testing

[![E2E Prod tests](https://github.com/blockscout/blockscout-ci-cd/actions/workflows/e2e_prod.yaml/badge.svg)](https://github.com/blockscout/blockscout-ci-cd/actions/workflows/e2e_prod.yaml)
[![E2E K8s](https://github.com/blockscout/blockscout-ci-cd/actions/workflows/e2e_k8s.yaml/badge.svg)](https://github.com/blockscout/blockscout-ci-cd/actions/workflows/e2e_k8s.yaml)
[![Load baseline](https://github.com/blockscout/blockscout-ci-cd/actions/workflows/load_baseline.yaml/badge.svg)](https://github.com/blockscout/blockscout-ci-cd/actions/workflows/load_baseline.yaml)
[![Foresight Docs](https://foresight.service.thundra.io/public/api/v1/badge/test?repoId=05716459-6136-4d25-876b-45806c923d3c)](https://foresight.docs.thundra.io/)
[![Foresight Docs](https://foresight.service.thundra.io/public/api/v1/badge/success?repoId=05716459-6136-4d25-876b-45806c923d3c)](https://foresight.docs.thundra.io/)
[![Foresight Docs](https://foresight.service.thundra.io/public/api/v1/badge/utilization?repoId=05716459-6136-4d25-876b-45806c923d3c)](https://foresight.docs.thundra.io/)

The goal of this repository is to contain:
- Infra deployments for EKS cluster and other testing infra
- Applications [deployments](./blockscout) for testing
- UI/API [tests](tests/e2e)
- Load [tests](tests/load)
- Chaos tests

To deploy something k8s related just setup your `~/.kube/config` and use of application folders, for example read [this](./blockscout/README.md)

To setup `k8s` locally, read [this](./blockscout/k3d.md)

To debug CI please first use [act](https://github.com/nektos/act)
