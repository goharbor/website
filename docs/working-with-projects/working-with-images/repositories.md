---
title: Repository
weight: 75
---

Un repository è una raccolta di artefatti.  Dalla versione v2.0, oltre alle immagini contenitore, Harbor può gestire diversi tipi di artefatti raggruppati in un formato compatibile con OCI, come grafico helm (richiede helm v3), CNAB, bundle OPA, ecc.

### Elenca i repository

Fai clic sul tuo progetto per accedere alla pagina dei dettagli del progetto dopo aver effettuato l'accesso. Fai clic sulla scheda "Repository" per visualizzare l'elenco dei repository. 

![list_repositories](../../../img/list-repositories.png)

### Descrizione di un repository

Fare clic sul repository, quindi fare clic sulla scheda "Informazioni".  È possibile visualizzare la descrizione del progetto.  Gli utenti con ruolo di amministratore, manutentore o sviluppatore del progetto possono fare clic sul pulsante "Modifica" per modificare la descrizione.  Puoi definire lo stile della descrizione tramite la sintassi Markdown.

![modifica_repository_descrizione](../../../img/edit-repository-description.png)

### Elenca gli artefatti in un repository

Fare clic sulla scheda "Artefatti" per visualizzare l'elenco degli artefatti in un repository.
Ogni artefatto è identificato dal suo digest sha256 nell'elenco degli artefatti e i diversi tipi di artefatti possono essere distinti dall'icona a sinistra del digest.  Passando il mouse sull'icona puoi vedere il nome del tipo.  

Facendo clic sull'icona nella colonna **Comando di estrazione**, il comando per estrarre l'artefatto nella riga dell'icona verrà copiato negli appunti.  
La colonna **Annotazioni** nella griglia mostra le annotazioni manifest dell'artefatto, che sono un insieme di coppie chiave-valore.  Maggiori dettagli sulle annotazioni fare riferimento a [OCI Annotazioni](https://github.com/opencontainers/image-spec/blob/master/annotations.md).
La colonna **Tempo di invio** nella griglia mostra l'ora in cui ciascun artefatto viene inviato a registry.

![list_artifacts](../../../img/list-artifacts.png)

Facendo clic sull'icona di ricerca in alto a destra nell'elenco degli artefatti, è possibile utilizzare diversi tipi di filtri per filtrare gli elementi nell'elenco degli artefatti.  Puoi scegliere di filtrare per tipologia, tag, etichette.  In particolare, se si sceglie di filtrare per tag, è possibile scegliere di visualizzare solo gli artefatti contrassegnati o non contrassegnati.

![filter_artifacts](../../../img/filter-artifacts.png)

A partire da Harbor v2.0.0, [Indice delle immagini](https://raw.githubusercontent.com/opencontainers/image-spec/master/image-index.md) può anche essere gestito come artefatto in un repository.  Se un artefatto è un indice, ci sarà un'icona di cartella sul lato destro del suo digest.

![indice_immagine](../../../img/index-icon.png)

Facendo clic sull'icona della cartella è possibile visualizzare l'elenco degli artefatti a cui fa riferimento l'indice.  Gli artefatti in questa visualizzazione sono di sola lettura.  ovvero non è possibile rimuovere un artefatto da un indice tramite UI di Harbor e nessuna delle azioni come "copia digest", "aggiungi etichette", "copia" è disponibile.

![indice_dettaglio](../../../img/index-detail.png)
