---
title: Configurare l'autenticazione LDAP/Active Directory
weight: 20
---

Se si seleziona l'autenticazione LDAP/AD, gli utenti le cui credenziali sono archiviate in un server LDAP o AD esterno possono accedere direttamente a Harbor. In questo caso, non crei account utente in Harbor.

{{< important >}}
È possibile modificare la modalità di autenticazione da database a LDAP solo se al database non sono stati aggiunti utenti locali. Se nel database Harbor è presente almeno un utente diverso da `admin`, non è possibile modificare la modalità di autenticazione.
{{< /important >}}

Poiché gli utenti sono gestiti da LDAP o AD, l'autoregistrazione, la creazione di utenti, l'eliminazione di utenti, la modifica delle password e la reimpostazione delle password non sono supportate nella modalità di autenticazione LDAP/AD.  

Se si desidera gestire l'autenticazione utente utilizzando i gruppi LDAP, è necessario abilitare la funzione `memberof` sul server LDAP/AD. Con la funzione `memberof`, l'attributo `memberof` dell'entità utente LDAP/AD viene aggiornato quando l'attributo `member` dell'entità gruppo viene aggiornato, ad esempio aggiungendo o rimuovendo un utente LDAP/AD dal gruppo LDAP/AD. Questa funzione è abilitata per impostazione predefinita in Active Directory. Per informazioni su come abilitare e verificare l'overlay `memberof` in OpenLDAP, vedere [questa nota tecnica](https://technicalnotes.wordpress.com/2014/04/19/openldap-setup-with-memberof-overlay).

1. Accedere all'interfaccia Harbor con un account che disponga dei privilegi di amministratore di sistema Harbor.
1. In **Amministrazione**, vai a **Configurazione** e seleziona la scheda **Autenticazione**.
1. Utilizzare il menu a discesa **Modalità autenticazione** per selezionare **LDAP**.

   ![Autenticazione LDAP](../../../img/select-ldap-auth.png)
1. Inserisci l'indirizzo del tuo server LDAP, ad esempio `ldaps://10.162.16.194`.
1. Inserisci le informazioni sul tuo server LDAP.

   - **LDAP DN di ricerca** e **LDAP Password di ricerca**: quando un utente accede a Harbor con il nome utente e la password LDAP, Harbor utilizza questi valori per collegarsi al server LDAP/AD. Ad esempio, `cn=admin,dc=example.com`.
   - **LDAP Base DN**: Harbor cerca l'utente nella voce LDAP Base DN, incluso il sottoalbero. Ad esempio, `dc=example.com`.
   - **Filtro LDAP**: il filtro per cercare gli utenti LDAP/AD. Ad esempio, `objectclass=user`.
   - **LDAP UID**: un attributo, ad esempio `uid` o `cn`, utilizzato per abbinare un utente al nome utente. Se viene trovata una corrispondenza, la password dell'utente viene verificata mediante una richiesta di collegamento al server LDAP/AD.
   - **LDAP Ambito**: l'ambito per cercare gli utenti LDAP/AD. Selezionare tra **Sottostruttura**, **Base** e **Un livello**.

     ![Configurazione base LDAP](../../../img/ldap-auth.png)  
1. Se si desidera gestire l'autenticazione dell'utente con i gruppi LDAP, configurare le impostazioni del gruppo.
   - **LDAP DN base gruppo**: il DN base da cui cercare un gruppo in LDAP/AD. Ad esempio, `ou=groups,dc=example,dc=com`. Questo campo non può essere vuoto quando la funzione di gruppo LDAP è abilitata.
   - **Filtro gruppo LDAP**: il filtro per cercare i gruppi LDAP/AD. per OpenLDAP: `objectclass=groupOfNames`. per Active Directory: `objectclass=group`. Questo campo non può essere vuoto quando la funzione di gruppo LDAP è abilitata.
   - **LDAP GID gruppo**: l'attributo utilizzato per denominare un gruppo LDAP/AD. Ad esempio, `cn`. Questo campo non può essere vuoto quando la funzione di gruppo LDAP è abilitata.
   - **LDAP DN amministratore gruppo**: tutti gli utenti LDAP/AD in questo DN gruppo hanno privilegi di amministratore di sistema Harbor.
   - **LDAP Appartenenza al gruppo**: l'attributo utente usd per identificare un utente come membro di un gruppo. Per impostazione predefinita è `memberof`.
   - **LDAP Ambito**: l'ambito per la ricerca dei gruppi LDAP/AD. Selezionare tra **Sottostruttura**, **Base** e **Un livello**.

     ![Configurazione del gruppo LDAP](../../../img/ldap-groups.png)
   - **LDAP Gruppo allegato in parallelo**: abilitare questa opzione per allegare un gruppo in parallelo per evitare timeout nell'accesso dell'utente quando ci sono troppi gruppi associati all'utente LDAP.
     ![Gruppo LDAP collegato in parallelo](../../../img/ldap-group-parallel.png) 
1. Deselezionare **LDAP Verify Cert** se il server LDAP/AD utilizza un certificato autofirmato o non attendibile.

   ![Verifica del certificato LDAP](../../../img/ldap-cert-test.png)
1. Fare clic su **Test server LDAP** per assicurarsi che la configurazione sia corretta.
1. Fare clic su **Salva** per completare la configurazione.
