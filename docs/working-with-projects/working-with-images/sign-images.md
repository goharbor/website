---
title: Firma gli artefatti con Cosign o Notation
weight: 92
---

La firma degli artefatti e la verifica della firma sono funzionalità di sicurezza critiche che consentono di verificare l'integrità di un artefatto. Harbor supporta l'attendibilità dei contenuti attraverso le integrazioni con [Cosign](https://github.com/sigstore/cosign) e [Notation](https://github.com/notaryproject/notation).

Questa pagina descrive come iniziare a utilizzare Cosign e Notation per firmare i tuoi artefatti. Un amministratore di progetto può configurare un progetto su [imporre la fiducia nei contenuti](../..//working-with-projects/project-configuration/implementing-content-trust#enforce-content-trust), rendendo necessario che tutti gli artefatti siano firmati prima che possano essere estratti da un Harbor registry.

## Usa Cosign per firmare artefatti

Harbor v2.5 integra il supporto per [Cosign](https://github.com/sigstore/cosign), una soluzione di firma e verifica degli artefatti OCI che fa parte di [Progetto Sigstore](https://github.com/sigstore).

Cosign firma gli artefatti OCI e inserisce la firma generata in Harbor. Questa firma viene archiviata come accessorio dell'artefatto insieme all'artefatto firmato. Harbor gestisce un collegamento tra l'artefatto firmato e la firma cosign, consentendo di applicare elementi come [regole di conservazione dei tag](../..//working-with-projects/working-with-images/create-tag-retention-rules/) e [regole immutabili](../../working-with-projects/working-with-images/create-tag-immutability-rules/) a un artefatto firmato e si estenderà sia all'artefatto firmato che alla firma. In questo modo è possibile utilizzare la funzionalità integrata di Harbor per gestire gli artefatti firmati e gli accessori di firma Cosign. Tieni presente che le firme [Scansioni delle vulnerabilità](../../../administration/vulnerability-scanning/) di Cosign non sono supportate.

Una caratteristica fondamentale dell'utilizzo di Cosign con Harbor è la possibilità di utilizzare [capacità di replica](../../administration/configuring-replication/) di Harbor per replicare le firme con l'artefatto firmato associato. Ciò significa che se un [regola di replica](../../administration/configuring-replication/create-replication-rules/) si applica a un artefatto firmato, Harbor applicherà la regola di replica alla firma nello stesso modo in cui la applica all'artefatto firmato.

* Durante la replica tra istanze Harbor, l'istanza Harbor di destinazione manterrà il collegamento tra l'artefatto firmato e le firme associate. Sarai in grado di vedere la relazione tra i due artefatti nell'interfaccia Harbor di destinazione, nello stesso modo in cui la fai nell'interfaccia registry di origine.

* Durante la replica da Harbor a un altro tipo registry di destinazione, il registry di destinazione non gestirà il collegamento tra l'artefatto firmato e le eventuali firme associate. Vedrai il manifest dell'oggetto e le firme come artefatti di coordinamento nello stesso repository.

**Nota:** sono applicabili solo le repliche manuali e pianificate "Modalità di attivazione". La replica basata sugli eventi non è al momento possibile a causa della situazione dell'uovo e della gallina, non è possibile replicare un'immagine che non è firmata, ma non è possibile replicare la firma senza immagine.

### Firma, carica e visualizza le firme Cosign in Harbor

Prima di iniziare a firmare con Cosign, è necessario aver installato localmente cosign e aver generato una chiave privata. Vedere [Documentazione Cosign](https://github.com/sigstore/cosign) per ulteriori informazioni sull'installazione.

Utilizza il comando `cosign sign` per firmare un'immagine e caricare la firma Cosign nella tua istanza Harbor. Sostituisci `<harbor-instance>/<image/path>:<image-tag>` nell'esempio seguente con la tua istanza Harbor e il percorso dell'immagine.

```
cosign sign --key cosign.key <harbor-instance>/<image/path>:<image-tag>
```

Dopo aver inserito la password per la chiave privata cosign, cosign firmerà l'immagine e caricherà la firma generata nella tua istanza Harbor. È possibile visualizzare tutte le firme per un artefatto firmato nell'interfaccia Harbor.

1. Accedi all'interfaccia Harbor e vai al progetto in cui si trova il tuo artefatto firmato.

    ![Immagine con firma cosign](../../../img/image-with-cosign-signature.png)

1. Se all'artefatto è associato un accessorio di firma cosign, è possibile fare clic sull'icona > per visualizzare la tabella Accessori.

    ![Espandi la tabella degli accessori](../../../img/expand-accessories-table.png)

    La tabella Accessori elenca tutte le firme cosign associate che sono state inviate al progetto. Questa tabella mostra il nome, il tipo, la dimensione e l'ora di creazione dell'accessorio.

    ![Visualizza la tabella degli accessori](../../../img/view-accessories-table.png)

### Elimina le firme Cosign

È possibile eliminare una firma Cosign individualmente tramite l'interfaccia Harbor.

1. Accedi all'interfaccia Harbor e vai al progetto in cui si trova il tuo manufatto firmato ed espandi la tabella degli accessori.

    ![Espandi la tabella degli accessori](../../../img/expand-accessories-table.png)

1. Fai clic sull'**icona dei tre punti verticali** accanto alla firma che desideri eliminare, quindi fai clic su Elimina.

    ![Elimina la firma del cofirmatario](../../../img/cosign-signaure-delete.png)

Tutte le firme associate a un artefatto firmato verranno eliminate se l'artefatto firmato viene eliminato.

Tieni presente che [raccolta rifiuti](../../administration/garbage-collection/) di Harbor non rimuoverà alcuna firma individualmente. In Harbor, le firme Cosign vengono trattate come qualsiasi altro artefatto OCI, tranne dalla prospettiva del garbage collector che non può vedere artefatti accessori, come le firme Cosign. Ad esempio, se si configura la garbage collection per gli artefatti senza tag, il garbage collector di Harbor non rimuoverà alcuna firma senza tag. Se l'elemento firmato non è contrassegnato e corrisponde alla regola di Garbage Collect configurata, esso e tutte le firme associate verranno eliminati.

Harbor non supporta `cosign clean` per rimuovere le firme poiché Harbor ha scelto di non implementare l'eliminazione dei tag utilizzata da `cosign clean`. Consulta [Specifica di distribuzione OCI](https://github.com/opencontainers/distribution-spec/blob/main/spec.md#content-management) per ulteriori informazioni sui requisiti di impianto.

## Utilizza Notation per firmare e verificare gli artefatti con la modalità specifica di distribuzione v1.1
[Notation](https://notaryproject.dev/) è uno strumento e una libreria basati su standard per la firma e la verifica degli artefatti OCI. Genera firme e le associa agli artefatti OCI per garantire l'integrità della catena di approvvigionamento.

### Installa Notation CLI
Installa l'ultima versione su Linux. Segui [guida all'installazione](https://notaryproject.dev/docs/user-guides/installation/cli/) per altre piattaforme e metodi.

`brew install notation`

### Generazione di una chiave di prova e di un certificato autofirmato:
Utilizzare la notazione `cert generate-test` per generare una chiave RSA di prova per firmare gli artefatti e un certificato di test `X.509` autofirmato per verificare gli artefatti. Tieni presente che il certificato autofirmato deve essere utilizzato solo a scopo di test o sviluppo. È necessario utilizzare il certificato emesso dalla CA in produzione.

```shell
notation cert generate-test --default "wabbit-networks.io"
```
### Autenticarsi nel registro Harbor
Per autenticarsi con Harbor registry, impostare le seguenti variabili di ambiente:

```shell
export NOTATION_USERNAME="YOUR_REGISTRY_USERNAME"
export NOTATION_PASSWORD="YOUR_REGISTRY_PASSWORD"
```
### Firma un'immagine esistente in Harbor
Supponendo di aver configurato l'accesso HTTPS e di aver inviato un'immagine a Harbor, è possibile utilizzare il comando `notation sign` per firmare l'immagine.

```shell
notation sign <harbor-domain>/<image-reference>
```
Una volta che l'immagine è stata firmata con successo, lo stato firmato viene aggiornato in un segno di spunta verde e la firma corrispondente è stata inviata a registry.

![immagine firmata in Harbor registry](../../../img/signed-image.png)

### Crea una policy di attendibilità per verificare l'immagine
Per verificare l'immagine del contenitore, configurare la policy di attendibilità per specificare le identità attendibili che firmano gli artefatti e il livello di verifica della firma da utilizzare. Per ulteriori dettagli, vedere le specifiche della policy di attendibilità.

Crea un file JSON con la seguente policy di attendibilità, ad esempio:

```shell
cat <<EOF > ./trustpolicy.json
{
    "version": "1.0",
    "trustPolicies": [
        {
            "name": "wabbit-networks-images",
            "registryScopes": [ "*" ],
            "signatureVerification": {
                "level" : "strict"
            },
            "trustStores": [ "ca:wabbit-networks.io" ],
            "trustedIdentities": [
                "*"
            ]
        }
    ]
}
EOF
```
Utilizzare `notation policy import` per importare la configurazione della politica di attendibilità da un file JSON. Per esempio:

```shell
notation policy import ./trustpolicy.json
```

### Verifica l'immagine
Utilizza `notation verify` per verificare le firme associate all'immagine del contenitore.

```shell
notation verify <harbor-domain>/<image-reference>
```

Puoi anche controllare il digest della firma e ispezionare la firma e le informazioni sul certificato per assicurarti che l'immagine sia prodotta da un'identità attendibile.

`notation inspect $IMAGE`

Per ulteriori informazioni vedere [Documentazione Notation](https://notaryproject.dev/docs/).
