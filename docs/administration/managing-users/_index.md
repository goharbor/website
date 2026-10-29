---
title: Managing Users
weight: 15
---

Harbor manages images through projects. You provide access to these images to users by including the users in projects and assigning one of the following roles to them.

![RBAC](../../img/rbac.png)

* **Limited Guest**: A Limited Guest does not have full read privileges for a project. They can pull images but cannot push, and they cannot see logs or the other members of a project. For example, you can create limited guests for users from different organizations who share access to a project.
* **Guest**: Guest has read-only privilege for a specified project. They can pull and retag images, but cannot push.
* **Developer**: Developer has read and write privileges for a project.
* **Maintainer**: Maintainer has elevated permissions beyond those of 'Developer' including the ability to scan images, view replications jobs, and delete images and helm charts.
* **ProjectAdmin**: When creating a new project, you will be assigned the "ProjectAdmin" role to the project. Besides read-write privileges, the "ProjectAdmin" also has some management privileges, such as adding and removing members, starting a vulnerability scan.

Besides the above roles, there are two system-level roles:

* **Harbor system administrator**: "Harbor system administrator" has the most privileges. In addition to the privileges mentioned above, "Harbor system administrator" can also list all projects, set an ordinary user as administrator, delete users and set vulnerability scan policy for all images. The public project "library" is also owned by the administrator.
* **Anonymous**: When a user is not logged in, the user is considered as an "Anonymous" user. An anonymous user has no access to private projects and has read-only access to public projects.

For full details of the permissions of the different roles, see [User Permissions By Role](user-permissions-by-role.md).

If you run Harbor in database authentication mode, you create user accounts directly in the Harbor interface. For information about how to create local user accounts, see [Create User Accounts in Database Mode](create-users-db.md).

If you run Harbor in LDAP/AD or OIDC authentication mode, you create and manage user accounts in your LDAP/AD or OIDC provider. Harbor obtains the users from the LDAP/AD or OIDC server and displays them in the **Users** tab of the Harbor interface.

## Assigning the Harbor System Administrator Role

Harbor system administrators can assign the Harbor system administrator role to other users by selecting usernames and clicking **Set as Administrator** in the **Users** tab.

![browse project](../../img/new-set-admin-remove-user.png)

To delete users, select a user and click `DELETE`. When deleting the user, its privilege will be removed. for LDAP/AD or OIDC authentication mode, it just delete the user data in Harbor, not in the LDAP/AD or OIDC.

## Deleting Users in Compliance with GDPR

By default, Harbor does not remove a deleted user from its database. It marks the user as deleted and appends `#<user_id>` to the username and email address, so the original values remain readable in the database and in the audit log. If you need to remove this personal data, for example to comply with the General Data Protection Regulation (GDPR), you can enable the following settings. Both settings are disabled by default and can be enabled independently of each other.

| Environment variable | Helm chart value | Description |
| -------------------- | ---------------- | ----------- |
| `GDPR_DELETE_USER` | `core.gdpr.deleteUser` | When a user is deleted, Harbor replaces the username, email address and full name of the user with the CRC32 checksum of each value, followed by `#<user_id>`. |
| `GDPR_AUDIT_LOGS` | `core.gdpr.auditLogsCompliant` | When a user is deleted, Harbor starts a job that replaces the username in all of the audit log entries of that user with the CRC32 checksum of the username. This applies to both the **Audit Logs** and **Audit Logs(Legacy)** tabs. |

These settings cannot be changed in the Harbor interface or with the `/api/v2.0/configurations` API. They are read from the environment of the `core` container when it starts:

- If you deployed Harbor with the Harbor Helm chart, set `core.gdpr.deleteUser`, `core.gdpr.auditLogsCompliant`, or both to `true` in your `values.yaml` file and upgrade the release.
- If you deployed Harbor with the installer, add `GDPR_DELETE_USER=true`, `GDPR_AUDIT_LOGS=true`, or both to the `common/config/core/env` file in the installation directory and run `docker compose up -d --force-recreate core`. The `prepare` script regenerates this file, so add the variables again every time you run `prepare` or `install.sh`.

The settings only apply to users that are deleted after they are enabled. Users and audit log entries of users that were deleted before are not changed.
