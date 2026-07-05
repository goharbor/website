---
title: Regole di immutabilità dei tag
weight: 85
---

Per impostazione predefinita, gli utenti possono inviare ripetutamente un artefatto con lo stesso tag a un repository in Harbor. Ciò fa sì che il tag migri tra gli artefatti e ogni artefatto a cui viene rimosso il tag diventa senza tag. Ciò è dovuto a Distribution/Distribution upstream che non impone la mappatura tra un tag immagine e il digest dell'immagine. In alcuni casi ciò può essere indesiderato perché non è più possibile fidarsi del tag per identificare la versione dell'immagine. Il digest sha256 rimane affidabile e punta sempre alla stessa build, ma non è reso in un formato leggibile dall'uomo.

Per evitare ciò, Harbor consente di configurare l'immutabilità dei tag a livello di progetto, in modo che gli artefatti con determinati tag non possano essere inseriti in Harbor se i loro tag corrispondono a tag esistenti. Ciò impedisce la sovrascrittura degli artefatti esistenti. L'immutabilità dei tag garantisce che un artefatto con tag immutabile non possa essere eliminato e non possa essere modificato in alcun modo, ad esempio tramite re-push, re-tagging o replica da un altro registry di destinazione.

Le regole di immutabilità utilizzano la logica `OR`, quindi se imposti più regole e un tag corrisponde a una di queste regole, viene contrassegnato come immutabile.

## Come i tag immutabili impediscono la cancellazione dei tag

A partire dalla versione 2.0, puoi eliminare qualsiasi tag di un artefatto senza eliminare l'artefatto stesso. Pertanto, puoi bloccare un particolare tag configurando una regola di immutabilità corrispondente a questo tag, il che significa che anche l'artefatto che contiene il tag non può essere sovrascritto o eliminato. Tuttavia puoi comunque eliminare altri tag associati a questo artefatto immutabile. Considera il seguente esempio:

1. Nel client Docker, inserire `hello-world:v1` in un progetto.
1. Nel progetto, imposta una regola di tag immutabile che corrisponda all'immagine e al tag `hello-world:v1`.
1. Premere `hello-world:v1` sul progetto.
1. Nel tuo ambiente locale, ricodifica `hello-world:v1` in `hello-world:v2`.
1. Premere `hello-world:v2` sul progetto.
1. Nell'interfaccia Harbor, tentare di eliminare in sequenza il tag `v1` e `v2` di `hello-world`.

In questo caso, non puoi eliminare il tag `v1` poiché è un tag immutabile e non puoi eliminare l'artefatto `hello-world` che contiene questo tag. Ma puoi eliminare il tag `v2` anche se condivide il digest sha256 con `v1`.

## Crea una regola di immutabilità dei tag

1. Accedi all'interfaccia Harbor con un account che disponga almeno dei privilegi di amministratore del progetto.
1. Vai a **Progetti**, seleziona un progetto, seleziona la policy e seleziona **Immutabilità dei tag**.

    ![Aggiungi una regola di immutabilità](../../../img/tag-immutability.png)

1. Fare clic su **Aggiungi regola**.

    - Nella riga **Repository**, inserisci un elenco separato da virgole di repository a cui applicare o escludere dalla regola selezionando **corrispondente** o **escluso** dal menu a discesa.
    - Nella riga **Tag**, inserisci un elenco di tag separati da virgole a cui applicare o escludere dalla regola selezionando **corrispondente** o **escluso** dal menu a discesa.

      ![Aggiungi una regola di immutabilità](../../../img/add-immutability-rule.png)
1. Fare clic su **Aggiungi** per salvare la regola.

    Puoi aggiungere un massimo di 15 regole di immutabilità per progetto.

    Dopo aver aggiunto una regola, tutti i tag identificati dalla regola vengono contrassegnati **Immutabile** nella scheda Repository.
1. Per modificare una regola esistente, utilizza il menu a discesa **Azione** accanto a una regola per disattivarla, modificarla o eliminarla.

    ![Regole di immutabilità](../../../img/edit-tag-immutability.png)

## Esempio

Per rendere immutabili tutti i tag per tutti i repository nel progetto, imposta le seguenti opzioni:

- Imposta **Per i repository** su **corrispondente** e inserisci `**`.
- Imposta **Tag** su **corrispondente** e inserisci `**`.

Per consentire la sovrascrittura dei tag `rc`, `test` e `nightly` rendendo però immutabili tutti gli altri tag, impostare le seguenti opzioni:

- Imposta **Per i repository** su **corrispondente** e inserisci `**`.
- Imposta **Tag** su **esclusi** e inserisci `rc,test,nightly`.
