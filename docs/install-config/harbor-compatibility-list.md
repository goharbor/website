---
title: Harbor Compatibility List
weight: 15
---

This document provides compatibility information for all Harbor components.

## Replication Adapters

|     | Registries       | Pull Mode | Push Mode | Proxy Cache | Introduced in Release | Automated Pipeline Covered |
|-----|------------------|-----------|-----------|-----------------------|-----------------------|---------------------------|
| [Harbor](https://goharbor.io/)|  ![Harbor](../../img/replication-adapters/harbor-logo.png)|![Y](../../img/replication-adapters/right.png)|![Y](../../img/replication-adapters/right.png)|![Y](../../img/replication-adapters/right.png)| V1.8 | ![Y](../../img/replication-adapters/right.png) |
| [distribution](https://github.com/distribution/distribution) | ![distribution](../../img/replication-adapters/distribution.png)|![Y](../../img/replication-adapters/right.png)|![Y](../../img/replication-adapters/right.png)|![Y](../../img/replication-adapters/right.png)| V1.8 | ![Y](../../img/replication-adapters/right.png) |
| [docker hub](https://hub.docker.com/) | ![docker hub](../../img/replication-adapters/docker-hub.png)|![Y](../../img/replication-adapters/right.png)|![Y](../../img/replication-adapters/right.png)|![Y](../../img/replication-adapters/right.png)| V1.8 | ![Y](../../img/replication-adapters/right.png) |
| [Huawei SWR](https://www.huaweicloud.com/en-us/product/swr.html) | ![Huawei SWR](../../img/replication-adapters/hw.png)|![Y](../../img/replication-adapters/right.png)|![Y](../../img/replication-adapters/right.png)| ![N](../../img/replication-adapters/no.png) |V1.8 | ![N](../../img/replication-adapters/no.png) |
| [GCR](https://cloud.google.com/container-registry/) | ![GCR](../../img/replication-adapters/gcr.png)|![Y](../../img/replication-adapters/right.png)|![Y](../../img/replication-adapters/right.png)| ![Y](../../img/replication-adapters/right.png)|V1.9 | ![Y](../../img/replication-adapters/right.png) |
| [ECR](https://aws.amazon.com/ecr/) | ![ECR](../../img/replication-adapters/ecr.png)|![Y](../../img/replication-adapters/right.png)|![Y](../../img/replication-adapters/right.png)|![Y](../../img/replication-adapters/right.png)| V1.9 | ![Y](../../img/replication-adapters/right.png) |
| [ACR](https://azure.microsoft.com/en-us/services/container-registry/) | ![ACR](../../img/replication-adapters/acr.png)|![Y](../../img/replication-adapters/right.png)|![Y](../../img/replication-adapters/right.png)|![Y](../../img/replication-adapters/right.png)| V1.9 | ![N](../../img/replication-adapters/no.png) |
| [AliCR](https://www.alibabacloud.com/product/container-registry) | ![AliCR](../../img/replication-adapters/ali-cr.png)|![Y](../../img/replication-adapters/right.png)|![Y](../../img/replication-adapters/right.png)| ![N](../../img/replication-adapters/no.png) | V1.9 | ![N](../../img/replication-adapters/no.png) |
| [Artifact Hub](https://artifacthub.io/) | ![Artifact Hub](../../img/replication-adapters/artifacthub.png)|![Y](../../img/replication-adapters/right.png)| ![N](../../img/replication-adapters/no.png) |![N](../../img/replication-adapters/no.png) | V2.2 | ![N](../../img/replication-adapters/no.png) |
| [Artifactory](https://jfrog.com/artifactory/) | ![Artifactory](../../img/replication-adapters/artifactory.png)|![Y](../../img/replication-adapters/right.png)| ![Y](../../img/replication-adapters/right.png) |![Y](../../img/replication-adapters/right.png)| V1.10 | ![N](../../img/replication-adapters/no.png) |
| [Quay](https://github.com/quay/quay) | ![Quay](../../img/replication-adapters/quay.png)|![Y](../../img/replication-adapters/right.png)| ![Y](../../img/replication-adapters/right.png) | ![Y](../../img/replication-adapters/right.png)|V1.10 | ![N](../../img/replication-adapters/no.png) |
| [GitLab Registry](https://docs.gitlab.com/ee/user/packages/container_registry/) | ![GitLab Registry](../../img/replication-adapters/gitlab.png)|![Y](../../img/replication-adapters/right.png)| ![Y](../../img/replication-adapters/right.png) | ![N](../../img/replication-adapters/no.png) | V1.10 | ![N](../../img/replication-adapters/no.png) |

{{< note >}}
* `Pull` mode replicates artifacts from the specified source registries into Harbor.
* `Push` mode replicates artifacts from Harbor to the specified target registries.
* `Proxy Cache` means the replication adapter can be used as a proxy cache registry.
{{< /note >}}

## OIDC Adapters

|   |  OIDC Providers | Officially Verified | End User Verified   | Verified in Release |
|---|-----------------|---------------------|---------------------|-----------------------|
| [Google Identity](https://developers.google.com/identity/protocols/OpenIDConnect) | ![google identity](../../img/OIDC/google-identity.png)| ![Y](../../img/replication-adapters/right.png) |  |V1.9|
| [Dex](https://github.com/dexidp/dex) | ![dex](../../img/OIDC/dex.png) | ![Y](../../img/replication-adapters/right.png)| | V1.9 |
| [Ping Identity](https://www.pingidentity.com) | ![ping identity](../../img/OIDC/ping.png) | | ![Y](../../img/replication-adapters/right.png)| V1.9 |
| [Keycloak](https://www.keycloak.org/) | ![Keycloak](../../img/OIDC/keycloak.png) | ![Y](../../img/replication-adapters/right.png) | | V1.10 |
| [Auth0](https://auth0.com/) | ![Auth0](../../img/OIDC/auth0.png) | ![Y](../../img/replication-adapters/right.png) | | V1.10 |

## Scanner Adapters

|   | Scanners | Providers | Evaluated | As Default | Onboard in Release |
|---|----------|-----------|-----------|------------|--------------------|
| [Clair](https://github.com/goharbor/harbor-scanner-clair)    |![Clair](../../img/scanners/clair.png)| CentOS    |![Y](../../img/replication-adapters/right.png)| (removed as default in v2.2)| v1.10 |
| [Anchore](https://github.com/anchore/harbor-scanner-adapter) |![Anchore](../../img/scanners/anchore.png)   | Anchore    |![Y](../../img/replication-adapters/right.png)|  | v1.10 |
| [Trivy](https://github.com/aquasecurity/harbor-scanner-trivy)|![Trivy](../../img/scanners/trivy.png)| Aqua    |![Y](../../img/replication-adapters/right.png)| ![Y](../../img/replication-adapters/right.png) | v1.10 |
| [CSP](https://github.com/aquasecurity/harbor-scanner-aqua)   |![Aqua](../../img/scanners/aqua.png)| Aqua    | ![Y](../../img/replication-adapters/right.png) |  | v1.10 |
| [DoSec](https://github.com/dosec-cn/harbor-scanner/blob/master/README_en.md)|![DoSec](../../img/scanners/dosec.png)    | DoSec    | ![Y](../../img/replication-adapters/right.png) |  | v1.10 |
| [Sysdig Secure](https://github.com/sysdiglabs/harbor-scanner-sysdig-secure) |![Sysdig](../../img/scanners/sysdig.png) | Sysdig  | ![Y](../../img/replication-adapters/right.png) |  | v2.1.0 |
| [TensorSecurity](https://github.com/tensorsecurity/harbor-scanner) |![TensorSecurity](../../img/scanners/tensorsecurity.png) | TensorSecurity | ![Y](../../img/replication-adapters/right.png) |  | v2.2.0 |
| [ArksecScanner](https://github.com/arksec-cn)    |![Arksec](../../img/scanners/arksec.png)| Arksec    |![Y](../../img/replication-adapters/right.png)| | v2.4.0 |
| [Cyberwatch](https://github.com/Cyberwatch)    |![Cyberwatch](../../img/scanners/cyberwatch.png)| [Cyberwatch](https://cyberwatch.fr/integrate-with-harbor-scans)    |![N](../../img/replication-adapters/no.png)|  | v2.8.0 |


{{< note >}}
* `Evaluated` means that the scanner implementation has been officially tested and verified.
* `As Default` means that the scanner is provided as a default option and can be deployed together with the main Harbor components by providing extra options during installation. You must install other scanners manually.
{{< /note >}}
