---
title: Risoluzione dei problemi di installazione Harbor
weight: 50
---

Le seguenti sezioni aiutano a risolvere i problemi durante l'installazione di Harbor.

## Accedi ai registri Harbor

Per impostazione predefinita, i dati registry vengono mantenuti nella directory `/data/` dell'host. Questi dati rimangono invariati anche quando i contenitori di Harbor vengono rimossi e/o ricreati, è possibile modificare il file `data_volume` nel file `harbor.yml` per cambiare questa directory.

Inoltre, Harbor utilizza `rsyslog` per raccogliere i log di ciascun container. Per impostazione predefinita, questi file di registro vengono archiviati nella directory `/var/log/harbor/` sull'host di destinazione per la risoluzione dei problemi; inoltre è possibile modificare la directory di registro in `harbor.yml`.

## Harbor non si avvia o funziona in modo errato

Se Harbor non si avvia o funziona in modo errato, eseguire il comando seguente per verificare se tutti i contenitori di Harbor sono nello stato `Up`.

```
sudo docker compose ps
        Name                     Command               State                    Ports
  -----------------------------------------------------------------------------------------------------------------------------
  harbor-core         /harbor/start.sh                 Up
  harbor-db           /entrypoint.sh postgres          Up      5432/tcp
  harbor-jobservice   /harbor/start.sh                 Up
  harbor-log          /bin/sh -c /usr/local/bin/ ...   Up      127.0.0.1:1514->10514/tcp
  harbor-portal       nginx -g daemon off;             Up      80/tcp
  nginx               nginx -g daemon off;             Up      0.0.0.0:443->443/tcp, 0.0.0.0:4443->4443/tcp, 0.0.0.0:80->80/tcp
  redis               docker-entrypoint.sh redis ...   Up      6379/tcp
  registry            /entrypoint.sh /etc/regist ...   Up      5000/tcp
  registryctl         /harbor/start.sh                 Up
```

Se un contenitore non è nello stato `Up`, controllare il file di registro per quel contenitore in `/var/log/harbor`. Ad esempio, se il contenitore `harbor-core` non è in esecuzione, esaminare il file di registro `core.log`.

## Utilizzo di `nginx` o bilanciamento del carico

Se Harbor è in esecuzione dietro un proxy `nginx` o un bilanciamento del carico elastico, aprire il file `common/config/nginx/nginx.conf` e cercare la riga seguente.

```
proxy_set_header X-Forwarded-Proto $scheme;
```

Se il proxy ha già impostazioni simili, rimuovilo dalle sezioni `location /`, `location /v2/` e `location /service/` e ridistribuisci Harbor. Per istruzioni su come ridistribuire Harbor, vedere [Riconfigurare Harbor e gestire il ciclo di vita Harbor](reconfigure-manage-lifecycle.md).

## Risoluzione dei problemi relativi alle connessioni HTTPS {#https}

Se utilizzi un certificato intermedio di un emittente di certificato, unisci il certificato intermedio con il tuo certificato per creare un pacchetto di certificati. Esegui il comando seguente.

```
cat intermediate-certificate.pem >> yourdomain.com.crt
```
Quando il demone Docker viene eseguito su determinati sistemi operativi, potrebbe essere necessario considerare attendibile il certificato a livello di sistema operativo. Ad esempio, esegui i seguenti comandi.

-Ubuntu:

    ```sh
    cp yourdomain.com.crt /usr/local/share/ca-certificates/yourdomain.com.crt 
    update-ca-certificates
    ```

- Red Hat (CentOS ecc):

    ```sh
    cp yourdomain.com.crt /etc/pki/ca-trust/source/anchors/yourdomain.com.crt
    update-ca-trust
    ```
