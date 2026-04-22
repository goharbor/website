---
title: Elenco compatibilità Harbor
weight: 15
---

Questo documento fornisce informazioni sulla compatibilità per tutti i componenti Harbor.

## Adattatori di replica

|     | Registri | Modalità di tiro | Modalità push | Cache proxy | Introdotto nella versione | Pipeline automatizzata coperta |
|-----|------------------|-----------|-----------|-----------------------|-----------------------|---------------------------|
| [Harbor](https://goharbor.io/)|  ![Harbor](../../img/replication-adapters/harbor-logo.png)|![Y](../../img/replication-adapters/right.png)|![Y](../../img/replication-adapters/right.png)|![Y](../../img/replication-adapters/right.png)| V1.8 | ![Y](../../img/replication-adapters/right.png) |
| [distribuzione](https://github.com/distribution/distribution) | ![distribuzione](../../img/replication-adapters/distribution.png)|![Y](../../img/replication-adapters/right.png)|![Y](../../img/replication-adapters/right.png)|![Y](../../img/replication-adapters/right.png)| V1.8 | ![Y](../../img/replication-adapters/right.png) |
| [hub della finestra mobile](https://hub.docker.com/) | ![hub della finestra mobile](../../img/replication-adapters/docker-hub.png)|![Y](../../img/replication-adapters/right.png)|![Y](../../img/replication-adapters/right.png)|![Y](../../img/replication-adapters/right.png)| V1.8 | ![Y](../../img/replication-adapters/right.png) |
| [Huawei SWR](https://www.huaweicloud.com/en-us/product/swr.html) | ![Huawei SWR](../../img/replication-adapters/hw.png)|![Y](../../img/replication-adapters/right.png)|![Y](../../img/replication-adapters/right.png)| ![N](../../img/replication-adapters/no.png) |V1.8 | ![N](../../img/replication-adapters/no.png) |
| [GCR](https://cloud.google.com/container-registry/) | ![GCR](../../img/replication-adapters/gcr.png)|![Y](../../img/replication-adapters/right.png)|![Y](../../img/replication-adapters/right.png)| ![Y](../../img/replication-adapters/right.png)|V1.9 | ![Y](../../img/replication-adapters/right.png) |
| [Raccolta](https://aws.amazon.com/ecr/) | ![Raccolta](../../img/replication-adapters/ecr.png)|![Y](../../img/replication-adapters/right.png)|![Y](../../img/replication-adapters/right.png)|![Y](../../img/replication-adapters/right.png)| V1.9 | ![Y](../../img/replication-adapters/right.png) |
| [ACR](https://azure.microsoft.com/en-us/services/container-registry/) | ![ACR](../../img/replication-adapters/acr.png)|![Y](../../img/replication-adapters/right.png)|![Y](../../img/replication-adapters/right.png)|![Y](../../img/replication-adapters/right.png)| V1.9 | ![N](../../img/replication-adapters/no.png) |
| [AliCR](https://www.alibabacloud.com/product/container-registry) | ![AliCR](../../img/replication-adapters/ali-cr.png)|![Y](../../img/replication-adapters/right.png)|![Y](../../img/replication-adapters/right.png)| ![N](../../img/replication-adapters/no.png) | V1.9 | ![N](../../img/replication-adapters/no.png) |
| [Hub degli artefatti](https://artifacthub.io/) | ![Hub degli artefatti](../../img/replication-adapters/artifacthub.png)|![Y](../../img/replication-adapters/right.png)| ![N](../../img/replication-adapters/no.png) |![N](../../img/replication-adapters/no.png) | V2.2 | ![N](../../img/replication-adapters/no.png) |
| [Artifabbricante](https://jfrog.com/artifactory/) | ![Artifabbricante](../../img/replication-adapters/artifactory.png)|![Y](../../img/replication-adapters/right.png)| ![Y](../../img/replication-adapters/right.png) |![Y](../../img/replication-adapters/right.png)| V1.10 | ![N](../../img/replication-adapters/no.png) |
| [Banchina](https://github.com/quay/quay) | ![Banchina](../../img/replication-adapters/quay.png)|![Y](../../img/replication-adapters/right.png)| ![Y](../../img/replication-adapters/right.png) | ![Y](../../img/replication-adapters/right.png)|V1.10 | ![N](../../img/replication-adapters/no.png) |
| [Registro GitLab](https://docs.gitlab.com/ee/user/packages/container_registry/) | ![Registro GitLab](../../img/replication-adapters/gitlab.png)|![Y](../../img/replication-adapters/right.png)| ![Y](../../img/replication-adapters/right.png) | ![N](../../img/replication-adapters/no.png) | V1.10 | ![N](../../img/replication-adapters/no.png) |

{{< note >}}
* La modalità `Pull` replica gli artefatti dai registri di origine specificati in Harbor.
* La modalità `Push` replica gli artefatti da Harbor ai registri di destinazione specificati.
* `Proxy Cache` significa che l'adattatore di replica può essere utilizzato come cache proxy registry.
{{< /note >}}

## Adattatori OIDC

|   |  Fornitori OIDC | Verificato ufficialmente | Utente finale verificato | Verificato nella versione |
|---|-----------------|---------------------|---------------------|-----------------------|
| [Identità Google](https://developers.google.com/identity/protocols/OpenIDConnect) | ![identità di Google](../../img/OIDC/google-identity.png)| ![Y](../../img/replication-adapters/right.png) |  |V1.9|
| [Dex](https://github.com/dexidp/dex) | ![dex](../../img/OIDC/dex.png) | ![Y](../../img/replication-adapters/right.png)| | V1.9 |
| [Ping Identità](https://www.pingidentity.com) | ![identità del ping](../../img/OIDC/ping.png) | | ![Y](../../img/replication-adapters/right.png)| V1.9 |
| [Mantello Chiave](https://www.keycloak.org/) | ![Mantello Chiave](../../img/OIDC/keycloak.png) | ![Y](../../img/replication-adapters/right.png) | | V1.10 |
| [Aut0](https://auth0.com/) | ![Aut0](../../img/OIDC/auth0.png) | ![Y](../../img/replication-adapters/right.png) | | V1.10 |

## Adattatori per scanner

|   | Scanner | Fornitori | Valutato | Come predefinito | A bordo nel rilascio |
|---|----------|-----------|-----------|------------|--------------------|
| [Chiara](https://github.com/goharbor/harbor-scanner-clair) |![Chiara](../../img/scanners/clair.png)| CentOS |![Y](../../img/replication-adapters/right.png)| (rimosso come impostazione predefinita nella v2.2)| v1.10 |
| [Ancora](https://github.com/anchore/harbor-scanner-adapter) |![Ancora](../../img/scanners/anchore.png) | Ancora |![Y](../../img/replication-adapters/right.png)|  | v1.10 |
| [Trivy](https://github.com/aquasecurity/harbor-scanner-trivy)|![Trivy](../../img/scanners/trivy.png)| Acqua |![Y](../../img/replication-adapters/right.png)| ![Y](../../img/replication-adapters/right.png) | v1.10 |
| [CSP](https://github.com/aquasecurity/harbor-scanner-aqua) |![Acqua](../../img/scanners/aqua.png)| Acqua | ![Y](../../img/replication-adapters/right.png) |  | v1.10 |
| [DoSec](https://github.com/dosec-cn/harbor-scanner/blob/master/README_en.md)|![DoSec](../../img/scanners/dosec.png) | DoSec | ![Y](../../img/replication-adapters/right.png) |  | v1.10 |
| [Sysdig sicuro](https://github.com/sysdiglabs/harbor-scanner-sysdig-secure) |![Sysdig](../../img/scanners/sysdig.png) | Sysdig | ![Y](../../img/replication-adapters/right.png) |  | v2.1.0 |
| [TensorSecurity](https://github.com/tensorsecurity/harbor-scanner) |![TensorSecurity](../../img/scanners/tensorsecurity.png) | TensorSecurity | ![Y](../../img/replication-adapters/right.png) |  | v2.2.0 |
| [ArksecScanner](https://github.com/arksec-cn) |![Arksec](../../img/scanners/arksec.png)| Arksec |![Y](../../img/replication-adapters/right.png)| | v2.4.0 |
| [Cyberwatch](https://github.com/Cyberwatch) |![Cyberwatch](../../img/scanners/cyberwatch.png)| [Cyberwatch](https://cyberwatch.fr/integrate-with-harbor-scans) |![Y](../../img/replication-adapters/right.png)|  | v2.8.0 |


{{< note >}}
* `Evaluated` significa che l'implementazione dello scanner è stata ufficialmente testata e verificata.
* `As Default` significa che lo scanner viene fornito come opzione predefinita e può essere utilizzato insieme ai componenti principali Harbor fornendo opzioni aggiuntive durante l'installazione. È necessario installare manualmente gli altri scanner.
{{< /note >}}
