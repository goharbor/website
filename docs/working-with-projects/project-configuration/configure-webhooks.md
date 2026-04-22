---
title: Configura le notifiche Webhook
weight: 45
---

Se sei un amministratore di progetto, puoi configurare una connessione da un progetto in Harbor a un endpoint webhook. Se configuri i webhook, Harbor notifica all'endpoint del webhook determinati eventi che si verificano nel progetto. I webhook consentono di integrare Harbor con altri strumenti per semplificare i processi di integrazione e sviluppo continui.

L'azione intrapresa dopo aver ricevuto una notifica da un progetto Harbor dipende dai processi di integrazione e sviluppo continui. Ad esempio, configurando Harbor per inviare una richiesta `POST` a un ascoltatore webhook su un endpoint di tua scelta, puoi attivare una compilazione e una distribuzione di un'applicazione ogni volta che viene apportata una modifica a un'immagine nel repository.

### Eventi supportati

È possibile definire più endpoint webhook per progetto. Harbor supporta attualmente due tipi di endpoint, `HTTP` e `SLACK`. Le notifiche Webhook forniscono informazioni sugli eventi nel formato JSON e vengono recapitate da `HTTP` o `HTTPS POST` a un URL endpoint webhhook esistente o a un indirizzo Slack fornito dall'utente. Sono supportati 2 formati JSON per il payload del webhook, `Default` è il formato che è sempre esistito e la struttura dei dati non è cambiata rispetto alle versioni precedenti, tranne che è stato nominato, `CloudEvents` è il formato che organizza i dati del payload come seguendo le specifiche di [CloudEvents](https://cloudevents.io/). Nella tabella seguente vengono descritti gli eventi che attivano le notifiche e il contenuto di ciascuna notifica.

|Evento|Webhook Tipo evento|Contenuto della notifica|
|---|---|---|
|Invia l'artefatto a registry|`PUSH_ARTIFACT`|Nome dello spazio dei nomi del repository, nome del repository, URL della risorsa, tag, digest del manifest, nome dell'artefatto, timestamp del push, nome utente dell'utente che ha inviato l'artefatto|
|Estrai l'artefatto da registry|`PULL_ARTIFACT`|Nome dello spazio dei nomi del repository, nome del repository, digest del manifest, nome dell'artefatto, timestamp del pull, nome utente dell'utente che ha estratto l'artefatto|
|Elimina artefatto da registry|`DELETE_ARTIFACT`|Nome spazio dei nomi repository, nome repository, digest manifest, nome artefatto, dimensione artefatto, timestamp di eliminazione, nome utente dell'utente che ha eliminato l'immagine|
|Scansione dell'elemento completata|`SCANNING_COMPLETED`|Nome dello spazio dei nomi del repository, nome del repository, tag analizzato, nome dell'elemento, numero di problemi critici, numero di problemi principali, numero di problemi minori, stato dell'ultima scansione, timestamp di completamento della scansione, nome utente dell'utente che ha eseguito la scansione|
|Scansione artefatto interrotta | `SCANNING_STOPPED` | Nome dello spazio dei nomi del repository, nome del repository, tag analizzato, nome dell'elemento, stato della scansione|
|Scansione dell'elemento non riuscita|`SCANNING_FAILED`|Nome dello spazio dei nomi del repository, nome del repository, tag analizzato, nome dell'elemento, errore verificatosi, nome utente dell'utente che ha eseguito la scansione|
|Quota progetto superata|`QUOTA_EXCEED`|Nome spazio dei nomi del repository, nome del repository, tag, digest del manifest, nome dell'artefatto, timestamp del push, nome utente dell'utente che ha inviato l'artefatto|
|Quota progetto vicina alla soglia|`QUOTA_WARNING`|Nome spazio dei nomi del repository, nome del repository, tag, digest del manifest, nome dell'artefatto, timestamp del push, nome utente dell'utente che ha inviato l'artefatto|
|Lo stato della replica dell'artefatto è cambiato|`REPLICATION`|Nome dello spazio dei nomi del repository, nome del repository, tag, digest del manifesto, nome dell'artefatto, timestamp del push, nome utente dell'utente che ha attivato la replica|
|Conservazione tag artefatto terminata|`TAG_RETENTION`|Nome dello spazio dei nomi del repository, nome del repository, numero totale e conservato, regola di conservazione, risultati degli artefatti eliminati|

#### Formato del carico utile

La notifica del webhook viene consegnata nel formato JSON. L'esempio seguente mostra la notifica JSON per diversi tipi di eventi quando si utilizza l'endpoint del tipo `HTTP`:

##### Artefatto spinto

*Predefinito*

```json
{
  "type": "PUSH_ARTIFACT",
  "occur_at": 1680501893,
  "operator": "harbor-jobservice",
  "event_data": {
    "resources": [
      {
        "digest": "sha256:954b378c375d852eb3c63ab88978f640b4348b01c1b3456a024a81536dafbbf4",
        "tag": "sha256:954b378c375d852eb3c63ab88978f640b4348b01c1b3456a024a81536dafbbf4",
        "resource_url": "localhost/harbor/alpine@sha256:954b378c375d852eb3c63ab88978f640b4348b01c1b3456a024a81536dafbbf4"
      }
    ],
    "repository": {
      "date_created": 1680501893,
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    }
  }
}
```

*Eventi Cloud*

```json
{
  "specversion": "1.0",
  // id is a generated UUID to make sure the unique
  "id": "66e18103-09c1-41f6-982f-37df223f3eeb",
  // requestid is the http request id for tracing the source request of this event
  "requestid": "51c0b694-0168-4f3c-b0db-282565455d7b",
  "source": "/projects/2/webhook/policies/15",
  "type": "harbor.artifact.pushed",
  "datacontenttype": "application/json",
  "time": "2023-04-03T06:04:46Z",
  "data": {
    "resources": [
      {
        "digest": "sha256:954b378c375d852eb3c63ab88978f640b4348b01c1b3456a024a81536dafbbf4",
        "tag": "sha256:954b378c375d852eb3c63ab88978f640b4348b01c1b3456a024a81536dafbbf4",
        "resource_url": "localhost/harbor/alpine@sha256:954b378c375d852eb3c63ab88978f640b4348b01c1b3456a024a81536dafbbf4"
      }
    ],
    "repository": {
      "date_created": 1680501893,
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    }
  },
  "operator": "harbor-jobservice"
}
```

##### Artefatto estratto

*Predefinito*

```json
{
  "type": "PULL_ARTIFACT",
  "occur_at": 1680502372,
  "operator": "robot$harbor+wHSYCuGD-Trivy-8e2e7505-d1e6-11ed-9e71-0242ac130009",
  "event_data": {
    "resources": [
      {
        "digest": "sha256:954b378c375d852eb3c63ab88978f640b4348b01c1b3456a024a81536dafbbf4",
        "tag": "sha256:954b378c375d852eb3c63ab88978f640b4348b01c1b3456a024a81536dafbbf4",
        "resource_url": "localhost/harbor/alpine@sha256:954b378c375d852eb3c63ab88978f640b4348b01c1b3456a024a81536dafbbf4"
      }
    ],
    "repository": {
      "date_created": 1680501893,
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    }
  }
}

```

*Eventi Cloud*

```json
{
  "specversion": "1.0",
  "id": "718eab63-2efa-4f88-8c27-8bcacc34929b",
  "requestid": "bb4b5b91-aac7-4acd-8dff-e4118e53f6d1"
  "source": "/projects/2/webhook/policies/15",
  "type": "harbor.artifact.pulled",
  "datacontenttype": "application/json",
  "time": "2023-04-03T06:12:52Z",
  "data": {
    "resources": [
      {
        "digest": "sha256:954b378c375d852eb3c63ab88978f640b4348b01c1b3456a024a81536dafbbf4",
        "tag": "sha256:954b378c375d852eb3c63ab88978f640b4348b01c1b3456a024a81536dafbbf4",
        "resource_url": "localhost/harbor/alpine@sha256:954b378c375d852eb3c63ab88978f640b4348b01c1b3456a024a81536dafbbf4"
      }
    ],
    "repository": {
      "date_created": 1680501893,
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    }
  },
  "operator": "robot$harbor+wHSYCuGD-Trivy-8e2e7505-d1e6-11ed-9e71-0242ac130009"
}
```

##### Artefatto eliminato

*Predefinito*

```json
{
  "type": "DELETE_ARTIFACT",
  "occur_at": 1680502598,
  "operator": "harbor-jobservice",
  "event_data": {
    "resources": [
      {
        "digest": "sha256:2bb501e6173d9d006e56de5bce2720eb06396803300fe1687b58a7ff32bf4c14",
        "tag": "3.8",
        "resource_url": "localhost/harbor/alpine:3.8"
      }
    ],
    "repository": {
      "date_created": 1680501893,
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    }
  }
}
```

*Eventi Cloud*

```json
{
  "specversion": "1.0",
  "id": "343f1623-7cba-487c-88f1-c5ebf55e93aa",
  "requestid": "ca0f3ceb-810f-4598-a268-a2291ad4de49",
  "source": "/projects/2/webhook/policies/15",
  "type": "harbor.artifact.deleted",
  "datacontenttype": "application/json",
  "time": "2023-04-03T06:16:38Z",
  "data": {
    "resources": [
      {
        "digest": "sha256:2bb501e6173d9d006e56de5bce2720eb06396803300fe1687b58a7ff32bf4c14",
        "tag": "3.8",
        "resource_url": "localhost/harbor/alpine:3.8"
      }
    ],
    "repository": {
      "date_created": 1680501893,
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    }
  },
  "operator": "harbor-jobservice"
}
```

##### Scansione completata

*Predefinito*

```json
{
  "type": "SCANNING_COMPLETED",
  "occur_at": 1680502375,
  "operator": "auto",
  "event_data": {
    "resources": [
      {
        "digest": "sha256:954b378c375d852eb3c63ab88978f640b4348b01c1b3456a024a81536dafbbf4",
        "resource_url": "localhost/harbor/alpine@sha256:954b378c375d852eb3c63ab88978f640b4348b01c1b3456a024a81536dafbbf4",
        "scan_overview": {
          "application/vnd.security.vulnerability.report; version=1.1": {
            "report_id": "af0546c1-67dc-4e9d-927e-372900ead0df",
            "scan_status": "Success",
            "severity": "None",
            "duration": 8,
            "summary": {
              "total": 0,
              "fixable": 0,
              "summary": {}
            },
            "start_time": "2023-04-03T06:12:47Z",
            "end_time": "2023-04-03T06:12:55Z",
            "scanner": {
              "name": "Trivy",
              "vendor": "Aqua Security",
              "version": "v0.37.2"
            },
            "complete_percent": 100
          }
        }
      }
    ],
    "repository": {
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    }
  }
}
```


*Eventi Cloud*

```json
{
  "specversion": "1.0",
  "id": "64bce2fe-6159-454d-8389-852d01ef1e9d",
  "requestid": "98ecbced-4169-443b-8e19-459a8c81675d",
  "source": "/projects/2/webhook/policies/15",
  "type": "harbor.scan.completed",
  "datacontenttype": "application/json",
  "time": "2023-04-03T06:12:55Z",
  "data": {
    "resources": [
      {
        "digest": "sha256:954b378c375d852eb3c63ab88978f640b4348b01c1b3456a024a81536dafbbf4",
        "resource_url": "localhost/harbor/alpine@sha256:954b378c375d852eb3c63ab88978f640b4348b01c1b3456a024a81536dafbbf4",
        "scan_overview": {
          "application/vnd.security.vulnerability.report; version=1.1": {
            "report_id": "af0546c1-67dc-4e9d-927e-372900ead0df",
            "scan_status": "Success",
            "severity": "None",
            "duration": 8,
            "summary": {
              "total": 0,
              "fixable": 0,
              "summary": {}
            },
            "start_time": "2023-04-03T06:12:47Z",
            "end_time": "2023-04-03T06:12:55Z",
            "scanner": {
              "name": "Trivy",
              "vendor": "Aqua Security",
              "version": "v0.37.2"
            },
            "complete_percent": 100
          }
        }
      }
    ],
    "repository": {
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    }
  },
  "operator": "auto"
}
```

##### Scansione interrotta

*Predefinito*

```json
{
  "type": "SCANNING_STOPPED",
  "occur_at": 1680502334,
  "operator": "auto",
  "event_data": {
    "resources": [
      {
        "digest": "sha256:e802987f152d7826cf929ad4999fb3bb956ce7a30966aeb46c749f9120eaf22c",
        "resource_url": "localhost/harbor/alpine@sha256:e802987f152d7826cf929ad4999fb3bb956ce7a30966aeb46c749f9120eaf22c",
        "scan_overview": {
          "application/vnd.security.vulnerability.report; version=1.1": {
            "report_id": "bf92700b-fa5e-4fe4-891c-42b730c81151",
            "scan_status": "Stopped",
            "severity": "",
            "duration": 5,
            "summary": null,
            "start_time": "2023-04-03T06:12:09Z",
            "end_time": "2023-04-03T06:12:14Z",
            "complete_percent": 0
          }
        }
      }
    ],
    "repository": {
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    }
  }
}
```

*Eventi Cloud*

```json
{
  "specversion": "1.0",
  "id": "a8a03301-9e31-433f-ace3-240ac16f17b7",
  "requestid": "daea2f4d-7a08-400d-9eef-e5f726da976e",
  "source": "/projects/2/webhook/policies/15",
  "type": "harbor.scan.stopped",
  "datacontenttype": "application/json",
  "time": "2023-04-03T06:12:14Z",
  "data": {
    "resources": [
      {
        "digest": "sha256:e802987f152d7826cf929ad4999fb3bb956ce7a30966aeb46c749f9120eaf22c",
        "resource_url": "localhost/harbor/alpine@sha256:e802987f152d7826cf929ad4999fb3bb956ce7a30966aeb46c749f9120eaf22c",
        "scan_overview": {
          "application/vnd.security.vulnerability.report; version=1.1": {
            "report_id": "bf92700b-fa5e-4fe4-891c-42b730c81151",
            "scan_status": "Stopped",
            "severity": "",
            "duration": 5,
            "summary": null,
            "start_time": "2023-04-03T06:12:09Z",
            "end_time": "2023-04-03T06:12:14Z",
            "complete_percent": 0
          }
        }
      }
    ],
    "repository": {
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    }
  },
  "operator": "auto"
}
```


##### Scansione non riuscita

*Predefinito*

```json
{
  "type": "SCANNING_FAILED",
  "occur_at": 1680505885,
  "operator": "auto",
  "event_data": {
    "resources": [
      {
        "digest": "sha256:dabea2944dcc2b86482b4f0b0fb62da80e0673e900c46c0e03b45919881a5d84",
        "resource_url": "localhost/harbor/alpine@sha256:dabea2944dcc2b86482b4f0b0fb62da80e0673e900c46c0e03b45919881a5d84",
        "scan_overview": {
          "application/vnd.security.vulnerability.report; version=1.1": {
            "report_id": "a2573415-c727-4723-bc92-376c1d978637",
            "scan_status": "Error",
            "severity": "",
            "duration": 10,
            "summary": null,
            "start_time": "2023-04-03T07:11:15Z",
            "end_time": "2023-04-03T07:11:25Z",
            "complete_percent": 0
          }
        }
      }
    ],
    "repository": {
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    }
  }
}
```

*Eventi Cloud*

```json
{
  "specversion": "1.0",
  "id": "bdfe1de3-c069-4efc-b4f4-1a75c9a148c4",
  "requestid": "b28412fe-7934-42c8-9633-4d22d872d718",
  "source": "/projects/2/webhook/policies/15",
  "type": "harbor.scan.failed",
  "datacontenttype": "application/json",
  "time": "2023-04-03T07:11:25Z",
  "data": {
    "resources": [
      {
        "digest": "sha256:dabea2944dcc2b86482b4f0b0fb62da80e0673e900c46c0e03b45919881a5d84",
        "resource_url": "localhost/harbor/alpine@sha256:dabea2944dcc2b86482b4f0b0fb62da80e0673e900c46c0e03b45919881a5d84",
        "scan_overview": {
          "application/vnd.security.vulnerability.report; version=1.1": {
            "report_id": "a2573415-c727-4723-bc92-376c1d978637",
            "scan_status": "Error",
            "severity": "",
            "duration": 10,
            "summary": null,
            "start_time": "2023-04-03T07:11:15Z",
            "end_time": "2023-04-03T07:11:25Z",
            "complete_percent": 0
          }
        }
      }
    ],
    "repository": {
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    }
  },
  "operator": "auto"
}
```

##### Quota superata

*Predefinito*

```json
{
  "type": "QUOTA_EXCEED",
  "occur_at": 1680505484,
  "operator": "",
  "event_data": {
    "resources": [
      {
        "digest": "sha256:402d21757a03a114d273bbe372fa4b9eca567e8b6c332fa7ebf982b902207242"
      }
    ],
    "repository": {
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    },
    "custom_attributes": {
      "Details": "adding 2.1 MiB of storage resource, which when updated to current usage of 8.3 MiB will exceed the configured upper limit of 10.0 MiB."
    }
  }
}
```

*Eventi Cloud*

```json
{
  "specversion": "1.0",
  "id": "81f243ce-699c-44d6-9dbe-b2ee5f10237a",
  "requestid": "4b9dcf9a-db23-460c-9b52-c9d994e362ee",
  "source": "/projects/2/webhook/policies/15",
  "type": "harbor.quota.exceeded",
  "datacontenttype": "application/json",
  "time": "2023-04-03T07:04:44Z",
  "data": {
    "resources": [
      {
        "digest": "sha256:402d21757a03a114d273bbe372fa4b9eca567e8b6c332fa7ebf982b902207242"
      }
    ],
    "repository": {
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    },
    "custom_attributes": {
      "Details": "adding 2.1 MiB of storage resource, which when updated to current usage of 8.3 MiB will exceed the configured upper limit of 10.0 MiB."
    }
  },
  "operator": ""
}
```

##### Quota prossima alla soglia

*Predefinito*

```json
{
  "type": "QUOTA_WARNING",
  "occur_at": 1680505653,
  "operator": "",
  "event_data": {
    "resources": [
      {
        "digest": "sha256:514ec80ffbe1a2ab1d9a3d5e6082296296a1d8b6870246edf897228e5df2367d"
      }
    ],
    "repository": {
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    },
    "custom_attributes": {
      "Details": "quota usage reach 85%: resource storage used 12.6 MiB of 14.0 MiB"
    }
  }
}
```

*Eventi Cloud*

```json
{
  "specversion": "1.0",
  "id": "1267b437-ea5a-4e06-bbe5-75e6fde733d3",
  "requestid": "77eb6c26-f3e9-45d3-bd40-2fd9421c56cd",
  "source": "/projects/2/webhook/policies/15",
  "type": "harbor.quota.warned",
  "datacontenttype": "application/json",
  "time": "2023-04-03T07:07:33Z",
  "data": {
    "resources": [
      {
        "digest": "sha256:514ec80ffbe1a2ab1d9a3d5e6082296296a1d8b6870246edf897228e5df2367d"
      }
    ],
    "repository": {
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    },
    "custom_attributes": {
      "Details": "quota usage reach 85%: resource storage used 12.6 MiB of 14.0 MiB"
    }
  },
  "operator": ""
}
```

##### Lo stato della replica è cambiato

*Predefinito*

```json
{
  "type": "REPLICATION",
  "occur_at": 1680501904,
  "operator": "MANUAL",
  "event_data": {
    "replication": {
      "harbor_hostname": "localhost",
      "job_status": "Success",
      "artifact_type": "image",
      "override_mode": true,
      "trigger_type": "MANUAL",
      "policy_creator": "admin",
      "execution_timestamp": 1680501881,
      "src_resource": {
        "registry_name": "hub",
        "registry_type": "docker-hub",
        "endpoint": "https://hub.docker.com",
        "namespace": "library"
      },
      "dest_resource": {
        "registry_type": "harbor",
        "endpoint": "http://localhost",
        "namespace": "harbor"
      },
      "successful_artifact": [
        {
          "type": "image",
          "status": "Success",
          "name_tag": "alpine [1 item(s) in total]"
        }
      ]
    }
  }
}
```

*Eventi Cloud*

```json
{
  "specversion": "1.0",
  "id": "e3005250-ffa8-4a10-af92-91fe25cca22c",
  "requestid": "0d896c4d-353a-422e-b43b-5067d98ec2a3",
  "source": "/projects/2/webhook/policies/15",
  "type": "harbor.replication.status.changed",
  "datacontenttype": "application/json",
  "time": "2023-04-03T06:05:04Z",
  "data": {
    "replication": {
      "harbor_hostname": "localhost",
      "job_status": "Success",
      "artifact_type": "image",
      "override_mode": true,
      "trigger_type": "MANUAL",
      "policy_creator": "admin",
      "execution_timestamp": 1680501881,
      "src_resource": {
        "registry_name": "hub",
        "registry_type": "docker-hub",
        "endpoint": "https://hub.docker.com",
        "namespace": "library"
      },
      "dest_resource": {
        "registry_type": "harbor",
        "endpoint": "http://localhost",
        "namespace": "harbor"
      },
      "successful_artifact": [
        {
          "type": "image",
          "status": "Success",
          "name_tag": "alpine [1 item(s) in total]"
        }
      ]
    }
  },
  "operator": "MANUAL"
}
```

##### Conservazione dei tag terminata

*Predefinito*

```json
{
  "type": "TAG_RETENTION",
  "occur_at": 1680502598,
  "operator": "MANUAL",
  "event_data": {
    "retention": {
      "total": 1,
      "retained": 0,
      "harbor_hostname": "localhost",
      "project_name": "harbor",
      "retention_policy_id": 2,
      "retention_rule": [
        {
          "template": "always",
          "tag_selectors": [
            {
              "kind": "doublestar",
              "decoration": "matches",
              "pattern": "xxxxxxxxxx",
              "extras": "{\"untagged\":true}"
            }
          ],
          "scope_selectors": {
            "repository": [
              {
                "kind": "doublestar",
                "decoration": "repoMatches",
                "pattern": "**",
                "extras": ""
              }
            ]
          }
        }
      ],
      "result": "SUCCESS",
      "deleted_artifact": [
        {
          "type": "image",
          "status": "SUCCESS",
          "name_tag": "alpine:3.8"
        }
      ]
    }
  }
}
```

*Eventi Cloud*

```json
{
  "specversion": "1.0",
  "id": "a8618595-6fa0-4cf4-afdc-870459b1d7f6",
  "requestid": "d71943e8-872d-40cd-b12a-f6bafcce1202",
  "source": "/projects/2/webhook/policies/15",
  "type": "harbor.tag_retention.finished",
  "datacontenttype": "application/json",
  "time": "2023-04-03T06:16:38Z",
  "data": {
    "retention": {
      "total": 1,
      "retained": 0,
      "harbor_hostname": "localhost",
      "project_name": "harbor",
      "retention_policy_id": 2,
      "retention_rule": [
        {
          "template": "always",
          "tag_selectors": [
            {
              "kind": "doublestar",
              "decoration": "matches",
              "pattern": "xxxxxxxxxx",
              "extras": "{\"untagged\":true}"
            }
          ],
          "scope_selectors": {
            "repository": [
              {
                "kind": "doublestar",
                "decoration": "repoMatches",
                "pattern": "**",
                "extras": ""
              }
            ]
          }
        }
      ],
      "result": "SUCCESS",
      "deleted_artifact": [
        {
          "type": "image",
          "status": "SUCCESS",
          "name_tag": "alpine:3.8"
        }
      ]
    }
  },
  "operator": "MANUAL"
}
```

Tieni presente che solo l'endpoint di tipo http supporta la selezione del formato `Default` o `CloudEvents`, quando selezioni il tipo Slack e inserisci un URL webhook in entrata Slack come endpoint, il messaggio ricevuto in Slack sarà un testo ricco come il seguente.

```json
Harbor webhook events
event_type: PUSH_ARTIFACT
occur_at: April 15th at 11:59 AM
operator: admin
event_data:
{
    "resources": [
        {
            "digest": "sha256:8a9e9863dbb6e10edb5adfe917c00da84e1700fa76e7ed02476aa6e6fb8ee0d8",
            "tag": "latest",
            "resource_url": "hub.harbor.com/test-webhook/debian:latest"
        }
    ],
    "repository": {
        "date_created": 1586922308,
        "name": "debian",
        "namespace": "test-webhook",
        "repo_full_name": "test-webhook/debian",
        "repo_type": "private"
    }
}
```

### Webhook Raccomandazioni sugli endpoint

Esistono due tipi di endpoint.  Per `HTTP` l'endpoint che riceve il webhook dovrebbe idealmente avere un ascoltatore del webhook in grado di interpretare il payload e agire in base alle informazioni in esso contenute. Ad esempio, eseguendo uno script di shell.

E per l'endpoint Slack, dovresti seguire [guida del webhook in entrata di Slack](https://api.slack.com/messaging/webhooks).

### Esempi di casi d'uso

Puoi configurare la tua infrastruttura di integrazione e sviluppo continuo in modo che esegua i seguenti tipi di operazioni quando riceve una notifica webhook da Harbor.

- Spinta degli artefatti:
  - Attiva una nuova build immediatamente dopo un push su repository o tag selezionati.
  - Notifica ai servizi o alle applicazioni che utilizzano l'artefatto che è disponibile un nuovo artefatto ed esegui il pull.
  - Scansiona l'artefatto utilizzando Trivy.
  - Replicare l'artefatto nei registri remoti.
- Scansione delle immagini:
  - Se viene rilevata una vulnerabilità, eseguire nuovamente la scansione dell'immagine o replicarla su un altro registry.
  - Se la scansione ha esito positivo, distribuire l'immagine.

### Configura i webhook

1. Accedi all'interfaccia Harbor con un account che disponga almeno dei privilegi di amministratore del progetto.

1. Vai su **Progetti**, seleziona un progetto e seleziona **Webhook**.

    ![Opzione webhook](../../../img/webhook/navbar.png)

1. Selezionare il tipo di notifica `HTTP`, in modo che il webhook venga inviato a un endpoint HTTP.

1. Selezionare il formato del payload come `Default` o `CloudEvents` quando si sceglie il tipo di notifica `HTTP`.

1. Seleziona gli eventi a cui vuoi iscriverti.

1. Inserisci l'URL per il listener dell'endpoint webhook.

1. Se il tuo ascoltatore webhook implementa l'autenticazione, inserisci l'intestazione di autenticazione.

1. Per implementare `HTTPS POST` invece di `HTTP POST`, selezionare la casella di controllo **Verifica certificato remoto**.

    ![URL Webhook](../../../img/webhook/policy.png)

1. Fare clic su **Aggiungi** per creare il webhook.

Puoi modificare il webhook, puoi anche `Enable` o `Deactivate` il webhook.

### Webhook Storie di lavoro

1. Fare clic sulla casella di opzione di una policy webhook, quindi verranno elencate le recenti esecuzioni webhook nella sezione seguente.

    ![Esecuzioni Webhook](../../../img/webhook/executions.png)

1. Seleziona un'esecuzione del webhook, quindi reindirizzerà alla pagina delle attività sotto questa esecuzione.

    ![compiti Webhook](../../../img/webhook/tasks.png)

1. Fare clic sul pulsante di registro di un'attività, quindi verrà reindirizzato alla pagina per mostrare i registri dei lavori del webhook.

    ![Registri Webhook](../../../img/webhook/job_log.png)

Se una notifica webhook non viene inviata o se riceve una risposta di errore HTTP con un codice diverso da `2xx`, la notifica viene inviata nuovamente in base alla configurazione impostata in `harbor.yml`.

*Docker Componi*

```yaml
notification:
  # Maximum retry count for webhook job
  # Increase or decrease the retry count when webhook job failed, pay attention that a high number of retries can put pressure on the webhook job queue
  webhook_job_max_retry: 3
  # HTTP client timeout for webhook job
  # Increase the timeout if the webhook endpoint cannot respond to harbor within the specified timeout
  webhook_job_http_client_timeout: 3 #seconds
```

*Helm*

```yaml
jobservice:
  notification:
    # Maximum retry count for webhook job
    # Increase or decrease the retry count when webhook job failed, pay attention that a high number of retries can put pressure on the webhook job queue
    webhook_job_max_retry: 3
    # HTTP client timeout for webhook job
    # Increase the timeout if the webhook endpoint cannot respond to harbor within the specified timeout
    webhook_job_http_client_timeout: 3 # in seconds
```

### Abilita e disattiva globalmente i webhook

In qualità di amministratore di sistema Harbor, puoi abilitare e disattivare le notifiche webhook per tutti i progetti.

1. Vai su **Configurazione** > **Impostazioni di sistema**.
1. Scorri verso il basso e seleziona o deseleziona la casella di controllo **Webhook abilitati**.


    ![Abilita/disattiva i webhook](../../../img/webhook/global_config.png)

