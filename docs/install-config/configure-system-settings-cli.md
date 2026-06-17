---
title: Configurazione Harbor
weight: 65
---

Alcune configurazioni Harbor sono configurate separatamente dalla sezione [Configura il file YML Harbor](configure-yml-file.md). È possibile modificare la configurazione nell'interfaccia Harbor, tramite richieste HTTP o utilizzando una variabile di ambiente. Questa pagina descrive gli elementi di configurazione disponibili e come utilizzare la riga di comando o la variabile di ambiente per aggiornare la configurazione.


## Esempi di comandi di configurazione per la riga di comando


**Ottieni la configurazione attuale:**

```sh
curl -u "<username>:<password>" -H "Content-Type: application/json" -ki <Harbor Server URL>/api/v2.0/configurations
```

**Aggiorna la configurazione attuale:**

```sh
curl -X PUT -u "<username>:<password>" -H "Content-Type: application/json" -ki <Harbor Server URL>/api/v2.0/configurations -d'{"<item_name>":"<item_value>"}'
```


**Aggiorna Harbor per utilizzare l'autenticazione LDAP:**

Comando

```shell
curl -X PUT -u "<username>:<password>" -H "Content-Type: application/json" -ki https://harbor.sample.domain/api/v2.0/configurations -d'{"auth_mode":"ldap_auth"}'
```

Produzione

```
HTTP/1.1 200 OK
Server: nginx
Date: Wed, 08 May 2019 08:22:02 GMT
Content-Type: text/plain; charset=utf-8
Content-Length: 0
Connection: keep-alive
Set-Cookie: sid=a5803a1265e2b095cf65ce1d8bbd79b1; Path=/; HttpOnly
```

**Limita la creazione di progetti agli amministratori Harbor:**

Comando

```shell
curl -X PUT -u "<username>:<password>" -H "Content-Type: application/json" -ki https://harbor.sample.domain/api/v2.0/configurations -d'{"project_creation_restriction":"adminonly"}'
```

Produzione

```
HTTP/1.1 200 OK
Server: nginx
Date: Wed, 08 May 2019 08:24:32 GMT
Content-Type: text/plain; charset=utf-8
Content-Length: 0
Connection: keep-alive
Set-Cookie: sid=b7925eaf7af53bdefb13bdcae201a14a; Path=/; HttpOnly
```

**Aggiorna la scadenza del token:**

Comando

```shell
curl -X PUT -u "<username>:<password>" -H "Content-Type: application/json" -ki https://harbor.sample.domain/api/v2.0/configurations -d'{"token_expiration":"300"}'
```

Produzione

```
HTTP/1.1 200 OK
Server: nginx
Date: Wed, 08 May 2019 08:23:38 GMT
Content-Type: text/plain; charset=utf-8
Content-Length: 0
Connection: keep-alive
Set-Cookie: sid=cc1bc93ffa2675253fc62b4bf3d9de0e; Path=/; HttpOnly
```

## Imposta gli elementi di configurazione utilizzando una variabile di ambiente

Nella versione 2.3.0 è stata introdotta la possibilità di utilizzare una variabile di ambiente, `CONFIG_OVERWRITE_JSON`, nel contenitore principale per impostare la configurazione. Una volta impostata la variabile `CONFIG_OVERWRITE_JSON`, è possibile aggiornare o rimuovere la configurazione solo aggiornando `CONFIG_OVERWRITE_JSON` e riavviando il contenitore. Non sarai in grado di aggiornare la configurazione nell'interfaccia Harbor o nella riga di comando.

**Esempio di configurazione CONFIG_OVERWRITE_JSON:**

```
CONFIG_OVERWRITE_JSON={"ldap_verify_cert":"false", "auth_mode":"ldap_auth","ldap_base_dn":"dc=example,dc=com", "ldap_search_dn":"cn=admin,dc=example,dc=com","ldap_search_password":"admin","ldap_url":"myldap.example.com", "ldap_scope":2}

```

Vedere la tabella [Elementi di configurazione Harbor](#harbor-configuration-items) di seguito per ulteriori informazioni sugli ingressi disponibili per `CONFIG_OVERWRITE_JSON`.

{{< note >}}
Se è presente un utente legacy nella tua istanza di Harbor, la modalità di autenticazione non può essere modificata dalla variabile di ambiente `CONFIG_OVERWRITE_JSON`.
{{< /note >}}


## Elementi di configurazione Harbor

| Configura il nome dell'elemento | Descrizione | Digitare | Obbligatorio | Valore predefinito |
| ------------ |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------| ----- | ----- |
modalità_autenticazione | Modalità di autenticazione, può essere db_auth, ldap_auth, uaa_auth o oidc_auth | corda  
modalità_autenticazione_primaria | Imposta il provider di identità come metodo di autenticazione principale | booleano | facoltativo | falso |
ldap_url | LDAPURL | stringa | richiesto |
ldap_base_dn | LDAP base DN | stringa | richiesto(ldap_auth)
ldap_filter | Filtro LDAP | stringa | opzionale
ldap_scope | Ambito di ricerca LDAP, livello base 0, livello 1, albero secondario 2 | numero | facoltativo | 2-Sottoalbero
ldap_search_dn | LDAP DN per cercare gli utenti LDAP | stringa | richiesto(ldap_auth)
ldap_search_password | LDAP Password del DN | stringa | richiesto(ldap_auth)
ldap_timeout | LDAP timeout connessione | numero | facoltativo | 5
ldap_uid | Attributo LDAP per indicare il nome utente in Harbor | stringa | facoltativo | cn
ldap_verify_cert | Verifica il certificato quando crei una connessione SSL con il server LDAP, vero o falso | booleano | facoltativo | VERO
ldap_group_admin_dn | LDAP DN amministratore gruppo | stringa | opzionale
ldap_group_attribute_name | Attributo gruppo LDAP, l'attributo LDAP indica il nome del gruppo in Harbor, può essere gid o cn | stringa | facoltativo | cn
ldap_group_base_dn | Il DN Base su cui ricercare i gruppi LDAP | stringa | obbligatorio (ldap_auth e gruppo LDAP)
ldap_group_search_filter | Il filtro per cercare i gruppi LDAP | stringa | opzionale
ldap_group_search_scope | Ambito di ricerca di gruppo LDAP, livello base 0, livello 1, albero secondario 2 | numero | facoltativo | 2-Sottoalbero|
ldap_group_membership_attribute | LDAP Attributo di appartenenza al gruppo, per indicare l'appartenenza al gruppo, può essere memberof o ismemberof | stringa | facoltativo | membro di
progetto_creazione_restrizione | L'opzione per indicare che l'utente può essere creato oggetto, può essere chiunque, solo amministratore | stringa | facoltativo | tutti
sola_lettura | L'opzione per impostare il repository in sola lettura può essere vera o falsa | booleano | facoltativo | falso
auto_registrazione | L'utente può registrare l'account in Harbor, può essere vero o falso | booleano | facoltativo| VERO
scadenza_token | Tempo di scadenza del token di sicurezza in minuti | numero |facoltativo| 30
uaa_client_id | ID cliente UAA | stringa | richiesto(uaa_auth)
uaa_client_secret | Certificato UAA | stringa | richiesto(uaa_auth)
uaa_endpoint | Punto finale dell'UAA | stringa |  richiesto(uaa_auth)
uaa_verify_cert | Certificato di verifica UAA, vero o falso | booleano | facoltativo | VERO
nome_oidc | Nome per l'autenticazione OIDC | stringa | richiesto(oidc_auth)
punto_endc_oidc | Endpoint per l'autenticazione OIDC | stringa | richiesto(oidc_auth)
oidc_extra_redirect_parms | Parametri aggiuntivi da aggiungere quando viene reindirizzata la richiesta al provider OIDC | stringa | facoltativo | {}
oidc_client_id | ID client per OIDC autenticazione | stringa | richiesto(oidc_auth)
oidc_client_secret | Segreto client per OIDC auth | stringa | richiesto(oidc_auth)
oidc_groups_claim | Il nome di un'attestazione di gruppo personalizzata configurata nel provider OIDC, che include i gruppi da aggiungere a Harbor | stringa | opzionale
oidc_admin_group | Il nome del gruppo di amministratori, se il token ID dell'utente mostra che è un membro di questo gruppo, l'utente avrà privilegi di amministratore in Harbor. Nota: puoi impostare un solo gruppo di amministratori. | stringa | opzionale
oidc_scope | Ambito di autenticazione OIDC | stringa | richiesto(oidc_auth)
oidc_verify_cert | Verifica il certificato per l'autenticazione OIDC, vero o falso | booleano | facoltativo | VERO
oidc_auto_onboard | Salta la schermata di onboarding, in modo che l'utente non possa modificare il proprio nome utente. Il nome utente viene fornito dal token ID, vero o falso | booleano | facoltativo | falso
oidc_user_claim | Il nome dell'attestazione nel token ID da cui viene recuperato il nome utente | stringa | facoltativo | nome
oidc_logout | Disconnette l'utente dalla sessione corrente con il provider di identità | booleano | facoltativo | falso
robot_token_duration | Scadenza del token robot in minuti | numero | facoltativo | 43200 (30 giorni)
prefisso_nome_robot | Stringa prefissata per ogni nome robot account | stringa | facoltativo | robot$ |
audit_log_forward_endpoint | Inoltra i log di controllo all'endpoint syslog, ad esempio: harbour-log:10514 | stringa | facoltativo |
skip_audit_log_database | Passa al log di controllo del log nel database, disponibile solo quando l'endpoint di inoltro del log di controllo è configurato | booleano | facoltativo | falso
scanner_skip_update_pulltime | Lo scanner delle vulnerabilità (ad esempio Trivy) non aggiornerà l'"ora dell'ultimo pull" dell'immagine quando l'immagine viene scansionata | booleano | facoltativo |
messaggio_banner | Il messaggio banner per UI. E' il risultato stringato dell'oggetto messaggio banner | stringa | facoltativo |

{{< note >}}
Sia i booleani che i numeri possono essere racchiusi tra virgolette doppie nel json della richiesta, ad esempio: `123`, `"123"`, `"true"` o `true` è OK.
{{< /note >}}
