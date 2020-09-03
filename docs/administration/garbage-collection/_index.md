---
title: Garbage Collection
weight: 40
---

When you delete images from Harbor, space is not automatically freed up. You must run garbage collection to free up space by removing blobs that are no longer referenced by a manifest from the file system.  

## Run Garbage Collection

1. Log in to the Harbor interface with an account that has Harbor system administrator privileges.
1. Expand **Administration**, and select **Garbage Collection**. 
1. Select the **'Garbage Collection'** tab.

    ![Garbage collection](../../img/garbage-collection.png)

1. To delete untagged artifacts, select the check box **Delete Untagged Artifacts**.
1. To dry run garbage collection, click **DRY RUN**. 
1. To run garbage collection immediately, click **GC Now**.

As of v2.1.0, Harbor runs garbage collection uninterrupted so users can continue pushing, pulling, deleting artifacts.

**DRY RUN** prints the blobs eligible for deletion, a rough estimation of free up space without removing any data. 

To avoid damaging the uploading artifact, the garbage collection introduces a time windows(2 hours) to reserve the recent uploaded layers. Garbage collection does not sweep the manifest & blob files that have a timestamp in the time window.

To avoid triggering the garbage collection process too frequently, the availability of the **GC Now** button is restricted. Garbage collection can be only run once per minute.

## Schedule Garbage Collection

1. Expand **Administration**, and select **Garbage Collection**. 
1. Select the **'Garbage Collection'** tab.
1. Use the drop down-menu to select how often to run garbage collection.

    ![Schedule garbage collection](../../img/gc-policy.png)

    * **None**: No garbage collection is scheduled.
    * **Hourly**: Run garbage collection at the beginning of every hour.
    * **Daily**: Run garbage collection at midnight every day.
    * **Weekly**: Run garbage collection at midnight every Saturday.
    * **Custom**: Run garbage collection according to a `cron` job.
    
1. To delete untagged artifacts, select the check box **Delete Untagged Artifacts**.     
1. Click **Save**.
1. Select the **History** tab to view records of the 10 most recent garbage collection runs.

    ![Garbage collection history](../../img/gc-history.png)

1. Click on the **Logs** link to view the related logs.
