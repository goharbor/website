---
title: Manage Preheat Provider Instances
weight: 20
---

{{< note >}}
To create and manage the P2P preheat provider instances, you must be a system administrator.
{{< /note >}}

## Create Preheat Provider Instance

To preheat images, you need to create preheat provider instances first.

1. Go to **Distributions** item under **Administration** and click **+NEW INSTANCE** to open the creation dialog.

    ![creation dialog](../../../img/p2p-preheat/creation-dialog.png)

1. For the **Provider**, select **Dragonfly** or **Kraken** based on the target P2P environment.
1. Enter a proper name and description (optional) for the new P2P provider instance.
1. Input the preheating API endpoint of the target P2P provider.
    e.g.: http://my-provider.com or http://my-provider.com:8002
1. Select the proper **Auth Mode** based on the target P2P provider configuration and, if required, input the necessary access credentials. 
The following modes are supported:
So far, the following modes are supported:
    - **NONE**: no authentication needed.
    - **Basic**: HTTP basic authentication mode, **Username** and **Password** are required.
    - **OAuth**: OAuth bearer token mode, bearer **Token** is required.
1. Check or uncheck the **Enable** checkbox to enable/deactivate the instance after creation.
1. Optionally, select the **Skip certificate verification** check box.

   Select the check box if the preheat provider instance uses a self-signed or untrusted certificate.
1. Click **TEST CONNECTION** button to test the connectivity of the creating instance.
1. If the connectivity testing is successful, click **OK** button to save the creating instance.

## Manage Preheat Provider Instances

The existing configured preheat provider instances are listed in the datagrid view.

{{< note >}}
The healthy status of the managed provider instances are also shown in the view. If the connectivity of the provider 
instance is ok, the status column will be marked with **Healthy** in a green box. 
{{< /note >}}

  ![provider instances](../../../img/p2p-preheat/provider-instances.png)

Select the provider instance by checking the checkbox at front of the row, click **ACTIONS** to open the drop down menu.

  ![actions](../../../img/p2p-preheat/actions.png)

1. Click **Edit** to open the edit dialog to do modifications to the selected provider instance.
1. Click **Enable**/**Deactivate** to enable/deactivate the selected provider instance if it is disabled/deactivated.
3. Click **Delete** to delete the selected provider instance.

{{< note >}}
Only P2P provider instances which are not referenced by any preheat policies can be deleted. Delete all the related 
preheat policies and then try deleting again. 
{{< /note >}}

## What to Do Next

After adding preheat provider instances, now you can go to your project to create preheat policies to [preheat images](../../working-with-projects/working-with-images/preheat-images.md).
