---
title: "Gitless GitOps: Using OCI Registries as a Secure, Trusted Hub for Multi-Zone Replication of Signed Artifacts"
author:
  name: "Stéphane Este-Gracias"
date: 2025-07-08T18:20:00+02:00
description: "Harbor as an universal OCI hub for GitOps"
showPageInfo: true
---

# Gitless GitOps: Using OCI Registries as a Secure, Trusted Hub for Multi-Zone Replication of Signed Artifacts

In traditional **GitOps** workflows, a Git repository serves as the single source of truth for application manifests, Helm charts, and other deployment artifacts. While this model works well for many teams, it can become a bottleneck when you need to replicate container images and related artifacts across multiple geographic zones or edge locations. Frequent pull-through syndication and cross-region pulls can introduce latency, complexity, and operational overhead.

With **Gitless GitOps**, you eliminate the need for a Git repository entirely and rely on an OCI-compliant registry as your authoritative source of truth.. By leveraging built-in registry replication, artifact signing, and in-cluster mounting of OCI images, you can streamline deployments and ensure cryptographic guarantees without managing Git at all.

## Background: The Universal OCI Artifact Hub

![The Universal OCI Artifact Hub](../img/harbor-as-universal-oci-hub.png)

The Universal OCI Artifact Hub leverages the OCI Distribution specification to extend support far beyond traditional container images, encompassing arbitrary artifacts such as Helm charts, SBOMs and binary blobs. Registries now expose a generic artifactType field and implement the referrers API, enabling users to link related artifacts—like signatures and SBOMs—and discover them more easily.

Starting with OCI Spec v1.1.0, this broad artifact support became officially part of the standard, formalizing functionality that some implementations had already adopted by using OCI registries as general-purpose artifact hubs.

## Tooling Ecosystem

A variety of CNCF and LF tools now embrace OCI registries natively, reinforcing the Gitless GitOps model:

- **Helm Chart OCI Support**
  <br>
  Since Helm v3, charts can be packaged and pushed to OCI registries via helm push and consumed directly by helm pull, eliminating separate chart repositories.
- **Tekton Bundles**
  <br>
  Tekton Pipelines’ Bundles let you store Task and Pipeline definitions as OCI artifacts, simplifying CI/CD workflows.
- **Flux CD**
  <br>
  Flux CD has long supported OCI registries as a source type, enabling automated reconciliation of manifests stored as OCI artifacts instead of Git.
- **Argo CD**
  <br>
  Starting v3.1.0, Argo CD can reference and deploy applications defined in OCI registries, including Helm charts and Kustomize artifacts.
- **OpenTofu**
  <br>
  The OpenTofu (starting from v1.10.0) can fetch modules and providers from OCI registries, treating infrastructure-as-code artifacts like container images
- **Kubewarden**
  <br>
  Kubewarden allows you to store policies as OCI artifacts, enabling policy-as-code enforcement directly from the registry.
- **KCL Lang**
  <br>
  KCL supports storing and retrieving modules as OCI artifacts, allowing you to manage configurations alongside your application artifacts.
- **ORAS**
  <br>
  The ORAS (OCI Registry As Storage) CLI provides a straightforward way to push, pull, and manage arbitrary OCI artifacts making it easy to script and automate fully Gitless workflows.
- **Notation**
  <br>
  Part of the Notary project, the Notation CLI offers a way to sign and verify OCI artifacts using standard Notation signatures, integrating seamlessly with OCI registries.
- **Sigstore**
  <br>
  Sigstore offers a zero-trust supply-chain solution by combining components such as Fulcio for issuing signing certificates and Rekor for immutable audit logging—while Cosign manages signature and verification that can be directly stored within OCI registries.

## Key Features for Gitless GitOps

Below are the core capabilities that enable a fully Gitless GitOps workflow by leveraging OCI registries and related tooling to replace traditional Git-based delivery pipelines:

### Registry-Native Artifact Publishing

Most of these tools provide native commands to publish artifacts directly to OCI registries—and regardless of whether a tool includes built-in push support (for example, Argo CD or the OpenTofu CLI), you can always use ORAS to push your artifacts, ensuring they’re uploaded with the correct format and annotations.

### Cryptographic Signing & Attachment

Use dedicated signing tools—such as notation CLI from the Notary project or cosign from Sigstore—to apply verifiable signatures to your OCI artifacts. You can attach signatures, SBOMs and attestations as separate artifacts linked via the subject field, discoverable through the referrers API. This layered approach ensures your artifacts carry strong, transparent supply-chain metadata.

### Declarative Pipelines via OCI Bundles

Leverage Tekton Pipelines’ OCI Bundle support to store Task and Pipeline definitions as OCI artifacts. By pulling pipeline specs directly from your OCI registry, you can achieve fully declarative, Gitless CI/CD workflows that integrate seamlessly with your OCI registry-based delivery model.

### Registry Replication

Configure your OCI registry (e.g., Harbor, Zot Registry, or cloud vendor registries) to replicate repositories across zones or regions, keeping images, charts, configurations and attachments in sync.

### In-Cluster OCI Image Volumes

With Kubernetes v1.33’s beta ImageVolume feature, mount any OCI image or artifact directly into Pods as a read-only volume—perfect for static configs, AI/ML models, plugins or scripts.

## Use case

Imagine needing to deploy your applications and platform across multiple geographic zones, each running their own Kubernetes clusters. Instead of relying on Git repositories to distribute your configurations, you can push artifacts directly to Harbor and replicate them to local registries for distribution.

Here’s how the workflow to push and distribute artifacts using Harbor might look in practice:

[OCI Registry as a Secure and Single Source of Distribution for Your Container Images & Artifacts](https://youtu.be/cKxkz4xMM5w)

<div style="position: relative; width: 100%; padding-bottom: 56.25%; height: 0; overflow: hidden;">
    <iframe src="https://www.youtube.com/embed/cKxkz4xMM5w" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Conclusion

Gitless GitOps harnesses advanced OCI registry and Kubernetes capabilities to deliver a streamlined, secure, and highly available deployment model. By using the OCI registry as the sole source of truth—with built-in replication and signature verification—teams can simplify multi-zone operations and enforce robust supply-chain guarantees, all without requiring direct access to a Git server.

## References

- OpenGitOps - Website https://opengitops.dev/
- Open Container Initiative - Website https://opencontainers.org/
- Open Container Initiative - Release notices https://opencontainers.org/release-notices/overview/
- Helm - Use OCI-based registries https://helm.sh/docs/topics/registries/
- Tekton Bundle Contracts https://tekton.dev/docs/pipelines/tekton-bundle-contracts/
- Flux CD - OCI cheatsheet https://fluxcd.io/flux/cheatsheets/oci-artifacts/
- Argo CD - OCI user guide https://argo-cd.readthedocs.io/en/latest/user-guide/oci/
- ORAS - Website https://oras.land/
- Kubewarden - Website https://kubewarden.io/
- KCL Lang - Website https://kcl-lang.io/
- Notary - Website (Notation) https://notaryproject.dev/
- Sigstore - Website (Cosign) https://www.sigstore.dev/

<br>
<br>

[Stéphane Este-Gracias](https://openprofile.dev/profile/sestegra)
CNCF Ambassador, Cloud Native Innovation Lead at ITQ
