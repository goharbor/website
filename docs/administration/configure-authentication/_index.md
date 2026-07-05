---
title: Configurazione dell'autenticazione
weight: 10
---

Harbor supporta diverse modalità per l'autenticazione degli utenti e la gestione degli account utente. Dovresti selezionare una modalità di autenticazione non appena distribuisci Harbor.

{{< important >}}
Se crei account utente nel database Harbor, Harbor è bloccato in modalità database. Non è possibile passare a una modalità di autenticazione diversa dopo aver creato gli utenti locali.
{{< /important >}}

- [Autenticazione del database](db-auth.md): crei e gestisci gli account utente direttamente in Harbor. Gli account utente sono memorizzati nel database Harbor.
- [LDAP/Active Directory Autenticazione](ldap-auth.md): colleghi Harbor a un server LDAP/Active Directory esterno. Gli account utente vengono creati e gestiti dal provider LDAP/AD.
- [OIDC Autenticazione del fornitore](oidc-auth.md): colleghi Harbor a un provider OIDC esterno. Gli account utente vengono creati e gestiti dal tuo provider OIDC.

L'interfaccia Harbor offre un'opzione per configurare l'autenticazione UAA. Questa modalità di autenticazione non è consigliata e non è documentata in questa guida.
