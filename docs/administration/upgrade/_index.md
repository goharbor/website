---
title: Upgrade Harbor and Migrate Data
weight: 45
---

This guide covers upgrade and migration to v2.14.0. This guide only covers migration from v2.11.0 and later to the current version. If you are upgrading from an earlier version, refer to the migration guide for an earlier Harbor version.

* [Upgrade to Harbor v2.12.0](/docs/2.12.0/administration/upgrade/)
* [Upgrade to Harbor v2.11.0](/docs/2.11.0/administration/upgrade/)
* [Upgrade to Harbor v2.10.0](/docs/2.10.0/administration/upgrade/)
* [Upgrade to Harbor v2.9.0](/docs/2.9.0/administration/upgrade/)
* [Upgrade to Harbor v2.8.0](/docs/2.8.0/administration/upgrade/)
* [Upgrade to Harbor v2.7.0](/docs/2.7.0/administration/upgrade/)
* [Upgrade to Harbor v2.6.0](/docs/2.6.0/administration/upgrade/)
* [Upgrade to Harbor v2.5.0](/docs/2.5.0/administration/upgrade/)
* [Upgrade to Harbor v2.4.0](/docs/2.4.0/administration/upgrade/)
* [Upgrade to Harbor v2.3.0](/docs/2.3.0/administration/upgrade/)



If you are upgrading a Harbor instance that you deployed with Helm, see [Upgrading Harbor Deployed with Helm](helm-upgrade.md).

When upgrading an existing Harbor instance to a newer version, you might need to migrate the settings in `harbor.yml`.
Since the migration might alter the database schema and the settings of `harbor.yml`, you should **always** back up your data before any migration.

## Important Upgrade Notes

- Again, you MUST backup your data before any data migration.
- In Harbor v2.9, if you are using an external database, make sure the version of PostgreSQL >= 12.

## Upgrading Harbor and Migrating Data

1. Log in to the Harbor host and, if it is still running, stop and remove the existing Harbor instance.

    ```sh
    cd harbor
    docker compose down
    ```

1. Back up Harbor's current files so that you can roll back to the current version if necessary.

    ```sh
    mv harbor /my_backup_dir/harbor
    ```

1. Back up the database, which by default is in the directory `/data/database`.

    ```sh
    cp -r /data/database /my_backup_dir/
    ```

1. Get the latest Harbor release package from [https://github.com/goharbor/harbor/releases](https://github.com/goharbor/harbor/releases) and extract it.

   For more information see [Download the Harbor Installer](../../install-config/download-installer.md).

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

1. In the `./harbor` directory, run the `./install.sh` script to install the new Harbor instance.

   To install Harbor with Trivy, see [Run the Installer Script](../../install-config/run-installer-script.md) for more information.

If you need to roll back to the previous version of Harbor, see [Roll Back from an Upgrade](roll-back-upgrade.md).
