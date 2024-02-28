---
title: "Harbor 2.0 takes a giant leap in expanding supported artifacts with OCI support"
author:
  name: "Harbor Team"
description: "Making Harbor the first OCI-compliant open source registry"
date: 2020-05-13T12:00:00+04:00
draft: false
showPageInfo: true
---

We are pleased to announce general availability of [Harbor 2.0](https://github.com/goharbor/harbor/releases/tag/v2.0.0). This
release makes Harbor the first OCI ([Open Container
Initiative](https://www.opencontainers.org/))-compliant open source
registry capable of storing a multitude of cloud-native artifacts like
container images, Helm charts, OPAs, Singularity, and much more.

*If you're interested in learning more about Harbor 2.0,
*[*register today for the CNCF Project Webinar on Harbor on May 28, 2020
at 10:00am
PDT*](https://zoom.us/webinar/register/7415882601786/WN_dVQGhggoQXmJ1rKPugEKyg)*.*

Let's first dive into what OCI is and what the release of Harbor 2.0
means for the community.

OCI is a tried-and-true industry standard that defines specifications
around format, runtime, and the distribution of cloud-native artifacts.
Most users are familiar with some of the more popular OCI-compliant
artifacts, like docker images and Helm charts. The OCI specification
helps bring artifact authors and registry vendors together behind a
common standard. As a developer, I can now adopt the OCI standard for my
artifacts and be confident that I can use an OCI-compliant registry like
Harbor with minimal to no changes.

At a high level, OCI puts forth two specifications: an
[image](https://github.com/opencontainers/image-spec/blob/master/spec.md)
specification and a
[runtime](https://github.com/opencontainers/runtime-spec/blob/master/spec.md)
specification. The image specification defines what the image looks
like, including the archival format and the contents, including the
manifest, the (optional) image index, the ordinal set of filesystem
layers, and a
[configuration](https://github.com/opencontainers/image-spec/blob/master/config.md)
file. The OCI runtime then takes that configuration and converts it into
an executable that consumes the filesystem bundle in accordance with the
runtime specification. Put another way, the image specification
facilitates the creation of interoperable tools for building,
transporting, and preparing images for running whereas the runtime
specification dictates the configuration, execution environment, and
lifecycle of a container.

Supporting OCI-compliant images in Harbor means supporting its set of
APIs and interpreting key information. Such information includes the OCI
schemas and media types that are used to determine what can or cannot be
pushed onto Harbor. For example, the manifest.config.mediaType field is
critical for identifying itself to the registry while the
layer.mediaType defines the filesystem layers that are to be stored and
persisted on the registry---without the registry having to pull and
dissect the layers first.

**For example, Helm charts can now be pushed onto Harbor via Helm3.**
Instead of being hosted separately in ChartMuseum, Helm charts are now
stored under artifacts alongside container images. In this figure below,
we see a container image, a Helm chart, and a Cloud Native Application
Bundles (CNAB) hosted in the same project.

![](../img/harbor-2.0-artifacts.png)

Harbor gets another key benefit from being OCI-compliant: It is now
fully capable of handling an OCI
[index](https://github.com/opencontainers/image-spec/blob/master/image-index.md),
a higher-level manifest representing a bundling of image manifests
that's ideal for multi-architecture scenarios. Imagine pulling an image
without having to specify the operating system and platform and instead
relying entirely on the client tooling to ensure the correct version of
that image is fetched. This index structure is widely leveraged by
artifacts like CNAB for managing distributed cloud-agnostic
applications.

Although Harbor is now OCI-compliant, existing users should not worry;
all of the familiar operations and key benefits of Harbor translate well
to OCI. You can push, pull, delete, retag, copy, scan, and sign indexes
just like you've been able to do with images. Vulnerability scanning and
project policies, key ingredients to enforcing security and compliance,
have been revamped to work with OCI artifacts. We also provided a new,
key capability: you now have the ability to delete an image tag without
deleting the underlying manifest and all other associated image tags.
You can also view untagged images, and have the option to exclude them
from being garbage-collected.

As artifact types will undoubtedly come and go, it's crucial that Harbor
exists outside of any particular container format, and be flexible
enough to onboard and discard any artifact type based on community
demand and adherence to common standards.

## Shipping Aqua Trivy as the default scanner

This release also replaces Clair with [Aqua's
Trivy](https://github.com/aquasecurity/trivy) as the default image
scanner. Trivy takes container image scanning to higher levels of
usability and performance than ever before. Since adding support for
Trivy through our pluggable scanning framework in Harbor v1.10, we have
received great feedback and have seen increasing traction among the
Harbor community, making Trivy the perfect complement to Harbor. Trivy
has wide coverage for scanning different operating systems and
application package managers, and is easy to integrate into CI/CD
systems. It also conducts deep scans and picks up vulnerabilities across
popular distros like CentOS, Photon OS, Debian, and Ubuntu, among
others. Clair also continues to be supported in Harbor as a built-in
scanner. In fact, during an upgrade to Harbor v2.0, projects using Clair
as the scanner of choice will be unaffected; Trivy will be set as the
default scanner only for new installations.

![](../img/harbor-2.0-interrogation-services.png)

## Notable features

We listened to user feedback and are making strides towards an improved
design for Harbor robot accounts, a design that reflects common usage
patterns. Harbor v2.0 introduces the ability to set an expiration date
on each individual robot account as opposed to a system-wide setting. In
a future release, we will grant robot accounts the ability to be
targeted to one or more projects, and will offer better credential
handling for Kubernetes deployments.

Also new in Harbor v2.0 is the ability to configure SSL for core Harbor
services. When configured, internal Harbor services will encrypt their
service-to-service communication. This feature enhances the security
posture of Harbor and reduces the likelihood of man-in-the-middle
attacks.

Webhooks can now be individually triggered, and come with Slack
integration. Some users may not want to receive callbacks for every
supported webhook action, so this update enables users to configure, at
the project level, which webhooks to receive and the preferred callback
method, HTTP or Slack.

![](../img/harbor-2.0-dark-light.png)

Did you also notice the all-new dark mode in the updated Harbor UI?
Download [Harbor v2.0](https://github.com/goharbor/harbor/releases/tag/v2.0.0) and give it a shot!

Hopefully Harbor v2.0 has your attention. Join us for the CNCF Project
Webinar on Harbor v2.0 on May 28, 2020 at 10:00am PDT by registering
[here](https://zoom.us/webinar/register/7415882601786/WN_dVQGhggoQXmJ1rKPugEKyg).

## Community Shoutouts!

- A huge thank-you to the Harbor maintainer team for delivering Harbor v2.0
- [@stuclem](https://github.com/stuclem) for revamping our documentation
- [@lucperkins](https://github.com/lucperkins) for the snazzy new
  [goharbor.io](https://goharbor.io/) website
- [@ninjadq](https://github.com/ninjadq) for certificate enablement
  and SSL enhancements
- [@danfengliu](https://github.com/danfengliu) for QA and CI
  contributions to Harbor v2.0
- [@allForNothing](https://github.com/AllForNothing),
  [@jwangyangls](https://github.com/jwangyangls) for the new Harbor UI
- [@heww](https://github.com/heww),
  [@stonezdj](https://github.com/stonezdj),
  [@bitsf](https://github.com/bitsf) for the Harbor v2.0 code
  refactoring
- [@tedgxt](https://github.com/tedgxt) for the webhook enhancements

## About Harbor

[Harbor](http://github.com/goharbor/harbor) is an open source, trusted
cloud native registry project that stores, signs, and scans container
images, Helm charts, and any other OCI-compliant artifacts. Harbor
extends the open-source Distribution/Distribution by adding key
enterprise-level features in authentication and access control (LDAP and
AD as well as OIDC support for RBAC), two-way replication to and from
other third-party registries, advanced garbage collection, and
authenticity and provenance capabilities through third-party image
scanning and signing solutions. Harbor, which supports Docker Compose
and Kubernetes, deploys in under 30 minutes. Harbor can be fully managed
through a single web console and comes with a rich set of APIs managed
with Swagger.

## Collaborate with the Harbor Community!

Get updates on Twitter
([@project\_harbor](https://twitter.com/project_harbor))

Chat with us on Slack
([#harbor](https://cloud-native.slack.com/messages/harbor)
and [#harbor-dev](https://cloud-native.slack.com/messages/harbor-dev)
on the[CNCF Slack](https://slack.cncf.io/))

Collaborate with us on GitHub:[
github.com/goharbor/harbor](https://github.com/goharbor/harbor)

Attend the community meetings:
[https://github.com/goharbor/community/wiki/Harbor-Community-Meetings](https://github.com/goharbor/community/wiki/Harbor-Community-Meetings)

Alex Xu
Harbor Contributor
Senior Product Manager, VMware
[@xaleeks](https://github.com/xaleeks)
