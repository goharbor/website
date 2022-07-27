---
title: Backup And Restore Harbor With Velero  
weight: 50
---

Backup and restore is important for the disaster recovery and data migration. With [Velero](https://velero.io/) the administrator can back up and restore Harbor instances without completed shutdown.  

About the basic concepts of Velero, please refer to the official documentation [How Velero Works](https://velero.io/docs/v1.9/how-velero-works/).

Please note that:
* This section only covers the Harbor instances deployed in Kubernetes cluster by Harbor helm chart
* For simplicity, we only back up a subset of Harbor's resources and data:
  * All Harbor related Kubernetes resources(deployments, statefulsets, services, configmaps, etc.)
  * Data in the PersistentVolumes of internal database, registry, chartmuseum, jobservice and Trivy. We don't back up the data of Redis, see the [Limitations](#limitations) part for more details of the impact
* The backup is crash consistent, not application consistent, some data will lose after restore, see the [Limitations](#limitations) part for more information

## Install Velero
Install Velero CLI and server according to the [official documentation](https://velero.io/docs/v1.9/basic-install/).

**Note**: Depending on the data size, you may need to increase the CPU or memory resources available to Velero, especially if you are using Restic. Refer to the [doc](https://velero.io/docs/v1.9/customize-installation/#customize-resource-requests-and-limits) for more information.

## Backup Harbor Instance
### Set Harbor to ReadOnly
1. Log in to the Harbor portal with an account that has Harbor system administrator privileges.
1. Expand **Administration**, and select **Configuration**.
1. Select the **System Settings** tab.

   ![Set read only](../../img/set-read-only.png)

1. Select the check box **Repository Read Only** and click the **Save** button to save the configurations.

### Backup Harbor Instance
According to the capability of the platform where Harbor is deployed, you can choose back up the PersistentVolumes with Snapshot or Restic:
* Snapshot  
  If you want to use snapshot to back up the PersistentVolumes, make sure there is a corresponding plugin for your Kubernetes provider. Check the [list](https://velero.io/docs/v1.9/supported-providers/) to find the supported providers.
  1. In order to exclude the volume of Redis in backup, we need to label the Redis pod, PVC and PV with specific label:
     ```shell
      # label the Pod of Redis, replace the namespace and Pod name with yours
      kubectl -n harbor label pod/harbor-redis-0 velero.io/exclude-from-backup=true 
      # label the PVC of Redis, replace the namespace and PVC name with yours
      kubectl -n harbor label pvc/data-harbor-redis-0 velero.io/exclude-from-backup=true
      # get the name of Redis PV, replace the namespace and PVC name with yours 
      kubectl -n harbor get pvc data-harbor-redis-0 --template={{.spec.volumeName}}
      # label the PV of Redis, replace the pv-name with the one get from last command
      kubectl label pv/pv-name velero.io/exclude-from-backup=true
     ```
  1. Back up Harbor
      ```shell
      # replace the namespace and backup name with yours
      velero backup create harbor-backup --include-namespaces harbor --snapshot-volumes --wait
      ```
  
* Restic  
  In the case you want to take volume snapshots but didn’t find a plugin for your provider, Velero has support for snapshotting using restic, but please note the [limitations](https://velero.io/docs/v1.9/restic/#limitations).
  1. Exclude the volume of Redis in backup
      ```shell
      # replace the namespace and pod name with yours
      kubectl -n harbor annotate pod/harbor-redis-0 backup.velero.io/backup-volumes-excludes=data
      ```
  1. Back up Harbor
      ```shell
      # replace the namespace and backup name with yours
      velero backup create harbor-backup --include-namespaces harbor --default-volumes-to-restic --wait
      ```

### Unset ReadOnly
Follow the same steps in [Set Harbor to ReadOnly](#set-harbor-to-readonly), uncheck the **Repository Read Only** check box and click the **Save** button to save the configurations.

## Restore Harbor Instance
### Restore from the Backup
```shell
# replace the backup and restore names with yours
velero restore create harbor-restore --from-backup harbor-backup --wait
```

### Unset ReadOnly
As we set Harbor to ReadOnly when doing the backup, the instance is still in ReadOnly mode after the restoring, follow [Unset ReadOnly](#unset-readonly) to unset ReadOnly.


## Troubleshooting
If you get any issue during the backing up and restoring, please refer to the [troubleshooting](https://velero.io/docs/v1.9/troubleshooting/) documentation.

## Limitations
* **The upload purging process may cause backup failure**  
  A purging process starts in the `registry` pod by default, it removes the unused files under the upload directory periodically and cannot be disabled without restarting. This may impact the backup when using Restic and cause failures.  
  It's better to increase the [interval](https://github.com/goharbor/harbor-helm/blob/v1.9.2/values.yaml#L581) of the purging operation(the default value is 168h) and do the backup in the middle of two rounds of purging to avoid files removing.
* **The data in memory will lose during the backup**  
  Currently the repository pulls and artifact pull time are put in the memory and synced into the database periodically. So when doing the backup, the data that isn't synced will lose, but this is low impact. 
* **Tasks may hang in in-progress status**  
  Tasks(replication/garbage collection/scan/etc.) may hang in in-progress status after restore, stop them on the portal can workaround it.
* **Sessions of logged users will lose after restore**  
  As we don't back up the persistent volume of Redis, the sessions of logged used will lose after restore.
* **Don't support external database**  
  Only support back up the internal database at this moment.

