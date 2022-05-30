---
title: Sign Artifacts with Cosign or Notary
weight: 92
---

Artifact signing and signature verification are critical security capabilities that allow you to verify the integrity of an artifact. Harbor supports content trust through integrations with [Notary](https://github.com/notaryproject/notarys) and [Cosign](https://github.com/sigstore/cosign).

This page describes how to start using Cosign and Notary to sign your artifacts. A project administrator can configure a project to [enforce content trust](../..//working-with-projects/project-configuration/implementing-content-trust#enforce-content-trust), making it required for all artifacts to be signed before they can be pulled from a Harbor registry.

## Use Cosign to sign artifacts

Harbor v2.5 integrates support for [Cosign](https://github.com/sigstore/cosign), a OCI artifact signing and verification solution that is part of the [Sigstore project](https://github.com/sigstore).

Cosign signs OCI artifacts and pushes the generated signature into Harbor. This signature is stored as an artifact accessory along side the signed artifact. Harbor manages a link between the signed artifact and cosign signature, allowing you to apply things like [tag retention rules](../..//working-with-projects/working-with-images/create-tag-retention-rules/) and [immutable rules](../../working-with-projects/working-with-images/create-tag-immutability-rules/) to a signed artifact, and it will extend to both the signed artifact and the signature. In this way you can use Harbor's built in functionality to manage signed artifacts and Cosign signature accessories. Note that [Vulnerability scans](../../../administration/vulnerability-scanning/) of Cosign signatures are not supported.

A key feature of using Cosign with Harbor is the ability use Harbor's [replication capabilities](../../administration/configuring-replication/) to replicate signatures with their associated signed artifact. This means that if a [replication rule](../../administration/configuring-replication/create-replication-rules/) applies to a signed artifact, Harbor will apply the replication rule to the signature in the same way it applies it to the signed artifact.

* When replicating between Harbor instances, the target Harbor instance will maintain the link between the signed artifact and its associated signatures. You will be able to see the relationship between the two artifacts in the target Harbor interface, in the same way that you do in the source registry.

* When replicating from Harbor to another target registry type, the target registry will not manage the link between the signed artifact and any associated signatures. You will see the subject manifest and signatures as coordinating artifacts under the same repository.


### Sign, upload, and view Cosign signatures in Harbor

Before starting to sign with Cosign, you must have cosign installed locally and have a generated a private key. See the [Cosign documentation](https://github.com/sigstore/cosign) for more installation information.

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

## Use Notary to sign images

Notary allows you to use digital signatures for data sent to and received from remote Docker registries. Before using Notary, you must [install Notary](../../../install-config/run-installer-script/#installation-with-notary) on your Harbor instance. Notary also requires that `https` is enabled in `harbor.yml` and the attributes `ssl_cert` and `ssl_cert_key` point to valid certificates. For more information about generating a HTTPS certificate, see [Configure HTTPS Access to Harbor](../../install-config/configure-https.md).

### Copy the Root Certificate

If Harbor instance is hosted at 192.168.0.5, if you are using a self-signed certificate, copy the Harbor CA root cert to `/etc/docker/certs.d/192.168.0.5/` and `~/.docker/tls/192.168.0.5:4443/` on the machine on which you run the Docker client.

### Enable Docker Content Trust

You can enable content trust by setting the following environment variables on the machine on which you run the Docker client.

```sh
export DOCKER_CONTENT_TRUST=1
export DOCKER_CONTENT_TRUST_SERVER=https://192.168.0.5:4443
```

If you push the image for the first time, You will be asked to enter the root key passphrase. This will be needed every time you push a new image while the `DOCKER_CONTENT_TRUST` flag is set.
The root key is generated at: `/root/.docker/trust/private/root_keys`
You will also be asked to enter a new passphrase for the image. This is generated at `/root/.docker/trust/private/tuf_keys/[registry name] /[imagepath]`.
If you are using a self-signed cert, make sure to copy the CA cert into `/etc/docker/certs.d/10.117.169.182` and `$HOME/.docker/tls/10.117.169.182:4443/`. When an image is signed, it is indicated in the Web UI.

A signed image will have a checkbox next to it, otherwise an X is displayed instead.

If you want to remove a tag signature from harbor, you can use 'notary remove' command:

```sh
notary remove -p 10.117.169.182/libary/alpine latest
```

{{< note >}}
Replace "10.117.169.182" with the IP address or domain name of your Harbor node. In order to use content trust, HTTPS must be enabled in Harbor.
{{< /note >}}

![browse project](../../../img/content-trust.png)

### Set Alias for Notary (optional)

By default the local directory for storing meta files for the Notary client is different from the one for the Docker client. To simplify the use of the Notary client to manipulate the keys/meta files that are generated by Docker content trust, you can set an alias.

```sh
alias notary="notary -s https://192.168.0.5:4443 -d ~/.docker/trust --tlscacert /etc/docker/certs.d/192.168.0.5/ca.crt"
```

### Lost Notary Keys

In the event that your Notary root key is deleted without backups, you can resolve orphaned images using the following steps.

1. Remove data from the `notarysigner` and `notaryserver` database. Replace the fully qualified URI of your repository in the SQL commands below.

    ```
    docker exec -it harbor-db /bin/bash
    postgres [ / ]$ psql
    ....
    postgres=# \c notaryserver
    notaryserver=# delete from tuf_files where gun='<fully_qualified_URI_of_repository>';
    ....
    notaryserver=# \c notarysigner
    notarysigner=# delete from private_keys where gun='<fully_qualified_URI_of_repository>';
    notarysigner=# \q
    ```

1. Restart harbor-core to clear some temporary cache.

    ```
    docker restart harbor-core
    ```
