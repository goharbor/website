---
title: Sign Artifacts with Cosign or Notation
weight: 92
---

Artifact signing and signature verification are critical security capabilities that allow you to verify the integrity of an artifact. Harbor supports content trust through integrations with [Cosign](https://github.com/sigstore/cosign) and [Notation](https://github.com/notaryproject/notation).

This page describes how to start using Cosign and Notation to sign your artifacts. A project administrator can configure a project to [enforce content trust](../..//working-with-projects/project-configuration/implementing-content-trust#enforce-content-trust), making it required for all artifacts to be signed before they can be pulled from a Harbor registry.

## Use Cosign to sign artifacts

Harbor v2.5 integrates support for [Cosign](https://github.com/sigstore/cosign), an OCI artifact signing and verification solution that is part of the [Sigstore project](https://github.com/sigstore).

Cosign signs OCI artifacts and pushes the generated signature into Harbor. This signature is stored as an artifact accessory along side the signed artifact. Harbor manages a link between the signed artifact and cosign signature, allowing you to apply things like [tag retention rules](../..//working-with-projects/working-with-images/create-tag-retention-rules/) and [immutable rules](../../working-with-projects/working-with-images/create-tag-immutability-rules/) to a signed artifact, and it will extend to both the signed artifact and the signature. In this way you can use Harbor's built in functionality to manage signed artifacts and Cosign signature accessories. Note that [Vulnerability scans](../../../administration/vulnerability-scanning/) of Cosign signatures are not supported.

A key feature of using Cosign with Harbor is the ability to use Harbor's [replication capabilities](../../administration/configuring-replication/) to replicate signatures with their associated signed artifact. This means that if a [replication rule](../../administration/configuring-replication/create-replication-rules/) applies to a signed artifact, Harbor will apply the replication rule to the signature in the same way it applies it to the signed artifact.

* When replicating between Harbor instances, the target Harbor instance will maintain the link between the signed artifact and its associated signatures. You will be able to see the relationship between the two artifacts in the target Harbor interface, in the same way that you do in the source registry.

* When replicating from Harbor to another target registry type, the target registry will not manage the link between the signed artifact and any associated signatures. You will see the subject manifest and signatures as coordinating artifacts under the same repository.

**Note:** Only Manual and Scheduled replications "Trigger Modes" are applicable. Event-based replication is not possible at the moment due to the chicken and egg situation, you cannot replication image which is not signed, but you cannot replicate signature without image.

### Sign, upload, and view Cosign signatures in Harbor

Before starting to sign with Cosign, you must have cosign installed locally and have generated a private key. See the [Cosign documentation](https://github.com/sigstore/cosign) for more installation information.

Use the `cosign sign` command to sign an image and upload the Cosign signature to your Harbor instance. Replace `<harbor-instance>/<image/path>:<image-tag>` in the example below with your Harbor instance and the path to the image.

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

## Use Notation to sign and verify artifacts with distribution spec v1.1 mode
[Notation](https://notaryproject.dev/) is a standard-based tool and library for signing and verifying OCI artifacts. It generates signatures and associates them with OCI artifacts to ensure integrity for the supply chain.

### Install Notation CLI
Install the latest version on Linux. Follow the [installation guide](https://notaryproject.dev/docs/user-guides/installation/cli/) for other platforms and methods.

`brew install notation`

### Generating a Test Key and Self-Signed Certificate:
Use notation `cert generate-test` to generate a test RSA key for signing artifacts, and a self-signed `X.509` test certificate for verifying artifacts. Please note the self-signed certificate should be used for testing or development purposes only. You should use CA-issued certificate in production.

```shell
notation cert generate-test --default "wabbit-networks.io"
```
### Authenticate to Harbor Registry
To authenticate with the Harbor registry, set the following environment variables:

```shell
export NOTATION_USERNAME="YOUR_REGISTRY_USERNAME"
export NOTATION_PASSWORD="YOUR_REGISTRY_PASSWORD"
```
### Sign an existing image in Harbor
Assuming you have configured HTTPS access and pushed an image to Harbor, you can use the `notation sign` command to sign the image.

```shell
notation sign <harbor-domain>/<image-reference>
```
Once the image is successfully signed, the signed status is updated to a green tick and the corresponding signature has been pushed to the registry.

![signed image in Harbor registry](../../../img/signed-image.png)

### Create a trust policy to verify the image
To verify the container image, configure the trust policy to specify trusted identities that sign the artifacts, and level of signature verification to use. For more details, see trust policy spec.

Create a JSON file with the following trust policy, for example:

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
Use `notation policy import` to import the trust policy configuration from a JSON file. For example:

```shell
notation policy import ./trustpolicy.json
```

### Verify the image
Use `notation verify` to verify signatures associated with the container image.

```shell
notation verify <harbor-domain>/<image-reference>
```

You can also check the signature digest and inspect the signature and its certificate information to make sure the image is produced by a trusted identity.

`notation inspect $IMAGE`

See the [Notation documentation](https://notaryproject.dev/docs/) for more information.
