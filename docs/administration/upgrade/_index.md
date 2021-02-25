---
title: Upgrade Harbor and Migrate Data
weight: 45
---

This guide covers upgrade and migration to version 2.2.0. This guide only covers migration from v1.10.x and later to the current version. If you are upgrading from an earlier version, refer to the migration guide in the `release-1.10.0` branch to upgrade to v1.10.x first, then follow this guide to perform the migration to this version.

If you are upgrading a Harbor instance that you deployed with Helm, see [Upgrading Harbor Deployed with Helm](helm-upgrade.md).

When upgrading an existing Harbor instance to a newer version, you might need to migrate the settings in `harbor.yml`.
Since the migration might alter the database schema and the settings of `harbor.yml`, you should **always** back up your data before any migration.

## Important Upgrade Notes

- Again, you MUST backup your data before any data migration.
- In version 1.10.0, some containers are started by `non-root`. This does not pose problems if you are upgrading an officially released version of Harbor, but if you have deployed a customized instance of Harbor, you might encounter permission issues.
- In v2.0 the metadata of artifacts are stored in database, when Harbor is started for the first time after the upgrade it will walkthrough the artifacts in registry storage to extract metadata of the artifacts into database.  This process may take relatively long time if there are large number of artifacts in the registry, especially when registry is configured to use external storage like S3.  During this process the Harbor API will not be responsive please check the log of `harbor-core` and `registry` to monitor the process.
- Harbor v2.2 vulnerability scanning changes
  - Clair was removed as a default scanner. If you upgrade with Clair as your default scanner, you will no longer be able to run vulnerability scans until a new scanner is installed. It's recommended that you use Trivy as your default scanner or add Clair as an [external scanner](../vulnerability-scanning/pluggable-scanners.md) after upgrade.
  - Updates were made to the vulnerability database scheme which require you to rescan all images after upgrade. Scan reports from before the upgrade are preserved, but will not be visible to you until you scan all images again. For more information, read how to [Scan All Artifacts](../vulnerability-scanning/scan-all-artifacts/).

## Upgrading Harbor and Migrating Data

1. Log in to the Harbor host and, if it is still running, stop and remove the existing Harbor instance.

    ```sh
    cd harbor
    docker-compose down
    ```

1. Back up Harbor's current files so that you can roll back to the current version if necessary.

    ```sh
    mv harbor /my_backup_dir/harbor
    ```

1. Back up the database, which by default is in the directory `/data/database`.

    ```sh
    cp -r /data/database /my_backup_dir/
    ```

1. Get the latest Harbor release package from [https://github.com/goharbor/harbor/releases](https://github.com/goharbor/harbor/releases).
1. Before upgrading Harbor, perform migration.

    The migration tool is in harbor-prepare tools delivered as a docker image. You can pull the image from docker hub. in the following command:

    ```sh
    docker pull goharbor/prepare:[tag]
    ```

    Alternatively, if you are using an offline installer package, you can load it from the image tarball that is included in the offline installer package. Replace [tag] with the new Harbor version, for example v1.10.0, in the following command:

    ```sh
    tar zxf <offline package>
    docker image load -i harbor/harbor.[version].tar.gz
    ```

1. Copy the `/path/to/old/harbor.yml` to `harbor.yml` and upgrade it.

    ```sh
    docker run -it --rm -v /:/hostfs goharbor/prepare:[tag] migrate -i ${path to harbor.yml}
    ```

    **NOTE:** The schema upgrade and data migration of the database is performed by core when Harbor starts. If the migration fails, check the core log to debug.

3. In the `./harbor` directory, run the `./install.sh` script to install the new Harbor instance.

   To install Harbor with components such as Notary and chartmuseum, see [Run the Installer Script](../../install-config/run-installer-script.md) for more information.

If you need to roll back to the previous version of Harbor, see [Roll Back from an Upgrade](roll-back-upgrade.md).
