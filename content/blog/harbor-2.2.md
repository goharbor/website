---
title: "Harbor v2.2 and 2020 Year in Review"
author:
  name: "Harbor Team"
date: 2021-03-03T12:00:00+04:00
draft: false
showPageInfo: true
---

We're delighted to announce the general availability of [Harbor
v2.2](https://github.com/goharbor/harbor/releases/tag/v2.2.0). With
notable features such as

- Multi-projects scoped robots
- Prometheus-driven telemetry
- Proxy caching capability extended to GCR, Quay.io, ECR, & ACR
- OIDC auth admin group support, achieving parity with LDAP auth
- Dell EMC ECS S3 storage support
- Aqua CSP Enterprise Scanner Integration
- Clair image scanner deprecated

## System level robot accounts

With the introduction of [system level robot
accounts](https://goharbor.io/docs/2.2.0/administration/robot-accounts/)
detailed in [GH #8723](https://github.com/goharbor/harbor/issues/8723), System Admins can create robot accounts that have permissions to multiple projects with specific API access beyond simple image pushes and pulls. The new robot accounts use secrets instead of JWT tokens which allows them to be
refreshed with a new expiration date and change access to projects on
the fly. Existing robot accounts scoped at the project level can
co-exist with these but will be deprecated in a future release

## Prometheus integration

[GH #4557](https://github.com/goharbor/harbor/issues/4557) adds
long-awaited [Prometheus](https://goharbor.io/docs/2.2.0/administration/metrics/#scrapping-metrics-with-prometheus) integrations
to the Harbor deployment. The telemetry service monitors specific Harbor
services deployed and actions performed and exposes these metrics
through an HTTP endpoint for Prometheus. You can then use labels to
export data by specific dimensions and add these to a timeseries
datastore or write queries against it.

## Deprecation of Clair

Clair Image Scanner has also been officially deprecated from Harbor as
an embedded scanner option during install. Clair can still be installed
out-of-tree leveraging Harbor's interrogation services but must be
installed after the initial Harbor deployment. If you are upgrading from
a Harbor deployment using a different image scanner such as Aqua Trivy,
you are not affected.

## 2020 in review

2020 was a big year for Harbor, chock full of highlights including

- 1st VMware-originated project to graduate from CNCF; started in
    VMware Beijing R&D 2016
- Project stats as of today: **14.1k Github stars, 143 releases, 14
    maintainers across 5 companies, 3.6k forks**
- 1st OSS registry to fully support OCI specs
- 18 OSS releases in 2020
- 1st registry to support ML (Machine Learning) on K8s artifacts such
  as Kubeflow data models
- Proxy Cache capability producing significant savings by reducing the
  effect of Dockerhub's rate limiting
- Harbor Operator delivering HA and superior Day 2 management
  capabilities
- Commercial products based on Harbor - **VMware Tanzu Network
  Registry, OVH Cloud Registry, SUSE CaaS Registry, Tencent Enterprise
  Registry, Rancher Registry, Container-Registry.com** & more
- Adopters running Harbor in production - **JD.com, Tencent,
  Bytedance, Huawei, China Unicom, China Mobile, Intel, Dish Network,
  Salesforce, Agoda, TrendMicro** & many more

If you're a user of Harbor and want to share any feedback, we'd love to
hear from you [here](https://github.com/goharbor/community/issues/115)!

Huge shoutout to the maintainer team, our contributors & everyone in the
community who helped the project realize its level of adoption today !!
The project would not be where it is today without the community

## Focus for 2021

In 2021, the team will focus on

- Hardening the Harbor Operator; great hook for any company offering
  Harbor *aaS
- Harbor Lite for Edge : a lightweight registry serving workloads at
  edge nodes
- Increasing our involvement in Notary v2 upstream for better image
  provenance capabilities
- Increasing out involvement in Docker Distribution upstream
- Strengthening ecosystem partnerships
- Integrations with image scanner vendors like Twistlock and Qualys
- Improving performance and scalability
- Deploy onto IPv6-based K8s clusters
- Releasing an ARM64-based Harbor

## Contributors to v2.2

We also want to thank the following users for their sustained
contributions to the project!

- Will Sun
- Qian Deng
- Wang Yan
- He Weiwei
- danfengliu
- Daniel Jiang
- Wenkai Yin(尹文开)
- stonezdj(Daojun Zhang)
- Ziming
- Abigail McCarthy
- Chlins Zhang
- Dirk Mueller
- sluetze
- mmpei
- 疯魔慕薇
- Thoro
- Steven Zou
- Ángel Barrera
- Bo Shao
- Greg
- Sven Haardiek
- prahaladdarkin
- Flávio Ramalho
- KeisukeYamashita
- Daniel Pacak

## Collaborate with the Harbor Community

Get updates on Twitter: [@project\_harbor](https://twitter.com/project_harbor)  
Chat with us on Slack: [#harbor](https://cloud-native.slack.com/messages/harbor)
and [#harbor-dev](https://cloud-native.slack.com/messages/harbor-dev)
on the[CNCF Slack](https://slack.cncf.io/)  
Collaborate with us on [GitHub](https://github.com/goharbor/harbor)  
Attend the [community meetings](https://github.com/goharbor/community/wiki/Harbor-Community-Meetings)

Alex Xu  
Harbor Maintainer  
Senior Product Manager, VMware  
[@xaleeks](https://github.com/xaleeks)
