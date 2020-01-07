---
title: "Harbor 1.10 Puts Security and Pluggable Scanners in the Limelight"
author:
    name: "Harbor Team"
description:
date: 2020-01-07T01:00:00+04:00
draft: false
showPageInfo: true

---

We are excited to announce Harbor 1.10, a release that hardens security and adds  security-related features, including a pluggable scanner framework that lets you pair Harbor with popular image scanners, such as Anchore Enterprise and Trivy by Aqua Security.

The Harbor project improved its security posture by identifying and fixing vulnerabilities after undergoing multiple internal and external penetration tests. We now also have a vulnerability [disclosure process](https://github.com/goharbor/harbor/security/policy) that allows the Harbor project to respond to threats in the future.  

Let’s dive into some of the latest developments.

## Vulnerability Scanning with Pluggable Scanners

Harbor has long been able to scan images in your repositories for security vulnerabilities or exposures by using [Clair](https://github.com/quay/clair). Harbor now extends its scanning capabilities with its out-of-tree [pluggable scanners](https://github.com/goharbor/community/blob/master/proposals/pluggable-image-vulnerability-scanning_proposal.md).  

Any cloud native security vendor that has a container image scanner, be it open source or commercial software, can provide an adapter service that implements the [Harbor scanner API](https://editor.swagger.io/?url=https://raw.githubusercontent.com/goharbor/pluggable-scanner-spec/master/api/spec/scanner-adapter-openapi-v1.0.yaml) specification and integrate with Harbor’s scanning workflows. Once the adapter is deployed and mounted at a URL endpoint accessible to Harbor, you can create a corresponding scanner registration under the Interrogation Services settings to activate the underlying scanner.

![Interrogation services](../images/harbor-1.10/interrogation-services.png/)

The default scanner, set to Clair for Harbor 1.10, is registered in the system settings. The default scanner is inherited by all projects. You can change it globally or override it at the project level, so that different projects can use different scanners.

![Select scanner](../images/harbor-1.10/select-scanner.png/)

In Harbor 1.10, which supports Scanner API 1.0, each scanner adapter is supposed to return a unified scan report with a flat list of vulnerability items, where each item represents a vulnerable operating system package or an application dependency.

![Scan report](../images/harbor-1.10/scan-report.png/)

Scanner API 1.0 is extensible with MIME types corresponding to scan reports. This extensibility would potentially allow Harbor, in future releases, to display enhanced vulnerability reports or support completely new types of reports. For example, one could configure multiple scanners per project to add checks for licenses or sensitive data.

At this time, the following scanner adapters are available, in alphabetical order:

* [Scanner Adapter for Anchore Engine and Enterprise][1]
* [Scanner Adapter for Aqua CSP Scanner][2]
* [Scanner Adapter for Clair][3]
* [Scanner Adapter for DoSec Scanner][4]
* [Scanner Adapter for Trivy][5]

You can also leverage your existing licenses for commercial scanners, such as Anchore Enterprise or Aqua CSP Scanner.

## Immutable Tags

Harbor system and project administrators can now configure images as immutable, which means another image with matching tags cannot be pushed into the same project in Harbor, thus avoiding accidental overwrites. The Docker distribution does not natively enforce this image tag to image digest mapping, and this behavior can be undesirable for certain release tags that rarely if ever should be tampered with. For example, tags such as ‘rc’, ‘test’, ‘prod’, ‘nightly’ will, over the course of their lifetime, likely migrate across different images as new images are pushed to Harbor while version-specific tags, such as Harbor_v1.6.1, Harbor_v1.7.2, and Harbor_v1.8.3, should be immutable because they are meant to represent a point-in-time snapshot. Once released, a version such as ‘Harbor_v1.8.1’ should never be changed, and any changes should be reflected on the next version, such as ‘Harbor_v1.8.2’. This freezing mechanism provides image traceability and guarantees that an immutable image will always have the same behavior regardless of how subsequent images are pushed, tagged, or retagged. Image immutability can be configured for an entire project, specific repositories, specific tags, or any combination of these.

![Immutability rule](../images/harbor-1.10/immutability-rule.png/)

## OIDC Support Enhancements

In large organizations, identity and permissions are controlled through membership in groups. This is important because permissions can be tied to a group, and different software solutions can leverage the same groups. As an administrator, you only have to add a new employee to the appropriate group to get the correct permissions rather than having to modify multiple software solutions individually. To achieve parity with LDAP and Active Directory group functionality, version 1.10 adds support for OIDC groups. As a project administrator, you can now authorize an OIDC group for a role in Harbor. Members of that group can log in through an OIDC identity provider and inherit the permissions of the groups to which they belong. After an OIDC group is added as a member to a project with a set of permissions associated with a Harbor role, such as that of  developers, all users within the OIDC group inherit the same permissions for the project when they log in. Group membership facilitates login workflows for large groups and lets you manage project permissions directly in the registry.  

## Limited Guest

Current Harbor ‘Guest’ users can see other members in the same project as well as detailed logs of operations, such as image pushes and pulls. To support a multitenant environment where a Harbor project could potentially have members from different teams, organizations, or even customers, we have now added a new ‘Limited Guest’ role that better isolates members from each other and removes visibility. Limited guests can pull images but cannot push images back to Harbor. This limited access, which is a great alternative to robot accounts, offers two advantages:

* Identity federation
* The same user account can be a member of multiple Harbor projects

## Community Updates

This release saw significant contributions from the community in vulnerability reporting, bug fixes, code reviews, and feature requirements, including the ones from our latest maintainer, [Daniel Pacak](https://github.com/danielpacak), who was instrumental in proposing and implementing the pluggable scanner framework that allows Harbor to add third-party image scanners. Harbor has seen increasing traction within the open source community and enterprise users alike, and this success is owed largely to community involvement. Please hop over to the [Harbor project board](https://github.com/orgs/goharbor/projects/1) for the most up-to-date status of the ongoing release (Harbor 2.0) and identify areas of interest for contributing. Contributions can be in the form of providing scenario requirements, testing, writing documentation, fixing bugs, or introducing new features.

## Roadmap for Harbor 2.0

With [Harbor 2.0](https://github.com/orgs/goharbor/projects/1) aiming to transform itself into a fully OCI-compliant registry, Harbor hopes to be able to host new cloud native artifact types, such as operators, bundles, and RPMs, through supporting a common set of industry-favored APIs called [Open Container Initiative](https://www.opencontainers.org/). This also means that based on an artifact’s type, Harbor would correctly support all corresponding actions of these artifacts, such as when they need to be pushed, scanned, pulled, replicated, and so forth. A direct beneficiary of the proposed refactoring to support OCI would be the ability to delete a single tag off Harbor without deleting all other tags referenced by the same underlying manifest, a major improvement over the Docker distribution. Our plans would also deliver a major enhancement to the current online garbage collection by enabling a non-blocking mechanism that allows you to push images to the registry while garbage collection is taking place, boosting performance and making garbage collection virtually undetectable.

## About Harbor

[Harbor](http://goharbor.io) is an open source trusted cloud native registry project that stores, signs, and scans container images and Helm charts. Harbor extends the open source Docker Distribution by adding key enterprise-level features in authentication and access control (LDAP and AD as well as OIDC support for RBAC), two-way replication to and from other third-party registries, advanced online non-blocking garbage collection, and authenticity and provenance capabilities through third-party image scanning and signing solutions. Harbor, which supports Docker Compose and Kubernetes, deploys in under 30 minutes. Harbor can be fully managed through a single web console and comes with a rich set of APIs managed withSwagger.

## Collaborate with the Harbor Community!

Get updates on Twitter ([@project_harbor](https://twitter.com/project_harbor))
Chat with us on Slack ([#harbor](https://cloud-native.slack.com/messages/harbor) on the [CNCF Slack](https://slack.cncf.io/))
Collaborate with us on GitHub: [github.com/goharbor/harbor](https://github.com/goharbor/harbor)

---

Alex Xu  
Harbor Contributor  
Product Manager, VMware  
github.com/xaleeks  

Daniel Pacak  
Harbor Maintainer  
OSS Engineer, Aqua Security  
github.com/danielpacak  

[1]: https://github.com/anchore/harbor-scanner-adapter
[2]: https://github.com/aquasecurity/harbor-scanner-aqua
[3]: https://github.com/goharbor/harbor-scanner-clair
[4]: https://github.com/dosec-cn/harbor-scanner
[5]: https://github.com/aquasecurity/harbor-scanner-trivy