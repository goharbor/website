---
title: Assegnare utenti a un progetto
weight: 25
---

Puoi aggiungere singoli utenti a un progetto esistente e assegnare loro un ruolo. È possibile aggiungere un utente LDAP/AD o OIDC ai membri del progetto se si utilizza l'autenticazione LDAP/AD o OIDC oppure un utente già creato se si utilizza l'autenticazione del database. Se si utilizza l'autenticazione LDAP/AD o OIDC, è possibile aggiungere gruppi ai progetti e assegnare un ruolo al gruppo.

Per ulteriori informazioni su utenti e ruoli in Harbor, vedere [Autorizzazioni utente per ruolo](../../administration/managing-users/user-permissions-by-role.md).

## Aggiungi singoli membri ai progetti 

1. Accedi all'interfaccia Harbor con un account che disponga almeno dei privilegi di amministratore del progetto.
1. Vai su **Progetti** e seleziona un progetto. 
1. Seleziona la scheda **Membri** e fai clic su **+Utente**.

   ![sfoglia progetto](../../../img/project-members.png)
1. Immettere il nome di un database esistente, utente LDAP/AD o OIDC e selezionare un ruolo per questo utente.

   ![sfoglia progetto](../../../img/new-add-member.png)
1. Facoltativamente, seleziona uno o più membri, fai clic su **Azione** e seleziona un ruolo diverso per l'utente o gli utenti oppure seleziona **Rimuovi** per rimuoverli dal progetto.

   ![sfoglia progetto](../../../img/new-remove-update-member.png)

## Aggiungi gruppi LDAP/AD ai progetti

1. Accedi all'interfaccia Harbor con un account che disponga almeno dei privilegi di amministratore del progetto.
1. Vai su **Progetti** e seleziona un progetto. 
1. Seleziona la scheda **Membri** e fai clic su **+Gruppo**.

   ![Aggiungi gruppo](../../../img/add-group.png)
1. Inserisci il nome di un gruppo che hai già utilizzato in Harbor e assegna un ruolo a quel gruppo.

   ![Screenshot della finestra di dialogo Aggiungi gruppo](../../../img/ldap-group-addgroup-dialog.png)
   

Una volta assegnato un ruolo in un progetto a un gruppo LDAP, tutti gli utenti LDAP/AD in questo gruppo avranno i privilegi del ruolo assegnato al gruppo. Se un utente ha sia un ruolo a livello di utente che un ruolo a livello di gruppo, questi privilegi vengono uniti.

Se un utente nel gruppo LDAP dispone dei privilegi di amministratore, l'utente avrà gli stessi privilegi dell'amministratore di sistema Harbor.

## Aggiungi gruppi OIDC ai progetti

Per poter aggiungere gruppi OIDC ai progetti, il provider OIDC e l'istanza Harbor devono essere configurati correttamente. Per informazioni su come configurare OIDC in modo che Harbor possa utilizzare i gruppi, vedere [OIDC Autenticazione del fornitore](../../administration/configure-authentication/oidc-auth.md).

1. Accedi all'interfaccia Harbor con un account che disponga almeno dei privilegi di amministratore del progetto.
1. Vai su **Progetti** e seleziona un progetto. 
1. Seleziona la scheda **Membri** e fai clic su **+Gruppo**.

   ![Aggiungi gruppo](../../../img/add-group.png)
1. Inserisci il nome di un gruppo già esistente nel tuo provider OIDC e assegna un ruolo a quel gruppo.

   ![Aggiungi gruppo](../../../img/add-oidc-group.png)

{{< note >}}
A differenza dei gruppi LDAP, Harbor non può verificare se esistono gruppi OIDC quando li aggiungi a un progetto. Se si digita in modo errato il nome del gruppo o se il gruppo non esiste nel provider OIDC, Harbor crea comunque il gruppo.
{{< /note >}}
