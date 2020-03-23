---
title: "Introducing the Harbor Operator"
author:
  name: "Harbor Team"
description: "Simplify the installation and Day 2 operations of Harbor with the Harbor Operator"
date: 2020-03-23T12:00:00+04:00
---

TL;DR Simplify the installation and Day 2 operations of Harbor with the Harbor Operator. Go [here](https://github.com/goharbor/harbor-operator/) to learn how.

Harbor has seen strong user adoption since being released more than three years ago, and an increasing number of production deployments over the past few quarters. This steady increase has brought to light a few areas we can improve on, notably the need for an operator version of Harbor so that multiple instances of the registry can be better managed.

The term “operator” has been floating around for a number of years now, and if the chatter at recent KubeCon events is any indication, it appears to be gaining wide acceptance. But while there are different views as to what an operator does (is an operator a set of CRDs, a framework?, a design pattern?, a management tool?), one thing is for sure: It was born out of a need to manage more complex, stateful applications where current methods have fallen short. A longtime user of Harbor may wonder where the operator version fits in relation to the current Helm Chart deployment of Harbor. The answer is that, whereas Helm brought templatization and allowed for the deployment of custom YAMLs for different workloads, an operator is designed to facilitate Day 2 management tasks through better automation.

The operator approach is popular because it enables third-party developers to extend the Kubernetes control plane using custom controllers and custom resource definitions (CRDs) to achieve a true declarative API. This grants the developer more control over resources than the built-in Kubernetes objects with their default controllers. With the operator version, the controllers are effectively hooked into the messaging queue, allowing for constant reconciliation towards the specified desired state.

When [OVHcloud](https://www.ovh.com/world/), one of the leading European public cloud vendors, reached out to us to share its independent work on a Harbor operator, we were excited! OVHcloud has since made that work available under the goharbor project, as Harbor Operator v0.5, in the hopes that it reaches the largest audience possible. Go [here](https://github.com/goharbor/harbor-operator/) to learn how to deploy the operator and test it out. Specifically, the current version will allow you to:

* deploy Harbor as a custom resource treating Notary, Chartmuseum and Clair as optional components
* support configuration through the use of ConfigMaps and secrets
* destroy a Harbor instance with automatic cleanup

You can also read about why OVHcloud picked Harbor for its registry-as-a-service and the work it did to create the first version of the Harbor operator [here](https://www.ovh.com/blog/managing-harbor-at-cloud-scale-the-story-behind-harbor-kubernetes-operator/). As a managed service provider needing a specialized private registry to scale from managing hundreds of Harbor instances to tens of thousands, building an operator for Harbor was the best way for OVHcloud to be able to pick and choose from some of the existing components to meet its needs.

With the operator, we hope to tackle some of the remaining issues that the community has asked for, including backup and restore, zero-touch in-place upgrades, and out-of-the-box HA for enterprise-grade deployments. By leveraging the work already done by OVHcloud, as well as that of existing operators for Redis and PostgreSQL, we plan to build a Harbor cluster operator that will include an all-on-one installation experience with HA included. You will be able to use this operator to provision, scale, upgrade, back up and decommission your Harbor cluster with a single click.

We are also pleased to announce that Pierre Peronet and Jeremie Monsinjon from OVHcloud are joining the Harbor project as [maintainers](https://github.com/goharbor/community/blob/master/MAINTAINERS.md) focused on the Harbor operator and any related Day 2 experiences. Please follow our progress [here](https://github.com/goharbor/harbor-operator/) and let us know of any questions or suggestions.

## Collaborate with the Harbor Community!  

Join the [Harbor Community][community] meetings and distribution lists  
Get updates on Twitter at [@project_harbor][twitter]  
Chat with us on Slack at [#harbor][users-slack] on the [CNCF Slack][cncf-slack]  
Collaborate with us on GitHub: [github.com/goharbor/harbor](https://github.com/goharbor/harbor)  

Alex Xu  
Harbor Contributor  
Product Manager, VMware  
[github.com/xaleeks](https://github.com/xaleeks)  

[community]: https://goharbor.io/community/
[users-slack]: https://cloud-native.slack.com/archives/CC1E09J6S
[cncf-slack]: https://slack.cncf.io
[twitter]: https://twitter.com/project_harbor
