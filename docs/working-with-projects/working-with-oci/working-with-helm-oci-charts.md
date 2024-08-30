---
title: Working with OCI Helm Charts
weight: 65
---

With the release of Helm 3.8.0, Helm is able to store and work with charts in container registries, as an alternative to Helm repositories. This feature, which used to be an experimental feature, is now generally available.

Please see Helm documentation on [storing charts in OCI](https://helm.sh/blog/storing-charts-in-oci/).

## Pulling Helm Charts

If the project that the helm chart belongs to is private, you must sign in first:

```sh
helm registry login <harbor_address>
```

You can now pull a chart:

```sh
helm pull oci://<harbor_address>/<project>/<chart_name> --version <version>
```

e.g.
```sh
helm pull oci://demo.goharbor.io/oci/demo --version 0.1.0
```

{{< important >}}
Harbor supports content trust through Cosign and Notation. If you have enforced content trust in your project, you will not be able to pull an unsigned image. Read more about [implementing content trust](../../project-configuration/implementing-content-trust/).
{{< /important >}}

## Pushing OCI Helm charts

Before you can push an OCI Helm chart  to Harbor, you must create a project in the Harbor interface or use already existing one. For information about how to create a project, see [Create Projects](../create-projects/_index.md).

{{< note >}}
You cannot push charts and images to a proxy cache project. See more about [proxy cache projects](../../../administration/configure-proxy-cache/).
{{< /note >}}

First, log in from Docker client:

```sh
helm registry login <harbor_address>
```

Push the OCI Helm Chart:

```sh
helm push <chart_name_and_version>.tgz oci://<harbor_address>/<project>
```

e.g.
```sh
helm push example-0.1.0.tgz oci://demo.goharbor.io/oci
```

## Installing OCI Helm Chart

If project is private you need to login first as shown above

```sh
helm install <release_name> oci://<harbor_address>/<project>/<chart_name> --version <version>
```

e.g.
```sh
helm install MyRelease oci://demo.goharbor.io/oci/demo --version 0.1.0
```

## Creating and packaging the OCI Chart
For full reference please check official [Helm documentation]()

### Create the chart
```sh
helm create oci-chat-example
```

### Edit and make it usable
Use your preferred method to edit the newly created chart.

### Package
```sh
helm package oci-chat-example
```

### Push OCI Chart to Harbor Registry
```sh
helm push oci-chat-example-0.1.0.tgz oci://demo.goharbor.io/oci-charts
```

## See you images in the Harbor Interface

You can see your OCI Helm Charts in your Harbor Project as any other artefact
![Project View](../../../img/oci/oci-chart-main-view.png)

You can see all tags(versions)
![Tags](../../../img/oci/oci-chart-tags.png)

Work with OCI Helm Charts from the UI
![Actions](../../../img/oci/oci-chart-actions.png)