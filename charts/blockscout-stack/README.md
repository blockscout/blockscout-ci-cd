# blockscout-stack

Installs the blockscout-stack, a collection of Kubernetes manifests: [Blockscout](https://github.com/blockscout/blockscout), [Rust services](https://github.com/blockscout/blockscout-rs), Blockscout Allowance service, frontend, Postgres DB, geth node (+ client if needed).

See the [blockscout](https://github.com/blockscout/blockscout) README for details about environments, and configuration options.

## Prerequisites

- Kubernetes 1.16+
- Helm 3+

## Get Helm Repository Info

```console
helm repo add blockscout-stack https://blockscout.github.io/blockscout-ci-cd/
helm repo update
```

_See [`helm repo`](https://helm.sh/docs/helm/helm_repo/) for command documentation._

## Install Helm Chart

```console
helm install [RELEASE_NAME] prometheus-community/kube-prometheus-stack
helm secrets install \
    --repo https://blockscout.github.io/blockscout-ci-cd/ \
    [RELEASE_NAME] blockscout-stack \
    -f [VALUES_DIR]/values.yaml \
    -f [VALUES_DIR]/secrets.yaml \
    -n [APP_NAMESPACE]
```

_See [configuration](#configuration) below._

_See [helm install](https://helm.sh/docs/helm/helm_install/) for command documentation._

## Uninstall Helm Chart

```console
helm uninstall [RELEASE_NAME]
```

This removes all the Kubernetes components associated with the chart and deletes the release.

_See [helm uninstall](https://helm.sh/docs/helm/helm_uninstall/) for command documentation._

## Upgrading Chart

```console
helm secrets upgrade --install \
    --repo https://blockscout.github.io/blockscout-ci-cd/ \
    [RELEASE_NAME] blockscout-stack \
    -f [VALUES_DIR]/values.yaml \
    -f [VALUES_DIR]/secrets.yaml \
    -n [APP_NAMESPACE]
```

_See [helm upgrade](https://helm.sh/docs/helm/helm_upgrade/) for command documentation._

## Configuration

See [Customizing the Chart Before Installing](https://helm.sh/docs/intro/using_helm/#customizing-the-chart-before-installing). All configurable options with detailed comments are in [values.yaml](https://github.com/blockscout/blockscout-ci-cd/blob/master/charts/blockscout-stack/values.yaml).

### Enable services

To enable a service during installation, set `service_name.enabled` to `true`. For example `scVerifier.enabled`, `postgres.enabled` and `frontend.enabled`.


## Further Information

For more in-depth documentation of configuration options meanings, please see

- [Blockscout](https://github.com/blockscout/blockscout)
- [Rust services](https://github.com/blockscout/blockscout-rs)
