---
title: Configurare l'autenticazione del provider OIDC
weight: 25
---

Se si seleziona l'autenticazione OpenID Connect (OIDC), gli utenti accedono all'interfaccia Harbor tramite un provider Single Sign-On (SSO) OIDC, come Okta, KeyCloak o dex. In questo caso, non crei account utente in Harbor.

{{< important >}}
È possibile modificare la modalità di autenticazione da database a OIDC solo se al database non sono stati aggiunti utenti locali. Se nel database Harbor è presente almeno un utente diverso da `admin`, non è possibile modificare la modalità di autenticazione.
{{< /important >}}

Poiché gli utenti sono gestiti dal provider OIDC, l'autoregistrazione, la creazione di utenti, l'eliminazione di utenti, la modifica delle password e la reimpostazione delle password non sono supportate nella modalità di autenticazione OIDC.

### Configura il tuo fornitore OIDC

È necessario configurare il provider OIDC in modo da poterlo utilizzare con Harbor. Per informazioni precise su come eseguire queste configurazioni, consultare la documentazione del proprio provider OIDC.

- Configurare gli utenti e i gruppi che utilizzeranno il provider OIDC per accedere a Harbor. Non è necessario assegnare ruoli OIDC specifici a utenti o gruppi poiché questi non vengono mappati ai ruoli Harbor.
- L'URL dell'endpoint del provider OIDC, noto come server di autorizzazione nella terminologia OAuth, deve servire l'URI noto per il relativo documento di configurazione. Per ulteriori informazioni sul documento di configurazione, consultare [Documentazione OpenID](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfigurationRequest).
- Per gestire gli utenti utilizzando i gruppi OIDC, creare un'attestazione di gruppo personalizzata che contenga tutti i gruppi di utenti che si desidera registrare in Harbor. L'attestazione di gruppo deve essere mappata nel token ID inviato a Harbor quando gli utenti accedono. È possibile abilitare la funzionalità `memberof` sul provider OIDC. Con la funzione `memberof`, l'attributo `memberof` dell'entità utente OIDC viene aggiornato quando l'attributo `member` dell'entità gruppo viene aggiornato, ad esempio aggiungendo o rimuovendo un utente OIDC dal gruppo OIDC.
- Registrare Harbor come applicazione client presso il provider OIDC. Associa l'URI di callback di Harbor all'applicazione client come `redirectURI`. Questo è l'indirizzo al quale il provider OIDC invia i token ID.

### Configura un provider OIDC in Harbor

Prima di configurare un provider OIDC in Harbor, assicurati che il tuo provider sia configurato correttamente secondo la sezione precedente.

1. Accedere all'interfaccia Harbor con un account che disponga dei privilegi di amministratore di sistema Harbor.
1. In **Amministrazione**, vai a **Configurazione** e seleziona la scheda **Autenticazione**.
1. Utilizzare il menu a discesa **Modalità autenticazione** per selezionare **OIDC**.

   ![Autenticazione LDAP](../../../img/select-oidc-auth.png)
1. Inserisci le informazioni sul tuo fornitore OIDC.   
   - **Modalità di autenticazione primaria**: se utilizzare la modalità OIDC come modalità di autenticazione primaria.
{{< note >}}
È possibile eseguire l'override e accedere tramite DB visitando esplicitamente l'URL "/account/sign-in".
{{< /note >}}   
   - **Nome provider OIDC**: il nome del provider OIDC.
   - **OIDC Provider Endpoint**: l'URL dell'endpoint del provider OIDC.
   - **OIDC ID client**: l'ID client con cui Harbor è registrato come applicazione client presso il provider OIDC.
   - **OIDC Segreto client**: il segreto per l'applicazione client Harbor.
   - **Filtro gruppo OIDC**: [espressione regolare](https://pkg.go.dev/regexp/syntax) per selezionare i gruppi corrispondenti dall'elenco `Group Claim Name`. I gruppi corrispondenti vengono aggiunti a Harbor. Questo filtro non limita la capacità degli utenti di accedere a Harbor.
   - **Nome attestazione gruppo**: il nome di un'attestazione di gruppo personalizzata configurata nel provider OIDC, che include i gruppi da aggiungere a Harbor.
   - **OIDC Gruppo di amministratori**: il nome del gruppo di amministratori, se il token ID dell'utente mostra che è un membro di questo gruppo, l'utente avrà l'amministratore
     privilegio in Harbor. **Nota**: puoi impostare un solo gruppo di amministrazione.  Assicurati inoltre che il valore in questo campo corrisponda al valore dell'elemento del gruppo nel token ID.  
   - **OIDC Ambito**: una stringa separata da virgole che elenca gli ambiti da utilizzare durante l'autenticazione. 
   
       L'ambito OIDC deve contenere `openid` e solitamente contiene anche `profile` e `email`. Per ottenere i token di aggiornamento dovrebbe contenere anche `offline_access`. Se si utilizzano gruppi OIDC, un ambito deve identificare l'attestazione del gruppo. Rivolgiti all'amministratore del tuo fornitore OIDC per dettagli precisi su come identificare l'ambito della rivendicazione di gruppo, poiché varia da fornitore a fornitore.
       
       ![Impostazioni OIDC](../../../img/oidc-auth-setting.png)
1. Deseleziona **Verifica certificato** se il provider OIDC utilizza un certificato autofirmato o non attendibile.
1. Seleziona **Onboarding automatico** se non desideri che l'utente imposti il ​​suo nome utente in Harbor durante il suo primo accesso.  Quando questa opzione è selezionata, l'attributo **Username Claim** deve essere impostato, Harbor leggerà il valore di questa attestazione dal token ID e lo utilizzerà come nome utente per l'onboarding dell'utente.  Pertanto, devi assicurarti che il valore impostato in **Username Claim** sia incluso nel token ID restituito dal provider OIDC impostato, altrimenti si verificherà un errore di sistema quando Harbor tenta di eseguire l'onboarding dell'utente.
1. Selezionare **OIDC Session Logout** se si desidera terminare la sessione corrente dell'utente con il provider OIDC dopo che si è disconnesso da Harbor.
1. Verifica che l'URI di reindirizzamento configurato nel tuo provider OIDC sia lo stesso visualizzato in fondo alla pagina. 
       ![OIDC_auto_onboarding](../../../img/oidc-cert-verifi-auto-onboard.png)
1. Fare clic su **Test server OIDC** per assicurarsi che la configurazione sia corretta.
1. Fare clic su **Salva** per completare la configurazione.

### Accedi a Harbor tramite un provider OIDC

Quando l'amministratore di sistema Harbor ha configurato Harbor per l'autenticazione tramite OIDC, nella pagina di accesso di Harbor viene visualizzato il pulsante **LOGIN WITH ${your_oidc_provider_name}**.  

![oidc_login](../../../img/oidc-login.png)

**NOTA:** Quando Harbor è configurata con l'autenticazione tramite OIDC, il pulsante **LOGIN TRAMITE DB LOCALE** consente all'amministratore di sistema Harbor locale di accedere.
    
1. Come utente Harbor, fai clic sul pulsante **ACCEDI CON ${your_oidc_provider_name}**.
 
   Questo ti reindirizza al provider OIDC per l'autenticazione, dopo che il provider OIDC ti ha autenticato, verrai reindirizzato a Harbor. 
1. Se è la prima volta che accedi a Harbor con OIDC, verrai integrato in Harbor in modo da avere un record utente nel database di Harbor, che viene utilizzato quando ti aggiungi a progetti, assegni ruoli e così via.  Il flusso di questo processo dipende dalla configurazione:
   1. Se l'opzione **Onboarding automatico** non è selezionata, verrà visualizzata una finestra di dialogo per specificare un nome utente per Harbor da associare al nome utente OIDC.
       ![Specificare il nome utente Harbor per OIDC](../../../img/oidc-onboard-dlg.png)
       Se il nome utente è già in uso, ti verrà richiesto di sceglierne un altro.
   2. Se l'opzione **Onboarding automatico** è selezionata, non ti verrà richiesto di impostare il nome utente, invece, Harbor proverà a estrarre il nome utente dal token ID tramite l'attestazione impostata in **Username Claim** e a eseguire automaticamente l'onboarding dell'utente utilizzando questo nome utente.

### Utilizzo di OIDC da Docker o Helm CLI

Dopo aver effettuato l'autenticazione tramite OIDC e aver effettuato l'accesso all'interfaccia Harbor per la prima volta, è possibile utilizzare Docker o Helm CLI per accedere a Harbor.

Le CLI Docker e Helm non possono gestire il reindirizzamento per OIDC, quindi Harbor fornisce un segreto CLI da utilizzare quando si accede da Docker o Helm. Questo è disponibile solo quando Harbor utilizza l'autenticazione OIDC.  

1. Accedi a Harbor con un account utente OIDC.
1. Fai clic sul tuo nome utente nella parte superiore dello schermo e seleziona **Profilo utente**.

   ![Accedi al profilo utente](../../../img/user-profile.png)
1. Fai clic sull'icona degli appunti per copiare il segreto CLI associato al tuo account.

   ![Copia il segreto CLI](../../../img/profile-dlg.png)
1. Facoltativamente, fare clic sull'icona **...** nel profilo utente per visualizzare i pulsanti per generare automaticamente o creare manualmente un nuovo segreto CLI.

   ![Copia il segreto CLI](../../../img/generate-create-new-secret.png) 

   Un utente può avere solo un segreto CLI, quindi quando viene generato o creato un nuovo segreto, quello vecchio diventa non valido.
1. Se hai generato un nuovo segreto CLI, fai clic sull'icona degli appunti per copiarlo.

Ora puoi utilizzare il tuo segreto CLI come password quando accedi a Harbor da Docker o Helm CLI.

<pre>
docker login -u testuser -p <i>cli_secret</i> jt-dev.local.goharbor.io
</pre>

{{< note >}}
Il segreto CLI è associato al token ID OIDC. Harbor tenterà di aggiornare il token, quindi il segreto CLI sarà valido dopo la scadenza del token ID. Tuttavia, se il provider OIDC non fornisce un token di aggiornamento o l'aggiornamento non riesce, il segreto CLI diventa non valido. In questo caso, disconnettersi e accedere nuovamente a Harbor tramite il provider OIDC in modo che Harbor possa ottenere un nuovo token ID. Il segreto CLI funzionerà quindi di nuovo.
{{< /note >}}
