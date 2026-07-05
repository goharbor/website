---
title: Gestione delle etichette
weight: 70
---

Harbor fornisce due tipi di etichette per isolare diversi tipi di risorse:

* **Etichetta di livello globale**: gestita dagli amministratori di sistema Harbor e utilizzata per gestire le immagini dell'intero sistema. Possono essere aggiunti alle immagini in qualsiasi progetto.
* **Etichetta livello progetto**: gestita dagli amministratori del progetto nell'ambito di un progetto e può essere aggiunta solo alle immagini del progetto.

## Gestione delle etichette globali
Gli amministratori di sistema Harbor possono elencare, creare, aggiornare ed eliminare le etichette di livello globale in `Administration->Labels`:

![gestire le etichette a livello globale](../../../img/manage-global-level-labels.png)

## Gestione delle etichette a livello di progetto
Gli amministratori del progetto e gli amministratori di sistema Harbor possono elencare, creare, aggiornare ed eliminare le etichette a livello di progetto nella scheda `Labels` della pagina dei dettagli del progetto:

![gestire le etichette a livello di progetto](../../../img/manage-project-level-labels.png)

## Aggiunta e rimozione di etichette da e verso le immagini
Gli utenti che hanno il ruolo di amministratore di sistema, amministratore di progetto o sviluppatore di progetto Harbor possono fare clic sul pulsante `ADD LABELS` per aggiungere o rimuovere etichette dalle immagini. L'elenco delle etichette contiene sia etichette a livello globale (vieni per primo) che etichette a livello di progetto:

![aggiungere etichette alle immagini](../../../img/add-labels-to-images.png)

## Filtraggio delle immagini per etichetta
Le immagini possono essere filtrate per etichette:

![filtrare le immagini per etichette](../../../img/filter-images-by-label.png)
