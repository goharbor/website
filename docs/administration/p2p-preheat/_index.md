---
title: P2P Preheat
weight: 30
---
P2P preheating integrates key P2P distribution capabilities of CNCF projects like [Dragonfly](https://github.com/dragonflyoss/Dragonfly) (v1.0.5+)
and Uber [Kraken](https://github.com/uber/kraken) (v0.1.3+) into Harbor and allow users to define policies around this action.

Before preheating images from Harbor, you must first install a P2P engine in your environment. Refer to your P2P 
distribution engine's installation guide for specific configuration steps.

{{< note >}}
Due to the limitations of the Kraken preheat API, there are extra configurations steps needed. Follow the 
Kraken [configuration guide](https://github.com/uber/kraken/blob/master/docs/INTEGRATEWITHHARBOR.md) for more 
information on integrating Kraken and Harbor.
{{< /note >}}

The system admin can create P2P preheat provider instances by providing preheat API endpoint of the selected vendor 
(Dragonfly or Kraken) and related credential if necessary. The created preheat provider instances can be used across 
all the projects.

The project admin can create multiple preheat policies under the specified project by setting the resource filters and 
preheat criteria (including: content trust and vulnerability situation) and choosing the P2P preheat provider instance 
added by the system administrator. The preheating policy can be triggered to start by manual, on a scheduled basis, or event-based ways.
When the preheating policy is executing, all the images that match the criteria defined in the policy will be distributed to 
and cached in the target P2P engine for future pulling requests.

Harbor records each time a preheating policy is executed. You can check the details of preheating executions and the 
related logs from the Project's page.


