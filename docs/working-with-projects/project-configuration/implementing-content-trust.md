---
title: Implementazione della fiducia nei contenuti
weight: 55
---

La firma degli artefatti e la verifica della firma sono funzionalità di sicurezza critiche che consentono di verificare l'integrità di un artefatto. Harbor supporta l'attendibilità dei contenuti attraverso le integrazioni con [Cosign](https://github.com/sigstore/cosign) e [Notation](https://github.com/notaryproject/notation), garantendo che solo le immagini firmate e verificate vengano estratte dall'istanza Harbor.

Questa pagina descrive come eseguire [imporre la fiducia nei contenuti](#enforce-content-trust) utilizzando una policy di distribuzione Harbor predefinita. Per ulteriori informazioni sull'utilizzo di Cosign e Notation con Harbor, vedere ulteriori informazioni su come utilizzare [Firma gli artefatti con Cosign e Notation](../../working-with-images/sign-images).

## Applica la sicurezza della distribuzione

In qualità di amministratore del progetto, puoi rafforzare la sicurezza della distribuzione attivando la politica di distribuzione predefinita per Cosign o Notation per un determinato progetto.

1. Accedi all'interfaccia Harbor e vai alla scheda Configurazione per il progetto su cui desideri applicare l'attendibilità del contenuto.
1. Selezionare la casella di controllo **Cosign** o **Notation**. Se selezionato, Harbor consentirà solo l'estrazione dal progetto di immagini verificate. Le immagini verificate sono determinate da Cosign o Notation, a seconda della politica che hai controllato. Puoi selezionare entrambe le opzioni se desideri che entrambe le politiche vengano applicate. Se sono applicate sia le politiche Cosign che Notation, le immagini dovranno essere firmate sia da Cosign che da Notation per essere estratte.
1. Fare clic su **Salva**.

  ![Abilita la sicurezza della distribuzione nella pagina di configurazione del progetto](../../../img/enable-deployment-security.png)
