Documentazione Harbor

Questo è il sommario principale della documentazione Harbor 2.1.x.

## Harbor Installazione e configurazione

Questa sezione descrive come installare Harbor ed eseguire le configurazioni iniziali richieste. Queste operazioni del giorno 1 vengono eseguite dall'amministratore Harbor.

-[Introduzione](install-config/_index.md)
-[Prova Harbor con il server demo](install-config/demo-server.md)
-[Elenco compatibilità Harbor](install-config/harbor-compatibility-list.md)
-[Harbor Prerequisiti di installazione](install-config/installation-prereqs.md)
-[Scarica il programma di installazione Harbor](install-config/download-installer.md)
-[Configura HTTPS Accesso a Harbor](install-config/configure-https.md)
-[Configura il file YML Harbor](install-config/configure-yml-file.md)
-[Esegui lo script di installazione](install-config/run-installer-script.md)
-[Distribuzione di Harbor con disponibilità elevata tramite Helm](install-config/harbor-ha-helm.md)
-[Risoluzione dei problemi di installazione Harbor](install-config/troubleshoot-installation.md)
-[Riconfigurare Harbor e gestire il ciclo di vita Harbor](install-config/reconfigure-manage-lifecycle.md)
-[Personalizza il servizio token Harbor](install-config/customize-token-service.md)
-[Configura le impostazioni Harbor dalla riga di comando](install-config/configure-system-settings-cli.md)

## Harbor Amministrazione

Questa sezione descrive come utilizzare e gestire Harbor dopo la distribuzione. Queste operazioni del giorno 2 vengono eseguite dall'amministratore Harbor.

-[Introduzione](administration/_index.md)
-[Configurazione dell'autenticazione](administration/configure-authentication/_index.md)
   -[Configura l'autenticazione del database](administration/configure-authentication/db-auth.md)
   -[Configurare l'autenticazione LDAP/Active Directory](administration/configure-authentication/ldap-auth.md)
   -[Configurare l'autenticazione del provider OIDC](administration/configure-authentication/oidc-auth.md)
-[Gestione degli utenti](administration/managing-users/_index.md)
    -[Autorizzazioni utente per ruolo](administration/managing-users/user-permissions-by-role.md)
    -[Crea account utente in modalità database](administration/managing-users/create-users-db.md)
-[Configura le impostazioni globali](administration/general-settings/_index.md)
-[Configura le quote del progetto](administration/configure-project-quotas/_index.md)
-[Configurazione della replica](administration/configuring-replication/_index.md)
    -[Creare endpoint di replica](administration/configuring-replication/create-replication-endpoints.md)
    -[Creare regole di replica](administration/configuring-replication/create-replication-rules.md)
    -[Gestire le repliche](administration/configuring-replication/manage-replications.md)
-[Scansione delle vulnerabilità](administration/vulnerability-scanning/_index.md)
    -[Connetti Harbor a ulteriori scanner di vulnerabilità](administration/vulnerability-scanning/pluggable-scanners.md)
    -[Scansione di singole immagini](administration/vulnerability-scanning/scan-individual-image.md)
    -[Scansiona tutte le immagini](administration/vulnerability-scanning/scan-all-images.md)
    -[Pianifica scansioni](administration/vulnerability-scanning/schedule-scans.md)
    -[Importa i dati sulle vulnerabilità in un'istanza Harbor offline](administration/vulnerability-scanning/import-vulnerability-data.md)
    -[Configurare liste consentite CVE a livello di sistema](administration/vulnerability-scanning/configure-system-allowlist.md)
-[Raccolta dei rifiuti](administration/garbage-collection/_index.md)
-[Aggiorna Harbor e migra i dati](administration/upgrade/upgrade-migrate-data.md)
  -[Aggiornamento di Harbor Distribuito con Helm](administration/upgrade/helm-upgrade.md)
  -[Ripristina un aggiornamento](administration/upgrade/roll-back-upgrade.md)
  -[Prova l'aggiornamento Harbor](administration/upgrade/upgrade-test.md)
-[Configura il preriscaldamento P2P](administration/p2p-preheat/_index.md)
-[Artefatto OCI definito dall'utente](administration/user-defined-OCI-artifact/_index.md)

## Lavorare con progetti Harbor

Questa sezione descrive il modo in cui gli utenti con ruoli di sviluppatore, manutentore e amministratore del progetto gestiscono e partecipano ai progetti Harbor.

-[Introduzione](working-with-projects/_index.md)
-[Crea progetti](working-with-projects/create-projects/_index.md)
    -[Assegnare utenti a un progetto](working-with-projects/add-users.md)
-[Configurazione del progetto](working-with-projects/project-configuration/_index.md)
    -[Accedi e cerca i log del progetto](working-with-projects/access-project-logs.md)
    -[Crea account robot](working-with-projects/create-robot-accounts.md)
    -[Configura le notifiche Webhook](working-with-projects/configure-webhooks.md)
    -[Configura una lista consentita CVE per progetto](working-with-projects/configure-project-allowlist.md)
    -[Implementazione della fiducia nei contenuti](working-with-projects/implementing-content-trust.md)
-[Lavorare con immagini, tag e grafici Helm](working-with-projects/working-with-images.md)
    -[Tirare e spingere immagini](working-with-projects/pulling-pushing-images.md)
    -[Crea etichette](working-with-projects/create-labels.md)
    -[Ricodifica immagini](working-with-projects/retagging-images.md)
    -[Crea regole di conservazione dei tag](working-with-projects/create-tag-retention-rules.md)
    -[Crea regole di immutabilità dei tag](working-with-projects/create-tag-immutability-rules.md)
    -[Gestisci i pacchetti Kubernetes con i grafici Helm](working-with-projects/managing-helm-charts.md)
    -[Preriscaldare le immagini](working-with-projects/working-with-images/preheat-images.md)
-[Utilizzo di API Explorer](working-with-projects/using-api-explorer/_index.md)

## Costruisci, personalizza e contribuisci a Harbor

Questa sezione descrive come gli sviluppatori possono creare dal codice sorgente Harbor, personalizzare le proprie distribuzioni e contribuire al progetto Harbor open source.

-[Costruisci Harbor dal codice sorgente](build-customize-contribute/compile-guide.md)
-[Sviluppo del frontend Harbor](build-customize-contribute/ui-contribution-get-started.md)
-[Personalizza l'aspetto e la sensazione di Harbor ](build-customize-contribute/customize-look-feel.md)
-[Sviluppare per l'internazionalizzazione](build-customize-contribute/developer-guide-i18n.md)
-[Utilizzando Crea](build-customize-contribute/use-make.md)
-[Visualizza e prova Harbor REST API tramite Swagger](build-customize-contribute/configure-swagger.md)
-[Paesaggio del registro](build-customize-contribute/registry-landscape.md)
-[Guida allo scripting dei test E2E](build-customize-contribute/e2e_api_python_based_scripting_guide.md)

Vedi anche l'elenco di [Articoli dalla comunità Harbor](https://github.com/goharbor/harbor/blob/master/docs/README.md#articles-from-the-community).

