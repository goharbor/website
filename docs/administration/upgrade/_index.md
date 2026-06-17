---
title: Aggiorna Harbor e migra i dati
weight: 45
---

Questa guida copre l'aggiornamento e la migrazione alla versione v2.14.0. Questa guida copre solo la migrazione dalla versione 2.11.0 e successive alla versione corrente. Se stai effettuando l'aggiornamento da una versione precedente, fai riferimento alla guida alla migrazione per una versione Harbor precedente.

*[Aggiorna a Harbor v2.12.0](/docs/2.12.0/administration/upgrade/)
*[Aggiorna a Harbor v2.11.0](/docs/2.11.0/administration/upgrade/)
*[Aggiorna a Harbor v2.10.0](/docs/2.10.0/administration/upgrade/)
*[Aggiorna a Harbor v2.9.0](/docs/2.9.0/administration/upgrade/)
*[Aggiorna a Harbor v2.8.0](/docs/2.8.0/administration/upgrade/)
*[Aggiorna a Harbor v2.7.0](/docs/2.7.0/administration/upgrade/)
*[Aggiorna a Harbor v2.6.0](/docs/2.6.0/administration/upgrade/)
*[Aggiorna a Harbor v2.5.0](/docs/2.5.0/administration/upgrade/)
*[Aggiorna a Harbor v2.4.0](/docs/2.4.0/administration/upgrade/)
*[Aggiorna a Harbor v2.3.0](/docs/2.3.0/administration/upgrade/)



Se stai aggiornando un'istanza Harbor distribuita con Helm, consulta [Aggiornamento di Harbor Distribuito con Helm](helm-upgrade.md).

Quando si aggiorna un'istanza Harbor esistente a una versione più recente, potrebbe essere necessario eseguire la migrazione delle impostazioni in `harbor.yml`.
Poiché la migrazione potrebbe alterare lo schema del database e le impostazioni di `harbor.yml`, dovresti **sempre** eseguire il backup dei tuoi dati prima di qualsiasi migrazione.

## Note importanti sull'aggiornamento

- Ancora una volta, DEVI eseguire il backup dei tuoi dati prima di qualsiasi migrazione dei dati.
- In Harbor v2.9, se stai utilizzando un database esterno, assicurati che la versione di PostgreSQL >= 12.

## Aggiornamento di Harbor e migrazione dei dati

1. Accedere all'host Harbor e, se è ancora in esecuzione, arrestare e rimuovere l'istanza Harbor esistente.

    ```sh
    cd harbor
    docker compose down
    ```

1. Eseguire il backup dei file correnti di Harbor in modo da poter tornare alla versione corrente, se necessario.

    ```sh
    mv harbor /my_backup_dir/harbor
    ```

1. Eseguire il backup del database, che per impostazione predefinita si trova nella directory `/data/database`.

    ```sh
    cp -r /data/database /my_backup_dir/
    ```

1. Ottieni l'ultimo pacchetto di rilascio Harbor da [https://github.com/goharbor/harbor/releases](https://github.com/goharbor/harbor/releases) ed estrailo.

   Per ulteriori informazioni vedere [Scarica il programma di installazione Harbor](../../install-config/download-installer.md).

1. Prima di aggiornare Harbor, eseguire la migrazione.

    Lo strumento di migrazione è incluso negli strumenti di preparazione del porto forniti come immagine docker. Puoi estrarre l'immagine dall'hub docker. nel seguente comando:

    ```sh
    docker pull goharbor/prepare:[tag]
    ```

    In alternativa, se stai utilizzando un pacchetto di installazione offline, puoi caricarlo dal file tar dell'immagine incluso nel pacchetto di installazione offline. Sostituisci [tag] con la nuova versione Harbor, ad esempio v1.10.0, nel seguente comando:

    ```sh
    tar zxf <offline package>
    docker image load -i harbor/harbor.[version].tar.gz
    ```

1. Copia `/path/to/old/harbor.yml` in `harbor.yml` e aggiornalo.

    ```sh
    docker run -it --rm -v /:/hostfs goharbor/prepare:[tag] migrate -i ${path to harbor.yml}
    ```

    **NOTA:** l'aggiornamento dello schema e la migrazione dei dati del database vengono eseguiti dal core all'avvio di Harbor. Se la migrazione fallisce, controlla il log principale per eseguire il debug.

1. Nella directory `./harbor`, eseguire lo script `./install.sh` per installare la nuova istanza Harbor.

   Per installare Harbor con Trivy, vedere [Esegui lo script di installazione](../../install-config/run-installer-script.md) per ulteriori informazioni.

Se è necessario tornare alla versione precedente di Harbor, vedere [Rollback da un aggiornamento](roll-back-upgrade.md).
