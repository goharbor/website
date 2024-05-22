---
title: SBOM support
weight: 43
---

With the increasing requirements of regulation enforcement from government, stakeholders and engineers in the software
industry start paying more attention to the supply chain security using Software Bill of Materials - SBOM. Currently, 
Harbor has already supported SBOM as an accessory manually uploaded to an Harbor registry through third-party tool like `trivy` and
`oras`. Starting from Harbor v2.11.0, an SBOM can be generated automatically with Harbor default scanner - Trivy. In 
addition to that, users can also click on the `GENERATE SBOM` button on Harbor portal to manually generate an SBOM without
third-party CLI clients.

## How to automatically generate an SBOM on image pushed to Harbor?

To automatically generate an SBOM upon images pushed to Harbor, users need to navigate to the `Configuration` tab of
the project where an image is pushed. Then select the checkbox of `SBOM generation` and click `SAVE` button afterwards.

![Enable SBOM auto generation configuration](../../img/sbom-integration/1_enable_auto_generate_sbom.png)

Then users can `docker push` an image to this project as configured above. An SBOM will be generated automatically after 
the image is pushed successfully.

![SBOM automatically generated](../../img/sbom-integration/2_sbom_accessory.png)

By clicking the yellow rectangle as shown in the above image, users will be redirected to the SBOM details page as shown
below. A table of package name, package current version, and package license are available within the Harbor portal UI and 
a download link `DOWNLOAD SBOM` is also available for users to download the file containing full SBOM contents. 

![SBOM details](../../img/sbom-integration/3_sbom_details.png)

## How to manually generate an SBOM against an image

Users can navigate to the artifact page and select an image upon which to generate an SBOM. And stopping generating SBOM
is also available after clicking the `ACTIONS` drop-down menu.

![SBOM manual generation and stopping](../../img/sbom-integration/4_stop_manual_generate_sbom.png)

## How to delete an SBOM

An SBOM accessory can be deleted individually as shown below.

![SBOM deletion individually](../../img/sbom-integration/5_delete_sbom_individually.png)

Then click the `DELETE` button in the prompt window.

![SBOM deletion individually confirm button](../../img/sbom-integration/6_confirm_to_delete_sbom.png)

Then we can see there is no SBOM accessory associated to the subject artifact anymore.

![No SBOM accessory](../../img/sbom-integration/7_no_sbom_after_delete.png)

Next, we can see the SBOM accessory will be garbage collected when we run GC.

![SBOM gc](../../img/sbom-integration/8_gc_sbom_after_delete.png)

On the other hand, an SBOM can be deleted together with its subject artifact, as shown below.

![SBOM deletion together with subject artifact](../../img/sbom-integration/9_delete_sbom_with_subject_artifact.png)

Then users just need to confirm this deletion activity.

![SBOM deletion together with subject artifact confirm button](../../img/sbom-integration/10_confirm_delete_subject_artifact.png)

Thirdly, SBOM can be deleted together with its subject artifact through tag retention. We have photon:4.0 pushed up first,
and then we pushed photon:2.0. An SBOM manual generation is triggered for photon:4.0. After that, we create an tag retention
rule like below - keep the most recent pushed 1 artifact.

![SBOM tag retention rule](../../img/sbom-integration/11_tag_retention_sbom_subject_artifact.png)

In the tag retention log shown below, photon:4.0 is deleted.

![SBOM tag retention log](../../img/sbom-integration/12_tag_retention_log.png)

Double check it on the Harbor portal, we can see that photon:4.0 is gone together with its SBOM accessory.

![SBOM tag retention result](../../img/sbom-integration/13_tag_retention_result.png)

## SBOM can be replicated to the destination Harbor together with its subject artifact

Users can create a replication rule to replicate a set of artifacts together with their corresponding SBOM from a source
Harbor registry to a destination Harbor registry.