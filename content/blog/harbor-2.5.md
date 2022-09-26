---
title: "Harbor v2.5 release and cosign integration"
author:
  name: "Orlin Vasilev"
date: 2022-03-30T12:00:00+04:00
draft: false
showPageInfo: true
---

# **Harbor v2.5.0 GA - Cosign Artifact Signing and Verification**

#### We're delighted to announce the general availability of [Harbor v2.5.0](https://github.com/goharbor/harbor/releases/tag/v2.5.0).

### Main new feature:
This release introduces support for [Sigstore/Cosign](https://github.com/sigstore/cosign) as the artifact signing and verification provider in Harbor. Cosign signs OCI artifacts and pushes the generated signature into Harbor. This signature is stored as an artifact accessory along side the signed artifact. Harbor manages a link between the signed artifact and cosign signature, allowing you to apply things like tag retention rules and immutable rules to a signed artifact, and it will extend to both the signed artifact and the signature. This allows you to use Harbor's built in functionality to manage signed artifacts and Cosign signature accessories. Cosign signatures are also subject to Harbor's replication rules and will be replicated at the same time as their signed artifact.

### Other notable features such as:
* Improved performance for concurrent pull requests.
* Improved failure tolerance for garbage collection which is now able to continue deleting subsequent artifacts when an errors occurs trying to removing the current artifact.
* Replication now supports skipping artifacts in a proxy cache project.
* Activated distribution upload purging to remove orphaned files from the upload directories. 
* Harbor is now built using Golang v1.17.7.
* Harbor now uses Distribution v2.8.0 and Trivy v0.22.0.

### Breaking Changes:
* As of Harbor v2.5, only PostgreSQL **>= 10** is supported for external databases. Before upgrading, you should make sure that your external databases are using a supported version of PostgreSQL.

### Full list of -> [PRs](https://github.com/goharbor/harbor/issues?q=is%3Aclosed+label%3Atarget%2F2.5.0+)!

### Full list of Resolved issues -> [here](https://github.com/goharbor/harbor/issues?q=is%3Aissue+label%3Atarget%2F2.5.0+is%3Aclosed)!

## Cosign Artifact Signing and Verification

In harbor v2.4 and later you are able to enable distributed tracing in your Harbor. But we only support one exporter at a time (you can not set bosh or none of them if you enabled tracing). You can set otel as exporter and leveraging OpenTelemetry Collector to retransmit to multiple backend if you want to send data to multiple exporter. And similarly, Jaeger exporter supports agent mode and endpoint mode, but only one mode can be enabled at a time.




If you're a user of Harbor and want to share any feedback, we'd love to
hear from you [here](https://github.com/goharbor/community/issues/115)!

Huge shoutout to the maintainer team, our contributors & everyone in the
community who helped the project realize its level of adoption today !!
The project would not be where it is today without the community

## Contributors to v2.5

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

&nbsp;
&nbsp;

Orlin Vasilev  
Harbor Community Manager  
GitHub: [@OrlinVasilev](https://github.com/OrlinVasilev)  
Twitter: [@OrlinVasilev](https://twitter.com/OrlinVasilev)