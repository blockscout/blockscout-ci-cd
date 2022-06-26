# Kubernetes
We run our software in Kubernetes.

### Local k3d setup

1. Install [k3d](https://k3d.io/v5.4.3/) +[Lens](https://k8slens.dev/) or use [k9s](https://k9scli.io/topics/install/) as a low resource consumption alternative  
2. Setup your docker resources, 6vCPU/10Gb RAM is a good start
```
k3d cluster create local
```
```
kubectl config use-context k3d-local
```

Connect to your cluster in `Lens`

When the job is done turn the cluster off
```
k3d cluster stop local
```