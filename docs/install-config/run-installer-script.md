---
title: Esegui lo script di installazione

weight: 35
---

Dopo aver configurato `harbor.yml` copiato da `harbor.yml.tmpl` e opzionalmente configurato un backend di archiviazione, installare e avviare Harbor utilizzando lo script `install.sh`. Tieni presente che potrebbe essere necessario del tempo affinché il programma di installazione online scarichi tutte le immagini Harbor dall'hub Docker.

È possibile installare Harbor in diverse configurazioni:

- Solo Harbor, senza Trivy
-Harbor con Trivy

## Installazione predefinita senza Trivy

L'installazione predefinita di Harbor non include il servizio Trivy. Esegui il comando seguente

```sh
sudo ./install.sh
```

Se l'installazione ha esito positivo, è possibile aprire un browser per visitare l'interfaccia Harbor su `http://reg.yourdomain.com`, modificando `reg.yourdomain.com` con il nome host configurato in `harbor.yml`. Se non li hai modificati in `harbor.yml`, il nome utente e la password dell'amministratore predefiniti sono `admin` e `Harbor12345`.

Accedi al portale di amministrazione e crea un nuovo progetto, ad esempio `myproject`. È quindi possibile utilizzare i comandi Docker per accedere a Harbor, taggare le immagini e inviarle a Harbor.

```sh
docker login reg.yourdomain.com
docker push reg.yourdomain.com/myproject/myrepo:mytag
```

{{< important >}}
- Se l'installazione di Harbor utilizza HTTPS, è necessario fornire i certificati Harbor al client Docker. Per informazioni, vedere [Configura HTTPS Accesso a Harbor](../configure-https).
- Se la tua installazione di Harbor utilizza HTTP, devi aggiungere l'opzione `--insecure-registry` al demone Docker del tuo client e riavviare il servizio Docker. Per ulteriori informazioni, vedere [Connessione a Harbor tramite HTTP](#connect-http) di seguito.
{{< /important >}}

## Installazione con Trivy
Per installare Harbor con il servizio Trivy, aggiungere il parametro `--with-trivy` quando si esegue `install.sh`:

```sh
sudo ./install.sh --with-trivy
```

Per ulteriori informazioni su Trivy, vedere [Documentazione Trivy](https://github.com/aquasecurity/trivy).
Per ulteriori informazioni su come utilizzare Trivy in un ambiente proxy web vedere [Configura autorità di certificazione personalizzate per curiosità](administration/vulnerability-scanning/configure-custom-certs.md)

## Connessione a Harbor tramite HTTP {#connect-http}

**IMPORTANTE:** Se l'installazione di Harbor utilizza HTTP anziché HTTPS, è necessario aggiungere l'opzione `--insecure-registry` al demone Docker del client. Per impostazione predefinita, il file del demone si trova in `/etc/docker/daemon.json`.

Ad esempio, aggiungi quanto segue al tuo file `daemon.json`:

<pre>
{
"insecure-registries" : ["<i>myregistrydomain.com</i>:5000", "0.0.0.0"]
}
</pre>

Dopo aver aggiornato `daemon.json`, è necessario riavviare sia Docker Engine che Harbor.

1. Riavviare il motore Docker.

    ```sh
    systemctl restart docker
    ```

1. Interrompere Harbor.

    ```sh
    docker compose down -v
    ```

1. Riavviare Harbor.

    ```sh
    docker compose up -d
    ```

## Cosa fare dopo ##

- Se l'installazione ha esito positivo, vedere [Harbor Amministrazione](../administration) per informazioni sull'utilizzo di Harbor.
- Se hai distribuito Harbor con HTTP e desideri proteggere le connessioni a Harbor, vedi [Configura HTTPS Accesso a Harbor](configure-https.md).
- Se l'installazione non riesce, vedere [Risoluzione dei problemi di installazione Harbor](troubleshoot-installation.md).
