---
title: Manage Custom Project Roles
weight: 18
---

Starting with Harbor v2.16.0, system administrators can create custom project roles with a combination of permissions that fits their organization's workflows. Custom roles supplement the five built-in project roles: Project Admin, Maintainer, Developer, Guest, and Limited Guest.

For example, you can create a role for users who need to pull and push artifacts without granting them permission to delete artifacts or manage project members.

## Role Scope and Administration

A custom role is defined once for the Harbor instance and can be reused in multiple projects. The role takes effect for a user or group only when it is assigned to that user or group in a project. Assigning a role in one project does not grant access to other projects.

- Only Harbor system administrators can create, edit, or delete custom role definitions.
- Project administrators and users with the required project member permissions can assign custom roles to users and groups through the project's **Members** tab. For instructions, see [Assign Users to a Project](../../working-with-projects/create-projects/add-users.md).
- Permissions apply at the project level. Custom roles do not provide separate permission assignments for individual repositories within a project.
- Built-in roles cannot be edited or deleted. Create a custom role if you need a different combination of permissions.
- Custom roles are assigned to users and groups. Robot accounts continue to use their own directly assigned permissions. See [System Robot Accounts](../robot-accounts/) and [Project Robot Accounts](../../working-with-projects/project-configuration/create-robot-accounts.md).

## View Roles

1. Log in to the Harbor interface with an account that has Harbor system administrator privileges.
1. In the sidebar, select **Administration** > **Roles**.

The page lists built-in and custom roles. For each role, you can view its ID, name, description, creator, creation time, and last modification time. The **Built-in** column identifies built-in roles.

To view a role's permissions, click its permission count in the **Permissions** column. You can search for roles by name.

## Create a Custom Role

1. On the **Roles** page, click **New Role**.
1. In **Basic Information**, enter a unique name and an optional description.

   The name is required, must be no longer than 255 characters, and cannot contain the `+` character.

1. Click **Next** to open **Select Permissions**.
1. Select the permissions to grant to the role. Each checkbox represents an action on a resource, such as **Pull** on **Repository**. Select at least one permission.

   You can use **Select All** or **Unselect All** to select or clear all available permissions.

   {{< note >}}
   To allow users to push artifacts, select both **Push** and **Pull** for **Repository**. Push permission requires pull permission.
   {{< /note >}}

1. Click **Finish**.

The new role appears on the **Roles** page. Creating the role does not assign it to any project members. Assign it to a user or group in each project where it is needed, following the [project membership instructions](../../working-with-projects/create-projects/add-users.md).

### Example: Allow Pulling and Pushing Artifacts

To create a role for users who need to download and upload artifacts:

1. Create a custom role named `Artifact Contributor`.
1. For the **Repository** resource, select **Pull** and **Push**.
1. Click **Finish**.
1. Ask a project administrator to assign the role to the appropriate users or groups in the project.

These permissions allow pulling and pushing artifacts. They do not grant artifact deletion or project member management. Select any additional permissions required by the users' workflow before assigning the role. For details on permission selection and access from other memberships, see [Custom Project Role Permissions](../managing-users/user-permissions-by-role.md#custom-project-role-permissions).

## Edit a Custom Role

1. On the **Roles** page, select the checkbox next to one custom role.
1. Select **Action** > **Edit**.
1. Update the description in **Basic Information**, if needed. The role name cannot be changed in the interface.
1. Click **Next** and update the selected permissions. Keep at least one permission selected, and include **Pull** if you select **Push** for **Repository**.
1. Click **Finish**.

Changes to a custom role affect all users and groups assigned that role in every project where it is used. Review those assignments before changing the permissions of a shared role. If only one project needs a different permission set, create a separate custom role and assign it in that project.

## Delete a Custom Role

A custom role can be deleted only when it is no longer assigned to any project members. This includes both individual users and groups across all projects.

1. In each project where the role is assigned, ask a project administrator to assign another role to the affected users and groups, or remove their project membership if access is no longer needed. See [Assign Users to a Project](../../working-with-projects/create-projects/add-users.md).
1. As a system administrator, return to **Administration** > **Roles**.
1. Select the checkbox next to the custom role.
1. Select **Action** > **Delete** and confirm the deletion.

If Harbor rejects the deletion because the role is still assigned, remove or replace the remaining assignments and try again. Built-in roles cannot be deleted.
