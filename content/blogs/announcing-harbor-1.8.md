---
title: "Going Big: Harbor 1.8 Takes Security and Replication to New Heights"
author:
    name: "Harbor Team"
description:
date: 2019-05-21T06:00:00+04:00
draft: false
showPageInfo: true

---

Happy release day everyone! We are very excited to present the latest release of Harbor. The release cycle for version 1.8 was one of our longest cycles, and version 1.8 involved the highest number of contributions from community members of any Harbor release to date. As a result, 1.8 is our best release so far and comes packed with a great number of new features and improvements, including enhanced automation integration, security, monitoring, and cross-registry replication support.

## Support for OpenID Connect

In many environments, Harbor is integrated with existing enterprise identity solutions to provide single sign-on (SSO) for developers and users. OpenID Connect (OIDC), which is an authentication layer on top of OAuth 2.0, allows Harbor to verify the identity of users based on authentication performed by an external authorization server or identity provider. Administrators can now enable an OIDC provider as the authentication mode for Harbor users, who can then use their single sign-on credentials to log in to the Harbor portal.

In most situations, tools like the Docker client are incapable of logging in by using SSO and federated identity when the user has to be redirected to an external identity provider. To remedy this issue, Harbor now includes CLI secrets, which can provide end users with a token that can be used to access Harbor via the Docker or Helm clients.

## Robot Accounts

In a similar scenario to the Docker client SSO issue mentioned above, Harbor is often integrated with CI/CD tools that are unable to perform SSO with federated enterprise identity providers. With version 1.8, administrators can now create robot accounts, a type of special account that allows Harbor to be integrated and used by automated systems, such as CI/CD tools. You can configure robot accounts to provide administrators with a token that can be granted appropriate permissions for pulling or pushing images. Harbor users can continue operating Harbor using their enterprise SSO credentials, and use robot accounts for CI/CD systems that perform Docker client commands.

## Replication Advancements

Many users have the need to replicate images and Helm charts across many different environments, from the data center to the edge. In certain situations, users may have deployed applications on a public cloud and utilize the public cloud provider’s built-in registry. The built-in registries don’t offer the many capabilities and features of Harbor, specifically the static analysis of images.

Harbor 1.8 expands the Harbor-to-Harbor replication feature to add the ability to replicate resources between Harbor and Docker Hub, Docker Registry, and the Huawei Cloud registry by using both push- and pull-mode replication. Harbor can act as the central repository for all images, scan them for vulnerabilities, enforce compliance and other policies, and then replicate images to other registries acting as a pure content repository. One use case is creating replicas of your Harbor image repository on different types of repositories spread across data centers in different regions. This new Harbor feature has been created using a provider interface, and we expect our developer community to add support for more registries in the future.

## Additional Features

Harbor 1.8 brings numerous other capabilities for both administrators and end users:
1.	Health check API, which shows detailed status and health of all Harbor components.
2.	Harbor extends and builds on top of the open source Docker Registry to facilitate registry operations like the pushing and pulling of images. In this release, we upgraded our Docker Registry to version 2.7.1
3.	Support for defining cron-based scheduled tasks in the Harbor UI. Administrators can now use cron strings to define the schedule of a job. Scan, garbage collection, and replication jobs are all supported.
4.	API explorer integration. End users can now explore and trigger Harbor’s API via the Swagger UI nested inside Harbor’s UI.
5.	Enhancement of the Job Service engine to include internal webhook events, additional APIs for job management, and numerous bug fixes to improve the stability of the service.

## Growing End User Support for Harbor

We’re proud of the functionality we’re delivering in Harbor 1.8. We’re also fortunate to have a growing community willing to try Harbor and provide us with feedback. Here are some comments shared by end users on their use of Harbor:

_Fanjian Kong, Senior Engineer, 360 Total Security:_

“Through Harbor’s Web UI, we can conveniently manage the access rights of projects, members and images. We take advantage of Harbor’s remote replication features to create replicas of image repository in data centers across different regions.”


_De Chen, Cloud Platform Senior Software Engineer, CaiCloud:_

“In Caicloud’s product of cloud native platform, we leverage Harbor to implement the capability of image management, including Harbor's image synchronization and vulnerability scanning function. Delivered as an important component in our product, Harbor has been used by many of our enterprise customers.”


_Mingming Pei, Senior development engineer, Netease Cloud:_

“Harbor provides rich functions in container image management. It solves our challenges of transferring images and Helm charts between container clusters. Harbor does allow us to save a lot of resources in image repository. The community is very active and the features are constantly being improved.”

Since becoming a Cloud Native Computing Foundation (CNCF) Incubating project, there’s been a tremendous increase in participation by our community, evident in the breadth of new features included with this release. We want to extend a huge thank you to the community for making this release possible through all your contributions of code, testing, and feedback. If you are a new or aspiring contributor, there are many ways to get involved as a developer or a user. You can join us on Slack, GitHub, or Twitter to help advance the Harbor vision.

## Join the Harbor Community!

Get updates on Twitter ([@project_harbor](https://twitter.com/project_harbor))  
Chat with us on Slack ([#harbor](https://cloud-native.slack.com/messages/harbor) on the [CNCF Slack](https://slack.cncf.io/))  
Collaborate with us on GitHub: [github.com/goharbor/harbor](https://github.com/goharbor/harbor)

Michael Michael  
Harbor Core Maintainer  
Director of Product Management, VMware  
[@michmike77](https://twitter.com/michmike77)
