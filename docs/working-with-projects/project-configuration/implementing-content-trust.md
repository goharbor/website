---
title: Implementing Content Trust
weight: 55
---

Artifact signing and signature verification are critical security capabilities that allow you to verify the integrity of an artifact. Harbor supports content trust through integrations with [Cosign](https://github.com/sigstore/cosign) and [Notation](https://github.com/notaryproject/notation), ensuring that only signed and verified images are pulled from your Harbor instance.

This page describes how to [enforce content trust](#enforce-content-trust) using a default Harbor deployment policy. For more information on using Cosign and Notation with Harbor, see more how to [Sign Artifacts with Cosign and Notation](../../working-with-images/sign-images).

## Enforce deployment security

As a project administrator, you are able to enforce deployment security by activating the default deployment policy for Cosign or Notation for a given project.

1. Log into the Harbor interface and navigate to the Configuration tab for the Project you want to enforce content trust on.
1. Select the checkbox for **Cosign** or **Notation**. When checked, Harbor will only allow verified images to be pulled from the project. Verified images are determined by Cosign or Notation, depending on the policy you have checked. You are able to select both options if you wish for both policies to be enforced. If you have both Cosign and Notation policies enforced, then images will need to be signed by both Cosign and Notation to be pulled.
1. Click **Save**.

  ![Enable deployment security in project configuration page](../../../img/enable-deployment-security.png)
