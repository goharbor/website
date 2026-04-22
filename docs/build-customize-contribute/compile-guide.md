---
title: Costruisci Harbor dal codice sorgente
---

Questa guida fornisce istruzioni agli sviluppatori per creare ed eseguire Harbor dal codice sorgente.

## Passaggio 1: prepararsi per un ambiente di compilazione per Harbor

Harbor viene distribuito come diversi contenitori Docker e la maggior parte del codice è scritto in linguaggio Go. L'ambiente di compilazione richiede Docker, Docker Compose e l'ambiente di sviluppo golang. Installare i prerequisiti seguenti:

| Software | Versione richiesta |
| -------------- | ---------------- |
| finestra mobile | 17.05 + |
| finestra mobile-componi | 1.18.0 + |
| pitone | 2,7 + |
| git | 1.9.1 + |
| fare | 3,81 + |
| golang\* | 1.15.6 + |

\*opzionale, richiesto se usi il tuo ambiente Golang.

## Passaggio 2: ottenere il codice sorgente

```sh
git clone https://github.com/goharbor/harbor
```

## Passaggio 3: creazione e installazione di Harbor

### Configurazione

Copia il file **make/harbor.yml.tmpl** in **make/harbor.yml** e apporta le modifiche necessarie alla configurazione come nome host, password amministratore e server di posta. Fare riferimento a [Harbor Installazione e configurazione](../install-config/_index.md) per ulteriori informazioni.

```sh
cd harbor
vi make/harbor.yml
```

### Compilazione ed esecuzione

È possibile compilare il codice mediante uno dei due approcci:

#### I. Costruisci con l'immagine ufficiale di Golang

- Costruisci, installa e visualizza Harbor:

    ```sh
    make install COMPILETAG=compile_golangimage
    ```

#### II. Compila il codice con il tuo ambiente Golang, quindi crea Harbor

- Sposta il codice sorgente in `$GOPATH`:

    ```sh
    mkdir $GOPATH/src/github.com/goharbor/
    cd ..
    mv harbor $GOPATH/src/github.com/goharbor/.
    ```

- Costruisci, installa ed esegui Harbor:

    ```sh
    cd $GOPATH/src/github.com/goharbor/harbor
    $ make install
    ```

### Verifica l'installazione

Se tutto funziona correttamente, vedrai questo messaggio:

```sh
...
Start complete. You can visit harbor now.
```

Fare riferimento a [Riconfigurare Harbor e gestire il ciclo di vita Harbor](../install-config/reconfigure-manage-lifecycle.md) per ulteriori informazioni sulla gestione dell'istanza Harbor.

## Appendice

- Utilizzando il Makefile

`Makefile` contiene questi parametri configurabili:

| Variabile | Descrizione |
| ------------------- | ---------------------------------------------------------------- |
| IMMAGINE BASE | Immagine base del contenitore, predefinita: photon |
| DEVFLAG | Flag del modello di build, predefinito: dev |
| COMPILETAG | Compila il flag del modello, predefinito: compile_normal (build golang locale) |
| TRIVYFLAG | Flag di modalità Trivy, impostazione predefinita: false |
| HTTPPROXY | Proxy http NPM per il builder Clarity UI |
| SERVERREGISTRAZIONE | Indirizzo IP del server registry remoto |
| UTENTEREGISTRAZIONE | Nome utente del server registry remoto |
| PASSWORD REGISTRAZIONE | Password utente server remoto registry |
| REGISTRONOMEPROGETTO | Nome del progetto sul server registry remoto |
| TAG VERSIONE | Tag immagini Harbor, predefinito: dev |
| PKGVERSIONTAG | Harbor Tag della versione online e offline, predefinito:dev |

- Obiettivi predefiniti:

| Obiettivo | Descrizione |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| tutto | preparare env, compilare file binari, creare immagini e installare immagini |
| preparare | preparare env |
| compilare | compilare l'interfaccia utente e il codice del servizio lavoro |
| compile_portale | compilare il codice del portale |
| compile_ui | compilare il binario dell'interfaccia utente |
| compile_jobservice | compilare il binario di jobservice |
| costruire | costruire immagini docker Harbor (impostazione predefinita: utilizzando build_photon) |
| build_fotone | creare immagini docker Harbor dall'immagine di base del sistema operativo Photon |
| installa | compilare file binari, creare immagini, preparare una versione specifica del file di composizione e avviare l'istanza Harbor |
| inizio | istanza Harbor di avvio |
| giù | arresto istanza Harbor |
| pacchetto_online | preparare il pacchetto di installazione online |
| pacchetto_offline | preparare il pacchetto di installazione offline |
| immagine push | inviare le immagini Harbor al server registry specifico |
| tutto pulito | rimuovere il file binario, le immagini Harbor, il file docker-compose della versione specifica, il tag della versione specifica e il pacchetto di installazione online/offline |
| pulitobinario | rimuovere l'interfaccia utente e il binario di jobservice |
| immagine pulita | rimuovere le immagini Harbor |
| cleandockercomposefile | rimuovere la versione specifica docker-compose |
| tagversionepulita | rimuovere il tag di versione specifico |
| pacchetto pulito | rimuovere il pacchetto di installazione online/offline |

#### ESEMPIO:

#### Invia le immagini Harbor al server registry specifico

```sh
make pushimage -e DEVFLAG=false REGISTRYSERVER=[$SERVERADDRESS] REGISTRYUSER=[$USERNAME] REGISTRYPASSWORD=[$PASSWORD] REGISTRYPROJECTNAME=[$PROJECTNAME]
```

**Nota**: è necessario aggiungere "/" alla fine di REGISTRYSERVER. Se REGISTRYSERVER non è impostato, le immagini verranno inviate direttamente all'hub Docker.

```sh
make pushimage -e DEVFLAG=false REGISTRYUSER=[$USERNAME] REGISTRYPASSWORD=[$PASSWORD] REGISTRYPROJECTNAME=[$PROJECTNAME]
```

#### Pulisci i file binari e le immagini di una versione specifica

```sh
make clean -e VERSIONTAG=[TAG]
```

{{< note >}}
Se è stato aggiunto un nuovo codice a GitHub, il TAG commit git cambierà. Meglio utilizzare questo comando per ripulire immagini e file del TAG precedente.
{{< /note >}}

#### Per impostazione predefinita, il processo make crea una build di sviluppo. Per creare una build di rilascio di Harbor, imposta il flag seguente su false.

```sh
make XXXX -e DEVFLAG=false
```
