---
title: Download the Harbor Installer
weight: 25
---

You can download the Harbor installers from the [official releases](https://github.com/goharbor/harbor/releases) page. Download either the online installer or the offline installer. 

- **Online installer:** The online installer downloads the Harbor images from Docker hub. For this reason, the installer is very small in size.

- **Offline installer:** Use the offline installer if the host to which are deploying Harbor does not have a connection to the Internet. The offline installer contains pre-built images, so it is larger than the online installer.

The installation processes are almost the same for the online and offline installers.

## Download and Unpack the Installer

1. Go to the [Harbor releases page](https://github.com/goharbor/harbor/releases). 
1. Download the online or offline installer for the version you want to install.
1. Optionally verify that the package is genuine.

   Starting with v2.15.0, Harbor installers are signed with [Cosign](https://github.com/sigstore/cosign) keyless signing. Each installer has a matching `*.sigstore.json` file on the releases page. For full details, see [Harbor Release Signature Verification](https://github.com/goharbor/harbor/blob/main/docs/signature-verification.md).

   1. Install Cosign.

      ```sh
      curl -LO https://github.com/sigstore/cosign/releases/latest/download/cosign-linux-amd64
      sudo install -m 0755 cosign-linux-amd64 /usr/local/bin/cosign
      cosign version
      ```

   1. Download the `*.sigstore.json` file for your installer, in the same folder as the installer.

   1. Verify the package by running one of the following commands. Replace `version` with the release version, for example `v2.15.0`.

      - Online installer:

         ```sh
         cosign verify-blob \
           --bundle harbor-online-installer-version.tgz.sigstore.json \
           --certificate-oidc-issuer https://token.actions.githubusercontent.com \
           --certificate-identity-regexp '^https://github.com/goharbor/harbor/.github/workflows/publish_release.yml@refs/tags/v.*$' \
           harbor-online-installer-version.tgz
         ```

      - Offline installer:

         ```sh
         cosign verify-blob \
           --bundle harbor-offline-installer-version.tgz.sigstore.json \
           --certificate-oidc-issuer https://token.actions.githubusercontent.com \
           --certificate-identity-regexp '^https://github.com/goharbor/harbor/.github/workflows/publish_release.yml@refs/tags/v.*$' \
           harbor-offline-installer-version.tgz
         ```

      You should see `Verified OK`.

   {{< note >}}
   Releases before v2.15.0 were signed with the GPG key `644FF454C0B4115C` and a `*.asc` file. This key expired on 2024-10-21, so GPG shows it as expired. To verify an older release, import the key with `gpg --keyserver hkps://keyserver.ubuntu.com --receive-keys 644FF454C0B4115C`, then run `gpg -v --verify harbor-offline-installer-version.tgz.asc`.
   {{< /note >}}

1. Use `tar` to extract the installer package:

   - Online installer:

      ```sh
      bash $ tar xzvf harbor-online-installer-version.tgz
      ```

   - Offline installer:
   
      ```sh
      bash $ tar xzvf harbor-offline-installer-version.tgz
      ```
   
## Next Steps

- To secure the connections to Harbor, see [Configure HTTPS Access to Harbor](configure-https.md).
- To configure your Harbor installation, see [Configure the Harbor YML File](configure-yml-file.md).

### Notes on the Installer Directory

You can extract the Harbor installer in any location. The user running the installation script must have permissions to execute Docker commands (usually by being in the `docker` group).

This directory is used only for installation and configuration. It is not where Harbor's permanent data is stored. All Harbor services run inside Docker containers, and their data is stored in Docker volumes. You should keep this directory so you can manage your Harbor instance later (e.g., for upgrades or configuration changes).