---
title: "Harbor Moves to Incubation"
author:
    name: "Harbor Team"
description: "Project Harbor is now an incubated project at the Cloud Native Computing Foundation"
date: 2018-11-13T20:15:00+04:00
draft: false
showPageInfo: true
---

## Harbor Moves to the CNCF Incubator

We are thrilled to announce the promotion of Harbor from the Cloud Native
Sandbox to Incubating status as a CNCF project. Harbor is an open source cloud
native registry project that stores, signs, and scans content. This milestone
reflects Harbor’s significant achievements in the areas of [community](https://github.com/goharbor/harbor/graphs/contributors)
involvement, governance, feature enhancements and adoption. 

Over the last several months Harbor maintainers have been working closely with
the community to improve everything from processes to codebase. These changes
have made Harbor even more secure, scalable and available. 

Since joining the Sandbox earlier this year, the Harbor project has seen a
marked increase in overall community participation, downloads, contributors,
commits, and forks.

![Harbor stats](https://github.com/goharbor/goharbor.github.io/tree/master/img/misc/harbor-stats-nov2018.md)

We invite you to read more about Harbor, including our a roadmap on where we’re
going, on the [cncf.io blog
post](https://www.cncf.io/blog/2018/11/13/harbor-into-incubator/), but wanted
to briefly highlight some recent major achievements:

* Native support of Helm charts.
* Support for deploying Harbor via Helm chart
* We’ve refactored of our persistence layer, now relying solely on PostgreSQL and Redis – this will help us achieve our high-availability goals over the long-term.
* Improved replication by allowing users to filter via labels.
* Improvements to RBAC, including LDAP group-based access control.
* Architecture simplification (i.e., collapsing admin server component responsibilities into core component) – _currently in progress_.

## Where we're going
This is the fun part. :)

We’re still working on the v1.8 roadmap, but here are some major features we’re considering and might land at some point in the future (timing to be determined, and contributions are welcome!):

* Quotas – system- and project-level quotas; networking quotas; bandwidth quotas; user quotas; etc.
* Replication – the ability to replicate to non-Harbor nodes.
* Image proxying and caching – a docker pull would proxy a request to, say, Docker Hub, then scan the image before providing to developer. Alternatively, pre-cache images and block images that do not meet vulnerability requirements.
* One-click upgrades and rollbacks of Harbor.
* Clustering – Harbor nodes should cluster, replicate metadata (users, RBAC and system configuration, vulnerability scan results, etc.). Support for wide-area clustering is a stretch goal.
* BitTorrent-backed storage – images are transparently transferred via BT protocol. 
* Improved multi-tenancy – provide additional multi-tenancy construct (system → tenant → project)

We’ll be opening a pool soon to allow users to vote on their desired features –
the most important way users can impact the direction of the project!

## Closing thoughts
We are deeply grateful for our [community](https://goharbor.io/community/) –
those who use Harbor and publicly share their experiences, the individuals who
report and respond to issues, the folks who hang around in our Slack community,
and those who spend time on GitHub improving the code and documentation. We’re
excited to see how Harbor continues to progress over the next few years.
