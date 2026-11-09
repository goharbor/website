---
title: Repositories
weight: 75
---

A repository is a collection of artifacts.  Since version v2.0, in addition to container images, Harbor can manage different kinds of artifacts that are bundled in OCI-compatible format, such as helm chart (requires helm v3), CNAB, OPA bundle, etc.

### List Repositories

Click your project to enter the project detail page after successful logging in.  Click the "Repositories" tab to view the list of of repositories. 

![list_repositories](../../../img/list-repositories.png)

### Description of a repository

Click the repository, then click the "Info" tab.  You can view the description of the project.  Users with project admin, maintainer or developer role can click the "Edit" button to edit the description.  You can style the description via Markdown syntax.

![edit_repository_description](../../../img/edit-repository-description.png)

### List artifacts in a repository

Click the "Artifacts" tab to view the list of artifacts in a repository.
Each artifact is identified by its sha256 digest in the list of artifacts, and different types of artifacts can be distinguished by the icon on the left of the digest.  Hover your mouse on the icon you can see the name of the type.  

By clicking the icon in the column **Pull Command**, the command to pull the artifact in the row of the icon will be copied to the clipboard.  
The column **Annotations** in the grid shows the manifest annotations of the artifact, which are a set of key-value pairs.  More details about the annotations please refer to [OCI Annotations](https://github.com/opencontainers/image-spec/blob/master/annotations.md).
The column **Push Time** in the grid shows the time each artifact is pushed to the registry.

![list_artifacts](../../../img/list-artifacts.png)

By clicking the search icon in the top right of the list of artifacts, you can user different types of filters to filter the items in the artifact list.  You can choose to filter by type, tags, labels.  Particularly, if you choose to filter by tags, you can choose to view only the tagged or untagged artifacts.

![filter_artifacts](../../../img/filter-artifacts.png)

### Artifact actions

To act on artifacts in a repository, select one or more artifacts in the **Artifacts** tab and click **Actions** to open the drop-down menu. An option is only available if the current selection supports it and your role in the project has the required permission. For the permissions of each role, see [User Permissions By Role](../../administration/managing-users/user-permissions-by-role.md).

![artifact_actions](../../../img/sbom-integration/4_stop_manual_generate_sbom.png)

* **Stop Scan Vulnerability**: Stops the vulnerability scans that are running for the selected artifacts. This option is only available if a scan is queued or running for every selected artifact. See [Stop Scan](../../administration/vulnerability-scanning/stop-scan.md).
* **Stop Generate SBOM**: Stops the SBOM generation that is running for the selected artifacts. This option is only available if SBOM generation is queued or running for every selected artifact. See [SBOM Integration](../../administration/sbom-integration/_index.md).
* **Copy Digest**: Opens a window that shows the full `sha256` digest of the selected artifact, so that you can copy it to the clipboard. Select exactly one artifact to use this option.
* **Add Labels**: Adds labels to or removes labels from the selected artifacts. You can select global labels and labels of the current project. To change labels on several artifacts at once, none of the selected artifacts can already have labels. See [Managing Labels](create-labels.md).
* **Copy**: Copies the selected artifact to another repository, in the same project or a different one. In the **Copy** window, enter the destination project name and repository name, and click **Confirm**. Harbor copies the artifact together with its tags, any artifacts that it references if it is an image index, and its accessories, such as Cosign signatures and SBOMs. You need push permission in the destination project. Select exactly one artifact to use this option. See [Retagging Artifacts](retagging-images.md).
* **Delete**: Deletes the selected artifacts, including all of their tags. You can select several artifacts to delete them in one operation. You cannot delete an artifact that is referenced by an image index. See [Deleting Artifacts](deleting-artifact.md).

Since Harbor v2.0.0, [Image index](https://raw.githubusercontent.com/opencontainers/image-spec/master/image-index.md) can also be managed as an artifact in a repository.  If an artifact is an index, there will be a folder icon on the right side of its digest.

![image_index](../../../img/index-icon.png)

Click the folder icon, you can see the list of artifacts that is referenced by the index.  The artifacts in this view is read only.  i.e. You can not remove an artifact from an index via Harbor's UI, and none of the actions like 'copy digest', 'add labels', 'copy' are available.

![index_detail](../../../img/index-detail.png)
