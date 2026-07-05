---
title: Artefatto OCI definito dall'utente
weight: 25
---

Harbor ora espande il supporto per il machine learning sui modelli di dati K8 come i modelli di dati Kubeflow. In realtà, sono ancora artefatti OCI.
Questi artefatti seguono la configurazione specifica di Harbor in modo che Harbor possa mostrare i loro ricchi metadati in un modo e le loro icone. Sono chiamati artefatti OCI definiti dall'utente.


## Configurazione specifica per Harbor

La configurazione specifica di Harbor definisce le chiavi di annotazione nel manifest di un artefatto OCI.

- **```io.goharbor.artifact.v1alpha1.skip-list```** stringa  
È in ```manifest.config.annotations```.  
Immobile FACOLTATIVO. L'elenco delle chiavi di salto. Harbor ignorerà questi tasti nel livello di configurazione JSON. Il valore di questa chiave deve essere di tipo stringa separato da virgola.

- **```io.goharbor.artifact.v1alpha1.icon```** stringa vuota  
È in ```manifest.layers[].annotations```.  
L'identificatore dell'icona dell'artefatto. Il valore di questa chiave deve essere una stringa vuota. Verrà elaborata solo la chiave, il valore non verrà utilizzato.
Se un'icona viene utilizzata dagli artefatti, l'icona deve essere uno strato di artefatti quando si costruiscono artefatti.
Nota: il mediaType delle icone supporta "image/gif, image/png, image/jpeg".


## Esempio OCI Manifesto

Esempio che mostra un artefatto OCI definito dall'utente:

```
{
    "schemaVersion": 2,
    "config": {
        "mediaType": "application/vnd.caicloud.model.config.v1alpha1+json",
        "digest": "sha256:be948daf0e22f264ea70b713ea0db35050ae659c185706aa2fad74834455fe8c",
        "size": 187,
        "annotations": {
            "io.goharbor.artifact.v1alpha1.skip-list": "metrics,git"
        }
    },
    "layers": [
        {
            "mediaType": "image/png",
            "digest": "sha256:d923b93eadde0af5c639a972710a4d919066aba5d0dfbf4b9385099f70272da0",
            "size": 166015,
            "annotations": {
                "io.goharbor.artifact.v1alpha1.icon": ""
            }
        },
        {
            "mediaType": "application/tar+gzip",
            "digest": "sha256:d923b93eadde0af5c639a972710a4d919066aba5d0dfbf4b9385099f70272da0",
            "size": 166015
        }
    ]
}
```

## Esempio di artefatto OCI definito dall'utente
Se sei interessato all'artefatto OCI definito dall'utente, [ORMB](https://github.com/kleveross/ormb) è un ottimo esempio.
