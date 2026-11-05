---
title: Assign Users to a Project
weight: 25
---

You can add individual users to an existing project and assign a role to them. You can add an LDAP/AD or OIDC user to the project members if you  use LDAP/AD or OIDC authentication, or a user that you have already created if you use database authentication. If you use LDAP/AD or OIDC authentication, you can add groups to projects and assign a role to the group.

For more information about users and roles in Harbor, see [User Permissions By Role](../../administration/managing-users/user-permissions-by-role.md).

Starting with Harbor v2.16.0, you can assign a custom project role as well as a built-in role. A system administrator must create the custom role before you can assign it. See [Manage Custom Project Roles](../../administration/custom-project-roles/).

## Before You Begin

You must have permission to view project members and perform the membership operation: add members, update their roles, or remove members. Harbor system administrators and project administrators have these permissions. Users with a custom role can also manage members if that role grants the required project member permissions.

When adding a member or changing a member's role, you can assign only a role whose permissions you hold in that project. Harbor rejects assignments that would grant permissions you do not have. If an assignment is rejected for this reason, ask a Harbor system administrator to make the assignment or review the role's permissions.

Role assignments apply to the selected project. Assigning a custom role in one project does not assign it in other projects, even when those projects use the same role definition.

The interface does not allow you to change or remove your own individual membership. Ask another user with the required member management permissions to make that change.

## Add Individual Members to Projects

1. Log in to the Harbor interface with an account that can add members to the project.
1. Go to **Projects** and select a project.
1. Select the **Members** tab and click **+User**.

   ![browse project](../../../img/project-members.png)
1. Enter the name of an existing database, LDAP/AD, or OIDC user.
1. Select a built-in or custom role for the user. Built-in roles are marked **Built-in**; custom roles appear with the names defined by the system administrator.
1. Click **OK**.

   ![browse project](../../../img/new-add-member.png)

The user appears in the **Members** tab with the selected role. To change the assignment later, see [Change a Project Member's Role](#change-a-project-members-role).

## Add LDAP/AD Groups to Projects

1. Log in to the Harbor interface with an account that can add members to the project.
1. Go to **Projects** and select a project.
1. Select the **Members** tab and click **+Group**.

   ![Add group](../../../img/add-group.png)
1. Enter the name of a group that you have already used in Harbor.
1. Select a built-in or custom role for the group and click **OK**.

   ![Screenshot of add group dialog](../../../img/ldap-group-addgroup-dialog.png)

Once an LDAP group has been assigned a role in a project, all LDAP/AD users in this group have the privileges of the role you assigned to the group. These permissions are combined with permissions from other memberships. See [User and Group Permissions](#user-and-group-permissions).

## Add OIDC Groups to Projects

To be able to add OIDC groups to projects, your OIDC provider and Harbor instance must be configured correctly. For information about how to configure OIDC so that Harbor can use groups, see [OIDC Provider Authentication](../../administration/configure-authentication/oidc-auth.md).

1. Log in to the Harbor interface with an account that can add members to the project.
1. Go to **Projects** and select a project.
1. Select the **Members** tab and click **+Group**.

   ![Add group](../../../img/add-group.png)
1. Enter the name of a group that already exists in your OIDC provider.
1. Select a built-in or custom role for the group and click **OK**.

   ![Add group](../../../img/add-oidc-group.png)

{{< note >}}
Unlike with LDAP groups, Harbor cannot check whether OIDC groups exist when you add them to a project. If you mistype the group name, or if the group does not exist in your OIDC provider, Harbor still creates the group.
{{< /note >}}

## Change a Project Member's Role

1. Log in to the Harbor interface with an account that can update project members.
1. Go to **Projects**, select a project, and open the **Members** tab.
1. Select one or more users or groups whose role you want to change.
1. Click **Action** and select the built-in or custom role under **Set Role**.
1. Check the **Role** column to confirm the new assignment.

![Change or remove project members](../../../img/new-remove-update-member.png)

Changing a group's role changes the permissions granted through that group to its members in the selected project. Changing an assignment does not change the role definition or assignments in other projects.

To change the permissions in a custom role definition, ask a system administrator to [edit the custom role](../../administration/custom-project-roles/#edit-a-custom-role). Editing the definition affects every project where that role is assigned.

## Remove Project Members

1. Log in to the Harbor interface with an account that can remove project members.
1. Go to **Projects**, select a project, and open the **Members** tab.
1. Select one or more users or groups.
1. Click **Action** > **Remove** and confirm the removal.

Removing a member removes that membership's role assignment in the project. It does not delete the user or group from the authentication provider, delete the custom role definition, or remove assignments in other projects.

Before a system administrator can delete a custom role, all user and group assignments to that role must be removed or changed to another role in every project where it is used.

## User and Group Permissions

A user's permissions in a project combine the permissions granted by their individual membership and their group memberships. This applies to both built-in and custom roles.

For example, assigning a pull-only custom role directly to a user does not remove push permission that the user receives from a group's Developer role. To reduce the user's access, review all of their role assignments in the project, including group assignments. Harbor system administrators retain all project permissions regardless of their project role assignments.
