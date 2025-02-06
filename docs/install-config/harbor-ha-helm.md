---
title: Deploying Harbor with High Availability via Helm
weight: 40
---

You can deploy Harbor on Kubernetes via helm to make it highly available. In this way, if one of the nodes on which Harbor is running becomes unavailable, users do not experience interruptions of service.

## Prerequisites

- Kubernetes cluster 1.10+
- Helm 2.8.0+
- Highly available ingress controller (Harbor does not manage the external endpoint)
- Highly available PostgreSQL 9.6+ (Harbor does not handle the deployment of HA of database)
- Highly available Redis (Harbor does not handle the deployment of HA of Redis)
  - Please note that Harbor presently doesnt support Redis Clusters or TLS based connections. Although work is currently underway to enable TLS based authentication.
- PVC that can be shared across nodes or external object storage
  - See [Architecture](#architecture), but to allow harbor to scale, each function/component needs to be able to read/write to a shared persistent volume.

## Architecture

Most of Harbor's components are stateless now. So we can simply increase the replica of the pods to make sure the components are distributed to multiple worker nodes, and leverage the "Service" mechanism of K8S to ensure the connectivity across pods.

As for the storage layer, it is expected that the user provides a highly available PostgreSQL and Redis cluster for application data, as well as PVCs or object storage for storing images and charts.

![Harbor High Availability with Helm](../../img/ha.png)

## Download Chart

Download Harbor helm chart:

```bash
helm repo add harbor https://helm.goharbor.io
helm fetch harbor/harbor --untar
```

## Configuration

Configure the followings items in `values.yaml`, alternatively they can be set via `--set` flag during running `helm install`:

- **Ingress Rule**
  - Configure the ingress url`expose.ingress.hosts.core`.
- **External URL**
  - Configure the url `externalURL`, this is used to populate the docker/helm commands shown on portal as well as the token service URL returned to docker clients.
- **External PostgreSQL**
  - Set `database.type` to `external` and fill the information in `database.external` section.
  - An empty database needs to be created, by default the database is set to `registry`, this however can be changed by setting `coreDatabase`.
- **External Redis**
  - Set the `redis.type` to `external` and fill the information in `redis.external` section.
  - Harbor introduced redis `Sentinel` mode support in 2.1.0. To enable set `sentinelMasterSet` and `host` using the following pattern `<host_sentinel1>:<port_sentinel1>,<host_sentinel2>:<port_sentinel2>,<host_sentinel3>:<port_sentinel3>`. You can also refer to this [guide](https://community.pivotal.io/s/article/How-to-setup-HAProxy-and-Redis-Sentinel-for-automatic-failover-between-Redis-Master-and-Slave-servers) to setup a HAProxy before Redis to expose a single entry point.
  - As noted in the prerequisites Harbor doesn't currently support TLS or Redis Clustering.
- **Storage**
  - It's recommended that a `StorageClass` that supports sharing across nodes in a `ReadWriteMany` manner to provision volumes to store images, charts and job logs is used, this allows for scaling of components to meet demand. If such a volume type isn't your default storageClass, this will need to be set in the following locations:
    - `persistence.persistentVolumeClaim.registry.storageClass`
    - `persistence.persistentVolumeClaim.chartmuseum.storageClass`
    - `persistence.persistentVolumeClaim.jobservice.storageClass`.
  - If such a `StorageClass` is used, the associated accessMode needs to be set `ReadWriteMany` for the following fields: 
    - `persistence.persistentVolumeClaim.registry.accessMode`
    - `persistence.persistentVolumeClaim.chartmuseum.accessMode`
    - `persistence.persistentVolumeClaim.jobservice.accessMode`
  - Alternatively, use existing PVCs to store data by setting:
    - `persistence.persistentVolumeClaim.registry.existingClaim`
    - `persistence.persistentVolumeClaim.chartmuseum.existingClaim`
    - `persistence.persistentVolumeClaim.jobservice.existingClaim`
  - Finally, if you have no StorageClass that supports `ReadWriteMany` or don't wish to, external object storage can be used instead to store images and charts and store the job logs in database. To enable external object storage set the `persistence.imageChartStorage.type` to the value you want to use and fill the corresponding section and set `jobservice.jobLogger` to `database`.
    - Note: For those whom wish to use S3, IRSA support is in progress upstream.
    - An example AWS IAM policy is available [upstream](https://distribution.github.io/distribution/storage-drivers/s3/)

- **Replica**
  - Set `portal.replicas`, `core.replicas`, `jobservice.replicas`, `registry.replicas`, `chartmuseum.replicas`, to `n`(`n`>=2).

## Installation

Install the Harbor helm chart with a release name `my-release`:

Helm 2:

```bash
helm install --name my-release harbor/
```

Helm 3:

```bash
helm install my-release harbor/
```
