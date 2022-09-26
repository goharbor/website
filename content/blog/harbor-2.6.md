---
title: "Harbor v2.6 release features"
author:
  name: "Orlin Vasilev"
date: 2022-09-27T12:00:00+04:00
draft: false
showPageInfo: true
---

# **Harbor v2.6.0 GA - exciting new features**

#### We're delighted to announce the general availability of [Harbor v2.6.0](https://github.com/goharbor/harbor/releases/tag/v2.6.0).


### New Caching layer
#### Motivation
Cloud-native technologies represented by Kubernetes have become the core driving force of enterprises' digital transformation and business amplifiers. As one of the cornerstone technologies of the cloud-native ecosystem, Harbor plays an extremely important role in supporting flexible image distribution. With more and more applications and CI/CD pipelines being implemented, Harbor needs to be able to handle thousands or more requests at one time. With the increasing demand, the Harbor team has started making performance improvements to handle high request scenarios. This includes the Harbor Cache Layer which was introduced in Harbor v2.6.


### CVE export:

#### Motivation
Kubernetes and container adoption is witnessing widespread adoption as detailed within the [CNCF survey](https://www.cncf.io/announcements/2022/02/10/cncf-sees-record-kubernetes-and-container-adoption-in-2021-cloud-native-survey/) conducted in February 2022. This trend ultimately bolsters the most fundamental fact - container registries can no longer act as image stores. Instead container registries are now fundamental building blocks for the software supply chain within the cloud-native software realm and hence must expose features that allow the users to assess the software compliance of the images which are stored in the registry. One of the critical parameters for ensuring software compliance is assessing software vulnerabilities present within container images 

Harbor is an open-source enterprise-grade registry that extends the Docker distribution to provide features such as image vulnerability scanning, replication and activity auditing.
With the upcoming 2.6.0 release, Harbor now exposes a mechanism to export CVE vulnerabilities for images to the  automation friendly CSV format. The functionality hence unlocks further visibility and control over the security posture of images and their distribution.

#### Feature overview
The CSV export feature can be triggered for a project by any user who has Project Admin, Developer, or Maintainer roles on the project. The user can specify one or more repositories, tags or labels as filters while triggering the export. As an additional  bonus, the CSV export can be triggered using Harbor APIs thereby yielding itself to  be consumed by CI/CD workflows as well as automated scanning.

![CVE Export](../img/blog-2.6/cve-export.png)

Once the export job completes, the user can download the CSV report from the Harbor UI.
Once the CSV file is downloaded by the user, it is deleted from Harbor internal stores and subsequent download attempts for the same file are not possible.

![CVE Export](../img/blog-2.6/cve-events.png)

#### Accessing CSV Export Programmatically
The CVE export of functionality adheres to the Harbor standard of providing an API access endpoint through which the functionality can be invoked by 3rd party programs, thereby facilitating automation. A programmatic access consists of the following 3 steps:

1. Invoke the CVE export API
```
curl --location --request POST 'https://harbordev.com/api/v2.0/export/cve' \
--header 'X-Scan-Data-Type: application/vnd.security.vulnerability.report; version=1.1' \
--header 'Authorization: Basic xxx' \
--header 'Content-Type: application/json' \
--data-raw '{
  "labels": [
  ],
  "repositories": "{goharbor/*,nginx}",
  "projects": [
  ],
  "job_name": "Test_Vuln_Export_Job"
}'
```

The above API execution returns the execution id associated with the CSV export job. This execution id is used as a reference in further API calls to retrieve the status and download the CSV data.

2. Check the status of the CVE export job.
```
curl --location --request GET 'https://harbordev.com/api/v2.0/export/cve/execution/35' \
--header 'X-Scan-Data-Type: Test' \
--header 'X-Harbor-CSRF-Token: xxx' \
--header 'Authorization: Basic xxx' \
--data-raw ''
```

Note that in the above GET request the execution id of the CSV export job is specified as a part of the invocation URL. In this case the execution ID we obtained for the job was 35

3. Download the CVE exported data
```
curl --location --request GET 'https://harbordev.com/api/v2.0/export/cve/download/35' \
--header 'X-Scan-Data-Type: Test' \
--header 'X-Harbor-CSRF-Token: xxx' \
--header 'Authorization: Basic xxx' \
--data-raw ''
```
Once the CSV file is downloaded by the user, it is deleted from Harbor internal stores and subsequent attempts to download the same file would result in an error.

#### Conclusion

The CVE export functionality exposed  by Harbor 2.6.0, provides a fundamental building block for auditing and controlling the CVE stature of the registry images. By providing an easy to use UI experience as well as a streamlined programmatic workflow, it opens up the numerous possibilities for integrating CVE compliance checks within the core software supply chain and ensuring that software being delivered not only caters to the business needs but is also audited and protected against vulnerabilities thereby ensuring compliance

For full information please check the [Harbor v2.6.0 official documentation](https://goharbor.io/docs/2.6.0/administration/vulnerability-scanning/scan-individual-artifact/)

### Purge and Forward Audit Log

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