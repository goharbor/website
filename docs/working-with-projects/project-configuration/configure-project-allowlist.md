---
title: Configura una lista consentita CVE per progetto
weight: 50
---

Quando si eseguono scansioni di vulnerabilità, vengono identificate le immagini soggette a vulnerabilità ed esposizioni comuni (CVE). A seconda della gravità del CVE e delle impostazioni di sicurezza, l'esecuzione di queste immagini potrebbe non essere consentita. È possibile creare liste consentite di CVE da ignorare durante la scansione delle vulnerabilità. 

Gli amministratori Harbor possono impostare una lista consentita CVE a livello di sistema. Per informazioni sulle liste consentite CVE a livello di sito, vedere [Configurare liste consentite CVE a livello di sistema](../../administration/vulnerability-scanning/configure-system-allowlist.md). Per impostazione predefinita, la lista consentita del sistema viene applicata a tutti i progetti. È possibile configurare diverse liste consentite CVE per singoli progetti, che sovrascrivono la lista consentita del sistema. 

1. Vai su **Progetti**, seleziona un progetto e seleziona **Configurazione**.
1. In **Lista consentita CVE**, seleziona **Lista consentita progetto**.

    ![Lista consentita CVE del progetto](../../../img/cve-allowlist5.png)

1. Facoltativamente, fare clic su **Copia dal sistema** per aggiungere tutti gli ID CVE dalla lista consentita CVE del sistema a questa lista consentita del progetto.
1. Fare clic su **Aggiungi** e inserire un elenco di ID CVE aggiuntivi da ignorare durante la scansione delle vulnerabilità di questo progetto.

    ![Aggiungi CVE di progetto](../../../img/cve-allowlist6.png)

    Utilizza un elenco separato da virgole o un ritorno a capo per aggiungere più ID CVE all'elenco.

1. Fai clic su **Aggiungi** nella parte inferiore della finestra per aggiungere i CVE alla lista consentita del progetto.
1. Facoltativamente, deseleziona la casella di controllo **Non scade mai** e utilizza il selettore del calendario per impostare una data di scadenza per la lista consentita.
1. Fai clic su **Salva** nella parte inferiore della pagina per salvare le impostazioni.

Dopo aver creato una lista consentita di progetti, puoi rimuovere gli ID CVE dall'elenco facendo clic sul pulsante Elimina accanto ad esso nell'elenco. Puoi fare clic su **Aggiungi** in qualsiasi momento per aggiungere altri ID CVE alla lista consentita di questo progetto. 

Se i CVE vengono aggiunti alla lista consentita del sistema dopo aver creato una lista consentita del progetto, fai clic su **Copia dal sistema** per aggiungere le nuove voci dalla lista consentita del sistema alla lista consentita del progetto. 

{{< note >}}
Se i CVE vengono eliminati dalla lista consentita del sistema dopo aver creato una lista consentita del progetto e se hai aggiunto la lista consentita del sistema alla lista consentita del progetto, devi rimuovere manualmente i CVE eliminati dalla lista consentita del progetto. Se fai clic su **Copia dal sistema** dopo che i CVE sono stati eliminati dalla lista consentita del sistema, i CVE eliminati non verranno rimossi automaticamente dalla lista consentita del progetto.
{{< /note >}}
