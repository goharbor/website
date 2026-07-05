---
title: Crea account Project Robot
weight: 40
---

Harbor consente di utilizzare un progetto robot account per automatizzare le operazioni di esecuzione di un progetto tra cui,

![Candidati per l'autorizzazione del progetto](../../../img/robot-account/project-permission-candidates.png)

Un progetto robot account esegue l'autenticazione sulla tua istanza Harbor utilizzando un segreto, consentendoti di connetterti alla tua istanza Harbor tramite il client OCI o Harbor API per automatizzare le attività. Gli account robot non possono accedere all'interfaccia Harbor.

Un progetto robot account può eseguire solo azioni all'interno del progetto in cui è stato creato, tuttavia, Harbor v2.2 introduce la possibilità per gli amministratori di sistema di creare account robot di sistema oltre a creare il progetto robot account che può automatizzare le attività su più progetti. Ulteriori informazioni su [account robot a livello di sistema](../../administration/robot-accounts/).

{{< important >}}
Harbor 2.2 ha introdotto modifiche agli account robot del progetto che influiscono sugli account robot esistenti creati nelle versioni Harbor precedenti alla v2.2. Ulteriori informazioni su [account robot legacy](#legacy-robot-accounts).
{{< /important >}}

## Visualizza gli account Project Robot

1. Accedi all'interfaccia Harbor con un account che disponga almeno dei privilegi di amministratore del progetto.
1. Vai su **Progetti**, seleziona un progetto e seleziona **Account robot**.

![Pagina degli account del robot del progetto](../../../img/project-robot-account.png)

Questa pagina elenca tutti gli account robot di progetto disponibili per un progetto. La tabella elenca le seguenti informazioni per ciascun robot account,

* Il nome di robot account. Deriva dal prefisso robot account configurato per l'istanza Harbor, dal nome del progetto e dal nome assegnato a robot account al momento della creazione. Un nome robot account segue il formato `<prefix><project_name>+<account_name>`. Se utilizzi la funzione di ricerca in questa pagina, devi solo cercare il nome dell'account senza prefisso.
* Lo stato abilitato mostra se un account è abilitato o disattivato.
* Fare clic sul menu a discesa **Autorizzazioni** per visualizzare le autorizzazioni concesse a robot account.
* L'ora creata mostra quando è stato creato robot account.
* Il tempo fino alla scadenza del progetto robot account. Questo viene calcolato in base al tempo di creazione e al tempo di scadenza impostato durante la creazione del progetto robot account.
*La descrizione del progetto robot account.

Puoi vedere solo gli account dei robot di progetto da questa pagina. Gli amministratori Harbor possono anche visualizzare le informazioni sul sistema robot account nella pagina [Account del robot di sistema](../../administration/robot-accounts/).

## Aggiungi un account robot

1. Accedi all'interfaccia Harbor con un account che disponga almeno dei privilegi di amministratore del progetto.
1. Vai su **Progetti**, seleziona un progetto e seleziona **Account robot**.
1. Fare clic su **Nuovo account robot**.
1. Immettere un nome e una descrizione opzionale per questo robot account.
1. Imposta la data di scadenza per questo robot account, puoi anche selezionare la casella di controllo **Mai scaduto** se desideri creare un robot account senza scadenza.
1. Andare al passaggio successivo per concedere le autorizzazioni a robot account. È possibile fare riferimento a [**Riferimenti permessi**](../../administration/robot-accounts/_index.md#permission-references) per assegnare una combinazione di autorizzazioni del progetto a questo robot account. È possibile utilizzare i pulsanti **Seleziona tutto** e **Deseleziona tutto** per aggiungere o rimuovere rapidamente tutte le autorizzazioni da un robot account.

    {{< note >}}The **Push Repository** permission must be assigned with the **Pull Repository** permission. You are not able to assign the Push Repository permission by itself.
    {{< /note >}}

    ![Aggiungere un robot account passaggio 1](../../../img/robot-account/create-project-robot-step1.png)
    ![Aggiungi un robot account passaggio 2](../../../img/robot-account/create-project-robot-step1.png)

1. Fare clic su **FINE**.
1. Nella finestra di conferma, fare clic su **Esporta su file** per scaricare il token di accesso come file JSON oppure fare clic sull'icona degli appunti per copiarne il contenuto negli appunti.

   ![copy_robot_account_token](../../../img/copy-robot-account-token.png)

   {{< important >}}
   Harbor non memorizza i token segreti del robot, quindi è necessario scaricare il segreto oppure copiarne e incollarne il contenuto in un file di testo. Non è possibile ottenere il segreto da Harbor dopo aver creato robot account, tuttavia è possibile aggiornare il segreto dopo aver creato robot account.
   {{< /important >}}

   Il nuovo account del progetto robot viene visualizzato come `<prefix><project_name>+<account_name>` nell'elenco degli account del progetto robot. Il prefisso viene impostato dall'amministratore Harbor ed è lo stesso per tutti gli account robot. Ulteriori informazioni su [Prefissi robot account](../../administration/robot-accounts/#configure-robot-account-prefix).

   ![Nuovo robot account](../../../img/project-robot-account.png)

## Modifica, disattiva o elimina un account Project Robot

Puoi modificare, disattivare o eliminare un progetto robot account.

1. Dalla pagina **Account robot** di un progetto, seleziona la casella di controllo accanto allo robot account che stai aggiornando.
1. Seleziona **Azione**, quindi **Modifica**, **Disattiva** o **Elimina**.

  ![Disattivare o eliminare uno robot account](../../../img/disable-delete-project-robot-account.png)

## Aggiorna il segreto dell'account Project Robot

È possibile aggiornare il segreto di un robot account dopo averlo creato nel caso in cui ne sia necessario uno nuovo.

1. Dalla pagina dell'amministratore **Account robot**, seleziona la casella di controllo accanto allo robot account che stai aggiornando.
1. Seleziona **Azione** e poi **Aggiorna segreto**.
1. Per impostazione predefinita, Harbor genererà un nuovo segreto in modo casuale oppure è possibile scegliere di abilitare la reimpostazione manuale del segreto e l'immissione di **Nuovo segreto**, quindi **Conferma segreto**. Facoltativamente, è possibile visualizzare il segreto facendo clic sull'icona a forma di occhio.

    ![Aggiorna il segreto del progetto robot account](../../../img/refresh-project-robot-account-token.png)

1. Fare clic su **Aggiorna**. Se hai creato un segreto in modo casuale, scarica il file segreto JSON o copia e incolla il suo contenuto.


## Autenticarsi con un account Project Robot

Per utilizzare un robot account in un processo automatizzato, ad esempio, utilizzare `docker login` e fornire le credenziali di robot account.

```
docker login <harbor_address>
Username: <prefix><project_name>+<account_name>
Password: <secret>
```

## Account robot preesistenti

Gli account robot creati prima di Harbor v2.2 sono considerati account robot legacy e verranno visualizzati con un'etichetta **Legacy** nell'interfaccia Harbor v2.2 e successive.

La funzionalità degli account robot legacy è ancora disponibile in Harbor 2.2, ma verrà rimossa in una versione futura di Harbor. Si consiglia vivamente di ricreare gli account robot legacy come account robot di progetto o di sistema dopo l'aggiornamento a Harbor v2.2. Tieni presente che al momento non è possibile migrare gli account robot legacy nel nuovo formato, devi creare un nuovo account.

Funzionalità degli account robot legacy
* È possibile eseguire operazioni utilizzando le CLI Docker e Helm. Un robot account legacy non può accedere all'interfaccia Harbor.
* Non è possibile modificare un robot account preesistente. Puoi solo disattivare o eliminare gli account robot legacy.
* Le autorizzazioni disponibili per gli account robot legacy sono limitate al push e pull di artefatti e al push o pull di un grafico Helm.
*Gli account robot legacy utilizzano un JWT per l'autenticazione. Non è possibile aggiornare o recuperare un token di autenticazione JWT robot account legacy.
* I nomi degli account robot legacy utilizzano il prefisso `robot$`, ad esempio `robot$<account_name>`
