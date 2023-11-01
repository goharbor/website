---
title: "Harbor v2.8 release - The KubeCon Release - Amsterdam"
author:
  name: "Orlin Vasilev"
date: 2023-04-17T06:00:00+01:00
draft: false
showPageInfo: true
---

# Harbor 2.8 - The KubeCon+CloudNativeCon Release
![KCCNC](../img/blog-2.8/kccnc-eu-2023-color.png)

#### As this week in Amsterdam will be packed of breaking news, nice surprises, meetings, new ideas etc... why not to kick off the week properly right?!  

##### Introducing [Harbor 2.8][r28] - The KubeCon release! 

This release comes with several new features and improvements, including support for the OCI Distribution Specification v1.1.0, which provides enhanced support for multi-architecture images and image manifests. Another major addition is reworked Webhooks and added support for sending  payloads with CloudEvents format, which provides a standardised way of sending event notifications across different services. [The 2.8 release][r28] also includes an improved Jobservice Dashboard, providing more comprehensive and detailed information about long running jobs. Also we have introduces some significant changes as the removal of ChartMuseum and starting deprecation process of Notary from [2.8 release][r28].

### We are at KubeCon+CloudNativeCon [check our agenda](https://goharbor.io/blog/harbor-at-kubecon-amsterdam-2023/)  

## New features
### [OCI Distribution Spec v1.1.0-rc1 Support](https://github.com/opencontainers/image-spec/releases/tag/v1.1.0-rc1)

The latest Harbor release now supports the OCI Distribution Spec v1.1.0-rc1. This is a significant upgrade that allows users to store and distribute OCI and Docker images. With this feature, users can manage their images more effectively and efficiently.

https://github.com/goharbor/harbor/pull/18324  
https://github.com/goharbor/harbor/pull/18369  
https://github.com/goharbor/harbor/pull/18394  

### Webhook Payloads with CloudEvents Format Support
Harbor now supports sending [webhook](https://goharbor.io/docs/main/working-with-projects/project-configuration/configure-webhooks/) payloads with [CloudEvents](https://cloudevents.io) format. This functionality has undergone significant improvements, aimed at delivering enhanced management and debugging capabilities. With the addition of CloudEvents format support, users can easily integrate with other systems and services.

![Webhook-cloudevents](../img/blog-2.8/wh-cloudevents.jpg)

https://github.com/goharbor/harbor/pull/18255  
https://github.com/goharbor/harbor/pull/18291  
https://github.com/goharbor/harbor/pull/18322  

### JobService Dashboard Phase 2
[Jobservice Dashboard](https://goharbor.io/docs/main/administration/jobservice-dashboard/) now provides real-time visibility into the progress and status of running jobs. The latest update allows users to display logs for running tasks and clean up expired running executions automatically. This feature provides users with better job management capabilities.
Displaying logs for running tasks, which provides users with real-time visibility into the progress and status of their running jobs. 
Cleanup expired running executions, which helps users to automatically cleaning unfinished or expired executions.  
![Jobservice](../img/blog-2.8/jobservice.jpg)
https://github.com/goharbor/harbor/pull/18261  
https://github.com/goharbor/harbor/pull/18272  


### Skip Update Pull Time for Scanner
Allows users to skip the automatic update on pull time that performed by a scanner during a scan task this feature provides users with more flexibility and control over the scanning process and usage of retention policies.
![skip](../img/blog-2.8/skip-pull-time.png)

https://github.com/goharbor/harbor/pull/18214  
https://github.com/goharbor/harbor/pull/17807  

### Identity Provider as the Primary Auth Method
The latest Harbor release now allows the Identity Provider to be the primary auth method in Harbor. This feature provides users with better authentication and authorization capabilities.  

<div class="container">
  <div id="player-wrapper" class="my-5"></div>
</div>

<script 
  type="text/javascript" 
  src="https://cdn.jsdelivr.net/npm/@clappr/player@latest/dist/clappr.min.js"
>
</script>

<script>
  var playerElement = document.getElementById("player-wrapper");

  var player = new Clappr.Player({
    source: "../img/blog-2.8/auth.mp4",
    mute: true,
    height: 360,
    width: 640
  });

  player.attachTo(playerElement);  
</script>
Thanks to [Vadim Bauer](https://twitter.com/vad1mo) for the demo!

https://github.com/goharbor/harbor/pull/17627

## Removal of ChartMuseum
Starting with version v2.8.0, Harbor no longer includes ChartMuseum in either the user interface or the backend, Harbor can serve OCI Helm Charts!

## Deprecation of Notary
Starting in Harbor 2.6 was decided to deprecate Notary you can check this [discussion](https://github.com/goharbor/harbor/discussions/16612). Workflows and pipelines needs to be migrated to [cosign as of Harbor 2.5](https://goharbor.io/blog/cosign-2.5.0/)

### Other Enhancements and Updates
Improved Clarity components with i18n support  
French translation improvements  
Next scheduled time for tag retention  
Support for VPC and internal network  
Artifact list accessory recursion support  
Editable label filter for replication rule  
New app level warning message  
Styles updates for UI according to the designer's suggestions  
Trivy and golang version upgrades  


##### If you're Harbor user and want to share any feedback, we'd love to hear from you [here](https://github.com/goharbor/community/issues/115)!

## Contributions to v2.8
# **Huge shout-out**
to the maintainer team, our contributors & everyone in the
community who helped the project realize its level of adoption today !!
The project would not be where it is today without the community


We also want to thank the following users for their sustained
contributions to the project!

Thank you to all who contributed to 2.8 [full release notes here][r28]


### Special thank you to all new contributors:
* @Iceber made their first contribution in [#17915](https://github.com/goharbor/harbor/pull/17915)
* @mr-002 made their first contribution in [#15916](https://github.com/goharbor/harbor/pull/15916)
* @czenker made their first contribution in [#17986](https://github.com/goharbor/harbor/pull/17986)
* @asta1992 made their first contribution in [#18009](https://github.com/goharbor/harbor/pull/18009)
* @0xC0ncord made their first contribution in [#17916](https://github.com/goharbor/harbor/pull/17916)
* @al-cheb made their first contribution in [#18023](https://github.com/goharbor/harbor/pull/18023)
* @CoderTH made their first contribution in [#18057](https://github.com/goharbor/harbor/pull/18057)
* @ctrlaltdel made their first contribution in [#18111](https://github.com/goharbor/harbor/pull/18111)
* @Fish-pro made their first contribution in [#18113](https://github.com/goharbor/harbor/pull/18113)
* @caleblloyd made their first contribution in [#17932](https://github.com/goharbor/harbor/pull/17932)
* @okin made their first contribution in [#18205](https://github.com/goharbor/harbor/pull/18205)
* @hyeyoung-leee made their first contribution in [#18106](https://github.com/goharbor/harbor/pull/18106)
* @Nageshbansal made their first contribution in [#18180](https://github.com/goharbor/harbor/pull/18180)
* @szyhf made their first contribution in [#17489](https://github.com/goharbor/harbor/pull/17489)
* @thcdrt made their first contribution in [#18289](https://github.com/goharbor/harbor/pull/18289)
* @WilfredAlmeida made their first contribution in [#18362](https://github.com/goharbor/harbor/pull/18362)
* @balonik made their first contribution in [#14615](https://github.com/goharbor/harbor/pull/14615)
* @akshatdalton made their first contribution in [#18271](https://github.com/goharbor/harbor/pull/18271)

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
Harbor Community/DevRel  
GitHub: [@OrlinVasilev](https://github.com/OrlinVasilev)  
Twitter: [@OrlinVasilev](https://twitter.com/OrlinVasilev)


[r28]: https://github.com/goharbor/harbor/releases/tag/v2.8.0
