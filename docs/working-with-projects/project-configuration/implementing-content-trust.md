---
title: Implementing Content Trust
weight: 55
---

Artifact signing and signature verification are critical security capabilities that allow you to verify the integrity of an artifact. Harbor supports content trust through integrations with [Notary](https://github.com/notaryproject/notarys) and [Cosign](https://github.com/sigstore/cosign), ensuring that only signed and verified images are pulled from your Harbor instance.

This page outlines Harbor's integration with Cosign and Notary as well as how to [enforce content trust](#enforce-content-trust) using default Harbor deployment policy.

## Use Cosign to sign artifacts

Harbor v2.5 integrates support for [Cosign](https://github.com/sigstore/cosign), a OCI artifact signing and verification solution that is part of the [Sigstore project](https://github.com/sigstore).

Cosign signs OCI artifacts and pushes the generated signature into Harbor. This signature is stored as an artifact accessory along side the signed artifact. Harbor treats Cosign signatures like any other Harbor artifact, meaning you can use all of Harbor's artifact functionality to manage cosign signatures within your projects. Harbor manages the link between the signed artifact and cosign signature, allowing you to apply things like retention and immutable policies to a sign artifact, and it will extend to both. Additionally Harbor's [replication capabilities](../../administration/configuring-replication/) will replicate signatures along with signed artifacts when replicating between Harbor replication endpoints.

Before starting to sign with Cosign, you must have cosign installed locally and have a generated a private key. See the [Cosign documentation](https://github.com/sigstore/cosign) for more installation information.


### Sign, upload, and view Cosign signatures in Harbor

Use the `cosign sign` command to sign an image and upload the Cosign signature to your Harbor instance. Replace `<harbor-instance>/<image/path><image-tag>` in the example below with your Harbor instance, the path to the image, and image tag.

```
cosign sign --key cosign.key <harbor-instance>/<image/path>:<image-tag>
```

After entering the password for your cosign private key, cosign will sign the image and upload the generated signature to your Harbor instance. You can view all signatures for an sign artifact in the Harbor interface.

1. Log into the Harbor interface and navigate to the Project where your signed artifact is located.

    [SCREENSHOT OF PROJECT PAGE]

1. Expand the artifact to view the signatures attached to the image.

    [SCREENSHOT OF ARTIFACT EXPANDED & ACCESSORY TABLE]

### Delete Cosign signatures

You can delete cosign signatures through the Harbor interface.

  [SCREENSHOT OF ARTIFACT EXPANDED & ACCESSORY TABLE WITH ACTION DROP DOWN EXPANDED]

This will delete the individual signature. If the top-level artifact is deleted, all the signatures associated with the image will be deleted.

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


## Enforce deployment security

As a Project Administrator, you are able to enforce deployment security by enabling the default deployment policy for Cosign or Notary for a given project.

1. Log into the Harbor interface and navigate to the Configuration tab for the Project you want to enforce content trust on.
1. Select the checkbox for **Cosign** or **Notary**. When checked, Harbor will only allow verified images to be pulled from the project. Verified images are determined by either Cosign or Notary, depending on the policy you have checked. You are able to select both options if you wish for both policies to be enforced.
1. Click **Save**.

  ![Enable deployment security in project configuration page](../../../img/enable-deployment-security.png)

  {{< note >}}
  You must have Notary [installed](../../../install-config/run-installer-script/#installation-with-notary) to see the Notary deployment security checkbox.
  {{< /note >}}
