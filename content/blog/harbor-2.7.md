---
title: "Harbor v2.7 release features"
author:
  name: "Orlin Vasilev"
date: 2022-12-21T12:00:00+04:00
draft: false
showPageInfo: true
---

# **Harbor v2.7.0 GA - exciting new features**

#### We're delighted to announce the general availability of [Harbor v2.7.0](https://github.com/goharbor/harbor/releases/tag/v2.7.0).


### New features

### Jobservice monitor
Add the job service dashboard to monitor and control the job queues/schedules/workers
* Add jobservice monitoring api list pool, worker and stop running task by @stonezdj in [17658](https://github.com/goharbor/harbor/pull/17658)
* feat: support customize session timeout by @chlins in [17767](https://github.com/goharbor/harbor/pull/17767)
* Add REST API to list job queue status, pause/resume job queue and list schedulers by @stonezdj in [17707](https://github.com/goharbor/harbor/pull/17707)
* Add Jobservice UI by @AllForNothing in [17722](https://github.com/goharbor/harbor/pull/17722)


The job service dashboard is a web-based interface that allows you to view and manage jobs that are running in the Harbor job service. It is available at `https://<harbor_url>/harbor/job-service-dashboard/`. You can use the dashboard to view the status of job queues, the schedule of jobs, and the status of the job service pools and workers. you can also use it to stop pending or running jobs, or pause or resume the job service queue.

### Replication by chunk
Support copy over chunk when copying image blobs for harbor replication.
* feat: introduce the copy by chunk for replication by @chlins in [17602](https://github.com/goharbor/harbor/pull/17602)
* Add copy_by-chunk checkbox for replication rule by @AllForNothing in [17617](https://github.com/goharbor/harbor/pull/17617)

### Additional Features
* Add session timeout input by @AllForNothing in [17769](https://github.com/goharbor/harbor/pull/17769)
* Add JFrog Artifactory As Supported Proxy-Cache Registry Source by @erismaster in [17738](https://github.com/goharbor/harbor/pull/17738)
* Sort group search result by most match order by @stonezdj in [17708](https://github.com/goharbor/harbor/pull/17708)

### Deprications

* Start the deprecation of Chartmuseum from v2.6.0 and begin to remove in v2.8.0. More details, please refer to the [discussion](https://github.com/goharbor/harbor/discussions/15057).
* Start the deprecation of Notary(signer&server) from v2.6.0 and begin to remove in v2.8.0. More details, please refer to the [discussion](https://github.com/goharbor/harbor/discussions/16612).
* Remove email config page by @AllForNothing in [17711](https://github.com/goharbor/harbor/pull/17711)

### Welcome to our new contributors
## New Contributors
* @tmaroschik made their first contribution in https://github.com/goharbor/harbor/pull/16442
* @wujunwei made their first contribution in https://github.com/goharbor/harbor/pull/16206
* @lengrongfu made their first contribution in https://github.com/goharbor/harbor/pull/17306
* @mrbusche made their first contribution in https://github.com/goharbor/harbor/pull/17303
* @vincentni made their first contribution in https://github.com/goharbor/harbor/pull/17533
* @gaius-qi made their first contribution in https://github.com/goharbor/harbor/pull/17581
* @Juneezee made their first contribution in https://github.com/goharbor/harbor/pull/17670
* @94rain made their first contribution in https://github.com/goharbor/harbor/pull/17718
* @erismaster made their first contribution in https://github.com/goharbor/harbor/pull/17738
* @yanggangtony made their first contribution in https://github.com/goharbor/harbor/pull/17792
* @akhilerm made their first contribution in https://github.com/goharbor/harbor/pull/17818
* @sayaoailun made their first contribution in https://github.com/goharbor/harbor/pull/16641

If you're a user of Harbor and want to share any feedback, we'd love to
hear from you [here](https://github.com/goharbor/community/issues/115)!

Huge shoutout to the maintainer team, our contributors & everyone in the
community who helped the project realize its level of adoption today !!
The project would not be where it is today without the community

## Contributions to v2.7

We also want to thank the following users for their sustained
contributions to the project!

Thank you to all who contributed to 2.7 [full release notes here](https://github.com/goharbor/harbor/releases/tag/v2.7.0)


### Special thank you to all new contributors:
* @tmaroschik made their first contribution in https://github.com/goharbor/harbor/pull/16442
* @wujunwei made their first contribution in https://github.com/goharbor/harbor/pull/16206
* @lengrongfu made their first contribution in https://github.com/goharbor/harbor/pull/17306
* @mrbusche made their first contribution in https://github.com/goharbor/harbor/pull/17303
* @vincentni made their first contribution in https://github.com/goharbor/harbor/pull/17533
* @gaius-qi made their first contribution in https://github.com/goharbor/harbor/pull/17581
* @Juneezee made their first contribution in https://github.com/goharbor/harbor/pull/17670
* @94rain made their first contribution in https://github.com/goharbor/harbor/pull/17718
* @erismaster made their first contribution in https://github.com/goharbor/harbor/pull/17738
* @yanggangtony made their first contribution in https://github.com/goharbor/harbor/pull/17792
* @akhilerm made their first contribution in https://github.com/goharbor/harbor/pull/17818
* @sayaoailun made their first contribution in https://github.com/goharbor/harbor/pull/16641

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