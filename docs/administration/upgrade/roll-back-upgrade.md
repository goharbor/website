---
title: Rollback da un aggiornamento
weight: 45
---

Se, per qualsiasi motivo, è necessario tornare alla versione precedente di Harbor, eseguire i seguenti passaggi.

{{< note >}}
Per eseguire il rollback da un aggiornamento, è necessario aver eseguito il backup della versione precedente di Harbor. Per informazioni sul backup di Harbor prima di un aggiornamento, vedere [Aggiorna Harbor e migra i dati](_index.md).
{{< /note >}}

{{< note >}}
Harbor 2.2 è compilato da Golang 1.15 che ha deprecato il certificato autofirmato senza SAN. Se hai abilitato TLS interno e i file certificati vengono generati dallo script di preparazione Harbor, devi generare nuovamente i certificati interni, utilizzando un comando come questo `docker run -v /:/hostfs goharbor/prepare:v2.2.0 gencert -p /path/to/internal/tls/cert` I certificati generati dalla versione precedente dello script di preparazione non includevano l'estensione SAN. Se gestisci il file dei certificati, assicurati che la SAN sia inclusa, in caso contrario controlla [Configurare la comunicazione TLS interna tra il componente Harbor](../../install-config/configure-internal-tls.md). Per ulteriori informazioni sulla pausa di Go, fare riferimento a [nota di rilascio di Go 1.5](https://golang.org/doc/go1.15#commonname) e [questo problema](https://github.com/golang/go/issues/24151).
{{< /note >}}

1. Interrompere e rimuovere il servizio Harbor corrente se è ancora in esecuzione.

    ```sh
    cd harbor
    docker compose down
    ```

2. Rimuovere l'istanza Harbor corrente.

    ```sh
    rm -rf harbor
    ```

3. Ripristina la versione precedente di Harbor.

    ```sh
    mv /my_backup_dir/harbor harbor
    ```

4. Per ripristinare il database, copiare i file di dati dalla directory di backup al volume di dati, che per impostazione predefinita è `/data/database`.

5. Riavviare il servizio Harbor utilizzando la configurazione precedente.  
   
   Se la versione precedente di Harbor è stata installata da una build di rilascio:

    ```sh
    cd harbor
    ./install.sh
    ```

{{< note >}}
Sebbene sia possibile ripristinare un aggiornamento allo stato precedente all'avvio dell'aggiornamento, Harbor non supporta i downgrade.
{{< /note >}}
