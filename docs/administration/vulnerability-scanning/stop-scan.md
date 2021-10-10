---
title: Stop Scan & Stop Scan All
weight: 30
---
Scanning images can be a useful feature to detect potential vulnerabilities for artifact management purpose, but the scanning process could also be
resource-consuming, depending on the scale of objects being scanned, making Harbor barely be able to perform other functionalities. Therefore, it's
worthwhile to introduce a stop scan feature for users to terminate a running scan job, and to add a stop scan all functionality to cancel a list of
running scan jobs created by scan all.

Starting from Harbor 2.4.0, the feature of stop scan individual artifacts and stop scan all artifacts is available for Harbor customers to use.
They can explore it through Harbor web portal.

## Stop Scan Individual Artifacts
There is a `STOP SCAN` button sitting next to `SCAN` button which you click to trigger a scan job of a given artifact,
[scan individual artifact](./scan-individual-artifact.md). When you click `SCAN`, the value in **Vulnerabilities** field changes to **Queued**,
and then **Scanning**. And at this point, if you click `STOP SCAN`, a stop scan request will be sent to Harbor backend, and the value of
**Vulnerabilities** field will be soon changed to **Scan stopped**.

Users can also create a webhook for **Scanning stopped** event.
1. Login to Harbor web portal. And navigate into a preferred project.
2. Click the **Webhooks** tab, and click **NEW WEBHOOK** button to add a new webhook.
3. Please fulfill the form and make sure you select **Scanning stopped** checkbox, before clicking the **ADD** button to submit.

If you create a webhook of a given project for **Scanning stopped** event, then try stop scan feature again (stop scan an artifact of this given project).
And you should be able to receive a webhook payload this time.

## Stop Scan All
In the case of stop scan all, there is no additional `STOP SCAN` button, but the text of `SCAN NOW` button will be changed to `STOP SCAN` after users
click `SCAN NOW` to create a [scan all request](./scan-all-artifacts.md). And once the text is changed to `STOP SCAN`, you can then click it to send
a stop scan all request. And the value of **Vulnerabilities** field of all stopped jobs will be changed to **Scan stopped**, and webhooks, if any,
will also be sent out.