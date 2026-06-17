---
title: Harbor Installazione e configurazione
weight: 5
---

Questa sezione descrive come eseguire una nuova installazione di Harbor.

Se stai effettuando l'aggiornamento da una versione precedente di Harbor, potrebbe essere necessario aggiornare il file di configurazione e migrare i dati per adattarli allo schema del database della versione successiva. Per informazioni sull'aggiornamento, vedere [Aggiornamento di Harbor](../administration/upgrade/_index.md).

Prima di installare Harbor, è possibile testare l'ultima versione di Harbor in un ambiente demo gestito dal team Harbor. Per informazioni, vedere [Prova Harbor con il server demo](demo-server.md).

Harbor supporta l'integrazione con diversi adattatori di replica di terze parti per la replica dei dati, adattatori OIDC per authN/authZ e adattatori scanner per la scansione delle vulnerabilità delle immagini del contenitore. Per informazioni sugli adattatori supportati, vedere [Elenco compatibilità Harbor](harbor-compatibility-list.md).

## Processo di installazione

Il processo di installazione standard di Harbor prevede le seguenti fasi:

1. Assicurati che il tuo host di destinazione soddisfi [Harbor Prerequisiti di installazione](installation-prereqs.md).
1.[Scarica il programma di installazione Harbor](download-installer.md)
1.[Configura HTTPS Accesso a Harbor](configure-https.md)
1.[Configura il file YML Harbor](configure-yml-file.md)
1.[Configurare l'abilitazione di TLS interno](configure-internal-tls.md)
1.[Esegui lo script di installazione](run-installer-script.md)

Se l'installazione non riesce, vedere [Risoluzione dei problemi di installazione Harbor](troubleshoot-installation.md).

## Distribuisci Harbor su Kubernetes

È inoltre possibile utilizzare Helm per installare Harbor su un cluster Kubernetes, per rendere Harbor altamente disponibile. Per informazioni sull'installazione di Harbor con Helm su un cluster Kubernetes, vedere [Distribuzione di Harbor con disponibilità elevata tramite Helm](harbor-ha-helm.md).

## Configurazione post-installazione

Per informazioni su come gestire l'istanza Harbor distribuita, consulta [Riconfigurare Harbor e gestire il ciclo di vita Harbor](reconfigure-manage-lifecycle.md).

Per impostazione predefinita, Harbor utilizza la propria chiave privata e il proprio certificato per autenticarsi con Docker. Per informazioni su come personalizzare facoltativamente la configurazione per utilizzare la propria chiave e il proprio certificato, vedere [Personalizza il servizio token Harbor](customize-token-service.md).

Dopo l'installazione, accedi al tuo Harbor tramite la console web per configurare l'istanza in "configurazione".  Harbor fornisce anche un'interfaccia a riga di comando (CLI) che consente di eseguire [Configurare le impostazioni di sistema Harbor dalla riga di comando](configure-system-settings-cli.md).

## Harbor Componenti

La tabella seguente elenca alcuni dei componenti chiave che vengono distribuiti quando si distribuisce Harbor.

|Componente|Versione|
|---|---|
|Postgresql|15.10|
|Redis|7.2.6|
|Beego|2.3.4|
|Distribuzione/Distribuzione|2.8.3|
|Helm|2.9.1|
|Spavalderia-ui|5.9.1|

* La versione postgresql e redis potrebbe essere aggiornata nella patch minore. 
