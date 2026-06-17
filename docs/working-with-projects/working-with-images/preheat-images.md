---
title: Preriscaldare le immagini
weight: 30
---

Prima di poter preriscaldare le immagini, un amministratore di sistema deve prima configurare un'istanza del provider P2P. Scopri di più su [configurazione del preriscaldamento P2P in Harbor](../../administration/p2p-preheat/manage-preheat-providers.md).

In Harbor l'azione di preriscaldamento è guidata da policy ed è limitata al progetto all'interno del quale viene creata. Ciò significa che quando a
l'amministratore del progetto crea una politica di preriscaldamento in un progetto specifico, tale politica si applica solo alle immagini gestite
nell'ambito di quel progetto.

## Crea politica di preriscaldamento

Per preriscaldare le immagini, è necessario prima creare una policy di preriscaldamento.

1. Vai su **Progetti** e apri il tuo progetto dall'elenco dei progetti.
1. Aprire la scheda **Preriscaldamento P2P** e quindi fare clic sul pulsante **+ NUOVA POLICY** per aprire la finestra di dialogo di creazione della policy.
  ![finestra di dialogo per la creazione della politica](../../../img/p2p-preheat/policy-creation-dialog.png)
1. Per **Provider**, selezionare un'istanza del provider di preriscaldamento preconfigurata come destinazione dall'elenco a discesa.
1. Inserisci un nome e una descrizione adeguati (facoltativi) per la policy per identificare e descrivere la policy in fase di creazione.
1. Impostare il filtro del repository (richiesto) seguendo [motivo a doppia stella](https://github.com/bmatcuk/doublestar#patterns).
1. Impostare il filtro dei tag (richiesto) seguendo lo stesso [motivo a doppia stella](https://github.com/bmatcuk/doublestar#patterns).
1. Facoltativamente, impostare il filtro delle etichette. Solo le immagini con etichette corrispondenti verranno inserite nell'elenco dei candidati. Usa la virgola
per dividere più etichette, es.: `label1`,`label2`,`labeln` e la relazione tra più etichette è **AND**.
1. In determinate condizioni (la sicurezza della distribuzione è configurata), nella policy potrebbero essere visibili più criteri.
   ![criteri aggiuntivi](../../../img/p2p-preheat/more-criteria-in-policy.png)

   {{< note >}}
   I criteri **Solo immagini firmate** e **Nessuna vulnerabilità con gravità pari o superiore a [gravità]** vengono ereditati direttamente
   dalle impostazioni corrispondenti della configurazione del progetto. Non possono essere modificati nella politica di preriscaldamento e sono gli unici
   il modo per modificarli è tramite la configurazione del progetto. Se sono configurati, saranno visibili nella politica di preriscaldamento
   e presi in considerazione nel calcolo dei candidati al phraating, altrimenti rimarranno nascosti e non influenzeranno la politica.
   {{< /note >}}

    - Se è impostata l'opzione di configurazione **Sicurezza distribuzione** **Abilita attendibilità dei contenuti**,
    **Solo le immagini firmate** saranno disponibili anche come criterio per la politica di preriscaldamento. Ciò significa che solo le immagini
    con firme valide verrà preriscaldato.
    - Se è configurato uno scanner di vulnerabilità e l'opzione di configurazione **Sicurezza distribuzione**
**Previene l'estrazione di immagini vulnerabili** è impostato, **Nessuna gravità di vulnerabilità pari a [gravità] e superiore**
sarà disponibile anche come criterio di preriscaldamento. Con questo criterio, solo le immagini la cui gravità di vulnerabilità corrisponde a
i criteri possono essere presi in considerazione.

1. Per la policy **trigger**, sono supportate diverse modalità, scegli quella adeguata in base al tuo caso d'uso.
    - **Manuale**: avvia manualmente il processo di preriscaldamento.
    - **Programma**: imposta il programma in stile CRON per avviare periodicamente il processo di preriscaldamento.
      * vengono forniti alcuni modelli di pianificazione cron predefiniti: `Hourly`,`Daily` e `Weekly`.
      * personalizza il tuo programma cron seguendo [guida cron](https://en.wikipedia.org/wiki/Cron)
        - es.: `*/15 0 * * *`, esegue la policy ogni 15 minuti ad ogni mezzanotte
    - **Basato su eventi**: controlla se l'immagine deve essere preriscaldata quando si sono verificati gli eventi correlati, gli eventi includono:
      * **OnPush**: quando l'immagine è stata spostata su Harbor
      * **OnScanComplete**: quando l'immagine è stata scansionata con successo (nessuna azione quando la scansione non è riuscita)
      * **OnLabel**: quando l'immagine è stata contrassegnata con etichette (nessuna azione quando un'etichetta viene rimossa)

   {{< note >}}
   Quando si verifica un evento, il processo di preriscaldamento non viene avviato immediatamente. Viene invece avviato un processo di valutazione.
   Il processo di valutazione attraverserà le politiche di preriscaldamento basate sugli eventi esistenti nell'ambito del progetto in cui l'obiettivo
   l'immagine associata all'evento viene inviata. Se l'immagine di destinazione corrisponde ai filtri e ai criteri predefiniti di alcuni
   politiche di preriscaldamento basate sugli eventi, verranno eseguite le politiche di preriscaldamento basate sugli eventi corrispondenti con l'immagine di origine fissa
   per completare il processo di preriscaldamento.
   {{< /note >}}

1. Fare clic sul pulsante **AGGIUNGI** per salvare la policy.

## Gestisci la politica di preriscaldamento

1. Vai su **Progetti** e apri il tuo progetto dall'elenco dei progetti.
1. Aprire la scheda **P2P Preriscaldamento**, tutte le politiche di preriscaldamento esistenti sono elencate nella vista griglia dati.
   ![elenco delle politiche di preriscaldamento](../../../img/p2p-preheat/policy-list.png)
1. Seleziona la policy selezionando la casella di controllo nella parte anteriore della riga, fai clic su **AZIONI** per aprire il menu a discesa.
1. Fare clic su **Esegui** per avviare immediatamente l'esecuzione della policy selezionata.
1. Fare clic su **Disattiva**/**Abilita** per disattivare/abilitare la policy selezionata.

   {{< note >}}
   Non è possibile eseguire una policy disattivata.
   {{< /note >}}

1. Fare clic su **Modifica** per aprire la finestra di dialogo di modifica e apportare modifiche alla policy selezionata.
1. Fare clic su **Elimina** per eliminare la policy selezionata.

   {{< note >}}
   Se le esecuzioni della policy selezionata sono ancora in corso, l'eliminazione verrà rifiutata.
   {{< /note >}}

## Gestisci le esecuzioni della politica di preriscaldamento

1. Selezionare la policy facendo clic sul pulsante di opzione nella parte anteriore della riga. Se la policy è stata eseguita in precedenza, il file
le esecuzioni rilevanti saranno elencate nella griglia dei dati di esecuzione.
   ![esecuzione delle politiche](../../../img/p2p-preheat/policy-execution.png)
1. Per ogni esecuzione è possibile trovare i seguenti dati:
    - ID: identità dell'esecuzione con un collegamento ipertestuale che punta alla pagina dettagliata
    - Stato: `Success`,`Error` e `Running`
    - Trigger: il modo di trigger dell'esecuzione, può essere `Manual`,`Scheduled` e `Event-based`
    - Start Time: l'ora di inizio dell'esecuzione (resa nel formato dell'ora locale)
    - Durata: la durata complessiva dell'esecuzione
    - Tasso di successo: ogni esecuzione può contenere più attività, la percentuale di quelle di successo sul totale

   {{< note >}}
   Per lo stato `Error`, accanto ad essa sarà presente una piccola icona informativa con un tooltip contenente il messaggio di errore.
   Per lo stato `Success`, se non sono presenti immagini che corrispondono ai filtri e ai criteri definiti nella policy, verrà visualizzato un piccolo
   icona informazioni con descrizione comando che indica che accanto ad essa non verranno posizionate immagini da preriscaldare.
   {{< /note >}}

1. Fare clic sul collegamento ipertestuale ID per aprire la pagina dettagliata dell'esecuzione.
   ![dettagli di esecuzione](../../../img/p2p-preheat/execution-details.png)

   {{< note >}}
   Un record di esecuzione può contenere più attività di preriscaldamento poiché più immagini possono soddisfare i criteri della policy.
   {{< /note >}}

1. Oltre alle informazioni generali, puoi anche trovare semplici metriche raggruppate in base allo stato delle attività:
    - **SUCCESSO**: quante attività sono state completate
    - **FAILURE**: quante attività non sono state completate
    - **IN CORSO**: quante attività sono in esecuzione
    - **STOPPED**: quante attività sono state interrotte
1. Tutte le attività correlate all'esecuzione sono elencate nella griglia dei dati dell'attività. Puoi trovare informazioni più dettagliate sull'attività:
    - **Artefatto**: quale artefatto si sta preriscaldando
    - **Stato**: lo stato di questa attività di preriscaldamento
    - **Digest**: il digest dell'immagine di preriscaldamento
    - **Tipo**: la tipologia dell'artefatto di preriscaldo
    - **Ora di inizio**: l'ora di inizio di questa attività di preriscaldamento
    - **Durata**: la durata complessiva di questa operazione di preriscaldamento
    - **Log**: un collegamento ipertestuale per aprire i registri delle attività per controllare maggiori dettagli di questa attività di preriscaldamento

   {{< note >}}
   Harbor supporta solo il preriscaldamento delle immagini, quindi il valore di `Type` sarà sempre `image`.
   {{< /note >}}
