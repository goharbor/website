---
title: Autorizzazioni utente per ruolo
weight: 20
---

Gli utenti hanno capacità diverse a seconda del ruolo che hanno in un progetto.

Sui progetti pubblici tutti gli utenti potranno vedere l'elenco di repository, immagini, vulnerabilità delle immagini, grafici helm e versioni dei grafici helm, estrarre immagini, ritaggare immagini (è necessaria l'autorizzazione push per l'immagine di destinazione), scaricare grafici helm, scaricare versioni dei grafici helm.

L'amministratore di sistema ha tutte le autorizzazioni per il progetto.

## Autorizzazioni dei membri del progetto

La tabella seguente illustra i vari livelli di autorizzazione utente in un progetto.

| Azione | Ospite limitato | Ospite | Sviluppatore | Manutentore | Amministratore del progetto |
| --------------------------------------- | ------------- | ----- | --------- | ------ | ------------- |
| Vedi le configurazioni del progetto | ✓ | ✓ | ✓ | ✓ | ✓ |
| Modifica le configurazioni del progetto |               |       |           |        | ✓ |
| Visualizza l'elenco dei membri del progetto |               | ✓ | ✓ | ✓ | ✓ |
| Crea/modifica/elimina membri del progetto |               |       |           |        | ✓ |
| Visualizza un elenco dei registri del progetto |               | ✓ | ✓ | ✓ | ✓ |
| Visualizza un elenco delle repliche del progetto |               |       |           | ✓ | ✓ |
| Visualizza un elenco di processi di replica del progetto |               |       |           |        | ✓ |
| Visualizza un elenco di etichette di progetto |               |       |           | ✓ | ✓ |
| Crea/modifica/elimina etichette di progetto |               |       |           | ✓ | ✓ |
| Visualizza un elenco di repository | ✓ | ✓ | ✓ | ✓ | ✓ |
| Crea repository |               |       | ✓ | ✓ | ✓ |
| Modifica/elimina repository |               |       |           | ✓ | ✓ |
| Visualizza un elenco di immagini | ✓ | ✓ | ✓ | ✓ | ✓ |
| Ricodifica immagine |               | ✓ | ✓ | ✓ | ✓ |
| Estrai immagine | ✓ | ✓ | ✓ | ✓ | ✓ |
| Spingi immagine |               |       | ✓ | ✓ | ✓ |
| Scansiona/elimina immagine |               |       |           | ✓ | ✓ |
| Aggiungi scanner a Harbor * |               |       |           |        |               |
| Modifica scanner nei progetti |               |       |           |        | ✓ |
| Visualizza un elenco delle vulnerabilità dell'immagine | ✓ | ✓ | ✓ | ✓ | ✓ |
| Creare un elenco delle vulnerabilità del progetto |               |       | ✓ | ✓ | ✓ |
| Leggi l'elenco delle vulnerabilità del progetto |               |       | ✓ | ✓ | ✓ |
| Esporta elenco delle vulnerabilità del progetto |               |       | ✓ | ✓ | ✓ |
| Visualizza la cronologia della creazione di immagini | ✓ | ✓ | ✓ | ✓ | ✓ |
| Aggiungi/Rimuovi etichette dell'immagine |               |       | ✓ | ✓ | ✓ |
| Visualizza un elenco di carte timone | ✓ | ✓ | ✓ | ✓ | ✓ |
| Scarica le carte del timone | ✓ | ✓ | ✓ | ✓ | ✓ |
| Carica le carte del timone |               |       | ✓ | ✓ | ✓ |
| Elimina grafici timone |               |       |           | ✓ | ✓ |
| Visualizza un elenco delle versioni della mappa del timone | ✓ | ✓ | ✓ | ✓ | ✓ |
| Scarica le versioni della mappa del timone | ✓ | ✓ | ✓ | ✓ | ✓ |
| Carica le versioni della mappa del timone |               |       | ✓ | ✓ | ✓ |
| Elimina le versioni della carta timone |               |       |           | ✓ | ✓ |
| Aggiungi/Rimuovi etichette della versione della mappa del timone |               |       | ✓ | ✓ | ✓ |
| Visualizza un elenco di robot di progetto |               |       |           | ✓ | ✓ |
| Crea/modifica/elimina robot di progetto |               |       |           |        | ✓ |
| Consulta la lista consentita CVE configurata | ✓ | ✓ | ✓ | ✓ | ✓ |
| Crea/modifica/rimuovi lista consentita CVE |               |       |           |        | ✓ |
| Visualizza eventi webhook |               |       |           | ✓ | ✓ |
| Aggiungi nuovi eventi webhook |               |       |           |        | ✓ |
| Abilita/disattiva webhook |               |       |           |        | ✓ |
| Crea/elimina regole di conservazione dei tag |               |       | ✓ | ✓ | ✓ |
| Abilita/disattiva le regole di conservazione dei tag |               |       | ✓ | ✓ | ✓ |
| Crea/elimina le regole di immutabilità dei tag |               |       |           | ✓ | ✓ |
| Abilita/disattiva le regole di immutabilità dei tag|               |       |           | ✓ | ✓ |
| Vedi quote del progetto | ✓ | ✓ | ✓ | ✓ | ✓ |
| Modifica quote progetto * |               |       |           |        |               |
| Elimina progetto |               |       |           |        | ✓ |

&ast; Solo l'amministratore di sistema Harbor può modificare le quote del progetto e aggiungere nuovi scanner.
