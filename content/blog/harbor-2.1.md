---
title: "Harbor v2.1 improves image distribution with Proxy Cache and P2P support"
author:
  name: "Harbor Team"
date: 2020-09-30T12:00:00+04:00
draft: false
showPageInfo: true
---

We’re excited to announce the Harbor v2.1 GA release which focuses on scalable image distribution through Proxy Caching and Peer-To-Peer (P2P) solutions like Uber’s Kraken and Alibaba’s Dragonfly, Non-Blocking Garbage Collection, Sysdig Secure Scanner support, and support for Machine Learning on Kubernetes data models. Let’s dive in.


## Proxy Cache

There are plenty of scenarios where clusters of container hosts are attempting to pull artifacts from some registry (herein referred to as the target registry) but have limited, intermittent network connectivity or even no connectivity at all. This means that the target artifacts would either need to be replicated manually to another intermediate registry before they can be pulled or queued up and distributed over a slow link due to limited egress options. The newly implemented proxy cache capability in Harbor addresses this by allowing Harbor to act as a pull-through cache for another target registry in order to serve the pull requests locally. This not only bypasses connectivity issues but consolidates pull requests and minimizes unnecessary traversals over the network, thus mitigating against rate limiting issues. Operators can now ensure their Kubernetes infrastructure is secure, leveraging Harbor as the only service with outbound internet connectivity, serving containers to container hosts from a local endpoint.

To configure a proxy cache, create a project in Harbor UI,  select the ‘proxy cache’ option, and select the target registry configured as an endpoint with the correct credentials. Next, modify your Docker pull commands and Kubernetes pod YAML configuration to pull from the proxy project instead of the target registry. When the proxy project receives any pull request, it will always check its cached copy against the target registry to guarantee it has the latest copy.

![Create proxy cache project](../img/add-proxy-cache-project.png)

## Increasing the uptime of Harbor with non-blocking Garbage Collection

Although the current implementation of Garbage Collection (GC) doesn’t lock out registry users, it does put the registry in read-only mode which prevents users from performing actions such as image pushes and deletes while it’s running. This is exacerbated by the fact that GC can execute for an extended period of time with no way to preview running time or space to be deallocated.

Harbor v2.1 increases the uptime and availability of Harbor by introducing non-blocking GC Users can push and pull images from Harbor while garbage collection is ongoing, running silently in the background. There is zero impact to registry operations and no possibility of image corruption when pushing new images, even with shared image blobs to those candidates marked for deletion. GC is also markedly faster due to an improved backend and using the Harbor database rather than registry API for blob enumeration.


## Dragonfly & Kraken Integration

This release also delivers the ability to efficiently geo-distribute Harbor images to tens of thousands of clients through integrating with popular P2P solutions such as Alibaba Dragonfly and Uber Kraken. This involves adding P2P solutions as endpoints within Harbor and then creating “preheating” policies around controlled migration of images from Harbor to the P2P site. Once within the P2P network, content is seeded through a series of dedicated nodes in the cluster that runs in a highly scalable and highly available fashion. Preheating can be triggered manually or through scheduled tasks, with triggering conditions such as whether the image is signed, vulnerability-free, and match specific repository names and image tags.

## Sysdig Secure Scanner

Sysdig Secure Scanner is the latest 3rd party external scanner available to Harbor users. This is achieved through a dedicated scanner adaptor built by Sysdig. Vulnerability reports from scanned images can be shown from within Harbor UI as well as within Sysdig UI. The deployment format also comes in two versions, either by allowing Sysdig to retrieve and scan images on its backend or by running the scanjob as a Kubernetes job on your own infrastructure. Although Harbor users already have some of the best container image scanning solutions on the market available to them in Aqua Trivy, Aqua CSP, Anchore Engine and Enterprise, and Clair, Sysdig Secure differentiates itself through its robust policy engine and the breadth of integrations with Kubernetes security building blocks such as OPA and Admission Controllers. See this great [post](https://sysdig.com/blog/harbor-registry-scanning/) by the folks at Sysdig on installing and configuring the scanner for Harbor.

![](../img/sysdig-harbor-registry-scanning.png)

### Clair Deprecated on next release
Clair Image Scanner will be officially deprecated as an embedded scanner option in the next Harbor v2.2 release. This means it will no longer be available during initial installation and must be deployed and paired with Harbor like any other external scanner. For users upgrading from a Harbor deployment with Clair as the default scanner, it is recommended to upgrade with Trivy as the default scanner instead.

## ML on Kubernetes artifacts support

Harbor v2.1 also allows for hosting AI / ML on Kubernetes data models such as Kubeflow models and more. See this detailed blog on the work we did with ByteDance to enable Harbor registry for machine learning workload artifacts - https://goharbor.io/blog/harbor-extending-its-reach/

## Collaborate with the Harbor Community!

Get updates on Twitter: [@project\_harbor](https://twitter.com/project_harbor)

Chat with us on Slack: [#harbor](https://cloud-native.slack.com/messages/harbor)
and [#harbor-dev](https://cloud-native.slack.com/messages/harbor-dev)
on the[CNCF Slack](https://slack.cncf.io/)

Collaborate with us on GitHub:[github.com/goharbor/harbor](https://github.com/goharbor/harbor)

Attend the community meetings:
[https://github.com/goharbor/community/wiki/Harbor-Community-Meetings](https://github.com/goharbor/community/wiki/Harbor-Community-Meetings)


Alex Xu  
Harbor Maintainer  
Senior Product Manager, VMware  
[@xaleeks](https://github.com/xaleeks)
