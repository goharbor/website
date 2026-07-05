---
title: Lavorare con i grafici OCI Helm
weight: 65
---

Con il rilascio di Helm 3.8.0, Helm è in grado di archiviare e lavorare con i grafici nei registri dei contenitori, come alternativa ai repository Helm. Questa funzionalità, che in passato era sperimentale, è ora disponibile a tutti.

Consultare la documentazione Helm su [memorizzare le carte in OCI](https://helm.sh/blog/storing-charts-in-oci/).

## Estrazione dei grafici Helm

Se il progetto a cui appartiene l'helmer chart è privato, devi prima accedere:

```sh
helm registry login <harbor_address>
```

Ora puoi estrarre un grafico:

```sh
helm pull oci://<harbor_address>/<project>/<chart_name> --version <version>
```

per esempio.
```sh
helm pull oci://demo.goharbor.io/oci/demo --version 0.1.0
```

{{< important >}}
Harbor supporta l'attendibilità dei contenuti tramite Cosign e Notation. Se hai imposto l'attendibilità dei contenuti nel tuo progetto, non sarai in grado di estrarre un'immagine non firmata. Ulteriori informazioni su [implementare la fiducia nei contenuti](../../project-configuration/implementing-content-trust/).
{{< /important >}}

## Stiamo spingendo i grafici OCI Helm

Prima di poter inviare un grafico OCI Helm a Harbor, è necessario creare un progetto nell'interfaccia Harbor o utilizzarne uno già esistente. Per informazioni su come creare un progetto, vedere [Crea progetti](../create-projects/_index.md).

{{< note >}}
Non è possibile inviare grafici e immagini a un progetto di cache proxy. Scopri di più su [progetti di cache proxy](../../../administration/configure-proxy-cache/).
{{< /note >}}

Innanzitutto, accedi dal client Docker:

```sh
helm registry login <harbor_address>
```

Visualizza il grafico OCI Helm:

```sh
helm push <chart_name_and_version>.tgz oci://<harbor_address>/<project>
```

per esempio.
```sh
helm push example-0.1.0.tgz oci://demo.goharbor.io/oci
```

## Installazione del grafico OCI Helm

Se il progetto è privato devi prima effettuare il login come mostrato sopra

```sh
helm install <release_name> oci://<harbor_address>/<project>/<chart_name> --version <version>
```

per esempio.
```sh
helm install MyRelease oci://demo.goharbor.io/oci/demo --version 0.1.0
```

## Creazione e confezionamento del grafico OCI
Per un riferimento completo, consultare la [documentazione ufficiale Helm]()

### Crea il grafico
```sh
helm create oci-chart-example
```

### Modificalo e rendilo utilizzabile
Utilizza il tuo metodo preferito per modificare il grafico appena creato.

### Pacchetto
```sh
helm package oci-chart-example
```

### Invia il grafico OCI al registro Harbor
```sh
helm push oci-chart-example-0.1.0.tgz oci://demo.goharbor.io/oci-charts
```

## Guarda le tue immagini nell'interfaccia Harbor

Puoi vedere i tuoi grafici OCI Helm nel tuo progetto Harbor come qualsiasi altro artefatto
![Vista del progetto](../../../img/oci/oci-chart-main-view.png)

Puoi vedere tutti i tag (versioni)
![Tag](../../../img/oci/oci-chart-tags.png)

Lavora con i grafici OCI Helm da UI
![Azioni](../../../img/oci/oci-chart-actions.png)
