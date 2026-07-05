---
title: Configura HTTPS Accesso a Harbor
weight: 30
---

**Importante: utilizzo di certificati di terze parti esistenti**

Se disponi già di un certificato TLS e di una chiave di un'autorità attendibile (ad esempio Let's Encrypt, DigiCert, GoDaddy), puoi saltare i passaggi per la generazione del certificato autofirmato in questa pagina. È sufficiente posizionare il certificato e i file della chiave sull'host Harbor e fornire i relativi percorsi nel file `harbor.yml`, come descritto in ./configure-yml-file.md. Questo è l'approccio consigliato per tutti gli ambienti di produzione.

Per impostazione predefinita, Harbor non viene fornito con certificati. È possibile implementare Harbor senza sicurezza, in modo da potersi connettere tramite HTTP. Tuttavia, l'utilizzo di HTTP è accettabile solo in ambienti di test o di sviluppo con air gap che non dispongono di una connessione a Internet esterna. L'utilizzo di HTTP in ambienti privi di air gap espone ad attacchi man-in-the-middle. Negli ambienti di produzione, utilizzare sempre HTTPS. 

Per configurare HTTPS, è necessario creare certificati SSL. È possibile utilizzare certificati firmati da un'autorità di certificazione di terze parti attendibile oppure certificati autofirmati. Questa sezione descrive come utilizzare [OpenSSL](https://www.openssl.org/) per creare una CA e come utilizzare la CA per firmare un certificato server e un certificato client. Puoi utilizzare altri provider CA, ad esempio [Crittifichiamo](https://letsencrypt.org/).

Le procedure seguenti presuppongono che il nome host del tuo Harbor registry sia `yourdomain.com` e che il suo record DNS punti all'host su cui stai eseguendo Harbor. 

## Genera un certificato dell'autorità di certificazione

In un ambiente di produzione è necessario ottenere un certificato da una CA. In un ambiente di test o di sviluppo è possibile generare la propria CA. Per generare un certificato CA, eseguire i seguenti comandi. 

1. Generare una chiave privata del certificato CA.

    ```sh
    openssl genrsa -out ca.key 4096
    ```

1. Generare il certificato CA.

   Adatta i valori nell'opzione `-subj` per riflettere la tua organizzazione. Se utilizzi un FQDN per connettere il tuo host Harbor, devi specificarlo come attributo nome comune (`CN`).
   
    ```sh
    openssl req -x509 -new -nodes -sha512 -days 3650 \
     -subj "/C=CN/ST=Beijing/L=Beijing/O=example/OU=Personal/CN=MyPersonal Root CA" \
     -key ca.key \
     -out ca.crt
    ```

## Genera un certificato server

Il certificato solitamente contiene un file `.crt` e un file `.key`, ad esempio `yourdomain.com.crt` e `yourdomain.com.key`.

1. Genera una chiave privata.

    ```sh
    openssl genrsa -out yourdomain.com.key 4096
    ```

1. Generare una richiesta di firma del certificato (CSR).

   Adatta i valori nell'opzione `-subj` per riflettere la tua organizzazione. Se utilizzi un FQDN per connettere il tuo host Harbor, devi specificarlo come attributo nome comune (`CN`) e utilizzarlo nella chiave e nei nomi dei file CSR.

    ```sh
    openssl req -sha512 -new \
        -subj "/C=CN/ST=Beijing/L=Beijing/O=example/OU=Personal/CN=yourdomain.com" \
        -key yourdomain.com.key \
        -out yourdomain.com.csr
    ```

1. Genera un file con estensione x509 v3.

    Indipendentemente dal fatto che tu stia utilizzando un FQDN o un indirizzo IP per connetterti al tuo host Harbor, devi creare questo file in modo da poter generare un certificato per il tuo host Harbor conforme ai requisiti del nome alternativo soggetto (SAN) e dell'estensione x509 v3. Sostituisci le voci `DNS` per riflettere il tuo dominio.

    ```sh
    cat > v3.ext <<-EOF
    authorityKeyIdentifier=keyid,issuer
    basicConstraints=CA:FALSE
    keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
    extendedKeyUsage = serverAuth
    subjectAltName = @alt_names

    [alt_names]
    DNS.1=yourdomain.com
    DNS.2=yourdomain
    DNS.3=hostname
    EOF
    ```

1. Utilizza il file `v3.ext` per generare un certificato per il tuo host Harbor.
   
    Sostituisci `yourdomain.com` nei nomi dei file CSR e CRT con il nome host Harbor.

    ```sh
    openssl x509 -req -sha512 -days 3650 \
        -extfile v3.ext \
        -CA ca.crt -CAkey ca.key -CAcreateserial \
        -in yourdomain.com.csr \
        -out yourdomain.com.crt
    ```

## Fornisci i certificati a Harbor e Docker

Dopo aver generato i file `ca.crt`, `yourdomain.com.crt` e `yourdomain.com.key` per il certificato autofirmato, è necessario fornirli a Harbor e al daemon Docker.

1. Creare la directory dei certificati per Harbor.

    La directory `/data/cert/` è la posizione predefinita in cui Harbor cerca i propri certificati, ma questa directory non esiste per impostazione predefinita. Devi prima crearlo.

    ```sh
    sudo mkdir -p /data/cert/

1. Copy the Server Certificate and Key to the Harbor Directory

    ```sh
    cp tuodominio.com.crt /data/cert/
    sudo cp tuodominio.com.key /data/cert/
    ```

1. Configure the Docker Daemon to Trust the Certificate

    To allow the Docker client to push and pull images, the Docker daemon must also trust the certificate so ,convert your server certificate from .crt to .cert, as the Docker daemon requires this extension.

    ```sh
    openssl x509 -inform PEM -in tuodominio.com.crt -out tuodominio.com.cer
    ```
    Next, create a dedicated directory for your Harbor domain and copy all three certificate files into it.

    ```sh
    mkdir -p /etc/docker/certs.d/tuodominio.com/
    cp tuodominio.com.cert /etc/docker/certs.d/tuodominio.com/
    cp tuodominio.com.key /etc/docker/certs.d/tuodominio.com/
    cp ca.crt /etc/docker/certs.d/tuodominio.com/
    ```

1. Restart Docker Engine.

    ```sh
    systemctl riavvia la finestra mobile
    ```

You might also need to trust the certificate at the OS level. See [Troubleshooting Harbor Installation](troubleshoot-installation.md#https) for more information.

The following example illustrates the final directory structure for Docker, which uses your custom certificates.

```
/etc/docker/certs.d/
    └── tuodominio.com:porta
       ├── tuodominio.com.cert
       ├── tuodominio.com.chiave
       └── ca.crt             
```

## Deploy or Reconfigure Harbor

If you have not yet deployed Harbor, see [Configure the Harbor YML File](configure-yml-file.md) for information about how to configure Harbor to use the certificates by specifying the `hostname` and `https` attributes in `harbor.yml`.

If you already deployed Harbor with HTTP and want to reconfigure it to use HTTPS, perform the following steps.

1. Run the `prepare` script to enable HTTPS.

    Harbor uses an `nginx` instance as a reverse proxy for all services. You use the `prepare` script to configure `nginx` to use HTTPS. The `prepare` is in the Harbor installer bundle, at the same level as the `install.sh` script.

    ```sh
    ./preparare
    ```

1. If Harbor is running, stop and remove the existing instance. 

    Your image data remains in the file system, so no data is lost.

    ```sh
    la finestra mobile compone -v
    ```

1. Restart Harbor:

    ```sh
    la finestra mobile compone -d
    ```

## Verify the HTTPS Connection

After setting up HTTPS for Harbor, you can verify the HTTPS connection by performing the following steps.

* Open a browser and enter https://yourdomain.com. It should display the Harbor interface.

    Some browsers might show a warning stating that the Certificate Authority (CA) is unknown. This happens when using a self-signed CA that is not from a trusted third-party CA. You can import the CA to the browser to remove the warning.

* On a machine that runs the Docker daemon, check the `/etc/docker/daemon.json` file to make sure that the `-insecure-registry` option is not set for https://yourdomain.com.

* Log into Harbor from the Docker client.

    ```sh
    docker accedi a tuodominio.com
    ```

    If you've mapped `nginx` 443 port to a different port,add the port in the `login` command.

    ```sh
    docker accedi al tuodominio.com:porta
    ```
   
## What to Do Next

- If the verification succeeds, see [Harbor Administration](../administration) for information about using Harbor.
- If installation fails, see [Troubleshooting Harbor Installation](troubleshoot-installation.md).
