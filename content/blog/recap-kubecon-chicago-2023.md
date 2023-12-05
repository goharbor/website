---
title: "Harbor Recap from KubeCon Chicago 2023"
author:
name: "Vadim Bauer"
description: "Our impressions and takeaways from the KubeCon in Chicago"
date: 2023-12-04T12:00:00+04:00
showPageInfo: true
---

{{< figure caption="The Harbor Team at KubeCon" src="/img/blog/harbor-team-kubecon-2023.jpeg" alt="The Harbor Team at KubeCon" loading="lazy">}}

This year's North America edition of the KubeCon took place in Chicago. What a
beautiful city and great location for the KubeCon.

From 5th to 9th November, people all over the world came together to talk and
discuss the future and direction of the Cloud Native ecosystem with various CNCF
projects and Kubernetes.

The Harbor team with [Yan Wang](https://twitter.com/wy65701436), [Vadim Bauer](https://twitter.com/vad1mo) and [Orlin Vasilev](https://twitter.com/OrlinVasilev)  
were also present at KubeCon with a maintainers track, a booth, and a community meeting.

Due to those various duties, we were unable to attend many sessions; however, we
attended a few keynote sessions and, more importantly, had many great
discussions Harbor users at our booth. This gave us a good idea of what our
users and the community has to say about Harbor.

Here are some unsorted notable notes we have been discussing with people.

- Using Harbor to store other types of artifacts.
  We have been brainstorming about that idea with the maintainers. One idea
  would be to introduce a pluggable proxy interface where different extensions
  for Harbor could be created. It would be similar
  to  https://github.com/container-registry/helm-charts-oci-proxy. On one side,
  the user-facing interface would comply with that of the particular artifact
  spec (eg. NPN, Maven, PyPy) and would translate them to OCI artifacts with the
  right manifests and immutability policies.
- How to set up a true multi-regional Harbor container registry.
- Distributing container images to the EDGE location.
- More fine-grained permission control for users, similar to the upcoming robot
  accounts.

## Harbor at KubeCon Chicago

Of course, there have been a few talks about Container Registries and Harbor in
particular.

My Kickoff as a speaker at the KubeCon 2023 started with a lightning talk about
[Dynamically Proxying Helm Charts as OCI Artifacts](https://kccncna2023.sched.com/event/1R2lk/cl-lightning-talk-dynamically-proxy-helm-charts-as-oci-artifacts-vadim-bauer-8gears-container-registry).

{{< youtube id="y6aSsQY-cXM" title="KubeCon 2023 NA – Lightning Talk: Dynamically Proxy Helm Charts as OCI Artifacts - Vadim Bauer" >}}

[The second talk](https://kccncna2023.sched.com/event/1R2sU/whats-new-in-harbor-and-how-can-you-make-harbor-even-better-yan-wang-vmware-vadim-bauer-8gears-container-registry)
together with Wang Yang and me was about Harbor new features and the Harbor
superpowers for different user groups like Ops, CISOs, and developers
appreciate the most.

In details, I was talking about:

1. How Harbor works well for small Teams and Enterprises at the same time!
2. How Harbor makes CISOs happy!
  1. Because all organizational images are in one place with Replication and Proxying.
  2. Because CISOs get an overview of all the image vulnerabilities in one place.
  3. Because audit trails help to reconstruct who did what.
3. Why Harbor is OPs people's darling!
  1. Automation & IaC – RESTful API, Terraform, Pulumi
  2. Operational control mechanisms – GC, Quota, Polices

The Second part of the talk was about the new features of Harbor, that will be
introduced in version 2.10

- Robot Accounts with more customizable and fine-grained permission sets.
- Software Bill of Material (SBOM) for Harbor will provide a list with that
  enumerates the components, dependencies, and their versions within a container
  image, serving the purpose of enhancing transparency, traceability, and
  security in software supply chains.
  
{{< youtube id="1QWy2zO0gBY" title="KubeCon 2023 NA – What’s New in Harbor, and  How Can You Make Harbor Even Better? - Yan Wang & Vadim Bauer" >}}


## Notable Mentions of Harbor and Registry Related Topics

Below are some interesting talks that are related to Harbor or deal with Container Artifact management.

### Tutorial: Cloud Native Essentials: A 101 Tutorial to Start Your Cloud Native Journey - Rey Lejano, SUSE & Eamon Bauman, Red Hat

[This 90-minute tutorial](https://kccncna2023.sched.com/event/1R2nY/tutorial-cloud-native-essentials-a-101-tutorial-to-start-your-cloud-native-journey-rey-lejano-suse-eamon-bauman-red-hat)
is an introduction to various CNCF graduated projects,
simplifying the often challenging process of self-learning about cloud native
projects. The tutorial covers the installation, setup, and usage of key tools
such as containerd, Kubernetes, Harbor for container registry, Helm for
application deployment, Prometheus for monitoring, Fluentd for logging, and Open
Policy Agent/Gatekeeper for admission control.

{{< youtube id="0RJBYVyHB3Q" title="Tutorial: Cloud Native Essentials: A 101 Tutorial to Start Your Cloud Native Journey - Rey Lejano, SUSE & Eamon Bauman, Red Hat" >}}

### Mastering LLM Delivery in Private Clouds: A Journey to Seamless Deployments with Kubernetes and OCI - Autumn Moulder & Marwan Ahmed, Cohere
[This talk](https://kccncna2023.sched.com/event/1R2qX/mastering-llm-delivery-in-private-clouds-a-journey-to-seamless-deployments-with-kubernetes-and-oci-autumn-moulder-marwan-ahmed-cohere)
explores simplifying Large Language Model (LLM) deployments using
Kubernetes and OCI artifacts. It addresses data governance and security
challenges, emphasizes Kubernetes for a portable inference stack, and highlights
OCI's efficiency gains by reducing storage, enhancing download speed, and
minimizing governance overhead. Learn how to leverage Kubernetes and OCI in your
MLOps journey.

{{< youtube id="y9lPk-oKZIA" title="Mastering LLM Delivery in Private Clouds: A Journey to Seamless Deployments with Kubernetes and OCI - Autumn Moulder & Marwan Ahmed, Cohere" >}}


### Flux 2.0 and Beyond: Amplifying GitOps with OCI and Cosign - Kingdon Barrett & Sanskar Jaiswal
[In this session](https://kccncna2023.sched.com/event/1R2rK/flux-20-and-beyond-amplifying-gitops-with-oci-and-cosign-kingdon-barrett-sanskar-jaiswal-weaveworks),
Sanskar and Kingdon will discuss deploying Helm applications
securely across different environments using Flux and the Open Container
Initiative (OCI). They will showcase a production scenario with a promotion
pipeline utilizing GitHub Actions, approvals, keyless signatures with Cosign,
and ambient credentials based on environments. The session emphasizes the
benefits of using OCI registries for Helm charts over HTTP registries. The
conclusion will touch on the future direction of Flux and how OCI is influencing
the future of CI/CD.

{{< youtube id="pO2-Kgbkziw" title="Flux 2.0 and Beyond: Amplifying GitOps with OCI and Cosign - Kingdon Barrett & Sanskar Jaiswal" >}}

## Closing Words

KubeCon North America in Chicago once again proved to be a vibrant hub for the
cloud-native ecosystem. Harbor's presence and the many positive reactions and
congratulations are proof that the project is meeting the needs of users.

[Vadim Bauer](https://www.linkedin.com/in/vadim-bauer/)  
Harbor Team



{{< figure caption="Orlin & Vadim Pointing at a Lighthouse" src="/img/blog/orlin-and-vadim-pointing-to-a-lighthouse.jpeg" alt="Orlin & Vadim Pointing at a Lighthouse" loading="lazy">}}

