---
title: "Harbor v2.4 release and Distributed Tracing"
author:
  name: "Harbor Team"
date: 2021-10-28T12:00:00+04:00
draft: false
showPageInfo: true
---

We’re excited to announce the Harbor v2.4 GA release which focuses on distributed tracing for enhanced troubleshooting, identifying performance bottlenecks.

We're delighted to announce the general availability of [Harbor
v2.4](https://github.com/goharbor/harbor/releases/tag/v2.4.0).

Main new feature:

Observability is a key feature for operating a service in production and by using this data you can identify abnormal statuses and make informed decisions to fix issues when an error occurs. The distributed tracing is a key element of observability in modern applications. Harbor can provide distributed tracing data for operators and administrators to know the current running status and to help  troubleshooting.  Harbor exposes tracing data using the [OpenTelemetry](https://opentelemetry.io) sdk, you can easily export traces via Otel protocol which can be consumed by [OpenTelemetry Collector](https://opentelemetry.io/docs/collector) then expose to almost the on-prem or cloud trace backend. Because of the popularity of [Jaeger](https://www.jaegertracing.io), Harbor also can expose tracing data to Jaeger backend directly.

Other notable features such as:
- Support replication of Harbor instances with Robot Account [guide](https://github.com/goharbor/harbor/wiki/How-to-do-replication-with-Robot-Account)
- Support Stop All and single scan jobs
- Support exclusions and rate limit to Replication Rules.
- Enable OIDC auth based user deletion, this addresses [#8424](https://github.com/goharbor/harbor/issues/8424).
- Synchronize schedule from DB to Redis. 
- Harbor is now built using Golang v1.17.2 as of this release. [#15868](https://github.com/goharbor/harbor/pull/15868)
- Bump up Trivy to 0.23.0 which adds support for go.sum scanning.[#15861](https://github.com/goharbor/harbor/pull/15861)

Deprecations:
- The legacy robot account is deprecated in v2.4.0 release. It's suggested that you remove all the legacy robots and use robot v2 instead.
- Limit support on Chartmuseum from v2.4.0 release.

Full list of [PRs](https://github.com/goharbor/harbor/issues?q=is%3Aclosed+label%3Atarget%2F2.4.0+)!

Full list of Resolved issues [here](https://github.com/goharbor/harbor/issues?q=is%3Aissue+label%3Atarget%2F2.4.0+is%3Aclosed)!

## Distributed Tracing

In harbor v2.4 and later you are able to enable distributed tracing in your Harbor. But we only support one exporter at a time (you can not set bosh or none of them if you enabled tracing). You can set otel as exporter and leveraging OpenTelemetry Collector to retransmit to multiple backend if you want to send data to multiple exporter. And similarly, Jaeger exporter supports agent mode and endpoint mode, but only one mode can be enabled at a time.




If you're a user of Harbor and want to share any feedback, we'd love to
hear from you [here](https://github.com/goharbor/community/issues/115)!

Huge shoutout to the maintainer team, our contributors & everyone in the
community who helped the project realize its level of adoption today !!
The project would not be where it is today without the community

## Contributors to v2.4

We also want to thank the following users for their sustained
contributions to the project!

- Alexis L
- Chenyu Zhang
- He Weiwei
- Rolf Ahrenberg
- Steven Zou
- Wang Yan
- chlins
- stonezdj(Daojun Zhang)
- 孙世军

And overall contributors:

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
on the[CNCF Slack](https://slack.cncf.io)  
Collaborate with us on [GitHub](https://github.com/goharbor/harbor)  
Attend the [community meetings](https://github.com/goharbor/community/wiki/Harbor-Community-Meetings)

Orlin Vasilev  
Harbor Community Managaer  
[@OrlinVasilev](https://github.com/OrlinVasilev)
