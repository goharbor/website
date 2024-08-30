---
title: Registry Landscape
---

The cloud native ecosystem is moving rapidly—registries and their feature sets are no exception. We've made our best effort to survey the container registry landscape and compare to our core feature set.

This table is maintained by contributions from the Harbor community. If you find something outdated or outright erroneous, please submit a PR and we'll fix it right away.

| Feature                                                | Harbor | Docker Trusted Registry | Quay    | Cloud Providers (GCP, AWS, Azure) | Distribution/Distribution         | Artifactory | GitLab   |
| -------------:                                         | :----: | :---------------------: | :-----: | :-------------------------------: | :-----------------:         | :---------: | :------: |
| Ability to Determine Version of Binaries in Containers | ✓      | ✓                       | ✓       | ✗                                 | ✗                           | ?           | ?        |
| Artifact Repository (rpms, git, jar, etc)              | ✗      | ✗                       | ✗       | ✗                                 | ✗                           | ✓           | partial  |
| Audit Logs                                             | ✓      | ✓                       | ✓       | ✓                                 | ✗                           | ✓           | ✓        |
| Content Trust and Validation                           | ✓      | ✓                       | ✓       | ✗                                 | partial                     | partial     | ✗        |
| Custom TLS Certificates                                | ✓      | ✓                       | ✓       | ✗                                 | ✓                           | ✓           | ✓        |
| Helm Chart Repository Manager                          | ✓      | ✗                       | partial | ✗                                 | ✗                           | ✓           | ✗        |
| LDAP-based Auth                                        | ✓      | ✓                       | ✓       | partial                           | ✗                           | ✓           | ✓        |
| Local Auth                                             | ✓      | ✓                       | ✓       | ✓                                 | ✗                           | ✓           | ✓        |
| Metrics       | ✓      | ✓                       | ✓       | ✓                           | ✓                           | ✓           | ✓        |
| Multi-Tenancy (projects, teams, namespaces, etc)       | ✓      | ✓                       | ✓       | partial                           | ✗                           | ✓           | ✓        |
| Open Source                                            | ✓      | partial                 | ✓       | ✗                                 | ✓                           | partial     | partial  |
| Project Quotas (by storage consumption)                | ✓      | ✗                       | ✓       | partial                           | ✗                           | ✗           | ✗        |
| Replication between instances                          | ✓      | ✓                       | ✓       | n/a                               | ✗                           | ✓           | ✗        |
| Replication between non-instances                      | ✓      | ✗                       | ✓       | n/a                               | ✗                           | ✗           | ✗        |
| Robot Accounts for Helm Charts                         | ✓      | ✗                       | ✗       | ?                                 | ✗                           | ✗           | ✗        |
| Robot Accounts for Images                              | ✓      | ?                       | ✓       | ?                                 | ✗                           | ?           | ?        |
| Role-Based Access Control                              | ✓      | ✓                       | ✓       | ✓                                 | ✗                           | ✓           | ✗        |
| Single Sign On (OIDC)                                  | ✓      | ✓                       | ✓       | ✓                                 | ✗                           | partial     | ✗        |
| Tag Retention Policy                                   | ✓      | ✗                       | ✓       | ✗                                 | ✗                           | ✗           | ✗        |
| Upstream Registry Proxy Cache                          | ✓      | ✓                       | ✗       | ✗                                 | ✓                           | ✓           | ✗        |
| Vulnerability Scanning & Monitoring                    | ✓      | ✓                       | ✓       | ✗                                 | ✗                           | ✓           | partial  |
| Vulnerability Scanning Plugin Framework                | ✓      | ✗                       | ✓       | ✗                                 | ✗                           | ✗           | ✗        |
| Vulnerability Allowlisting                             | ✓      | ✗                       | ✗       | ✗                                 | ✗                           | ✗           | ✗        |
| Webhooks                                               | ✓      | ✓                       | ✓       | ✓                                 | ✓                           | ✓           | ✓        |
