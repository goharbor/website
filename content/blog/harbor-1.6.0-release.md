---
title: "Harbor version 1.6.0 is live!"
author:
  name: "Harbor Team"
  company: "VMware"
description: "Adding features such as Helm charts management, image replication and more"
date: 2018-09-13T12:00:00+04:00
draft: false
showPageInfo: true
---

Project Harbor has released version 1.6.0 with several new features such as Helm charts management, improved LDAP support, image replication, and database migrations. A big thank you to the community for your incredible continued support!

Let's dive into it what's new:

## Helm charts management

[Helm](https://helm.sh) has become the de facto package manager of Kubernetes, making it easy to to deploy a vast array of applications. We see a dedicated Helm chart repository as a must-have system to help build new enterprise IT infrastructure and platforms. Helm charts should work seamlessly together with container images, and therefore supporting both image management and Helm chart management has become the natural direction for Harbor.

{{< youtube XSszSd-TTCQ >}}

### Main features

Starting with version 1.6.0, Harbor can serve as a unified cloud native registry for both image management requests and helm chart management requests. The main features are grouped into two perspectives:

* **Overall**:
  * Charts are isolated by project namespace
  * Access control is applied to charts by RBAC
* **User management portal**:
  * List all the charts under the specified project namespace with list or card view
  * List all the chart versions of one specified chart with list or card view
  * Show the details of the specified chart version
    - README content and other metadata information
    - The signature prov file status
    - Usage commands reference
    - The dependencies of the chart version
    - The value file content with the key-value view and yaml view
  * Upload chart w/ prov file
  * Download the specified chart version
  * Delete the specified chart version

**It's easy to get started with Helm charts and Harbor using the Helm CLI:**

  * Use `helm repo add` to add Harbor as a unified chart repository with specified username, all the project namespaces accessible by that user should be visible to Helm.
  * Use `helm repo add` to add a Harbor project as a separate chart repository, only the charts under that project are visible to Helm.
  * Use the [push](https://github.com/chartmuseum/helm-push) plugin of the `helm` CLI to push charts to Harbor
  * Use `helm install` to download the chart from Harbor and install it to the target Kubernetes environment
  * Other commands like `helm search` or `helm verify` are also supported

For more details on managing Helm charts with Harbor, see the [user guide](https://github.com/goharbor/harbor/blob/master/docs/user_guide.md#manage-helm-charts).

## LDAP group support

Many Harbor administrators are using LDAP to authenticate Harbor users, and then need to assign roles to each user. To make this more scalable Harbor now supports assigning roles to LDAP groups as well as individual users.

{{< youtube DcArQEFgk5s >}}

### Main features
* Assign role to LDAP group:
  * An administrator can import groups from an LDAP server by using their group DN. The LDAP users in this group now inherits the group's role.
* Define Harbor admin group DN:
  * After defining the Harbor admin group, all LDAP user in this group have Harbor administrator privileges.

For more details on managing roles with LDAP groups, see the [docs](https://github.com/goharbor/harbor/blob/master/docs/manage_role_by_ldap_group.md).

## Replicate images with label filters

Two replication filters (repository name filter and repository tag filter) were introduced in the previous version of Harbor, they both need the filter pattern to match the images which should be replicated. Sometimes this is difficult or even impossible. With the introduction of label filters, users can add any label to the images without changing the name of them.

{{< youtube mIdiXNnLq8Y >}}

### Main features
Users replicate images by adding labels to them and creating a new rule with the label filter.

For more details on this, see the [user guide](https://github.com/goharbor/harbor/blob/master/docs/user_guide.md#replicating-images).

## Migrate multiple DBs to one PostgreSQL DB

In the previous releases, there are two or three database instances running on one Harbor node, which are MariaDB/MySQL and PostgreSQL. This of course increases the effort to maintain the Harbor system. This new feature makes it possible to merge multiple databases into a single database, making it far easier to maintain and make it possible to enable HA solutions for the future releases.

### Main features
* Migrate Harbor DB to PostgreSQL
* Migrate Notary DB to PostgreSQL
* Redirect Clair DB to Harbor/Notary DB

For more information about the release and how to get started with version 1.6.0, head over to the [wiki](https://github.com/goharbor/harbor/wiki/Release-1.6.0) and our [list of videos](https://github.com/goharbor/harbor/wiki/Video-demos-for-Harbor) that shows off these new features.
