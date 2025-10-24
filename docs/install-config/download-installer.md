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
1. Optionally download the corresponding `*.asc` file to verify that the package is genuine. 
  
   The `*.asc` file is an OpenPGP key file. Perform the following steps to verify that the downloaded bundle is genuine. 
   
   1. Obtain the public key for the `*.asc` file.
      
      ```sh
      gpg --keyserver hkps://keyserver.ubuntu.com --receive-keys 644FF454C0B4115C
      ```
      
      You should see the message ` public key "Harbor-sign (The key for signing Harbor build) <jiangd@vmware.com>" imported`
   1. Verify that the package is genuine by running one of the following commands.

      - Online installer:

         ```sh
         gpg -v --keyserver hkps://keyserver.ubuntu.com --verify harbor-online-installer-version.tgz.asc
         ```

      - Offline installer:

         ```sh
         gpg -v --keyserver hkps://keyserver.ubuntu.com --verify harbor-offline-installer-version.tgz.asc
         ```
      
      The `gpg` command verifies that the bundle's signature matches that of the `*.asc` key file. You should see confirmation that the signature is correct.
      
      ```sh
      gpg: armor header: Version: GnuPG v1
      gpg: assuming signed data in 'harbor-online-installer-v2.0.2.tgz'
      gpg: Signature made Tue Jul 28 09:49:20 2020 UTC
      gpg:                using RSA key 644FF454C0B4115C
      gpg: using pgp trust model
      gpg: Good signature from "Harbor-sign (The key for signing Harbor build) <jiangd@vmware.com>" [unknown]
      gpg: WARNING: This key is not certified with a trusted signature!
      gpg:          There is no indication that the signature belongs to the owner.
      Primary key fingerprint: 7722 D168 DAEC 4578 06C9  6FF9 644F F454 C0B4 115C
      gpg: binary signature, digest algorithm SHA1, key algorithm rsa4096
      ```

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