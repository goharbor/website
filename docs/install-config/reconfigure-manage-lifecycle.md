---
title: Riconfigurare Harbor e gestire il ciclo di vita Harbor
weight: 55
---

Utilizzi `docker-compose` per gestire il ciclo di vita di Harbor. Questo argomento fornisce alcuni comandi utili. È necessario eseguire i comandi nella directory in cui si trova `docker-compose.yml`.

Vedere [Docker Componi il riferimento della riga di comando](https://docs.docker.com/compose/reference/) per ulteriori informazioni su `docker-compose`.

## Interrompi Harbor

Per arrestare Harbor, eseguire il comando seguente.

```sh
sudo docker compose stop
Stopping nginx              ... done
Stopping harbor-portal      ... done
Stopping harbor-jobservice  ... done
Stopping harbor-core        ... done
Stopping registry           ... done
Stopping redis              ... done
Stopping registryctl        ... done
Stopping harbor-db          ... done
Stopping harbor-log         ... done
```

## Riavvia Harbor

Per riavviare Harbor, eseguire il comando seguente.

```sh
sudo docker compose start
Starting log         ... done
Starting registry    ... done
Starting registryctl ... done
Starting postgresql  ... done
Starting core        ... done
Starting portal      ... done
Starting redis       ... done
Starting jobservice  ... done
Starting proxy       ... done
```

## Riconfigura Harbor

Per riconfigurare Harbor, eseguire i seguenti passaggi.

1. Interrompere Harbor.

    ```sh
    sudo docker compose down -v
    ```

1. Aggiorna `harbor.yml`.

    ```sh
    vim harbor.yml
    ```

1. Eseguire lo script `prepare` per popolare la configurazione.

    ```sh
    sudo ./prepare
    ```

    Per riconfigurare Harbor per installare Trivy, includere il componente nel comando `prepare`.

    ```sh
    sudo ./prepare --with-trivy
    ```

1. Ricreare e avviare l'istanza Harbor.

    ```sh
    sudo docker compose up -d
    ```

## Altri comandi

Rimuovi i contenitori di Harbor ma mantieni tutti i dati dell'immagine e i file del database di Harbor nel file system:

```sh
sudo docker compose down -v
```

Rimuovere il database Harbor e i dati immagine prima di eseguire una reinstallazione pulita:

```sh
rm -r /data/database
rm -r /data/registry
rm -r /data/redis
```
