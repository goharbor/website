---
title: Harbor Installation Prerequisites
weight: 20
---

Harbor can be deployed to a Docker host using Docker Compose, or to a Kubernetes cluster using Helm.

### Resource Requirement

The table below outlines the minimum and recommended resource requirement for deploying Harbor.

| Resource | Minimum | Recommended |
|----------|---------|-------------|
| CPU      | 2 CPU   | 4 CPU       |
| Mem      | 4 GB    | 8 GB        |
| Disk     | 40 GB   | 160 GB      |

### Software Stack Requirements Compose

The following table lists the software versions that must be installed on the target host.

| Software       | Version              | Description                                                           |
|----------------|----------------------|-----------------------------------------------------------------------|
| Docker Engine  | Version > 20.10      | [Docker Engine Installation](https://docs.docker.com/engine/install/) |
| Docker Compose | Docker compose > 2.3 | Docker Compose is part of Docker Engine                               |
| OpenSSL        | Latest (optional)    | Used to generate certificate and keys for Harbor                      |

### Network ports

Harbor requires that the following ports be open on the target host.

| Port | Protocol | Description                                                                                                        |
|------|----------|--------------------------------------------------------------------------------------------------------------------|
| 443  | HTTPS    | Harbor portal and core API accept HTTPS requests on this port. You can change this port in the configuration file. |
| 80   | HTTP     | Harbor portal and core API accept HTTP requests on this port. You can change this port in the configuration file.  |


## Install Harbor on Kubernetes 

To install docker with Helm, see the dedicated repository [github.com/goharbor/harbor-helm](https://github.com/goharbor/harbor-helm)

## Next Steps

[Download the Harbor Installer](download-installer.md).
