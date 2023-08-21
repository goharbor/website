---
title: Security Hub
weight: 43
---

The Security Hub provides administrators with a comprehensive and centralized overview of the present security status of artifacts stored within the Harbor registry. Unlike the artifact-centric vulnerability view, the Security Hub provides a holistic view of all vulnerabilities across the registry and across all artifacts.

You can access the Security Hub via the Harbor UI Navigation or direct URL:

1. Method 1: Accessing the Security Hub via UI Navigation

   - Login to Harbor as a user with admin permissions, locate and click on the "Administration" option in the Harbor UI.

   - Within the Administration section, find and click on the "Interrogation Service" section.

   - The Security Hub tab can be found on the "Interrogation Service" settings page. Click on it.

2. Method 2: Accessing the Security Hub via Direct URL:

   - Open your web browser, and enter the following URL in the address bar: `https://<harbor-domain>/harbor/interrogation-services/security-hub`.
 
   Note: Replace <harbor-domain> with the appropriate domain or IP address of your Harbor instance

The page title displays the total count of artifacts and scanned artifacts.

## Total Vulnerabilities

The first card shows the total number of vulnerabilities found in the scanned images. The total number is broken up into severity groups with their respective occurrences.

![Total Vulnerabilities](../../img/security-hub/total_vulnerabilities.png)


## Top 5 Most Dangerous Artifacts

The second card shows the top 5 most dangerous artifacts found in scanned artifacts. It ranks the severe artifacts according to the number of vulnerabilities and their severity levels. Clicking on an artifact, the vulnerability table will query all vulnerabilities found in the selected artifact.

![Most Dangerous Artifacts](../../img/security-hub/dangerous_artifacts.png)


## Top 5 Most Dangerous CVEs

The third card shows the top 5 most dangerous CVEs found in scanned artifacts. it sorts the dangerous CVEs by the number of artifacts and their severity levels found in the artifacts. When click the CVE, the search vulnerabilities table displays all vulnerabilities found in artifacts.

![Most Dangerous CVEs](../../img/security-hub/dangerous_cves.png)

## Search Vulnerabilities

The search vulnerabilities panel allows you to search the vulnerabilities by the CVE ID, severity, project, repository, digest or tag etc. the search result will be shown in the table below.

![Search Vulnerabilities](../../img/security-hub/search_vulnerabilities.png)

Supported search fields:

| Query condition  | Description                                                                                                                                                 |
| ------------- |-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| CVE ID  | Search vulnerability information by CVE ID, for performance consideration, cve_id condition is required to query the vulnerability info, support exact match |
| Severity        | Search vulnerability information by severity level, support exact match                                                                                     |
| CVSS3        | Search vulnerability information by cvss v3 score range                                                                                                     |
| Project Name  | Search vulnerability information by project name, support exact match                                                                                       |
| Digest     | Search vulnerability information by artifact digest, support exact match                                                                                    |
| Repository Name | Search vulnerability information by repository name, support exact match                                                                                    |
| Package | Search vulnerability information by package name, support exact match                                                                                       |
| Tag | Search vulnerability information by tag name, support exact match                                                                                           |
