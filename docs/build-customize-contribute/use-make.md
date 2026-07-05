---
title: Utilizzando Crea
---

## Variabili

Variabile | Descrizione
-------------------|-------------
BASEIMAGETAG | Il tag per l'immagine di base, default:dev
TAG VERSIONE | Il tag per l'immagine del porto, default:dev
DEVFLAG | Flag del modello di creazione, predefinito: true
GOBUILDIMMAGINE | Immagine Golang per compilare il codice sorgente di Harbor Go.
TRIVYFLAG | Se abilitare le curiosità in Harbor, default:false
HTTPPROXY | Proxy di chiarezza per creare UI.

## Obiettivi

Obiettivo | Descrizione
--------------------|-------------
tutto | preparare env, compilare file binari, creare immagini e installare immagini
preparare | preparare l'env
compilare | compilare il codice core e jobservice
compile_core | compilare il file binario principale
compile_jobservice | compilare il binario di jobservice
costruire | creare immagini della finestra mobile Harbor
build_base_docker | creare immagini di base della finestra mobile Harbor
installa | compilare file binari, creare immagini, preparare una versione specifica del file di composizione e avviare l'istanza Harbor
inizio | avviare l'istanza Harbor
giù | arresto dell'istanza Harbor
pacchetto_online | preparare il pacchetto di installazione online
pacchetto_offline | preparare il pacchetto di installazione offline
immagine push | inviare le immagini Harbor al server registry specifico
tutto pulito | rimuovere il file binario, le immagini Harbor, il file docker-compose della versione specifica, il tag della versione specifica e il pacchetto di installazione online/offline
pulitobinario | rimuovere il binario core e jobservice
immagine pulita | rimuovere le immagini Harbor
cleandockercomposefile | rimuovere la versione specifica docker-compose
pacchetto pulito | rimuovere il pacchetto di installazione online/offline

## Esempi

### Costruisci ed esegui Harbor dal codice sorgente

```sh
make install
```

### Programma di installazione offline del pacchetto

```sh
make package_offline
```