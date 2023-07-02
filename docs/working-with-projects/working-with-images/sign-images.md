---
title: Sign Artifacts with Cosign or Notation
weight: 92
---

Artifact signing and signature verification are critical security capabilities that allow you to verify the integrity of an artifact. Harbor supports content trust through integrations with [Cosign](https://github.com/sigstore/cosign) and [Notation](https://github.com/notaryproject/notation).

This page describes how to start using Cosign and Notation to sign your artifacts. A project administrator can configure a project to [enforce content trust](../..//working-with-projects/project-configuration/implementing-content-trust#enforce-content-trust), making it required for all artifacts to be signed before they can be pulled from a Harbor registry.

## Use Cosign to sign artifacts

Harbor v2.5 integrates support for [Cosign](https://github.com/sigstore/cosign), a OCI artifact signing and verification solution that is part of the [Sigstore project](https://github.com/sigstore).

Cosign signs OCI artifacts and pushes the generated signature into Harbor. This signature is stored as an artifact accessory along side the signed artifact. Harbor manages a link between the signed artifact and cosign signature, allowing you to apply things like [tag retention rules](../..//working-with-projects/working-with-images/create-tag-retention-rules/) and [immutable rules](../../working-with-projects/working-with-images/create-tag-immutability-rules/) to a signed artifact, and it will extend to both the signed artifact and the signature. In this way you can use Harbor's built in functionality to manage signed artifacts and Cosign signature accessories. Note that [Vulnerability scans](../../../administration/vulnerability-scanning/) of Cosign signatures are not supported.

A key feature of using Cosign with Harbor is the ability use Harbor's [replication capabilities](../../administration/configuring-replication/) to replicate signatures with their associated signed artifact. This means that if a [replication rule](../../administration/configuring-replication/create-replication-rules/) applies to a signed artifact, Harbor will apply the replication rule to the signature in the same way it applies it to the signed artifact.

* When replicating between Harbor instances, the target Harbor instance will maintain the link between the signed artifact and its associated signatures. You will be able to see the relationship between the two artifacts in the target Harbor interface, in the same way that you do in the source registry.

* When replicating from Harbor to another target registry type, the target registry will not manage the link between the signed artifact and any associated signatures. You will see the subject manifest and signatures as coordinating artifacts under the same repository.

**Note:** Only Manual and Scheduled replications "Trigger Modes" are applicable. Event-based replication is not possible at the moment due to the chicken and egg situation, you cannot replication image which is not signed, but you cannot replicate signature without image.

### Sign, upload, and view Cosign signatures in Harbor

Before starting to sign with Cosign, you must have cosign installed locally and have a generated a private key. See the [Cosign documentation](https://github.com/sigstore/cosign) for more installation information.

Use the `cosign sign` command to sign an image and upload the Cosign signature to your Harbor instance. Replace `<harbor-instance>/<image/path><image-tag>` in the example below with your Harbor instance and the path to the image.

```
cosign sign --key cosign.key <harbor-instance>/<image/path>:<image-tag>
```

After entering the password for your cosign private key, cosign will sign the image and upload the generated signature to your Harbor instance. You can view all signatures for a signed artifact in the Harbor interface.

1. Log into the Harbor interface and navigate to the project that your signed artifact is located in.

    ![Image with cosign signature](../../../img/image-with-cosign-signature.png)

1. If the artifact has an associated cosign signature accessory, you can click the > icon to display the Accessories table.

    ![Expand accessories table](../../../img/expand-accessories-table.png)

    The Accessories table lists all associated cosign signatures that have been pushed to the project. This table shows the Accessory name, Type, Size, and Created Time.

    ![View accessories table](../../../img/view-accessories-table.png)

### Delete Cosign signatures

You can delete a Cosign signature individually through the Harbor interface.

1. Log into the Harbor interface and navigate to the project that your signed artifact is located in and expand the accessories table.

    ![Expand accessories table](../../../img/expand-accessories-table.png)

1. Click on the **three vertical dot icon** next to the signature you want to delete and then click Delete.

    ![Delete cosign signature](../../../img/cosign-signaure-delete.png)

All the signatures associated with a signed artifact and will be deleted if the signed artifact is deleted.

Note that Harbor's [garbage collection](../../administration/garbage-collection/) will not remove any signature individually. In Harbor, Cosign signatures are treated like any other OCI artifact, except from the perspective of the garbage collector which can't see accessory artifacts, like Cosign signatures. For example, if you configure garbage collection for untagged artifacts, Harbor's garbage collector will not remove any signatures without a tag. If the signed artifact is untagged, and matches the configured garbage collect rule, it and any associated signatures will be deleted.

Harbor doesn't support `cosign clean` to remove signatures as Harbor has chosen not to implement tag deletion which is used by `cosign clean`. See the [OCI distribution specification](https://github.com/opencontainers/distribution-spec/blob/main/spec.md#content-management) for more for more information on implantation requirements.

## Use Notation to sign artifacts
In order to use Notation, generate a certificate for signing artifacts.

```
notation cert generate-test --default "wabbit-networks.io"
```

If your certificate has expired, delete the certificate before generating a new certificate.

```
notation key delete wabbit-networks.io
rm NOTATION_CONFIG/localkeys/wabbit-networks.io.key
notation cert delete --type ca --store wabbit-networks.io wabbit-networks.io.crt
rm NOTATION_CONFIG/localkeys/wabbit-networks.io.crt
```

Next, sign an image.  

```
notation sign -d --allow-referrers-api <your-image-address>
```

See the [Notation documentation](https://notaryproject.dev/docs/) for more information.