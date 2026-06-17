---
title: Aggiornamento di Harbor Distribuito con Helm
weight: 40
---

Questa guida viene utilizzata per aggiornare Harbor distribuito dalla carta a partire dalla versione 0.3.0.

## Note

- Poiché lo schema del database può cambiare tra le diverse versioni di Harbor, vi è un progresso nella migrazione dello schema durante l'aggiornamento e il tempo di inattività non può essere evitato
- Non è possibile eseguire il downgrade automatico dello schema del database, quindi `helm rollback` non è supportato

## Aggiornamento

### 1. Backup del database

Eseguire il backup del database utilizzato da Harbor nel caso in cui il processo di aggiornamento fallisca.

### 2. Scarica il nuovo grafico

Scarica l'ultima versione della tabella Harbor.

### 3. Configura il nuovo grafico

Configura il nuovo grafico per assicurarti che gli elementi di configurazione abbiano gli stessi valori di quello vecchio.

> Nota: se TLS è abilitato e il certificato viene generato automaticamente dal grafico, verrà generato un nuovo certificato che sovrascriverà quello vecchio durante l'aggiornamento, ciò potrebbe causare alcuni problemi se hai distribuito il certificato. È possibile seguire i passaggi seguenti per configurare il nuovo grafico per utilizzare il vecchio certificato:

1. Ottieni il nome segreto in cui è archiviato il certificato:

    ```bash
    kubectl get secret
    ```

    Trova il segreto il cui nome termina con `-harbor-ingress` (servizio di esposizione tramite `Ingress`) o `-harbor-nginx` (servizio di esposizione tramite `ClusterIP` o `NodePort`)

2. Esporta il segreto come file yaml:


    ```bash
    kubectl get secret <secret-name-from-step-1> -o yaml > secret.yaml
    ```

3. Rinominare il segreto impostando `metadata.name` in `secret.yaml`

4. Crea un nuovo segreto:

    ```bash
    kubectl create -f secret.yaml
    ```

5. Configura il grafico per utilizzare il nuovo segreto impostando `expose.tls.secretName` come valore impostato nel passaggio **3**

### 4. Aggiorna

Esegui il comando di aggiornamento:

```bash
helm upgrade release-name --force .
```

{{< note >}}
`--force` è necessario se si aggiorna dalla versione 0.3.0 a causa del problema [#30](https://github.com/goharbor/harbor-helm/issues/30).
{{< /note >}}

## Problemi noti

- I registri dei lavori andranno persi se si aggiorna dalla versione 0.3.0 poiché i registri sono archiviati in `emptyDir` nella 0.3.0.
