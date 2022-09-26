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

#### Some typical user stories for Harbor include:

* As a developer/tester, I want to pull/push my business application to a registry for feature testing or bug validation.
* As an operator, I want to maintain the registry by executing some daily scan/replication/retention/gc... jobs.
* As a user, I want to deploy my applications by pulling images from the registry.

While seemingly straightforward, these scenarios can lead to the need for a highly available and performant registry as the Harbor's integration points and user base grows, data requests are made transiently or periodically. In summary, it's hard to evaluate the concurrency requests from the outside, so Harbor needs some adaptive and advanced modules to help to improve its performance in high utilization scenarios.

Full article can be found [here](https://github.com/goharbor/perf/wiki/Cache-layer) and more information about the initial prolsal [here](https://github.com/goharbor/community/blob/main/proposals/cache-layer.md)
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

The audit_log is used to record the image pull/push/delete operations so that administrators could retrieve the history of the operation log. In a typical large Harbor server, there might be a large amount pull request and small amount of push request, delete request. Because the audit log is stored in database table, it cost of amount DB IO time and disk space to write the audit_log, it is better to provide a configurable way to log these information in either the file system or database. The audit_log table because of it is large size, it requires the DBA to create a job to clean up it periodically and it also cause the historical data cannot be retrieved. the purge and forward audit log feature provide a way to forward the audit log to external endpoint and purge the audit log table periodically. 

#### Feature overview

The log rotation feature provide a way to configure and schedule the purge operation to the audit log table. administrators could specify the operations need to delete and how long should the audit log be kept in database.
The audit log forwarding feature allow user to forward the audit log to an existing sys log endpoint, such as Wavefront LogInsight, Logstash, and once the forward setting is configured, then the administrator could disable to log audit information in database.

#### Purge audit log
After install Harbor 2.6.0, login to Harbor in browser, there is a new menu item named “Clean Up” under “Administration”. there are two tabs, “Garbage Collection” and “Log Rotation”

![Audit log](../img/blog-2.6/audit-log.png)

Check the full [documentation here](https://goharbor.io/docs/2.6.0/administration/log-rotation/)


### Other notable features such as:
* B/R With Velero - Support backup and restore Harbor helm chart with Velero. For more details and usage, see the user guide.

* Add stop button for GC by @AllForNothing in #17037
* Add stop button for audit log rotation by @AllForNothing in #17054

### Additional Features
* GDPR compliant deletion of Users by @tpoxa in #16859
* [Experimental] Add new feature for supporting WebAssembly artifact by @ln23415 in #16931

### Deprecations
* Start the deprecation of Chartmuseum from v2.6.0 and begin to remove in v2.8.0. More details, please refer to the discussion.
* Start the deprecation of Notary(signer&server) from v2.6.0 and begin to remove in v2.8.0. More details, please refer to the discussion.
### Known issues
* Starting with v2.6.0, there is a regression issue with sentinel redis configuration, you can get the details from 17483 and you can get the solution here. If you have concerns about this, please wait for the next patch release v2.6.1.




If you're a user of Harbor and want to share any feedback, we'd love to
hear from you [here](https://github.com/goharbor/community/issues/115)!

Huge shoutout to the maintainer team, our contributors & everyone in the
community who helped the project realize its level of adoption today !!
The project would not be where it is today without the community

## Contributions to v2.6

We also want to thank the following users for their sustained
contributions to the project!

Thank you to all who contributed to 2.6 [full release notes here](https://github.com/goharbor/harbor/releases/tag/v2.6.0)
We also want to thank the following users for their sustained
contributions to the project!


Special thank you to all new contributors:
@SimonAlling made their first contribution in #14945
@alrs made their first contribution in #16494
@OrlinVasilev made their first contribution in #16645
@tibeer made their first contribution in #16723
@mac-chaffee made their first contribution in #16642
@koushik-ms made their first contribution in #16910
@franznemeth made their first contribution in #16322
@tpoxa made their first contribution in #16859
@stefanlasiewski made their first contribution in #17019
@qnetter made their first contribution in #16984
@Dannyx323 made their first contribution in #17118
@heylongdacoder made their first contribution in #16111
@DarthBlair made their first contribution in #16514
@ln23415 made their first contribution in #16931
@Abirdcfly made their first contribution in #17211

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