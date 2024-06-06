---
title: "Harbor v2.11 release - The SBOMs release"
author:
  name: "Orlin Vasilev"
date: 2024-06-06T06:00:00+01:00
draft: false
showPageInfo: true
---

### Harbor [2.11 Release](r211): Enhancements, Features, and More! 🚀
![sboms](../img/blog-2.11/sboms.jpeg)

The Harbor team is thrilled to announce the release of Harbor [2.11](r211)! Packed with groundbreaking features, performance enhancements, and new integrations, this release sets a new standard for container registry management. Let's dive into what's new and why you should be as excited as we are!

[Happy 10th birthday Kubernetes](https://github.com/kubernetes/kubernetes/commit/2c4b3a562ce34cddc3f8218a2c4d11c7310e6d56)
![k8s-10](../img/blog-2.11/k8s-10.jpg)
Celebrate K8s 10th year around the globe [find your party here]()

## Exciting New Features 🎉

### SBOM Generation and Management
Harbor 2.11 introduces robust support for generating Software Bill of Materials (SBOM) either manually or automatically. This powerful feature enhances transparency and security by allowing users to view, download, and replicate SBOMs across different instances of Harbor.

For those handling massive concurrent pushes to a project, enabling the `Automatically generate SBOM on push` feature ensures smooth operation. Simply set `core.quotaUpdateProvider: redis` in `values.yaml` for Harbor-helm or `core.quota_update_provider: redis` in `harbor.yml` for Docker-compose installations. This tweak reduces overall resource consumption, optimizing database connections, CPU usage, and memory.
[Read more]()


### Supporting OCI Distribution Spec v1.1.0 🎉
In this release, Harbor proudly supports OCI Distribution Spec v1.1.0. This update ensures that Harbor stays at the forefront of container image distribution, providing users with the latest standards and functionalities for seamless container management.
[Read more](https://github.com/opencontainers/distribution-spec/tree/v1.1.0)

### Integration with VolcEngine Registry
One of the standout features in Harbor 2.11 is the seamless integration with VolcEngine Registry. Users can now effortlessly replicate images to and from the VolcEngine registry. This integration enhances interoperability and flexibility, allowing for a more versatile and dynamic Harbor ecosystem.

### Horbor는 한국 커뮤니티를 사랑합니다! - Korean UI Translation
In our commitment to inclusivity and accessibility, Harbor 2.11 introduces a Korean language translation for the user interface. This update ensures that Korean-speaking users can navigate and utilize Harbor more efficiently, making the platform more user-friendly and globally accessible.

## Enhancements 🚀

### Skip Transaction for POST /service/token
Performance improvements are always a priority. In Harbor 2.11, a significant enhancement is the ability to skip transactions for POST /service/token requests. Contributed by @liubin in #19339, this update streamlines token service operations, enhancing overall performance.

### Updated Internationalization: French (fr-fr)
Thanks to @tostt in #19915, Harbor's internationalization has been further refined with updates to the French (fr-fr) translations. This continuous improvement ensures that non-English speaking users have a smooth and coherent experience.

### Known Issue
It's worth noting a known issue affecting versions v2.10.x and v2.9.x. When performing pull-based replication from a GitLab registry to Harbor, users must be members of the source project in GitLab, even if it's a public project. This membership requirement is essential to perform the replication successfully.

## Docs update 🗄️
* Fix docker version to 20.10.10 by @YangJiao0817 in [19751](https://github.com/goharbor/harbor/pull/19751)
* revise the tags of Interrogation Services by @xuelichao in [20049](https://github.com/goharbor/harbor/pull/20049)
* Add two columns to display capability type for scanner by @xuelichao in [20111](https://github.com/goharbor/harbor/pull/20111)

Harbor 2.11 is a testament to our commitment to delivering cutting-edge features and enhancements to our users. From advanced SBOM management and OCI spec support to seamless VolcEngine integration and new language translations, this release has something for everyone. Upgrade today and experience the future of container registry management with Harbor 2.11!

Stay tuned for more updates and happy containerizing! 🚀

##  Contributors 👏

https://github.com/alrs
https://github.com/tpoxa
https://github.com/an-toine
https://github.com/liubin
https://github.com/blueswen
https://github.com/hasonhai
https://github.com/prima101112
https://github.com/stonezdj
https://github.com/wy65701436
https://github.com/tkatkov
https://github.com/LiuShuaiyi
https://github.com/tostt
https://github.com/zyyw
https://github.com/testwill
https://github.com/microyahoo
https://github.com/twhiteman
https://github.com/Iceber
https://github.com/eltociear
https://github.com/dependabot
https://github.com/AllForNothing
https://github.com/MinerYang
https://github.com/xuelichao
https://github.com/YangJiao0817
https://github.com/ShengqiWang
https://github.com/jm-nab
https://github.com/majorteach

This release wouldn't have been possible without the dedication and support of our growing community of contributors. Your efforts are invaluable!

For a detailed list of changes and updates, dive into the full release notes [here](r211).

Upgrade to Harbor [2.11](r211) today and experience the latest enhancements firsthand!

## Collaborate with the Harbor Community

Get updates on X(Twitter): [@project\_harbor](https://twitter.com/project_harbor)  
Chat with us on Slack: [#harbor](https://cloud-native.slack.com/messages/harbor)
and [#harbor-dev](https://cloud-native.slack.com/messages/harbor-dev)
on the[CNCF Slack](https://slack.cncf.io)  
Collaborate with us on [GitHub](https://github.com/goharbor/harbor)  
Attend the [community meetings](https://github.com/goharbor/community/wiki/Harbor-Community-Meetings)  

&nbsp;
&nbsp;

Orlin Vasilev  
Harbor Community/DevRel Lead  
GitHub: [@OrlinVasilev](https://github.com/OrlinVasilev)  
X(Twitter): [@OrlinVasilev](https://x.com/OrlinVasilev)  


[r211]: https://github.com/goharbor/harbor/releases/tag/v2.11.0
