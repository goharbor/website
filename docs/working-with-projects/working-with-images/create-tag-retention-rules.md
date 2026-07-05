---
title: Crea regole di conservazione dei tag
weight: 80
---

Un repository può accumulare rapidamente un gran numero di artefatti, molti dei quali potrebbero non essere più necessari dopo un dato periodo di tempo o una volta sostituiti da una successiva creazione di artefatti. Questi artefatti in eccesso possono ovviamente consumare grandi quantità di capacità di archiviazione. In qualità di amministratore di sistema Harbor, puoi definire regole che regolano il numero di artefatti di un determinato repository da conservare o per quanto tempo conservare determinati artefatti. 

## Come funzionano le regole di conservazione dei tag

Puoi definire le regole di conservazione dei tag sui progetti e specificare a quali repository desideri applicarle. Ciò consente una maggiore granularità nella definizione delle regole di conservazione. Come suggerisce il nome, quando definisci una regola di conservazione per un repository, identifichi quali tag conservare. Non definisci regole per rimuovere esplicitamente i tag. Piuttosto, quando imposti una regola, tutti i tag in un repository che non sono identificati come idonei alla conservazione vengono eliminati. L'algoritmo `OR` viene utilizzato tra le regole.

Una regola di conservazione dei tag dispone di 3 filtri applicati in sequenza, come descritto nella tabella seguente.

|Ordine|Filtro|Descrizione|
|---|---|---|
|Primo|Repository o repository|Identificazione dei tag su cui applicare la regola. È possibile identificare i repository che hanno un determinato nome o frammento di nome oppure che non hanno quel nome o frammento di nome. Sono consentiti i caratteri jolly (ad esempio `*repo`, `repo*` e `**`). Il filtro del repository viene applicato per primo per contrassegnare i repository a cui applicare la regola di conservazione. I repository identificati sono destinati a ulteriori corrispondenze in base ai criteri dei tag. In questa fase non viene intrapresa alcuna azione sui repository non specificati.|
|Secondo|Quantità da conservare|Imposta quali tag conservare specificando un numero massimo di tag o specificando un periodo massimo per il quale conservare i tag.|
|Terzo|Tag da conservare|Identificare il tag o i tag su cui applicare la regola. È possibile identificare i tag che hanno un determinato nome o frammento di nome oppure che non hanno quel nome o frammento di nome. Sono consentiti i caratteri jolly (ad esempio `*tag`, `tag*` e `**`). Utilizza la casella di controllo per selezionare se gli elementi senza tag devono essere acquisiti come parte dell'insieme di elementi idonei per la conservazione dei tag.|

Per informazioni su come viene applicato il carattere jolly `**`, vedere https://github.com/bmatcuk/doublestar#patterns.

### Esempio 1

- Hai 5 repository in un progetto, repository da A a E.
  - Il repository A contiene 102 artefatti di cui 2 senza tag, tutti estratti nell'ultima settimana.
  - I repository da B a E hanno ciascuno 7 artefatti con 1 artefatto senza tag, nessuno dei quali è stato estratto nell'ultimo mese.
- Imposta il filtro del repository su `**`, il che significa che tutti i repository nel progetto sono inclusi.
- Imposta la politica di conservazione per conservare i 10 artefatti estratti più di recente in ciascun repository.
- Imposta il filtro tag su `**`, mantieni deselezionati gli "artefatti senza tag", il che significa che tutti gli artefatti con almeno un tag nel repository vengono inclusi.

In questo esempio la regola conserva i 10 artefatti con tag estratti più recentemente nel repository A e i 6 artefatti in ciascuno dei 4 repository da B a E. Pertanto, nel progetto vengono conservati un totale di 34 artefatti. 
In altre parole, la regola non tratta tutti gli artefatti nei repository da A a E come un unico pool da cui scegliere i 10 artefatti più recenti. 
Pertanto, anche se i tag dall'11° al 100° nel repository A sono stati estratti più recentemente rispetto a qualsiasi tag nei repository da B a E, tutti gli artefatti con tag nei repository da B a E vengono conservati, perché ciascuno di questi repository ha meno di 10 tag e tutti gli artefatti senza tag vengono eliminati.

### Esempio 2

Questo esempio utilizza lo stesso progetto e gli stessi repository dell'esempio 1, ma imposta la policy di conservazione per conservare gli artefatti in ogni repository che sono stati estratti negli ultimi 7 giorni.

In questo caso, tutti i 100 artefatti contrassegnati nel repository A vengono conservati perché sono stati estratti negli ultimi 7 giorni. Nessuno degli artefatti nei repository da B a E viene conservato, perché nessuno di essi è stato rimosso nell'ultima settimana. In questo esempio vengono mantenuti 100 artefatti, rispetto ai 34 artefatti dell'esempio 1.
E tutti gli artefatti senza tag vengono eliminati.

### Esempio 3

Questo esempio utilizza lo stesso progetto e gli stessi repository dell'esempio 2, ma selezionando "artefatti senza tag", tutti gli artefatti nel repository A vengono conservati.

In questo caso, tutti i 103 artefatti nel repository A vengono conservati perché sono stati estratti negli ultimi 7 giorni. Nessuno degli artefatti nei repository da B a E viene conservato, perché nessuno di essi è stato rimosso nell'ultima settimana. In questo esempio vengono mantenuti 103 artefatti, rispetto ai 100 artefatti dell'esempio 2.
E tutti gli artefatti senza tag vengono conservati.

### Regole di conservazione dei tag ed eliminazione dei tag nativi Docker

**Nota**: se un artefatto ha diversi tag e solo un set parziale di tag viene abbinato tramite il criterio di conservazione, l'artefatto e tutti i relativi tag verranno conservati. In altre parole, la conservazione viene effettuata a livello di tag, ma la conservazione/eliminazione viene eseguita a livello di artefatto, con la conservazione che preserva completamente l'artefatto inclusi tutti i relativi tag. 

Ad esempio, hai i seguenti tag, elencati in base al loro tempo di push, e tutti si riferiscono allo stesso digest SHA:

- `harbor-1.8`, inviato il 14/08/2019 alle 01:00
- `harbor-release`, inviato il 14/08/2019 alle 03:00
- `harbor-nightly`, inviato il 14/08/2019 alle 06:00
- `harbor-latest`, inviato il 14/08/2019 alle 09:00

Configurare un criterio di conservazione per conservare i due tag più recenti che corrispondono a `harbor-*`, in modo che vengano conservati `harbor-nightly` e `harbor-latest`. Tuttavia, poiché tutti i tag fanno riferimento allo stesso digest SHA, questa policy manterrebbe anche i tag `harbor-1.8` e `harbor-release`, quindi tutti i tag verranno conservati.

## Combinazione di regole su un repository

È possibile definire fino a 15 regole per progetto. È possibile applicare più regole a un repository o a un set di repository. Quando si applicano più regole a un repository, queste vengono applicate con la logica `OR` anziché con la logica `AND`. In questo modo non esiste alcuna priorità nell’applicazione delle regole su un dato repository. Le regole vengono eseguite contemporaneamente in background e i set risultanti da ciascuna regola vengono combinati alla fine dell'esecuzione.

### Esempio 4

Questo esempio utilizza lo stesso progetto e gli stessi repository degli esempi 1 e 2, ma imposta due regole:

- Regola 1: conservare in ciascun repository tutti gli artefatti estratti negli ultimi 7 giorni.
- Regola 2: conservare un numero massimo di 10 artefatti in ciascun repository.

Per il repository A, la regola 1 conserva tutti i 100 artefatti contrassegnati perché sono stati tutti estratti nell'ultima settimana. La regola 2 conserva i 10 artefatti estratti più recentemente. Pertanto, poiché le due regole vengono applicate con una relazione `OR`, tutti i 100 artefatti vengono conservati nel repository A.

Per i repository B-E, la regola 1 manterrà 0 artefatti poiché nell'ultima settimana non è stato estratto alcun artefatto. La regola 2 manterrà tutti e 6 gli artefatti perché 6 < 10. Pertanto, poiché le due regole vengono applicate con una relazione `OR`, per i repository B-E, ciascun repository manterrà tutti e 6 gli artefatti.

In questo esempio, tutti gli artefatti vengono mantenuti.

### Esempio 5

Questo esempio utilizza un repository diverso dagli esempi precedenti.

- Hai un repository con 12 tag:

  |Produzione|Candidato al rilascio|Rilascio|
  |---|---|---|
  |`2.1-your_repo-prod`|`2.1-your_repo-rc`|`2.1-your_repo-release`|
  |`2.2-your_repo-prod`|`2.2-your_repo-rc`|`2.2-your_repo-release`|
  |`3.1-your_repo-prod`|`3.1-your_repo-rc`|`3.1-your_repo-release`|
  |`4.4-your_repo-prod`|`4.4-your_repo-rc`|`4.4-your_repo-release`| 

- Definisci due regole di conservazione dei tag su questo repository:
  - Conserva i 10 artefatti inseriti più di recente che iniziano con `2`.
  - Conserva i 10 artefatti pubblicati più di recente che terminano con `-prod`.

In questo esempio, le regole vengono applicate ai seguenti 8 tag:

-`2.1-your_repo-prod`
-`2.1-your_repo-rc`
-`2.1-your_repo-release`
-`2.2-your_repo-prod`
-`2.2-your_repo-rc`
-`2.2-your_repo-release`
-`3.1-your_repo-prod`
-`4.4-your_repo-prod`

Poiché non sono presenti artefatti senza tag, selezionare la casella di controllo non fa alcuna differenza.

## Come le regole di conservazione dei tag interagiscono con le quote del progetto

L'amministratore di sistema Harbor può impostare un numero massimo di tag che un progetto può contenere e la quantità di spazio di archiviazione che può consumare. Per informazioni sulle quote del progetto, vedere [Configura le quote del progetto](../../administration/configure-project-quotas/_index.md). 

Se imposti una quota su un progetto, questa quota non può essere superata. La quota viene applicata a un progetto anche se imposti una regola di conservazione che la supererebbe. In altre parole, non è possibile utilizzare le regole di conservazione per aggirare le quote.

## Configura le regole di conservazione dei tag

1. Accedi all'interfaccia Harbor con un account che disponga almeno dei privilegi di amministratore del progetto.
1. Vai a **Progetti**, seleziona un progetto, seleziona **Politica** e seleziona **Conservazione tag**.

   ![Opzioni dei tag](../../../img/tag-retention1.png)
1. Fare clic su **Aggiungi regola** per aggiungere una regola.
1. Nel menu a discesa **Repository**, seleziona **corrispondente** o **escluso**.
  ![Seleziona repository](../../../img/tag-retention2.png)
1. Nella casella di testo **Repository**, identificare i repository su cui applicare la regola.
  
   È possibile definire i repository su cui applicare la regola inserendo le seguenti informazioni:
  
   - Un nome di repository, ad esempio `my_repo_1`.
   - Un elenco separato da virgole di nomi di repository, ad esempio `my_repo_1,my_repo_2,your_repo_3`.
   - Un nome di repository parziale con caratteri jolly, ad esempio `my_*`, `*_3` o `*_repo_*`.
   - `**` per applicare la regola a tutti i repository del progetto. 
  
   Se hai selezionato **corrispondenza**, la regola viene applicata ai repository identificati. Se hai selezionato **escluso**, la regola viene applicata a tutti i repository del progetto ad eccezione di quelli identificati.
1. Nel menu a discesa **Per conteggio artefatti o numero di giorni**, definire il numero di tag da conservare o il periodo di conservazione dei tag.
  ![Seleziona i criteri di conservazione](../../../img/tag-retention3.png)
  
   |Opzione|Descrizione|
   |---|---|
   |**conserva gli # artefatti inviati più di recente**|Immetti il ​​numero massimo di artefatti da conservare, mantenendo quelli inviati più di recente. Non esiste un'età massima per un artefatto.|
   |**conserva gli # artefatti estratti più recentemente**|Inserisci il numero massimo di artefatti da conservare, mantenendo solo quelli estratti di recente. Non esiste un'età massima per un artefatto.|
   |**conserva gli artefatti inviati negli ultimi # giorni**|Immetti il ​​numero di giorni per cui conservare gli artefatti, conservando solo quelli che sono stati inviati durante questo periodo. Non esiste un numero massimo di artefatti.|
   |**conserva gli artefatti estratti negli ultimi # giorni**|Inserisci il numero di giorni per cui conservare gli artefatti, conservando solo quelli che sono stati estratti durante questo periodo. Non esiste un numero massimo di artefatti.|
   |**conserva sempre**|Conserva sempre gli artefatti identificati da questa regola.| 

1. Nel menu a discesa **Tag**, seleziona **corrispondenti** o **esclusi**.
1. Nella casella di testo **Tag**, identificare i tag a cui applicare la regola.
  
   È possibile definire i tag su cui applicare la regola inserendo le seguenti informazioni:
  
   - Un nome tag, ad esempio `my_tag_1`.
   - Un elenco di nomi di tag separati da virgole, ad esempio `my_tag_1,my_tag_2,your_tag_3`.
   - Un nome tag parziale con caratteri jolly, ad esempio `my_*`, `*_3` o `*_tag_*`.
   - `**` per applicare la regola a tutti i tag del progetto. 
  
   Se hai selezionato **corrispondente**, la regola viene applicata ai tag identificati. Se hai selezionato **escluso**, la regola viene applicata a tutti i tag nel repository tranne quelli identificati.
1. Fare clic su **Aggiungi** per salvare la regola.
1. (Facoltativo) Fare clic su **Aggiungi regola** per aggiungere più regole, fino a un massimo di 15 per progetto.
1. (Facoltativo) In Pianificazione, fare clic su **Modifica** e selezionare la frequenza con cui eseguire la regola.

   ![Seleziona i criteri di conservazione](../../../img/tag-retention4.png)
   
   Se selezioni **Personalizzato**, inserisci un comando cron job per pianificare la regola. 
  
   **NOTA**: se definisci più regole, la pianificazione viene applicata a tutte le regole. Non è possibile pianificare regole diverse da eseguire in momenti diversi. 
1. Fare clic su **Esecuzione di prova** per testare la regola o le regole definite.
1. Fare clic su **Esegui ora** per eseguire immediatamente la regola.

**ATTENZIONE**: non è possibile annullare una regola dopo averla eseguita. Si consiglia vivamente di eseguire un'esecuzione di prova prima di eseguire le regole. 

Per modificare una regola esistente, utilizza il menu a discesa **Azione** accanto a una regola per disattivarla, modificarla o eliminarla. 

![Modifica le regole di conservazione dei tag](../../../img/tag-retention5.png)
