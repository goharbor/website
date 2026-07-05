---
title: Distribuzione di Harbor con disponibilità elevata tramite Helm
weight: 40
---

Puoi distribuire Harbor su Kubernetes tramite helm per renderlo altamente disponibile. In questo modo, se uno dei nodi su cui è in esecuzione Harbor diventa non disponibile, gli utenti non subiscono interruzioni del servizio.

## Prerequisiti

-Cluster Kubernetes 1.10+
-Helm 2.8.0+
- Controller di ingresso ad alta disponibilità (Harbor non gestisce l'endpoint esterno)
- PostgreSQL 9.6+ ad alta disponibilità (Harbor non gestisce la distribuzione di HA del database)
- Redis ad alta disponibilità (Harbor non gestisce la distribuzione di HA di Redis)
  - Tieni presente che Harbor attualmente non supporta cluster Redis o connessioni basate su TLS. Sebbene siano attualmente in corso i lavori per abilitare l'autenticazione basata su TLS.
- PVC che può essere condiviso tra nodi o archiviazione di oggetti esterni
  - Vedere [Architettura](#architecture), ma per consentire la scalabilità di Harbor, ogni funzione/componente deve essere in grado di leggere/scrivere su un volume persistente condiviso.

## Architettura

La maggior parte dei componenti di Harbor ora sono senza stato. Quindi possiamo semplicemente aumentare la replica dei pod per assicurarci che i componenti siano distribuiti su più nodi di lavoro e sfruttare il meccanismo "Servizio" di K8S per garantire la connettività tra i pod.

Per quanto riguarda il livello di archiviazione, si prevede che l'utente fornisca un cluster PostgreSQL e Redis ad alta disponibilità per i dati dell'applicazione, nonché PVC o archiviazione di oggetti per l'archiviazione di immagini e grafici.

![Harbor Alta disponibilità con Helm](../../img/ha.png)

## Scarica il grafico

Scarica la tabella del timone Harbor:

```bash
helm repo add harbor https://helm.goharbor.io
helm fetch harbor/harbor --untar
```

## Configurazione

Configurare i seguenti elementi in `values.yaml`, in alternativa possono essere impostati tramite il flag `--set` durante l'esecuzione di `helm install`:

- **Regola di ingresso**
  - Configurare l'url`expose.ingress.hosts.core` di ingresso.
- **URL esterno**
  - Configurare l'URL `externalURL`, questo viene utilizzato per popolare i comandi docker/helm mostrati sul portale nonché l'URL del servizio token restituito ai client docker.
    Tieni presente che l'URL deve essere una radice del dominio, ad es. `harbor.example.com`, il timone del porto non supporta la corsa su un sentiero. Vedi [questa discussione](https://github.com/goharbor/harbor-helm/discussions/1323).
- **PostgreSQL esterno**
  - Impostare `database.type` su `external` e inserire le informazioni nella sezione `database.external`.
  - È necessario creare un database vuoto, di default il database è impostato su `registry`, questo tuttavia può essere modificato impostando `coreDatabase`.
- **Redis esterno**
  - Impostare `redis.type` su `external` e inserire le informazioni nella sezione `redis.external`.
  - Harbor ha introdotto il supporto della modalità Redis `Sentinel` nella versione 2.1.0. Per abilitare impostare `sentinelMasterSet` e `host` utilizzando il seguente schema `<host_sentinel1>:<port_sentinel1>,<host_sentinel2>:<port_sentinel2>,<host_sentinel3>:<port_sentinel3>`. Puoi anche fare riferimento a questo [guida](https://community.pivotal.io/s/article/How-to-setup-HAProxy-and-Redis-Sentinel-for-automatic-failover-between-Redis-Master-and-Slave-servers) per configurare un HAProxy prima di Redis per esporre un singolo punto di ingresso.
  - Come indicato nei prerequisiti, Harbor attualmente non supporta TLS o Redis Clustering.
- **Magazzinaggio**
  - Si consiglia di utilizzare un `StorageClass` che supporti la condivisione tra nodi in modo `ReadWriteMany` per fornire volumi per archiviare immagini, grafici e registri di lavoro, ciò consente il ridimensionamento dei componenti per soddisfare la domanda. Se tale tipo di volume non è la storageClass predefinita, sarà necessario impostarla nelle seguenti posizioni:
    -`persistence.persistentVolumeClaim.registry.storageClass`
    -`persistence.persistentVolumeClaim.jobservice.storageClass`.
  - Se si utilizza un `StorageClass` di questo tipo, è necessario impostare l'accessMode associato `ReadWriteMany` per i seguenti campi: 
    -`persistence.persistentVolumeClaim.registry.accessMode`
    -`persistence.persistentVolumeClaim.jobservice.accessMode`
  - In alternativa, utilizzare i PVC esistenti per archiviare i dati impostando:
    -`persistence.persistentVolumeClaim.registry.existingClaim`
    -`persistence.persistentVolumeClaim.jobservice.existingClaim`
  - Infine, se non si dispone di StorageClass che supporti `ReadWriteMany` o non si desidera, è possibile utilizzare l'archiviazione di oggetti esterni per archiviare immagini e grafici e archiviare i registri dei lavori nel database. Per abilitare la memorizzazione di oggetti esterni impostare `persistence.imageChartStorage.type` sul valore che si desidera utilizzare e riempire la sezione corrispondente e impostare `jobservice.jobLogger` su `database`.
    - Nota: per coloro che desiderano utilizzare S3, il supporto IRSA è in corso a monte.
    - Un esempio di policy AWS IAM è disponibile [a monte](https://distribution.github.io/distribution/storage-drivers/s3/)

- **Replica**
  - Impostare `portal.replicas`, `core.replicas`, `jobservice.replicas`, `registry.replicas` su `n`(`n`>=2).

## Installazione

Installa la carta timone Harbor con un nome di versione `my-release`:

Helm2:

```bash
helm install --name my-release harbor/
```

Helm3:

```bash
helm install my-release harbor/
```

