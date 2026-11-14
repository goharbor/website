---
title: Use a Proxy Cache as a Registry Mirror
weight: 10
---

To pull images through a proxy cache project, you can add the `<harbor_server_name>/<proxy_project_name>/` prefix to every image reference, as described in [Configure Proxy Cache](_index.md). When you cannot change the image references, for example in Kubernetes manifests and Helm charts that pull from `docker.io` or `quay.io`, you can instead configure the container runtime on each node to use the proxy cache project as a registry mirror. The runtime then sends pulls for the upstream registry to Harbor without any change to the image references.

This page shows how to configure containerd, CRI-O, and the tools that use the `containers/image` library, such as Podman, Buildah, and Skopeo.

## How Harbor Serves a Proxy Cache Project as a Mirror

Harbor serves every project under the same registry API root, `https://<harbor_server_name>/v2/`, and the project name is the first part of each repository name. For example, Harbor serves the `library/nginx` repository of a proxy cache project named `dockerhub-proxy` at `https://<harbor_server_name>/v2/dockerhub-proxy/library/nginx/`.

A runtime that uses a mirror keeps the repository name of the image, so to use a proxy cache project as a mirror, the mirror configuration must include the project name:

| Image reference | Request that the runtime must send to Harbor |
|-----------------|-----------------------------------------------|
| `docker.io/library/nginx:1.27` | `https://harbor.yourdomain.com/v2/dockerhub-proxy/library/nginx/manifests/1.27` |
| `quay.io/prometheus/prometheus:v3.0.0` | `https://harbor.yourdomain.com/v2/quay-proxy/prometheus/prometheus/manifests/v3.0.0` |

The examples on this page use the following setup. Replace the values with the ones of your environment.

- `harbor.yourdomain.com` is the address of your Harbor instance.
- `dockerhub-proxy` is a proxy cache project that uses a Docker Hub registry endpoint.
- `quay-proxy` is a proxy cache project that uses a Quay registry endpoint.

## Prerequisites

- Create one proxy cache project for each upstream registry that you want to mirror. A proxy cache project caches images from a single registry endpoint, so you cannot use one project as the mirror for both `docker.io` and `quay.io`. See [Create Proxy Cache Project](_index.md#create-proxy-cache-project).
- Make the proxy cache projects public. The credentials that Kubernetes passes to the runtime, for example from image pull secrets, are for the registry in the image reference, not for Harbor, so the simplest setup is to allow anonymous pulls from the proxy cache projects. To make a project public, select the **Public** checkbox in the **Configuration** tab of the project. See [Project Configuration](../../working-with-projects/project-configuration/_index.md). If the projects must stay private, see the authentication notes for your runtime below.
- Make sure that every node trusts the certificate of your Harbor instance, or configure the CA certificate in the runtime configuration as shown below.

## Configure containerd

containerd reads the mirror configuration for a registry from a `hosts.toml` file in a directory named after that registry, for example `/etc/containerd/certs.d/docker.io/hosts.toml`. For the full reference, see [Registry Configuration](https://github.com/containerd/containerd/blob/main/docs/hosts.md) in the containerd documentation.

Some Kubernetes distributions, such as k3s and RKE2, generate the containerd configuration of the nodes and overwrite changes that you make to it. For these distributions, configure the mirrors in the registry settings of the distribution instead.

1. Set the `config_path` option of the CRI plugin in `/etc/containerd/config.toml` to the directory that contains the `hosts.toml` files. If your `config.toml` already sets `config_path`, use the directory that it sets.

    For containerd 2.x:

    ```toml
    version = 3

    [plugins."io.containerd.cri.v1.images".registry]
      config_path = "/etc/containerd/certs.d"
    ```

    For containerd 1.x:

    ```toml
    version = 2

    [plugins."io.containerd.grpc.v1.cri".registry]
      config_path = "/etc/containerd/certs.d"
    ```

    You cannot use `config_path` together with the deprecated `registry.mirrors` option. Remove any `registry.mirrors` sections from `config.toml`, then restart containerd.

    ```sh
    sudo systemctl restart containerd
    ```

1. Create a `hosts.toml` file for Docker Hub that points to the `dockerhub-proxy` project.

    ```sh
    sudo mkdir -p /etc/containerd/certs.d/docker.io
    sudo tee /etc/containerd/certs.d/docker.io/hosts.toml > /dev/null <<'EOF'
    server = "https://registry-1.docker.io"

    [host."https://harbor.yourdomain.com/v2/dockerhub-proxy"]
      capabilities = ["pull", "resolve"]
      override_path = true
    EOF
    ```

1. Create a `hosts.toml` file for every other registry that you want to mirror, with the proxy cache project for that registry. For example, for Quay:

    ```sh
    sudo mkdir -p /etc/containerd/certs.d/quay.io
    sudo tee /etc/containerd/certs.d/quay.io/hosts.toml > /dev/null <<'EOF'
    server = "https://quay.io"

    [host."https://harbor.yourdomain.com/v2/quay-proxy"]
      capabilities = ["pull", "resolve"]
      override_path = true
    EOF
    ```

containerd reads the `hosts.toml` files at every pull, so you do not need to restart containerd after you create or change them.

In the `hosts.toml` files:

- `override_path = true` is required. By default, containerd adds `/v2` to the end of the mirror URL, so a pull of `docker.io/library/nginx` would send `/v2/dockerhub-proxy/v2/library/nginx/...` to Harbor, which does not match any repository. With `override_path = true`, containerd uses the mirror URL `/v2/dockerhub-proxy` as the API root, and sends `/v2/dockerhub-proxy/library/nginx/...`.
- Do not use only the Harbor address, such as `https://harbor.yourdomain.com`, as the mirror URL. containerd then sends `/v2/library/nginx/...`, which Harbor handles as a request for a project named `library` instead of the proxy cache project.
- The `resolve` capability lets containerd resolve tags to digests through Harbor. If you set only `pull`, containerd resolves tags with the upstream registry and only downloads the content from Harbor.
- `server` is the registry that containerd uses if it cannot pull the image from Harbor, for example when Harbor is not reachable. If the nodes must only pull through Harbor, remove the `[host...]` section, and set the proxy cache project as the `server` instead:

    ```toml
    server = "https://harbor.yourdomain.com/v2/dockerhub-proxy"
    override_path = true
    ```

### TLS

If the nodes do not trust the certificate of Harbor, add the CA certificate that signed it to the `[host...]` section, or to the top level of the file if Harbor is the `server`.

```toml
[host."https://harbor.yourdomain.com/v2/dockerhub-proxy"]
  capabilities = ["pull", "resolve"]
  override_path = true
  ca = "/etc/containerd/certs.d/docker.io/harbor-ca.crt"
```

If Harbor only serves HTTP, use an `http://` URL for the host. Only use `skip_verify = true`, which disables the certificate verification, for testing.

### Authentication

containerd does not support credentials in `hosts.toml`. If a proxy cache project is private, you can set the credentials of a Harbor user or robot account for the Harbor host in `config.toml`. This option is deprecated in containerd and is planned for removal, so prefer public proxy cache projects.

```toml
version = 3

[plugins."io.containerd.cri.v1.images".registry.configs."harbor.yourdomain.com".auth]
  username = "robot$proxy-puller"
  password = "<robot_account_secret>"
```

containerd only uses these credentials if the pull request does not include credentials of its own. For example, if a pod has an image pull secret for the image, containerd uses the credentials from the pull secret instead.

### Verify the containerd Configuration

Pull an image through the CRI plugin, which is the same path that the kubelet uses.

```sh
sudo crictl pull docker.io/library/nginx:1.27
```

The `dockerhub-proxy` project in Harbor now contains the `dockerhub-proxy/library/nginx` repository.

{{< note >}}
`ctr` does not read the `config_path` option of the CRI plugin. If you test with `ctr`, pass the directory of the `hosts.toml` files with the `--hosts-dir` option, for example `sudo ctr images pull --hosts-dir /etc/containerd/certs.d docker.io/library/nginx:1.27`. Without `--hosts-dir`, `ctr` pulls the image directly from the upstream registry.
{{< /note >}}

## Configure CRI-O, Podman, Buildah, and Skopeo

CRI-O, Podman, Buildah, and Skopeo use the [containers-registries.conf](https://github.com/containers/container-libs/blob/main/image/docs/containers-registries.conf.5.md) configuration, which is in `/etc/containers/registries.conf` and in drop-in files in `/etc/containers/registries.conf.d/`.

1. Create a drop-in file that sets the proxy cache projects as mirrors of the upstream registries.

    ```sh
    sudo tee /etc/containers/registries.conf.d/harbor-proxy-cache.conf > /dev/null <<'EOF'
    [[registry]]
    prefix = "docker.io"
    location = "docker.io"

    [[registry.mirror]]
    location = "harbor.yourdomain.com/dockerhub-proxy"

    [[registry]]
    prefix = "quay.io"
    location = "quay.io"

    [[registry.mirror]]
    location = "harbor.yourdomain.com/quay-proxy"
    EOF
    ```

    The `location` of a mirror replaces the `prefix` in the image reference. For example, a pull of `docker.io/library/nginx:1.27` pulls `harbor.yourdomain.com/dockerhub-proxy/library/nginx:1.27`. Unlike containerd, you do not need to configure the `/v2` path, because the project name becomes part of the repository name.

    If the image cannot be pulled from any mirror, the image is pulled from the `location` of the registry. If the nodes must only pull through Harbor, remove the `[[registry.mirror]]` table and set `location` to the proxy cache project instead, for example `location = "harbor.yourdomain.com/dockerhub-proxy"`.

1. If you use CRI-O, reload it so that it reads the new configuration.

    ```sh
    sudo systemctl reload crio
    ```

    Podman, Buildah, and Skopeo read the configuration each time they run.

### TLS

If the nodes do not trust the certificate of Harbor, copy the CA certificate that signed it to `/etc/containers/certs.d/harbor.yourdomain.com/ca.crt`. If Harbor uses a port other than 443, include the port in the directory name, for example `/etc/containers/certs.d/harbor.yourdomain.com:8443/ca.crt`.

If Harbor only serves HTTP, add `insecure = true` to the `[[registry.mirror]]` table. This setting also disables the certificate verification for HTTPS, so only use it for HTTP or for testing.

### Authentication

Podman, Buildah, and Skopeo use the credentials for the mirror location when they pull from a mirror. If a proxy cache project is private, log in to Harbor before you pull, for example with `podman login harbor.yourdomain.com`. For CRI-O in Kubernetes, use public proxy cache projects.

### Verify the CRI-O Configuration

Pull an image with `crictl` for CRI-O, or with Podman:

```sh
sudo crictl pull docker.io/library/nginx:1.27
podman pull docker.io/library/nginx:1.27
```

The `dockerhub-proxy` project in Harbor now contains the `dockerhub-proxy/library/nginx` repository.
