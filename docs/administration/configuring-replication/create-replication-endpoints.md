---
title: Creazione di endpoint di replica
weight: 20
---

Per replicare i repository di immagini da un'istanza di Harbor a un'altra Harbor o non Harbor registry, devi prima creare endpoint di replica.

{{< note >}}
Puoi anche utilizzare un endpoint in un progetto di cache proxy. Ulteriori informazioni su come eseguire [Configura cache proxy](../../configure-proxy-cache/).
{{< /note >}}

1. Vai a **Registri** e fai clic sul pulsante **+ Nuovo endpoint**.

   ![Nuovo endpoint di replica](../../../img/replication-endpoint1.png)

1. Per **Provider**, utilizzare il menu a discesa per selezionare il tipo di registry da configurare come endpoint di replica.

   L'endpoint può essere un'altra istanza Harbor o un'istanza non Harbor registry. Attualmente sono supportati i seguenti registri non Harbor:

   - Registro dei contenitori Alibaba Cloud
   - Registro dei contenitori elastici AWS
   - Registro contenitori di Azure
   -Mozzo Docker
   -Dockerregistry
   - Registro dei contenitori Github
   - Google Container Registry (e Google Cloud Artifact Registry)
   - Repository software Huawei per contenitore
   - Artifabbrica Jfrog
   - Registro dei contenitori Tencent
   - Registro dei contenitori VolcEngine

   {{< note >}}
   Se prevedi di utilizzare questo endpoint in un progetto di cache proxy, tieni presente che supportano solo i registri Harbor, Alibaba Cloud Container Registry, Azure Container Registry, Docker Hub, Docker registry, AWS Elastic Container Registry, Google Container Registry/Google Cloud Artifact Registry, Github Container Registry e Jfrog Artifactory. Ulteriori informazioni su come eseguire [Configura cache proxy](../../configure-proxy-cache/).
   {{< /note >}}

   ![Fornitori di replica](../../../img/replication-endpoint2.png)

1. Immettere un nome e una descrizione adeguati per il nuovo endpoint di replica.
1. Immettere l'URL completo di registry da configurare come endpoint di replica.

   Ad esempio, per replicare su un'altra istanza Harbor, immettere https://harbor_instance_address:443. registry deve esistere ed essere in esecuzione prima di creare l'endpoint.

1. Immettere l'ID di accesso e il segreto di accesso per l'istanza registry dell'endpoint.

   Utilizzare un account che disponga dei privilegi appropriati su quello registry o un account che disponga dell'autorizzazione di scrittura sul progetto corrispondente in uno Harbor registry. Visualizza ulteriori informazioni su [ID di accesso e configurazione segreta](#access-id-and-secret-configuration).

   {{< note >}}
   Se prevedi di utilizzare questo endpoint con un progetto cache proxy, gli account di accesso forniti qui consentono al progetto cache proxy di estrarre ogni immagine dal registry di destinazione per cui l'account di accesso è autorizzato a estrarre.
   {{< /note >}}

   {{< note >}}
   Quando un endpoint viene utilizzato per la cache proxy, Harbor può ottenere token seguendo la sfida `WWW-Authenticate: Bearer realm="..."` upstream.
   Il servizio token può essere ospitato su un dominio diverso da registry.
   Configura solo registri/endpoint upstream attendibili e utilizza credenziali di accesso con privilegi minimi.
   {{< /note >}}

1. Facoltativamente, selezionare la casella di controllo **Verifica certificato remoto**.

   Deselezionare la casella di controllo se il telecomando registry utilizza un certificato autofirmato o non attendibile.

1. Fare clic su **Verifica connessione**.
1. Una volta testato con successo la connessione, fare clic su **OK**.

## ID di accesso e configurazione segreta

- Gli adattatori AWS ECR devono utilizzare chiavi di accesso, non nome utente e password. La chiave di accesso deve disporre di autorizzazioni sufficienti, ad esempio l'autorizzazione di archiviazione.
- Gli adattatori Google GCR devono utilizzare l'intera chiave JSON generata nell'account del servizio. Lo spazio dei nomi dovrebbe iniziare con l'ID progetto.
- Registro delle banchine
   - Ambito supportato
      - [Quay.io](https://quay.io) (versione cloud) non consente di creare automaticamente spazi dei nomi (organizzazioni), a causa di Recaptcha abilitato sul lato Quay.io.
      - [RedHat Quay](https://www.openshift.com/products/quay) (versione aziendale locale) è completamente supportato (testato su v3.2.0)
      - Anche [Progetto Quay](https://github.com/quay/quay) (versione open source) è teoricamente supportato, ma non è stato ancora testato.
   - Autorizzazione
      - Se ci si connette a uno registry senza autorizzazione, lasciare vuoti ID accesso e Segreto accesso.
      - Se ci si connette a uno registry con autorizzazione, non è necessario inserire un ID di accesso. Harbor utilizza json_file come ID di accesso predefinito. Inserisci il tuo segreto di accesso in formato json, ad esempio:
      ```
      {
      "oauth2_token": "YmQZ1QZENVmOD6v9kENzmfptNVhgBuy5oVl85eGV", // optional
      "account_name": "jack",
      "docker_cli_password": "q6NVazikNqIf4coiQ+JvV4iqiCpkNjE0DLX8ZMQuFRbkHk5iMv6/hd4WdV3W3nyX"
      }
      ```
      - `oauth2_token` è necessario solo se si desidera creare un'organizzazione automaticamente.
      - `account_name` è il tuo nome di accesso. Non è consigliabile utilizzare uno robot account perché uno robot account non può accedere ai repository di diverse organizzazioni.
      - `docker_cli_password` è la tua password cli. Puoi generarlo nella pagina dell'interfaccia utente di Quay.

   {{< note >}} Harbor does not support Docker registry manifest schema1 in Quay registries. {{< /note >}}

## Gestione dei registri

Puoi elencare, aggiungere, modificare ed eliminare i registri in **Amministrazione** -> **Registri**. È possibile eliminare solo i registri a cui non fa riferimento alcuna regola.

![sfoglia progetto](../../../img/manage-registry.png)

## Cosa fare dopo

Dopo aver configurato gli endpoint di replica, vedere [Creazione di una regola di replica](create-replication-rules.md).
