---
title: Estrazione e push di immagini nel client Docker
weight: 65
---

Harbor supporta facoltativamente le connessioni HTTP, tuttavia il client Docker tenta sempre di connettersi ai registri utilizzando prima HTTPS. Se Harbor è configurato per HTTP, è necessario configurare il client Docker in modo che possa connettersi a registri non sicuri. Se il tuo client Docker non è configurato per registri non sicuri, vedrai il seguente errore quando tenti di estrarre o inviare immagini a Harbor:

<pre>
Error response from daemon: Get https://<i>myregistrydomain.com</i>/v1/users/: dial tcp <i>myregistrydomain.com</i>:443 getsockopt: connection refused.
</pre>

Per informazioni su come aggiungere registri non sicuri al client Docker, vedere [Connessione a Harbor tramite HTTP](../../install-config/run-installer-script.md#connect-http).

Questo errore viene visualizzato anche se Harbor utilizza HTTPS con un certificato CA sconosciuto. In questo caso, ottenere il certificato CA di registry e copiarlo in <code>/etc/docker/certs.d/<i>myregistrydomain.com</i>/ca.crt</code>.

{{< note >}}
Harbor supporta solo il registro V2 API. È necessario utilizzare il client Docker 1.6.0 o versione successiva quando si inviano ed estraggono immagini.
{{< /note >}}

## Estrazione di immagini

Se il progetto a cui appartiene l'immagine è privato, devi prima accedere:

```sh
docker login <harbor_address>
```

Ora puoi estrarre un'immagine:

```sh
docker pull <harbor_address>/library/ubuntu:14.04
```

{{< important >}}
Harbor supporta l'attendibilità dei contenuti tramite Cosign e Notation. Se hai imposto l'attendibilità dei contenuti nel tuo progetto, non sarai in grado di estrarre un'immagine non firmata. Ulteriori informazioni su [implementare la fiducia nei contenuti](../../project-configuration/implementing-content-trust/).
{{< /important >}}

## Invio di immagini

Prima di poter inviare un'immagine a Harbor, è necessario creare un progetto corrispondente nell'interfaccia Harbor. Per informazioni su come creare un progetto, vedere [Crea progetti](../create-projects/_index.md).

Per inviare immagini Windows all'istanza Harbor, devi anche impostare il daemon docker su `allow-nondistributable-artifacts`. Per ulteriori informazioni vedere [Invio di immagini di Windows](#pushing-windows-images).

{{< note >}}
Non è possibile inviare immagini a un progetto di cache proxy. Scopri di più su [progetti di cache proxy](../../../administration/configure-proxy-cache/).
{{< /note >}}

Innanzitutto, accedi dal client Docker:

```sh
docker login <harbor_address>
```

Tagga l'immagine:

```sh
docker tag ubuntu:14.04 <harbor_address>/demo/ubuntu:14.04
```

Spingi l'immagine:

```sh
docker push <harbor_address>/demo/ubuntu:14.04
```
**Comprendere la struttura del nome dell'immagine**

In Harbor, un nome di immagine completo è composto da tre parti principali: <project_name>/<repository_name>:<tag>. Questo è un concetto fondamentale per il push delle immagini e la configurazione degli strumenti di distribuzione.

Usando l'esempio <harbor_address>/demo/ubuntu:14.04:
demo: questo è il progetto che hai creato in Harbor UI.
ubuntu: questo è il nome del repository all'interno del progetto demo. Un repository contiene tutti i tag per una singola immagine.
14.04: Questo è il Tag, che solitamente rappresenta una versione specifica dell'immagine.

Quando configuri gli strumenti di distribuzione (come Kubernetes o Kamal), assicurati che il nome dell'immagine di destinazione sia impostato sul formato <project_name>/<repository_name>

### Invio di immagini di Windows

Se prevedi di inviare immagini Windows alla tua istanza Harbor, devi configurare il tuo daemon docker per consentire l'invio di artefatti limitati impostando `allow-nondistributable-artifacts` nel tuo file `daemon.json`.

```
{
"allow-nondistributable-artifacts" : ["myregistrydomain.com:5000"]
}
```

Per ulteriori informazioni sull'impostazione `allow-nondistributable-artifacts`, vedere [La documentazione di Docker](https://docs.docker.com/engine/reference/commandline/dockerd/#allow-push-of-nondistributable-artifacts).

## Aggiungi descrizioni ai repository

Dopo aver inviato un'immagine, l'amministratore del progetto può aggiungere informazioni per descrivere il repository.

Accedi al repository e seleziona la scheda **Informazioni**, quindi fai clic sul pulsante **Modifica**. Inserisci una descrizione e fai clic su **Salva** per salvare la descrizione.

![modifica informazioni](../../../img/edit-description.png)

## Scarica il certificato Harbor

Gli utenti possono fare clic sul pulsante **Certificato di registro** per scaricare il certificato registry. Se non è presente il pulsante **Certificato di registro**, copia il certificato del server nella directory `<your-data_volume>/ca_download/` e chiamalo `ca.cert`.

![sfoglia progetto](../../../img/download-harbor-certs.png)

## Eliminazione di repository

L'eliminazione dei repository prevede due passaggi.

Innanzitutto, elimini un repository nell'interfaccia Harbor. Questa è un'eliminazione graduale. Puoi eliminare l'intero repository o solo uno dei suoi tag. Dopo l'eliminazione temporanea, il repository non è più gestito da Harbor, tuttavia, i file del repository rimangono nell'archivio Harbor.

![sfoglia progetto](../../../img/new-delete-repo.png)

Successivamente, elimina i file del repository eseguendo [raccolta rifiuti](../../administration/garbage-collection/_index.md) nell'interfaccia Harbor.

## Estrazione di immagini da Harbor in Kubernetes
Gli utenti Kubernetes possono distribuire facilmente pod con immagini archiviate in Harbor. Le impostazioni sono simili a quelle di qualsiasi altro registry privato. Ci sono due questioni di cui essere consapevoli:

1. Quando la tua istanza Harbor ospita HTTP e il certificato è autofirmato, devi modificare `daemon.json` su ciascun nodo di lavoro del tuo cluster. Per informazioni vedere https://docs.docker.com/registry/insecure/#deploy-a-plain-http-registry.
2. Se il tuo pod fa riferimento a un'immagine in un progetto privato, devi creare un segreto con le credenziali di un utente che dispone dell'autorizzazione per estrarre immagini dal progetto. Per informazioni vedere https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/.
