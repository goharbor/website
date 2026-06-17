---
title: Metriche di accesso
weight: 37
---

Harbor espone alcuni parametri chiave necessari agli operatori e agli amministratori per monitorare il modo in cui l'istanza Harbor viene eseguita in tempo reale. L'osservabilità è una caratteristica fondamentale per il funzionamento di un servizio in produzione e utilizzando questi dati è possibile identificare stati anomali e prendere decisioni informate per risolvere i problemi quando si verifica un errore. Harbor espone i parametri utilizzando [Modello dati Prometeo](https://prometheus.io/docs/concepts/data_model/) in modo da poter iniziare facilmente ad analizzare i parametri della tua istanza Harbor utilizzando Prometheus.

In Harbor v2.2 e versioni successive puoi abilitare le metriche nel tuo Harbor [file di configurazione](../../install-config/configure-yml-file.md). Le metriche Harbor sono disponibili su `<harbor_instance>:<metrics_port>/<metrics_path>` in base ai valori configurati.

Le metriche Harbor mostrano i dati relativi a
* Informazioni di runtime da [VAI biblioteca](https://github.com/prometheus/client_golang)
* Metriche delle prestazioni su tutte le richieste API nel core
* Numero di richieste in volo in core
* Metriche fornite dallo stesso [Distribuzione/Distribuzione](https://github.com/distribution/distribution/blob/main/notifications/metrics.go)
* Alcuni dati relativi alla logica aziendale già esistenti nel database Harbor

Le metriche sono esposte da diversi componenti Harbor: `exporter`, `core`, `jobservice` e `registry`. Oltre ai dati di runtime e prestazioni, questi componenti espongono anche metriche specifiche di Harbor. Le sezioni seguenti elencano le metriche Harbor disponibili.

## Metriche dell'esportatore Harbor

Le metriche del componente `exporter` si riferiscono alla configurazione dell'istanza Harbor e raccolgono alcuni dati dal database Harbor. Le metriche sono disponibili su `<harbor_instance>:<metrics_port>/<metrics_path>`.

{{< table caption="Metrics exposed by the Harbor Exporter" >}}
Nome | Descrizione | Etichette (Valori) | Tipo metrico
:---------|:------------|:-------|:-------
`harbor_project_total` |	Numero totale di progetti pubblici e privati ​​| pubblico (`true`,`false`) | misura
`harbor_project_repo_total` |	Numero totale di repository in un progetto |	pubblico (`true`,`false`), nome_progetto | misura
`harbor_project_member_total` |	Numero totale di membri in un progetto |	nome_progetto | misura
`harbor_project_quota_usage_byte` |	Totale risorse utilizzate di un progetto |	nome_progetto | misura
`harbor_project_quota_byte` |	Quota fissata in un progetto |	nome_progetto | misura
`harbor_artifact_pulled` |	Numero di immagini estratte in un progetto |	nome_progetto | misura
`harbor_project_artifact_total` | Numero totale di tipi di artefatti in un progetto | tipo_artefatto , nome_progetto, pubblico (`true`,`false`) | misura
`harbor_health` | Stato attuale di Harbor | | misura
`harbor_system_info` | Informazioni sulla tua istanza Harbor | modalità_autenticazione (`db_auth`, `ldap_auth`, `uaa_auth`, `http_auth`, `oidc_auth`), versione_porto, auto_registrazione (`true`,`false`) | misura
`harbor_up`| Stato di funzionamento dei componenti Harbor | componente (`core`, `database`, `jobservice`, `portal`, `redis`, `registry`, `registryctl`, `trivy`) | misura
`harbor_task_queue_size` | Il numero totale di attività per tipo nella coda | istanza, lavoro, tipo | misura
`harbor_task_queue_latency` | Quanto tempo fa è stato accodato il lavoro successivo da elaborare per tipo | istanza, lavoro, tipo | misura
`harbor_task_scheduled_total` | 	Numero di attività pianificate | istanza, lavoro | misura
`harbor_task_concurrency` | 	Numero totale di attività simultanee per tipo in un pool | istanza, lavoro, pool, tipo | misura
{{< /table >}}

## Harbor Metriche fondamentali

Quelli che seguono sono i parametri estratti dal core pod Harbor e sono disponibili su `<harbor_instance>:<metrics_port>/<metrics_path>?comp=core`.

{{< table caption="Metrics exposed by Harbor Core" >}}
Nome | Descrizione | Etichette (Valori) | Tipo metrico
:---------|:------------|:-------|:-------
`harbor_core_http_inflight_requests` | Il numero totale di richieste | operazione (valori da `operationId` in [Harbor API](https://github.com/goharbor/harbor/blob/main/api/v2.0/swagger.yaml). Alcuni endpoint legacy non hanno un `operationId`, quindi il valore dell'etichetta è `unknown`) | misura
`harbor_core_http_request_duration_seconds` | La durata temporale delle richieste | metodo (`GET`, `POST`, `HEAD`, `PATCH`, `PUT`), operazione (valori da `operationId` in [Harbor API](https://github.com/goharbor/harbor/blob/main/api/v2.0/swagger.yaml). Alcuni endpoint legacy non hanno un `operationId`, quindi il valore dell'etichetta è `unknown`), quantile | riepilogo
`harbor_core_http_request_total` | Il numero totale di richieste | metodo (`GET`, `POST`, `HEAD`, `PATCH`, `PUT`), operazione (valori da `operationId` in [Harbor API](https://github.com/goharbor/harbor/blob/main/api/v2.0/swagger.yaml). Alcuni endpoint legacy non hanno un `operationId`, quindi il valore dell'etichetta è `unknown`) | contatore
{{< /table >}}

## Metriche del registro

I seguenti sono parametri estratti dalla Distribuzione/Distribuzione e sono disponibili su `<harbor_instance>:<metrics_port>/<metrics_path>?comp=registry`.

{{< table caption="Metrics exposed by Harbor Core" >}}
Nome | Descrizione | Etichette (valori) |Tipo metrico
:---------|:------------|:-------|:-------
`registry_http_in_flight_requests` | Il HTTP in volo richiede | gestore | misura
`registry_http_request_duration_seconds_bucket` `registry_http_request_duration_seconds_sum` `registry_http_request_duration_seconds_count` | Il HTTP richiede latenze in secondi | gestore, metodo (`GET`, `POST`, `HEAD`, `PATCH`, `PUT`), le | istogramma
`registry_http_request_size_bytes_bucket registry_http_request_size_bytes_sum registry_http_request_size_bytes_count` | Le dimensioni richieste da HTTP sono in byte | gestore, le | istogramma
`registry_http_requests_total` | Numero totale di richieste HTTP effettuate | codice,gestore,metodo,le | contatore
`registry_http_response_size_bytes_bucket` `registry_http_response_size_bytes_sum` `registry_http_response_size_bytes_count` | Le dimensioni della risposta HTTP sono in byte | gestore,le | istogramma
`registry_storage_action_seconds_bucket` `registry_storage_action_seconds_sum` `registry_storage_action_seconds_count`| Il numero di secondi impiegati dall'azione di archiviazione | azione,autista,le | istogramma
`registry_storage_cache_total` | Il numero di richieste di cache ricevute | digitare | misura
{{< /table >}}

## Harbor Metriche del servizio di lavoro

Di seguito sono riportati i parametri estratti dal Jobservice Harbor e disponibili presso `<harbor_instance>:<metrics_port>/<metrics_path>?comp=jobservice`.

{{< table caption="Metrics exposed by Harbor Jobservice" >}}
Nome | Descrizione | Etichette (valori) |Tipo metrico
:---------|:------------|:-------|:-------
`harbor_jobservice_info` |  Le informazioni di Jobservice | istanza, lavoro, nodo, pool, lavoratori | misura
`harbor_jobservice_task_total` |  Il numero di attività elaborate per tipo di lavoro | istanza, lavoro, stato, tipo | contatore
`harbor_jobservice_task_process_time_seconds` | La durata del tempo di elaborazione dell'attività | istanza, lavoro, quantile, stato, tipo | riepilogo

{{< /table >}}



## Raschiare le metriche con Prometeo

Per iniziare ad accedere ai parametri della tua istanza Harbor con Prometheus,
1. Abilita le metriche di esposizione nel tuo `harbor.yml` [file di configurazione](../../install-config/configure-yml-file.md) e imposta la porta e il percorso su cui esporre le metriche. Vedi anche di più su [riconfigurando la tua istanza Harbor](../../install-config/reconfigure-manage-lifecycle/).
1. Configurare un server Prometheus, consultare [Documentazione di Prometeo](https://prometheus.io/docs/prometheus/latest/installation/) per ulteriori informazioni sull'installazione.
1. Configura il file di configurazione di Prometheus per analizzare le metriche Harbor esposte sulla porta e sul percorso configurati. Di seguito è riportato un esempio di configurazione di scrape, consultare la documentazione di Prometheus per tutti gli [raschiare le opzioni di configurazione](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#scrape_config) disponibili.

    ```
      scrape_configs:

        - job_name: 'harbor-exporter'
          scrape_interval: 20s
          static_configs:
            # Scrape metrics from the Harbor exporter component
            - targets: ['<harbor_instance>:<metrics_port>']

        - job_name: 'harbor-core'
          scrape_interval: 20s
          params:
            # Scrape metrics from the Harbor core component
            comp: ['core']
          static_configs:
            - targets: ['<harbor_instance>:<metrics_port>']

        - job_name: 'harbor-registry'
          scrape_interval: 20s
          params:
            # Scrape metrics from the Harbor registry component
            comp: ['registry']
          static_configs:
            - targets: ['<harbor_instance>:<metrics_port>']

        - job_name: 'harbor-jobservice'
          scrape_interval: 20s
          params:
            # Scrape metrics from the Harbor jobservice component
            comp: ['jobservice']
          static_configs:
            - targets: ['<harbor_instance>:<metrics_port>']
      ```
1. Dopo aver configurato il server Prometheus per raccogliere le metriche Harbor, puoi utilizzare [Grafana](https://grafana.com/docs/) per visualizzare i tuoi dati. Nel repository Harbor è disponibile un [esempio dashboard Grafana](https://github.com/goharbor/harbor/blob/main/contrib/grafana-dashboard/metrics-example.json) per aiutarti a iniziare a visualizzare le metriche Harbor.

### Da un cluster Kubernetes

Puoi anche utilizzare Prometheus per raccogliere parametri da un'istanza Harbor distribuita nel tuo cluster Kubernetes. Dovresti già avere [installato Prometeo](https://github.com/prometheus-community/helm-charts) e configurarlo per estrarre i parametri dal tuo cluster.

1. Creare un ServiceMonitor in Prometheus per Harbor.

    ```
    apiVersion: monitoring.coreos.com/v1
    kind: ServiceMonitor
    metadata:
      name: harbor
      labels:
        app: harbor
    spec:
      selector:
        matchLabels:
          app: harbor
      endpoints:
      - port: metrics
    ```

2. Abilita Harbor per esporre le metriche aggiornando il file `values.yaml` del timone del porto e imposta `metrics.enabled` su `true`. Puoi anche modificare il porto e il percorso su cui sono esposti i parametri aggiornando la carta porto-timone disponibile [opzioni di configurazione per le metriche](https://github.com/goharbor/harbor-helm#configuration).

Prometheus dovrebbe ora mostrare i parametri della tua istanza Harbor.
