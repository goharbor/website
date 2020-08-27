---
title: Download the Harbor Installer
weight: 25
---

You download the Harbor installers from the [official releases](https://github.com/goharbor/harbor/releases) page. Download either the online installer or the offline installer. 

- **Online installer:** The online installer downloads the Harbor images from Docker hub. For this reason, the installer is very small in size.

- **Offline installer:** Use the offline installer if the host to which are are deploying Harbor does not have a connection to the Internet. The offline installer contains pre-built images, so it is larger than the online installer.

The installation processes are almost the same for both the online and offline installers.

## Download and Unpack the Installer

1. Go to the [Harbor releases page](https://github.com/goharbor/harbor/releases). 
1. Download either the online or offline installer for the version you want to install.
1. Optionally download the corresponding `*.asc` file to verify that the package is genuine. 
  
   The `*.asc` file is an OpenPGP key file. Perform the following steps to verify that the downloaded bundle is genuine. 
   
   1. Obtain the public key for the `*.asc` file.
      
      ```sh
      gpg --keyserver hkps://keyserver.ubuntu.com --receive-keys 644FF454C0B4115C
      ```
      
      You should see the message ` public key "Harbor-sign (The key for signing Harbor build) <jiangd@vmware.com>" imported`
   1. Verify that the package is genuine by running one of the following commands.

      - Online installer: <pre>gpg -v --keyserver hkps://keyserver.ubuntu.com --verify harbor-online-installer-<i>version</i>.tgz.asc</pre>
      - Offline installer: <pre>gpg -v --keyserver hkps://keyserver.ubuntu.com --verify harbor-offline-installer-<i>version</i>.tgz.asc</pre>
      
      The `gpg` command verifies that the signature of the bundle matches that of the `*.asc` key file. You should see confirmation that the signature is correct.
      
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

   - Online installer:<pre>bash $ tar xvf harbor-online-installer-<em>version</em>.tgz</pre>
   - Offline installer:<pre>bash $ tar xvf harbor-offline-installer-<em>version</em>.tgz</pre>
   
## Next Steps

- To secure the connections to Harbor, see [Configure HTTPS Access to Harbor](configure-https.md).
- To configure your Harbor installation, see [Configure the Harbor YML File](configure-yml-file.md).
