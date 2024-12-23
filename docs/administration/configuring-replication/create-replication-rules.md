---
title: Creating a Replication Rule
weight: 25
---

A replication endpoint must exist before you create a replication rule. To create an endpoint, follow the instructions in [Creating Replication Endpoints](create-replication-endpoints.md).

{{< note >}}
Because of major API changes in the v2.0 release to support [OCI](https://github.com/opencontainers/distribution-spec).
You **can not** replicate from Harbor v1.x to v2.0 and later, and you **can not** replicate artifacts with **manifest list** from v2.0 and later to v1.x.
{{< /note >}}

1. Log in to the Harbor interface with an account that has Harbor system administrator privileges.
1. Expand **Administration**, and select **Replications**.

   ![Add a replication rule](../../../img/replication-rule1.png)
1. Click **New Replication Rule**.
1. Provide a name and description for the replication rule.
1. Select **Push-based** or **Pull-based** replication, depending on whether you want to replicate artifacts to or from the remote registry.

   ![Replication mode](../../../img/replication-rule2.png)
1. If you are creating a Pull-based rule, use the **Soure Registry** drop-down menu to select from the configured replication endpoints.
1. For **Source resource filter**, identify the artifacts to replicate.  

   ![Replication filters](../../../img/replication-rule3.png)

   * **Name**: Replicate resources with a given name by entering an artifact name or fragment.
   * **Tag**: Replicate resources with a given tag by entering a tag name or fragment. You can also specify matching/excluding for this filter.
   * **Label**: Replicate resources with a given label by using the drop-down menu to select from the available labels. You can also specify matching/excluding for this filter.
   * **Resource**: Replicate images, artifacts or all. Artifacts contain images and other OCI compatible resources.

   The name filter and tag filters support the following patterns:

   * **\***: Matches any sequence of non-separator characters `/`.
   * **\*\***: Matches any sequence of characters, including path separators `/`. Note that the doublestar must appear as a path component by itself. A pattern such as /path\*\* is invalid and will be treated the same as /path*, but /path\*/\*\* should achieve the desired result.
   * **?**: Matches any single non-separator character `/`.
   * **{alt1,...}**: Matches a sequence of characters if one of the comma-separated alternatives matches.

   **NOTE:** You must add `library` if you want to replicate the official artifacts of Docker Hub. For example, `library/hello-world` matches the official hello-world artifacts.  

   Pattern | String(Match or not)
   ---------- | -------
   `library/*`      | `library/hello-world`(Y)<br> `library/my/hello-world`(N)
   `library/**`     | `library/hello-world`(Y)<br> `library/my/hello-world`(Y)
   `{library,goharbor}/**` | `library/hello-world`(Y)<br> `goharbor/harbor-core`(Y)<br> `google/hello-world`(N)
   `1.?`      | `1.0`(Y)<br> `1.01`(N)
1. If you are creating a Push-based replication rule, use the **Destination Registry** drop-down menu to select from the configured replication endpoints.
1. For **Destination Namespace**, enter the name of the namespace in which to replicate resources in the  text box. If you do not enter a namespace, resources are placed in the same namespace as in the source registry.

1. Use the Destination Flattening drop-down to select how you want Harbor treat to image hierarchy when replicating images. Depending on what you select, Harbor will remove the same number of levels from the image's hierarchy, starting from the left, when replicating an image into your chosen destination namespace.

    * **Flatten All Levels**: Remove all hierarchy from the replicated image. For example, `a/b/c/d/img` replicates to `namespace/img`. This is the default behavior of replication in v2.2 and before. All replication rules created before upgrading to v2.3.0 will default to using this flattening option after upgrade.
    * **No Flattening**: Use the same hierarchy when replicating an image. For example, `a/b/c/d/img` replicates to `namespace/a/b/c/d/img`.
    * **Flattening 1 level**: Remove one level from the image hierarchy. For example, `a/b/c/d/img` replicates to `namespace/b/c/d/img`. This is the default selection.
    * **Flattening 2 levels**: Remove two levels from the image hierarchy. For example, `a/b/c/d/img` replicates to `namespace/c/d/img`
    * **Flattening 3 levels**: Remove three levels from the image hierarchy. For example, `a/b/c/d/img` replicates to `namespace/d/img`
   

1. Use the Trigger Mode drop-down menu to select how and when to run the rule.
   * **Manual**: Replicate the resources manually when needed. **Note**: Deletion operations are not replicated.
   * **Scheduled**: Replicate the resources periodically by defining a cron job. **Note**: Deletion operations are not replicated.
   * **Event Based**: When a new resource is pushed to the project, or an artifact is retagged, it is replicated to the remote registry immediately. If you select the **Delete remote resources when locally deleted**, if you delete an artifact, it is automatically deleted from the replication target.

   {{< note >}}
   You can filter artifacts for replication based on the labels that are applied to the artifacts. However, changing a label on an artifact does not trigger replication. Event-based replication is limited to pushing, retagging, and deleting artifacts.
   {{< /note >}}

   ![Trigger mode](../../../img/replication-rule5.png)
1. Optionally set the maximum network bandwidth for each replication task, please pay attention to the number of concurrent executions, the default value is 10 for each job-service pod. The unit is kilo bytes per second, and -1 stands for unlimited bandwidth. 

   ![Bandwidth](../../../img/replication-rule7.png)

   {{< note >}}
   There's a known issue [15708](https://github.com/goharbor/harbor/issues/15708), that if you limit the bandwidth too slow, and stop the replication job, it may take quite a long time to really release the job worker to run a new job.
   {{< /note >}}
1. Optionally select the Override checkbox to force replicated resources to replace resources at the destination with the same name.

   ![Override](../../../img/replication-rule8.png)
1. Optionally select the Copy by chunk checkbox to enable the artifact blobs copied by chunks, currently only supported for source and destination registry are both harbor, but you can enable this by calling harbor API manually for other type registries.
   ![Copy by chunk](../../../img/replication-rule9.png)

   {{< note >}}
   Copy by chunk has not been verified officially between harbor and other type registries. The default chunk size is 10MB, you can override it by setting env `REPLICATION_CHUNK_SIZE` in the jobservice, the value should be united as bytes, for example `10MB=1024*1024*10` then you should set `REPLICATION_CHUNK_SIZE=10485760`.
   {{< /note >}}
1. Click **Save** to create the replication rule.

## What to Do Next

After you create a replication rule, see [Running Replication Manually](manage-replications.md).
