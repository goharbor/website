---
name: release_harbor_doc
description: Updates Harbor documentation for a new release, including version numbers, upgrade links, and submodule updates. Use when releasing a new version of Harbor or updating documentation for a release.
---

# release_harbor_doc

## Instructions

When a new Harbor version is released, follow these steps to update the documentation:

1.  **Update Main Index**: Update `docs/_index.md` with the new release version.
    - Path: `docs/_index.md`
    - Update the title and welcome message to reflect the new version (e.g., `v2.15.0`).

2.  **Update Upgrade Guide**: Update `docs/administration/upgrade/_index.md` to include upgrade links for the latest n-2 versions.
    - Path: `docs/administration/upgrade/_index.md`
    - Update the guide text to cover the latest version.
    - Add links for the latest versions (e.g., if releasing `v2.15.0`, ensure `v2.14.0` and `v2.13.0` are linked).

3.  **Update Harbor Submodule**:
    - Navigate to the `harbor` submodule directory.
    - Update the submodule to the specified release tag.
    - Commands:
      ```bash
      git submodule update --init --recursive --remote
      git checkout tags/${release_version}
      ```

4.  **Commit and PR**:
    - Add all changes.
    - Commit with a sign-off (required for Harbor).
    - Create a PR to the `main` branch.

## Example

For a `v2.15.0` release:

### docs/_index.md
```markdown
---
title: Harbor v2.15.0 Documentation
---

Welcome to the Harbor v2.15.0 documentation. This documentation includes all of the information that you need to install, configure, and use Harbor.
```

### docs/administration/upgrade/_index.md
```markdown
This guide covers upgrade and migration to v2.15.0. This guide only covers migration from v2.13.0 and later to the current version. If you are upgrading from an earlier version, refer to the migration guide for an earlier Harbor version.
* [Upgrade to Harbor v2.14.0](/docs/2.14.0/administration/upgrade/)
* [Upgrade to Harbor v2.13.0](/docs/2.13.0/administration/upgrade/)
...
```
