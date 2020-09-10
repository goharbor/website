---
title: Preheat Images
weight: 30
---
{{< note >}}
Before you can preheat images, a system administrator must first configure a P2P provider instance. See more about [configuring P2P preheating in Harbor](../../administration/p2p-preheat/manage-preheat-providers.md).
{{< /note >}}

In Harbor the preheat action is policy driven, and is scoped to the project within which it's created. This means when a 
project administrator creates a preheat policy under a specified project, that policy only applies to images managed 
under that project.

## Create Preheat Policy

To preheat images, you need to create a preheat policy first.

1. Go to **Projects** and open your project from the project list.
1. Open the **P2P Preheat** tab and then click **+ NEW POLICY** button to open the policy creation dialog.
  ![policy creation dialog](../../../img/p2p-preheat/policy-creation-dialog.png)
1. For the **Provider**, select a pre-configured preheat provider instance as target from the dropdown list.
1. Input a suitable name and description(optional) for the policy to identify and describe your creating policy.
1. Set the repository filter(required) by following the [doublestar pattern](https://github.com/bmatcuk/doublestar#patterns).
1. Set the tags filter(required) by following the same [doublestar pattern](https://github.com/bmatcuk/doublestar#patterns).
1. Optionally, set the labels filter. Only images with matching labels will be put into the candidate list. Use comma 
to split multiple labels, e.g.: `label1`,`label2`,`labeln` and the relationship among multiple labels is **AND**.
1. Under certain conditions(deployment security is configured), more criteria may be visible in the policy.
   ![extra criteria](../../../img/p2p-preheat/more-criteria-in-policy.png)
    
   {{< note >}}
   The criteria **Only signed images** and **No vulnerability severity of [severity] and above** are directly inherited 
   from corresponding settings of the project configuration. They cannot be changed in the preheat policy, and the only 
   way to change them is via project configuration. If they're configured, they will be visible in the preheat policy 
   and taken into account when calculating the phreating candidates, otherwise, they will be hidden and no influences to the policy.
   {{< /note >}}
    
    - If a `Notary` server is installed and the **Deployment Security** configuration option **Enable content trust** is set, 
    **Only signed images** will also be available as a criteria for the preheating policy. This means that only images 
    with valid signatures will be preheated.
    - If a vulnerability scanner is configured and the **Deployment Security** configuration option 
**Prevent vulnerable images from pulling** is set, **No vulnerability severity of [severity] and above** 
will also be available as a preheating criteria. With this criteria, only the images whose vulnerability severity match the 
criteria can be taken into account.

1. For the policy **trigger**, there are multiple ways supported, choose the proper one based on your use case.
    - **Manual**: manually start the preheating process.
    - **Schedule**: set CRON style schedule to periodically start the preheating process.
      * some pre-defined cron schedule patterns are provided: `Hourly`,`Daily` and `Weekly`.
      * customize your own cron schedule by following the [cron guide](https://en.wikipedia.org/wiki/Cron)
        - e.g.: `*/15 0 * * *`, execute policy every 15 minutes at every midnight
    - **Event-based**: check if the image should be preheated when the related events occurred, the events includes:
      * **OnPush**: when the image has been pushed to Harbor
      * **OnScanComplete**: when the image has been scanned successfully (no action when scan failed)
      * **OnLabel**: when the image has been marked with labels (no action when a label is removed)
    
   {{< note >}}
   When an event occurs, the preheating process is not started immediately. Instead an evaluation process is launched. 
   The evaluation process will traverse the existing event-based preheat policies under the project where the target 
   image bound in the event is pushed. If the target image matches the pre-defined filters and criteria of some 
   event-based preheat policies, then the matched event-based preheat policies with fixed source image will be executed 
   to complete the preheating process.
   {{< /note >}}
    
1. Click **ADD** button to save the policy.

## Manage Preheat Policy

1. Go to **Projects** and open your project from the project list.
1. Open the **P2P Preheat** tab, all the existing preheat policies are listed in the datagrid view.
   ![preheat policy list](../../../img/p2p-preheat/policy-list.png)
1. Select the policy by checking the checkbox at front of the row, click **ACTIONS** to open the drop down menu.
1. Click **Execute** to start the execution of the selected policy immediately.
1. Click **Disable**/**Enable** to disable/enable the selected policy.
  
   {{< note >}}
   A disabled policy cannot bee executed.
   {{< /note >}}
  
1. Click **Edit** to open the edit dialog and do modifications to the selected policy.
1. Click **Delete** to delete the selected policy.
  
   {{< note >}}
   If the executions of the selected policy are still in progress, the deletion will be rejected.
   {{< /note >}}

## Manage Executions of Preheat Policy

1. Select the policy by clicking the radio button at the front of the row. If the policy has been executed before, the 
relevant executions will be listed in the execution data grid.
   ![policy execution](../../../img/p2p-preheat/policy-execution.png)
1. For each execution, you can find the following data:
    - ID: identity of the execution with a hyperlink pointing to the detailed page
    - Status: `Success`,`Error` and `Running`
    - Trigger: the trigger way of the execution, it can be `Manual`,`Scheduled` and `Event-based`
    - Start Time: the start time of the execution (rendered as local time format)
    - Duration: the overall duration of the execution
    - Success Rate: each execution may contain multiple tasks, the percent of the success ones over the total
    
   {{< note >}}
   For the `Error` status, there will be a small info icon with tooltip that containing the error message next to it.
   For the `Success` status, if there are no images matching the filters and criteria defined in the policy, a small 
   info icon with tooltip which indicates that no images to preheat will be placed next to it.
   {{< /note >}}
    
1. Click the ID hyperlink to open the detailed page of the execution.
   ![execution details](../../../img/p2p-preheat/execution-details.png)
  
   {{< note >}}
   An execution record may contain multiple preheating tasks because multiple images may meet the policy's criteria.
   {{< /note >}}
  
1.  Besides the general info, you can also find a simple metrics grouped by the status of tasks:
    - **SUCCESS**: how many tasks have been finished
    - **FAILURE**: how many tasks are failed to complete
    - **IN PROGRESS**: how many tasks are under running
    - **STOPPED**: how many tasks have been stopped
1. All the related tasks of the execution are listed in the task data grid. You can find more detailed info of the task:
    - **Artifact**: which artifact is preheating
    - **Status**: the status of this preheating task
    - **Digest**: the digest of the preheating image
    - **Type**: the artifact type of the preheating artifact
    - **Start Time**: the start time of this preheating task
    - **Duration**: the overall duration of this preheating task
    - **Logs**: a hyperlink to open the task logs for checking more details of this preheating task
    
   {{< note >}}
   Harbor only supports preheating images so the value of `Type` will always be `image`.
   {{< /note >}}
