---
title: Pulling and Pushing Images in the Docker Client
weight: 65
---

Harbor optionally supports HTTP connections, however the Docker client always attempts to connect to registries by first using HTTPS. If Harbor is configured for HTTP, you must configure your Docker client so that it can connect to insecure registries. In your Docker client is not configured for insecure registries, you will see the following error when you attempt to pull or push images to Harbor:

<pre>
Error response from daemon: Get https://<i>myregistrydomain.com</i>/v1/users/: dial tcp <i>myregistrydomain.com</i>:443 getsockopt: connection refused.
</pre>

For information about how to add insecure registries to your Docker client, see [Connecting to Harbor via HTTP](../../install-config/run-installer-script.md#connect-http).

You also see this error if Harbor uses HTTPS with an unknown CA certificate. In this case, obtain the registry's CA certificate, and copy it to <code>/etc/docker/certs.d/<i>myregistrydomain.com</i>/ca.crt</code>.

{{< note >}}
Harbor only supports the Registry V2 API. You must use Docker client 1.6.0 or higher when pushing and pulling images.
{{< /note >}}

## Pulling Images

If the project that the image belongs to is private, you must sign in first:

```sh
docker login <harbor_address>
```

You can now pull an image:

```sh
docker pull <harbor_address>/library/ubuntu:14.04
```

{{< important >}}
Harbor supports content trust through Cosign and Notation. If you have enforced content trust in your project, you will not be able to pull an unsigned image. Read more about [implementing content trust](../../project-configuration/implementing-content-trust/).
{{< /important >}}

## Pushing Images

Before you can push an image to Harbor, you must create a corresponding project in the Harbor interface. For information about how to create a project, see [Create Projects](../create-projects/_index.md).

To push Windows images to your Harbor instance, you also must set your docker daemon to `allow-nondistributable-artifacts`. For more information see [Pushing Windows Images](#pushing-windows-images).

{{< note >}}
You cannot push images to a proxy cache project. See more about [proxy cache projects](../../../administration/configure-proxy-cache/).
{{< /note >}}

First, log in from Docker client:

```sh
docker login <harbor_address>
```

Tag the image:

```sh
docker tag ubuntu:14.04 <harbor_address>/demo/ubuntu:14.04
```

Push the image:

```sh
docker push <harbor_address>/demo/ubuntu:14.04
```

### Pushing Windows Images

If you plan to push Windows images to your Harbor instance, you must configure your docker daemon to allow pushing restricted artifacts by setting `allow-nondistributable-artifacts` in your `daemon.json` file.

```
{
"allow-nondistributable-artifacts" : ["myregistrydomain.com:5000"]
}
```

For more information on the `allow-nondistributable-artifacts` setting, see [Docker's documentation](https://docs.docker.com/engine/reference/commandline/dockerd/#allow-push-of-nondistributable-artifacts).

## Add Descriptions to Repositories

After pushing an image, the project administrator can add information to describe the repository.

Go into the repository and select the **Info** tab, and click the **Edit** button. Enter a description and click **Save** to save the description.

![edit info](../../../img/edit-description.png)

## Download the Harbor Certificate

Users can click the **Registry Certificate** button to download the registry certificate. If there is no **Registry Certificate** button, copy your server certificate into the directory `<your-data_volume>/ca_download/` and name it `ca.cert`.

![browse project](../../../img/download-harbor-certs.png)

## Deleting Repositories

Deleting repositories involves two steps.

First, you delete a repository in the Harbor interface. This is soft deletion. You can delete the entire repository or just one of its tags. After the soft deletion, the repository is no longer managed by Harbor, however, the repository files remain in the Harbor storage.

![browse project](../../../img/new-delete-repo.png)

Next, delete the repository files by running [garbage collection](../../administration/garbage-collection/_index.md) in the Harbor interface.

## Pulling Images from Harbor in Kubernetes
Kubernetes users can easily deploy pods with images stored in Harbor. The settings are similar to those of any other private registry. There are two issues to be aware of:

1. When your Harbor instance is hosting HTTP and the certificate is self-signed, you must modify `daemon.json` on each work node of your cluster. For information, see https://docs.docker.com/registry/insecure/#deploy-a-plain-http-registry.
2. If your pod references an image under a private project, you must create a secret with the credentials of a user who has permission to pull images from the project. For information, see https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/.
