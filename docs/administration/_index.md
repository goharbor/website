---
title: Harbor Amministrazione
weight: 10
---

Questa sezione descrive come configurare e gestire Harbor dopo la distribuzione. Queste operazioni vengono eseguite dall'amministratore del sistema Harbor. L'amministratore di sistema Harbor esegue operazioni di configurazione globale che si applicano all'intera istanza Harbor.

Le operazioni che vengono eseguite dall'amministratore del sistema Harbor sono le seguenti.

- Selezionare l'autenticazione basata sul database, LDAP/Active Directory o OIDC. Per informazioni, vedere [Configurazione dell'autenticazione](configure-authentication).
- Aggiungi utenti in modalità di autenticazione del database e assegna il ruolo di amministratore di sistema ad altri utenti. Per informazioni, vedere [Gestione degli utenti](managing-users).
- Configurare le impostazioni globali, come l'impostazione di registry in modalità di sola lettura e la restrizione su chi può creare progetti. Per informazioni, vedere [Configura le impostazioni globali](general-settings).
- Applicare quote di risorse ai progetti. Per informazioni, vedere [Configura le quote del progetto](configure-project-quotas).
- Configurare la replica delle immagini tra Harbor e un'altra istanza Harbor o una destinazione di replica di terze parti. Per informazioni, vedere [Configurazione della replica](configuring-replication).
- Configurare gli scanner delle vulnerabilità per controllare le immagini in registry per le vulnerabilità CVE. Per informazioni, vedere [Scansione delle vulnerabilità](vulnerability-scanning).
- Eseguire la raccolta dei rifiuti, per rimuovere i dati non necessari da Harbor. Per informazioni, vedere [Raccolta dei rifiuti](garbage-collection).
- Gestisci i log di controllo configurando una finestra di conservazione dei log di controllo e impostando un endpoint syslog per inoltrare i log di controllo. Per informazioni, vedere [Rotazione del registro](log-rotation).
- Aggiorna Harbor quando diventa disponibile una nuova versione. Per informazioni, vedere [Aggiornamento di Harbor](upgrade).
- Configura le istanze del provider di preriscaldamento P2P per preriscaldare le immagini specificate nella rete P2P. Per informazioni, vedere [Preriscaldamento P2P](p2p-preheat).
- Dettagli sulla definizione di un artefatto OCI definito dall'utente in modo che Harbor possa gestirlo. Per informazioni, vedere [artefatto OCI definito dall'utente](user-defined-OCI-artifact).
