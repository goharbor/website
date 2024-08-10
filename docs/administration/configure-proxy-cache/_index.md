---
title: Configure Proxy Cache
weight: 35
---

Proxy cache allows you to use Harbor to proxy and cache images from a target public or private registry. As of Harbor v2.1.1, the proxy cache feature was updated to align with [Docker Hub's rate limit policy](https://www.docker.com/blog/scaling-docker-to-serve-millions-more-developers-network-egress/). If you plan to use proxy cache with your Harbor instance, it is strongly recommended that you use v2.1.1 or later to avoid being rate limited.

You can use a proxy cache to pull images from a target Harbor or non-Harbor registry in an environment with limited or no access to the internet. You can also use a proxy cache to limit the amount of requests made to a public registry, avoiding consuming too much bandwidth or being throttled by the registry server.

{{< note >}}
Harbor supports proxy caching for the following registries:
   - Harbor
   - Docker Hub
   - Docker registry
   - AWS Elastic Container Registry
   - Azure Container Registry
   - Google Container Registry
   - Quay
   - Github Container Registry
   - JFrog Artifactory Registry

{{< /note >}}

A Harbor system administrator configures a proxy cache by creating a proxy cache project, which connects to a target registry using a registry endpoint you have configured. A proxy cache project works similarly to a normal Harbor project, except that you are not able to push images to a proxy cache project.

To use a Harbor proxy cache, configure your docker pull commands and pod manifests to pull images from the proxy cache project instead of the target registry.

## How Harbor proxy cache works

When a pull request comes to a proxy cache project, if the image is not cached, Harbor pulls the image from the target registry and serves the pull command as if it is a local image from the proxy cache project. The proxy cache project then caches the image for a future request.

The next time a user requests that image, Harbor checks the image's latest manifest in the target registry and serves the image based on the following scenarios:

* If the image has not been updated in the target registry, the cached image is served from the proxy cache project.
* If the image has been updated in the target registry, the new image is pulled from the target registry, then served and cached in the proxy cache project.
* If the target registry is not reachable, the proxy cache project serves the cached image.
* If the image is no longer in the target registry, but is still in the proxy cache project, the cached image is served from the proxy cache project.


As of Harbor v2.1.1, Harbor proxy cache fires a HEAD request to determine whether any layer of a cached image has been updated in the Docker Hub registry. Using this method to check the target registry will not trigger the [Docker Hub rate limiter](https://www.docker.com/blog/scaling-docker-to-serve-millions-more-developers-network-egress/). If any image layer was updated, the proxy cache will pull the new image, which will count towards the Docker Hub rate limiter.

## Create Proxy Cache Project

To set up a proxy cache, a Harbor system administrators can create a proxy cache project that connects to a target registry using a registry endpoint.

A proxy cache project is able to use the same features available to a normal Harbor project, except that you are not able to push images to a proxy cache project. For more information on projects, see the [Working with Projects](../../working-with-projects/) documentation.

1. Before creating a proxy cache project, create a registry endpoint for the proxy cache project to use. See how to [create a registry endpoint](../configuring-replication/create-replication-endpoints.md).

    {{< note >}}Proxy cache projects can pull every image from the target registry that the access account you configure in the registry endpoint has access to. This means that Harbor users with access to the proxy cache project are able to pull any image available to the access account in the target repository.
    {{< /note >}}

1. On the Projects page, click **New Project** and configure the new project information. See the [Create Projects](../../working-with-projects/create-projects/) documentation for more details.

1. Click the **Proxy Cache** slider and then select your registry endpoint from the drop-down that appears.

    ![add proxy cache project](../../img/add-proxy-cache-project.png)

1. Click **OK**.

You can view all available proxy cache projects from the Projects page.

By default, Harbor creates a 7 day retention policy for each new proxy cache project. See more about [Tag Retention Policies](../../working-with-projects/working-with-images/create-tag-retention-rules.md).

To start using the proxy cache, configure your docker pull commands or pod manifests to reference the proxy cache project by adding `<harbor_servername>/<proxy_project_name>/` as a prefix to the image tag. For example:

```bash
> docker pull <harbor_server_name>/<proxy_project_name>/goharbor/harbor-core:dev
```

