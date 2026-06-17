---
title: Harbor Prerequisiti di installazione
weight: 20
---

Harbor può essere distribuito su un host Docker utilizzando Docker Compose o su un cluster Kubernetes utilizzando Helm.

### Requisiti di risorse

La tabella seguente illustra i requisiti di risorse minimi e consigliati per la distribuzione di Harbor.

| Risorsa | Minimo | Consigliato |
|----------|---------|-------------|
| CPU | 2CPU | 4CPU |
| Mem | 4GB | 8GB |
| Disco | 40GB | 160GB |

### Requisiti dello stack software Componi

Nella tabella seguente sono elencate le versioni software che devono essere installate sull'host di destinazione.

| Software | Versione | Descrizione |
|----------------|----------------------|-----------------------------------------------------------------------|
| Docker Motore | Versione > 20.10 | [Docker Installazione del motore](https://docs.docker.com/engine/install/) |
| Docker Componi | Docker componi > 2.3 | Docker Compose fa parte di Docker Engine |
| OpenSSL | Ultime (facoltativo) | Utilizzato per generare certificato e chiavi per Harbor |

### Porte di rete

Harbor richiede che le seguenti porte siano aperte sull'host di destinazione.

| Porto | Protocollo | Descrizione |
|------|----------|--------------------------------------------------------------------------------------------------------------------|
| 443| HTTPS | Il portale Harbor e il core API accettano richieste HTTPS su questa porta. È possibile modificare questa porta nel file di configurazione. |
| 80| HTTP | Il portale Harbor e il core API accettano richieste HTTP su questa porta. È possibile modificare questa porta nel file di configurazione.  |


## Installa Harbor su Kubernetes 

Per installare docker con Helm consultare il repository dedicato [github.com/goharbor/harbor-helm](https://github.com/goharbor/harbor-helm)

## Passaggi successivi

[Scarica il programma di installazione Harbor](download-installer.md).
