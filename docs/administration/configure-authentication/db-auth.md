---
title: Configura l'autenticazione del database
weight: 15
---

Nella modalità di autenticazione del database, gli account utente vengono archiviati nel database locale. Per impostazione predefinita, solo l'amministratore di sistema Harbor può creare account utente per aggiungere utenti a Harbor. Facoltativamente è possibile configurare Harbor per consentire l'autoregistrazione.  

{{< important >}}
Se crei utenti nel database, Harbor è bloccato in modalità database. Non è possibile passare a una modalità di autenticazione diversa dopo aver creato gli utenti locali.
{{< /important >}}

1. Accedere all'interfaccia Harbor con un account che disponga dei privilegi di amministratore di sistema Harbor.
1. In **Amministrazione**, vai a **Configurazione** e seleziona la scheda **Autenticazione**.
1. Lasciare **Modalità di autenticazione** impostata sull'opzione **Database** predefinita.

   ![Autenticazione del database](../../../img/db-auth.png)
   
1. Selezionare facoltativamente la casella di controllo **Consenti autoregistrazione**.

   ![Abilita l'autoregistrazione](../../../img/new-self-reg.png)
    
   Se abiliti l'opzione di autoregistrazione, gli utenti possono registrarsi in Harbor. L'autoregistrazione è disattivata per impostazione predefinita. Se abiliti l'autoregistrazione, gli utenti non registrati possono registrarsi per un account Harbor facendo clic su **Registrati per un account** nella pagina di accesso di Harbor.
    
    ![Abilita l'autoregistrazione](../../../img/self-registration-login.png)
    
## Cosa fare dopo

Per informazioni su come creare utenti in modalità di autenticazione del database, vedere [Crea account utente in modalità database](../managing-users/create-users-db.md).
