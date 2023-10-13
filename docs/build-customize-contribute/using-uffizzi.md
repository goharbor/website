---
title: Using Uffizzi ephemeral environments
---

When a pull request is opened against the (harbor github repo)[https://github.com/goharbor/harbor], a github action workflow will trigger the creation of a [Uffizzi](https://www.uffizzi.com) ephemeral environment. This environment is a Kubernetes cluster where harbor will be deployed built from the changes in the pull request.

The ingress to the frontend for harbor will also be available in a comment posted by the github action. To log into the instance of harbor use the following credentials :- 

```
username: admin
password: Harbor12345
```

To access the kubernetes cluster you will have to log into Uffizzi from the CLI. For this you will have to install the `uffizzi` cli tool which can be installed from [here](https://docs.uffizzi.com/install/).

Once you have installed the CLI follow the steps below to access the ephemeral kubernetes cluster for your PR.

1. Login to Uffizzi, then select the `harbor` account and project:
```
uffizzi login
```

```
Select an account: 
    ‣ ${{ github.event.repository.name }}
    jdoe

Select a project or create a new project: 
    ‣ ${{ github.event.repository.name }}-6783521
```
2. Update your kubeconfig: `uffizzi cluster update-kubeconfig pr-<pr-number> --kubeconfig=[PATH_TO_KUBECONFIG]`
After updating your kubeconfig, you can manage your cluster with `kubectl`, `kustomize`, `helm`, and other tools that use kubeconfig files: `kubectl get namespace --kubeconfig [PATH_TO_KUBECONFIG]`
