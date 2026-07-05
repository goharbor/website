---
title: Prova Harbor con il server demo
weight: 10
---

Il team Harbor ha reso disponibile un'istanza demo Harbor che puoi utilizzare per sperimentare Harbor e testarne le funzionalità.

Quando si utilizza il server demo, prestare attenzione alle condizioni di utilizzo.

## Condizioni di utilizzo del Demo Server ##

 - Il server demo è riservato solo per uso sperimentale, per consentirti di testare la funzionalità Harbor. 
 - Non caricare immagini sensibili sul server demo. 
 - Il server demo non è un ambiente di produzione. Il team Harbor non è responsabile per eventuali perdite di dati, funzionalità o servizi che potrebbero derivare dal suo utilizzo.
 - Il server demo viene pulito e ripristinato ogni due giorni.
 - Il server demo consente solo di testare le funzionalità dell'utente. Non è possibile testare le funzionalità dell'amministratore. Per testare le funzionalità dell'amministratore e le caratteristiche avanzate, configura un'istanza Harbor.
 - Non inviare immagini superiori a 100 MB al server demo, poiché ha una capacità di archiviazione limitata.

Se riscontri problemi durante l'utilizzo del server demo, apri un [problema su GitHub](https://github.com/goharbor/harbor/issues) o contatta il team Harbor su [Lento](https://github.com/goharbor/harbor#community).

## Accedi al server demo ##

1. Vai a [https://demo.goharbor.io](https://demo.goharbor.io).
1. Fai clic su **Registrati per un account**.
1. Crea un account utente fornendo un nome utente, il tuo indirizzo email, il tuo nome e una password.
1. Accedi all'interfaccia Harbor utilizzando l'account che hai creato.
1. Esplora il progetto predefinito, `library`.
1. Fai clic su **Nuovo progetto** per creare il tuo progetto.

    Per informazioni su come creare un progetto, vedere [Crea un progetto](../working-with-projects/create-projects/_index.md).

1. Apri un client Docker e accedi a Harbor con le credenziali che hai creato sopra.

    ```sh
    docker login demo.goharbor.io
    ```

1. Crea un semplicissimo `Dockerfile` con i seguenti contenuti.

    ```dockerfile
    FROM busybox:latest
    ```

1. Crea un'immagine da questo Dockerfile e taggala.

    ```sh
    docker build -t demo.goharbor.io/your-project/test-image .
    ```

1. Invia l'immagine al tuo progetto in Harbor.

    ```sh
    docker push demo.goharbor.io/your-project/test-image
    ```

1. Nell'interfaccia Harbor, vai su **Progetti** > *tuo_progetto* > **Repository** per visualizzare il repository di immagini che hai inviato al tuo progetto Harbor.

## Cosa fare dopo ##

Vedi [Harbor Prerequisiti di installazione](installation-prereqs.md).
