---
title: User Permissions By Role
weight: 20
---

Users have different abilities depending on the role they have in a project.

On public projects all users will be able to see the list of repositories, images, image vulnerabilities, helm charts and helm chart versions, pull images, retag images (need push permission for destination image), download helm charts, download helm chart versions.

Harbor system administrators have all permissions for the project.

## Project members permissions

The following table describes the permissions of the five built-in project roles. Custom roles have the permissions selected by a system administrator; see [Custom Project Role Permissions](#custom-project-role-permissions).

| Action                                  | Limited Guest | Guest | Developer | Maintainer | Project Admin |
| --------------------------------------- | ------------- | ----- | --------- | ------ | ------------- |
| See the project configurations          | ✓             | ✓     | ✓         | ✓      | ✓             |
| Edit the project configurations         |               |       |           |        | ✓             |
| See a list of project members           |               | ✓     | ✓         | ✓      | ✓             |
| Create/edit/delete project members      |               |       |           |        | ✓             |
| See a list of project logs              |               | ✓     | ✓         | ✓      | ✓             |
| See a list of project replications      |               |       |           | ✓      | ✓             |
| See a list of project replication jobs  |               |       |           |        | ✓             |
| See a list of project labels            |               |       |           | ✓      | ✓             |
| Create/edit/delete project labels       |               |       |           | ✓      | ✓             |
| See a list of repositories              | ✓             | ✓     | ✓         | ✓      | ✓             |
| Create repositories                     |               |       | ✓         | ✓      | ✓             |
| Edit/delete repositories                |               |       |           | ✓      | ✓             |
| See a list of images                    | ✓             | ✓     | ✓         | ✓      | ✓             |
| Retag image                             |               | ✓     | ✓         | ✓      | ✓             |
| Pull image                              | ✓             | ✓     | ✓         | ✓      | ✓             |
| Push image                              |               |       | ✓         | ✓      | ✓             |
| Scan/delete image                       |               |       |           | ✓      | ✓             |
| Add scanners to Harbor  *               |               |       |           |        |               |
| Edit scanners in projects               |               |       |           |        | ✓             |
| See a list of image vulnerabilities     | ✓             | ✓     | ✓         | ✓      | ✓             |
| Create list of project vulnerabilities  |               |       | ✓         | ✓      | ✓             |
| Read list of project vulnerabilities    |               |       | ✓         | ✓      | ✓             |
| Export list of project vulnerabilities  |               |       | ✓         | ✓      | ✓             |
| See image build history                 | ✓             | ✓     | ✓         | ✓      | ✓             |
| Add/Remove labels of image              |               |       | ✓         | ✓      | ✓             |
| See a list of helm charts               | ✓             | ✓     | ✓         | ✓      | ✓             |
| Download helm charts                    | ✓             | ✓     | ✓         | ✓      | ✓             |
| Upload helm charts                      |               |       | ✓         | ✓      | ✓             |
| Delete helm charts                      |               |       |           | ✓      | ✓             |
| See a list of helm chart versions       | ✓             | ✓     | ✓         | ✓      | ✓             |
| Download helm chart versions            | ✓             | ✓     | ✓         | ✓      | ✓             |
| Upload helm chart versions              |               |       | ✓         | ✓      | ✓             |
| Delete helm chart versions              |               |       |           | ✓      | ✓             |
| Add/Remove labels of helm chart version |               |       | ✓         | ✓      | ✓             |
| See a list of project robots            |               |       |           | ✓      | ✓             |
| Create/edit/delete project robots       |               |       |           |        | ✓             |
| See configured CVE allowlist            | ✓             | ✓     | ✓         | ✓      | ✓             |
| Create/edit/remove CVE allowlist        |               |       |           |        | ✓             |
| View webhook events                     |               |       |           | ✓      | ✓             |
| Add new webhook events                  |               |       |           |        | ✓             |
| Enable/deactivate webhooks              |               |       |           |        | ✓             |
| Create/delete tag retention rules       |               |       | ✓         | ✓      | ✓             |
| Enable/deactivate tag retention rules   |               |       | ✓         | ✓      | ✓             |
| Create/delete tag immutability rules    |               |       |           | ✓      | ✓             |
| Enable/deactivate tag immutability rules|               |       |           | ✓      | ✓             |
| See project quotas                      | ✓             | ✓     | ✓         | ✓      | ✓             |
| Edit project quotas  *                  |               |       |           |        |               |
| Delete Project                          |               |       |           |        | ✓             |

&ast; Only the Harbor system administrator can edit project quotas and add new scanners.

## Custom Project Role Permissions

Starting with Harbor v2.16.0, a system administrator can define a custom project role by selecting individual resource and action permissions. A custom role does not inherit the permission set of a built-in role. The same definition can be assigned to users or groups in multiple projects, with each assignment granting access only in that project.

For example, the permission selector includes the following combinations. These are individual permissions; a workflow in the Harbor interface can also require read or list permissions for the resources it displays.

| Operation | Resource | Action |
| --------- | -------- | ------ |
| Pull artifacts | Repository | Pull |
| Push artifacts | Repository | Push and Pull |
| View the project member list | Project Member | List |
| Add a project member | Project Member | Create |
| Change a project member's role | Project Member | Update |
| Remove a project member | Project Member | Delete |
| Start a vulnerability scan | Scan | Create |
| Delete an artifact | Artifact | Delete |

Select permissions according to the tasks the role needs to perform. To inspect the complete permission set of an existing role, go to **Administration** > **Roles** and click the permission count in its **Permissions** column.

The following rules apply to custom roles:

- Permissions apply throughout the assigned project, rather than to individual repositories.
- Project membership allows the user to view the project itself. Additional operations depend on the role's selected permissions.
- A user's individual and group memberships combine their permissions. Removing a permission from one role does not remove the same permission granted by another role. Access provided by a public project also remains available.
- Assigning a custom project role does not grant Harbor system administrator privileges. Project deletion is not an available custom role permission.
- Users who manage project members can assign only roles whose permissions they hold in that project.
- Changes to a custom role definition affect all projects where it is assigned. Built-in role definitions cannot be changed.

For role management instructions, see [Manage Custom Project Roles](../custom-project-roles/). For user and group assignments, see [Assign Users to a Project](../../working-with-projects/create-projects/add-users.md).
