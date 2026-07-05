---
title: Creazione di una regola di replica
weight: 25
---

È necessario che esista un endpoint di replica prima di creare una regola di replica. Per creare un endpoint, seguire le istruzioni in [Creazione di endpoint di replica](create-replication-endpoints.md).

{{< note >}}
A causa delle importanti modifiche API nella versione v2.0 per supportare [OCI](https://github.com/opencontainers/distribution-spec).
**Non puoi** replicare da Harbor v1.x a v2.0 e successive e **non puoi** replicare artefatti con **elenco manifest** da v2.0 e successive a v1.x.
{{< /note >}}

1. Accedere all'interfaccia Harbor con un account che disponga dei privilegi di amministratore di sistema Harbor.
1. Espandere **Amministrazione** e selezionare **Repliche**.

   ![Aggiungi una regola di replica](../../../img/replication-rule1.png)
1. Fare clic su **Nuova regola di replica**.
1. Fornire un nome e una descrizione per la regola di replica.
1. Selezionare la replica **Basata su push** o **Basata su pull**, a seconda se si desidera replicare gli artefatti da o verso il registry remoto.

   ![Modalità di replica](../../../img/replication-rule2.png)
1. Se stai creando una regola basata su pull, utilizza il menu a discesa **Soure Registry** per selezionare dagli endpoint di replica configurati.
1. Per **Filtro risorsa di origine**, identificare gli artefatti da replicare.  

   ![Filtri di replica](../../../img/replication-rule3.png)

   * **Nome**: replica le risorse con un determinato nome inserendo il nome o il frammento di un artefatto.
   * **Tag**: replica le risorse con un determinato tag inserendo il nome o il frammento di un tag. Puoi anche specificare la corrispondenza/esclusione per questo filtro.
   * **Etichetta**: replica le risorse con una determinata etichetta utilizzando il menu a discesa per selezionare tra le etichette disponibili. Puoi anche specificare la corrispondenza/esclusione per questo filtro.
   * **Risorsa**: replica immagini, artefatti o tutto. Gli artefatti contengono immagini e altre risorse compatibili con OCI.

   Il filtro nome e i filtri tag supportano i seguenti modelli:

   * **\***: corrisponde a qualsiasi sequenza di caratteri non separatori `/`.
   * **\*\***: corrisponde a qualsiasi sequenza di caratteri, inclusi i separatori di percorso `/`. Tieni presente che la stella doppia deve apparire di per sé come componente del percorso. Un modello come /path\*\* non è valido e verrà trattato allo stesso modo di /path*, ma /path\*/\*\* dovrebbe ottenere il risultato desiderato.
   * **?**: corrisponde a qualsiasi singolo carattere non separatore `/`.
   * **{alt1,...}**: corrisponde a una sequenza di caratteri se corrisponde una delle alternative separate da virgole.

   **NOTA:** È necessario aggiungere `library` se si desidera replicare gli artefatti ufficiali dell'hub Docker. Ad esempio, `library/hello-world` corrisponde agli artefatti ufficiali di Hello World.  

   Modello | Stringa (corrisponde o no)
   ---------- | -------
   `library/*` | `library/hello-world`(Y)<br> `library/my/hello-world`(N)
   `library/**` | `library/hello-world`(Y)<br> `library/my/hello-world`(Y)
   `{library,goharbor}/**` | `library/hello-world`(Y)<br> `goharbor/harbor-core`(Y)<br> `google/hello-world`(N)
   `1.?` | `1.0`(Y)<br> `1.01`(N)
1. Se stai creando una regola di replica basata su push, utilizza il menu a discesa **Registro di destinazione** per selezionare dagli endpoint di replica configurati.
1. Per **Spazio dei nomi di destinazione**, immettere il nome dello spazio dei nomi in cui replicare le risorse nella casella di testo. Se non inserisci uno spazio dei nomi, le risorse vengono inserite nello stesso spazio dei nomi dell'origine registry.

1. Utilizzare il menu a discesa Appiattimento destinazione per selezionare il modo in cui si desidera che Harbor tratti la gerarchia delle immagini durante la replica delle immagini. A seconda di ciò che selezioni, Harbor rimuoverà lo stesso numero di livelli dalla gerarchia dell'immagine, a partire da sinistra, quando replichi un'immagine nello spazio dei nomi di destinazione scelto.

    * **Unisci tutti i livelli**: rimuove tutta la gerarchia dall'immagine replicata. Ad esempio, `a/b/c/d/img` si replica in `namespace/img`. Questo è il comportamento predefinito della replica nella versione 2.2 e precedenti. Tutte le regole di replica create prima dell'aggiornamento alla versione 2.3.0 utilizzeranno per impostazione predefinita questa opzione di appiattimento dopo l'aggiornamento.
    * **Nessun appiattimento**: utilizza la stessa gerarchia durante la replica di un'immagine. Ad esempio, `a/b/c/d/img` si replica in `namespace/a/b/c/d/img`.
    * **Appiattimento di 1 livello**: rimuove un livello dalla gerarchia delle immagini. Ad esempio, `a/b/c/d/img` si replica in `namespace/b/c/d/img`. Questa è la selezione predefinita.
    * **Appiattimento di 2 livelli**: rimuove due livelli dalla gerarchia dell'immagine. Ad esempio, `a/b/c/d/img` si replica in `namespace/c/d/img`
    * **Appiattimento di 3 livelli**: rimuove tre livelli dalla gerarchia delle immagini. Ad esempio, `a/b/c/d/img` si replica in `namespace/d/img`
   

1. Utilizzare il menu a discesa Modalità di attivazione per selezionare come e quando eseguire la regola.
   * **Manuale**: replica le risorse manualmente quando necessario. **Nota**: le operazioni di eliminazione non vengono replicate.
   * **Pianificato**: replica periodicamente le risorse definendo un processo cron. **Nota**: le operazioni di eliminazione non vengono replicate.
   * **Basato su eventi**: quando una nuova risorsa viene inviata al progetto o un artefatto viene ritaggato, viene immediatamente replicato sul registry remoto. Se selezioni **Elimina risorse remote quando eliminate localmente**, se elimini un artefatto, verrà automaticamente eliminato dalla destinazione di replica.

   {{< note >}}
   È possibile filtrare gli artefatti per la replica in base alle etichette applicate agli artefatti. Tuttavia, la modifica di un'etichetta su un artefatto non attiva la replica. La replica basata sugli eventi è limitata al push, alla ricodifica e all'eliminazione degli artefatti.
   {{< /note >}}

   ![Modalità di attivazione](../../../img/replication-rule5.png)
1. Facoltativamente, imposta la larghezza di banda di rete massima per ciascuna attività di replica, presta attenzione al numero di esecuzioni simultanee, il valore predefinito è 10 per ciascun pod di servizio lavoro. L'unità è kilobyte al secondo e -1 sta per larghezza di banda illimitata. 

   ![Larghezza di banda](../../../img/replication-rule7.png)

   {{< note >}}
   Esiste un problema noto [15708](https://github.com/goharbor/harbor/issues/15708), secondo cui se si limita la larghezza di banda troppo lentamente e si interrompe il processo di replica, potrebbe essere necessario molto tempo per rilasciare effettivamente l'operatore del lavoro per eseguire un nuovo lavoro.
   {{< /note >}}
1. Facoltativamente, seleziona la casella di controllo Sostituisci per forzare le risorse replicate a sostituire le risorse nella destinazione con lo stesso nome.

   ![Sostituisci](../../../img/replication-rule8.png)
1. Selezionare facoltativamente la casella di controllo Copia per blocco per abilitare i BLOB di artefatti copiati da blocchi, attualmente supportati solo per origine e destinazione registry sono entrambi Harbor, ma è possibile abilitarlo chiamando manualmente Harbor API per altri registri di tipo.
   ![Copia per pezzo](../../../img/replication-rule9.png)

   {{< note >}}
   La copia per pezzo non è stata verificata ufficialmente tra i registri portuali e altri tipi. La dimensione predefinita del blocco è 10 MB, puoi sovrascriverla impostando env `REPLICATION_CHUNK_SIZE` nel jobservice, il valore dovrebbe essere unito in byte, ad esempio `10MB=1024*1024*10` quindi dovresti impostare `REPLICATION_CHUNK_SIZE=10485760`.
   {{< /note >}}
1. Selezionare facoltativamente la casella di controllo Singola replica attiva per abilitare il salto delle esecuzioni fino al termine dell'esecuzione attiva precedente, evitando l'esecuzione delle stesse regole di replica più volte in parallelo.
   ![Singola replica attiva](../../../img/replication-rule10.png)

1. Fare clic su **Salva** per creare la regola di replica.

## Cosa fare dopo

Dopo aver creato una regola di replica, vedere [Esecuzione manuale della replica](manage-replications.md).
