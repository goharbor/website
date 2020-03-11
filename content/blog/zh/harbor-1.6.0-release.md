---
title: "探秘Harbor新版本1.6.0"
author:
    name: "Harbor团队"
    company: "VMware"
description: "增加了Helm charts管理、镜像复制增强等功能"
date: 2018-09-24T12:00:00+04:00
draft: true
showPageInfo: true
---
Harbor项目发布了其最新版本1.6.0。在此版本中，增加了多项新功能和重要更新及增强，比如Helm Charts管理，LDAP功能改进，镜像复制增强以及数据库的统一等。非常感谢社区持续极大的支持。

让我们接着来深入了解这些新特性：

## Helm charts管理

[Helm](https://helm.sh)已经成为Kubernetes事实上的包管理标准，其出现使得部署大规模应用变得简单。专有的Helm chart库是帮助构建新型企业级IT基础设施与平台的必备组件之一。Helm charts应该与容器镜像无缝协作，因而同时支持容器镜像管理与Helm chart管理自然成为Harbor发展方向之一。

{{< youtube XSszSd-TTCQ >}}

### 主要功能

从版本1.6.0开始，Harbor作为统一的云原生仓库，可同时支持镜像管理与Helm chart管理的需求。其主要功能可以概括为两个大方面：

* **概述**:
  * Charts通过项目命名空间隔离
  * Charts通过RBAC实现访问控制
* **用户管理界面**:
  * 可列出特定项目命名空间下的所有charts，支持列表和卡片两种视图
  * 可列出特定chart的所有版本，支持列表和卡片两种视图
  * 显示特定chart版本的详细信息，包括：
    - README的内容以及其它相关的元信息
    - 签名文件（prov文件）的状态
    - 应用chart的命令行参考信息
    - 当前版本的依赖列表
    - 值文件内容，支持键值对和yaml文件两种视图
  * 上传chart文件和/或签名prov文件
  * 下载制定版本的chart文件
  * 删除指定的chart版本

**利用Helm CLI可以很容易的开始使用Helm charts与Harbor:**

  * 使用 `helm repo add` 和指定的用户名可以添加Harbor为统一的chart仓库，此用户名下可访问的所有命名空间对Helm都是可见的。
  * 使用 `helm repo add` 可以添加Harbor项目作为独立的chart仓库，此时只有此项目下的charts对Helm可见。
  * 使用 `helm` CLI的 [push](https://github.com/chartmuseum/helm-push)插件可推送charts到Harbor。
  * 使用 `helm install` 可从Harbor下载chart并将其安装到目标Kubernetes环境。
  * 其它诸如 `helm search`、`helm verify`等命令无缝支持。

要了解更多通过Harbor管理Helm charts的详情，可参阅用户手册中的[管理Helm charts](https://github.com/goharbor/harbor/blob/master/docs/user_guide.md#manage-helm-charts)。

## LDAP改进-支持用户组

很多Harbor管理员启用LDAP来认证Harbor用户，并给用户分配不同的角色以实现访问控制。为了使其更加的灵活易扩展，Harbor现在可以支持不仅给LDAP用户还可以给LDAP组分配角色。

{{< youtube DcArQEFgk5s >}}

### 主要功能
* 给LDAP用户组分配角色:
  * 管理员可以通过群组DN从LDAP服务器导入用户组并给导入组分配角色。用户组中的所有用户继承并拥有用户组的角色。
* 定义Harbor管理员组DN:
  * 在定义Harbor管理员组后，此组中的所有LDAP用户将拥有Harbor管理员权限。

要了解更多通过LDAP组管理角色的详情，请参阅[LDAP文档](https://github.com/goharbor/harbor/blob/master/docs/manage_role_by_ldap_group.md)。

## 复制镜像中应用标签过滤器

在Harbor之前的版本中已引入了两种过滤器，基于镜像仓库名和仓库tag。此两种都需要过滤器模式匹配待复制的镜像。有时候会非常困难，甚至不可行。通过引入标签过滤器，用户可以给镜像添加任何标签且不需要改变镜像名，之后通过匹配特定的标签来对待复制镜像实现过滤。

{{< youtube mIdiXNnLq8Y >}}

### 主要功能

用户可通过给镜像添加特定标签并在复制策略中启用标签过滤器来实现有限复制镜像的场景。

要了解更多详情，可参阅用户手册中的[复制镜像](https://github.com/goharbor/harbor/blob/master/docs/user_guide.md#replicating-images)。

## 迁移多数据库到单一的PostgreSQL

在之前的发布版中，在Harbor的1个安装实例中存在2到3个MariaDB/MySQL和PostgreSQL的数据库实例。显然这样会增加Harbor系统的运维管理难度。在新版本中，多个不同的数据库合并到单一的数据库中，极大程度上降低了运维复杂度，并且为日后的HA部署方案的实施带来可能。

### 主要功能
* 迁移 **Harbor** 数据库到`PostgreSQL`
* 迁移 **Notary** 数据库到`PostgreSQL`
* 重定向 **Clair** 数据库到Harbor或者Notary数据库

要了解此发布版的更多信息以及如何开始使用Harbor 1.6.0, 请移步到[wiki](https://github.com/goharbor/harbor/wiki/Release-1.6.0)和[演示视频](https://github.com/goharbor/harbor/wiki/Video-demos-for-Harbor)页，那里有更详细的新功能展示.
