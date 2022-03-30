---
title: Implementing Content Trust
weight: 55
---

Artifact signing and signature verification are critical security capabilities that allow you to verify the integrity of an artifact. Harbor supports content trust through integrations with [Notary](https://github.com/notaryproject/notarys) and [Cosign](https://github.com/sigstore/cosign), ensuring that only signed and verified images are pulled from your Harbor instance.

This page describes how to [enforce content trust](#enforce-content-trust) using a default Harbor deployment policy. For more information on using Cosign and Notary with Harbor, see more how to [Sign Artifacts with Cosign and Notary](../../working-with-images/sign-images).

## Enforce deployment security

As a project administrator, you are able to enforce deployment security by activating the default deployment policy for Cosign or Notary for a given project.

1. Log into the Harbor interface and navigate to the Configuration tab for the Project you want to enforce content trust on.
1. Select the checkbox for **Cosign** or **Notary**. When checked, Harbor will only allow verified images to be pulled from the project. Verified images are determined by either Cosign or Notary, depending on the policy you have checked. You are able to select both options if you wish for both policies to be enforced. If you have both Notary and Cosign policies enforced, then images will need to be signed by both Notary and Cosign to be pulled.
1. Click **Save**.

  ![Enable deployment security in project configuration page](../../../img/enable-deployment-security.png)

  {{< note >}}
  You must have Notary [installed](../../../install-config/run-installer-script/#installation-with-notary) to see the Notary deployment security checkbox.
  {{< /note >}}
