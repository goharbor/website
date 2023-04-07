---
title: Configure Webhook Notifications
weight: 45
---

If you are a project administrator, you can configure a connection from a project in Harbor to a webhook endpoint. If you configure webhooks, Harbor notifies the webhook endpoint of certain events that occur in the project. Webhooks allow you to integrate Harbor with other tools to streamline continuous integration and development processes.

The action that is taken upon receiving a notification from a Harbor project depends on your continuous integration and development processes. For example, by configuring Harbor to send a `POST` request to a webhook listener at an endpoint of your choice, you can trigger a build and deployment of an application whenever there is a change to an image in the repository.

### Supported Events

You can define multiple webhook endpoints per project. Harbor supports two kinds of endpoints currently,  `HTTP`  and `SLACK`. Webhook notifications provide information about events in JSON format and are delivered by `HTTP` or `HTTPS POST` to an existing webhhook endpoint URL or Slack address that you provide. There are 2 JSON formats supported for the webhook payload, `Default` is the format that has always existed, and the data structure has not changed from the previous versions, except that it has been named, `CloudEvents` is the format which organizes the payload data as following the spec of [CloudEvents](https://cloudevents.io/). The following table describes the events that trigger notifications and the contents of each notification.

|Event|Webhook Event Type|Contents of Notification|
|---|---|---|
|Push artifact to registry|`PUSH_ARTIFACT`|Repository namespace name, repository name, resource URL, tags, manifest digest, artifact name, push time timestamp, username of user who pushed artifact|
|Pull artifact from registry|`PULL_ARTIFACT`|Repository namespace name, repository name, manifest digest, artifact name, pull time timestamp, username of user who pulled artifact|
|Delete artifact from registry|`DELETE_ARTIFACT`|Repository namespace name, repository name, manifest digest, artifact name, artifact size, delete time timestamp, username of user who deleted image|
|Artifact scan completed|`SCANNING_COMPLETED`|Repository namespace name, repository name, tag scanned, artifact name, number of critical issues, number of major issues, number of minor issues, last scan status, scan completion time timestamp, username of user who performed scan|
|Artifact scan stopped | `SCANNING_STOPPED` | Repository namespace name, repository name, tag scanned, artifact name, scan status|
|Artifact scan failed|`SCANNING_FAILED`|Repository namespace name, repository name, tag scanned, artifact name, error that occurred, username of user who performed scan|
|Project quota exceeded|`QUOTA_EXCEED`|Repository namespace name, repository name, tags, manifest digest, artifact name, push time timestamp, username of user who pushed artifact|
|Project quota near threshold|`QUOTA_WARNING`|Repository namespace name, repository name, tags, manifest digest, artifact name, push time timestamp, username of user who pushed artifact|
|Artifact replication status changed|`REPLICATION`|Repository namespace name, repository name, tags, manifest digest, artifact name, push time timestamp, username of user who trigger the replication|
|Artifact tag retention finished|`TAG_RETENTION`|Repository namespace name, repository name, the number of total and retained, the rule of retention, deleted artifacts results|

#### Payload Format

The webhook notification is delivered in JSON format. The following example shows the JSON notification for different event types when using `HTTP` kind endpoint:

##### Artifact pushed

*Default*

```json
{
  "type": "PUSH_ARTIFACT",
  "occur_at": 1680501893,
  "operator": "harbor-jobservice",
  "event_data": {
    "resources": [
      {
        "digest": "sha256:954b378c375d852eb3c63ab88978f640b4348b01c1b3456a024a81536dafbbf4",
        "tag": "sha256:954b378c375d852eb3c63ab88978f640b4348b01c1b3456a024a81536dafbbf4",
        "resource_url": "localhost/harbor/alpine@sha256:954b378c375d852eb3c63ab88978f640b4348b01c1b3456a024a81536dafbbf4"
      }
    ],
    "repository": {
      "date_created": 1680501893,
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    }
  }
}
```

*CloudEvents*

```json
{
  "specversion": "1.0",
  // id is a generated UUID to make sure the unique
  "id": "66e18103-09c1-41f6-982f-37df223f3eeb",
  // requestid is the http request id for tracing the source request of this event
  "requestid": "51c0b694-0168-4f3c-b0db-282565455d7b",
  "source": "/projects/2/webhook/policies/15",
  "type": "harbor.replication.status.changed",
  "datacontenttype": "application/json",
  "time": "2023-04-03T06:04:46Z",
  "data": {
    "replication": {
      "harbor_hostname": "localhost",
      "job_status": "Running",
      "artifact_type": "image",
      "override_mode": true,
      "trigger_type": "MANUAL",
      "policy_creator": "admin",
      "execution_timestamp": 1680501881,
      "src_resource": {
        "registry_name": "hub",
        "registry_type": "docker-hub",
        "endpoint": "https://hub.docker.com",
        "namespace": "library"
      },
      "dest_resource": {
        "registry_type": "harbor",
        "endpoint": "http://localhost",
        "namespace": "harbor"
      }
    }
  },
  "operator": "MANUAL"
}
```

##### Artifact pulled

*Default*

```json
{
  "type": "PULL_ARTIFACT",
  "occur_at": 1680502372,
  "operator": "robot$harbor+wHSYCuGD-Trivy-8e2e7505-d1e6-11ed-9e71-0242ac130009",
  "event_data": {
    "resources": [
      {
        "digest": "sha256:954b378c375d852eb3c63ab88978f640b4348b01c1b3456a024a81536dafbbf4",
        "tag": "sha256:954b378c375d852eb3c63ab88978f640b4348b01c1b3456a024a81536dafbbf4",
        "resource_url": "localhost/harbor/alpine@sha256:954b378c375d852eb3c63ab88978f640b4348b01c1b3456a024a81536dafbbf4"
      }
    ],
    "repository": {
      "date_created": 1680501893,
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    }
  }
}

```

*CloudEvents*

```json
{
  "specversion": "1.0",
  "id": "718eab63-2efa-4f88-8c27-8bcacc34929b",
  "requestid": "bb4b5b91-aac7-4acd-8dff-e4118e53f6d1"
  "source": "/projects/2/webhook/policies/15",
  "type": "harbor.artifact.pulled",
  "datacontenttype": "application/json",
  "time": "2023-04-03T06:12:52Z",
  "data": {
    "resources": [
      {
        "digest": "sha256:954b378c375d852eb3c63ab88978f640b4348b01c1b3456a024a81536dafbbf4",
        "tag": "sha256:954b378c375d852eb3c63ab88978f640b4348b01c1b3456a024a81536dafbbf4",
        "resource_url": "localhost/harbor/alpine@sha256:954b378c375d852eb3c63ab88978f640b4348b01c1b3456a024a81536dafbbf4"
      }
    ],
    "repository": {
      "date_created": 1680501893,
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    }
  },
  "operator": "robot$harbor+wHSYCuGD-Trivy-8e2e7505-d1e6-11ed-9e71-0242ac130009"
}
```

##### Artifact deleted

*Default*

```json
{
  "type": "DELETE_ARTIFACT",
  "occur_at": 1680502598,
  "operator": "harbor-jobservice",
  "event_data": {
    "resources": [
      {
        "digest": "sha256:2bb501e6173d9d006e56de5bce2720eb06396803300fe1687b58a7ff32bf4c14",
        "tag": "3.8",
        "resource_url": "localhost/harbor/alpine:3.8"
      }
    ],
    "repository": {
      "date_created": 1680501893,
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    }
  }
}
```

*CloudEvents*

```json
{
  "specversion": "1.0",
  "id": "343f1623-7cba-487c-88f1-c5ebf55e93aa",
  "requestid": "ca0f3ceb-810f-4598-a268-a2291ad4de49",
  "source": "/projects/2/webhook/policies/15",
  "type": "harbor.artifact.deleted",
  "datacontenttype": "application/json",
  "time": "2023-04-03T06:16:38Z",
  "data": {
    "resources": [
      {
        "digest": "sha256:2bb501e6173d9d006e56de5bce2720eb06396803300fe1687b58a7ff32bf4c14",
        "tag": "3.8",
        "resource_url": "localhost/harbor/alpine:3.8"
      }
    ],
    "repository": {
      "date_created": 1680501893,
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    }
  },
  "operator": "harbor-jobservice"
}
```

##### Scanning completed

*Default*

```json
{
  "type": "SCANNING_COMPLETED",
  "occur_at": 1680502375,
  "operator": "auto",
  "event_data": {
    "resources": [
      {
        "digest": "sha256:954b378c375d852eb3c63ab88978f640b4348b01c1b3456a024a81536dafbbf4",
        "resource_url": "localhost/harbor/alpine@sha256:954b378c375d852eb3c63ab88978f640b4348b01c1b3456a024a81536dafbbf4",
        "scan_overview": {
          "application/vnd.security.vulnerability.report; version=1.1": {
            "report_id": "af0546c1-67dc-4e9d-927e-372900ead0df",
            "scan_status": "Success",
            "severity": "None",
            "duration": 8,
            "summary": {
              "total": 0,
              "fixable": 0,
              "summary": {}
            },
            "start_time": "2023-04-03T06:12:47Z",
            "end_time": "2023-04-03T06:12:55Z",
            "scanner": {
              "name": "Trivy",
              "vendor": "Aqua Security",
              "version": "v0.37.2"
            },
            "complete_percent": 100
          }
        }
      }
    ],
    "repository": {
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    }
  }
}
```


*CloudEvents*

```json
{
  "specversion": "1.0",
  "id": "64bce2fe-6159-454d-8389-852d01ef1e9d",
  "requestid": "98ecbced-4169-443b-8e19-459a8c81675d",
  "source": "/projects/2/webhook/policies/15",
  "type": "harbor.scan.completed",
  "datacontenttype": "application/json",
  "time": "2023-04-03T06:12:55Z",
  "data": {
    "resources": [
      {
        "digest": "sha256:954b378c375d852eb3c63ab88978f640b4348b01c1b3456a024a81536dafbbf4",
        "resource_url": "localhost/harbor/alpine@sha256:954b378c375d852eb3c63ab88978f640b4348b01c1b3456a024a81536dafbbf4",
        "scan_overview": {
          "application/vnd.security.vulnerability.report; version=1.1": {
            "report_id": "af0546c1-67dc-4e9d-927e-372900ead0df",
            "scan_status": "Success",
            "severity": "None",
            "duration": 8,
            "summary": {
              "total": 0,
              "fixable": 0,
              "summary": {}
            },
            "start_time": "2023-04-03T06:12:47Z",
            "end_time": "2023-04-03T06:12:55Z",
            "scanner": {
              "name": "Trivy",
              "vendor": "Aqua Security",
              "version": "v0.37.2"
            },
            "complete_percent": 100
          }
        }
      }
    ],
    "repository": {
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    }
  },
  "operator": "auto"
}
```

##### Scanning stopped

*Default*

```json
{
  "type": "SCANNING_STOPPED",
  "occur_at": 1680502334,
  "operator": "auto",
  "event_data": {
    "resources": [
      {
        "digest": "sha256:e802987f152d7826cf929ad4999fb3bb956ce7a30966aeb46c749f9120eaf22c",
        "resource_url": "localhost/harbor/alpine@sha256:e802987f152d7826cf929ad4999fb3bb956ce7a30966aeb46c749f9120eaf22c",
        "scan_overview": {
          "application/vnd.security.vulnerability.report; version=1.1": {
            "report_id": "bf92700b-fa5e-4fe4-891c-42b730c81151",
            "scan_status": "Stopped",
            "severity": "",
            "duration": 5,
            "summary": null,
            "start_time": "2023-04-03T06:12:09Z",
            "end_time": "2023-04-03T06:12:14Z",
            "complete_percent": 0
          }
        }
      }
    ],
    "repository": {
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    }
  }
}
```

*CloudEvents*

```json
{
  "specversion": "1.0",
  "id": "a8a03301-9e31-433f-ace3-240ac16f17b7",
  "requestid": "daea2f4d-7a08-400d-9eef-e5f726da976e",
  "source": "/projects/2/webhook/policies/15",
  "type": "harbor.scan.stopped",
  "datacontenttype": "application/json",
  "time": "2023-04-03T06:12:14Z",
  "data": {
    "resources": [
      {
        "digest": "sha256:e802987f152d7826cf929ad4999fb3bb956ce7a30966aeb46c749f9120eaf22c",
        "resource_url": "localhost/harbor/alpine@sha256:e802987f152d7826cf929ad4999fb3bb956ce7a30966aeb46c749f9120eaf22c",
        "scan_overview": {
          "application/vnd.security.vulnerability.report; version=1.1": {
            "report_id": "bf92700b-fa5e-4fe4-891c-42b730c81151",
            "scan_status": "Stopped",
            "severity": "",
            "duration": 5,
            "summary": null,
            "start_time": "2023-04-03T06:12:09Z",
            "end_time": "2023-04-03T06:12:14Z",
            "complete_percent": 0
          }
        }
      }
    ],
    "repository": {
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    }
  },
  "operator": "auto"
}
```


##### Scanning failed

*Default*

```json
{
  "type": "SCANNING_FAILED",
  "occur_at": 1680505885,
  "operator": "auto",
  "event_data": {
    "resources": [
      {
        "digest": "sha256:dabea2944dcc2b86482b4f0b0fb62da80e0673e900c46c0e03b45919881a5d84",
        "resource_url": "localhost/harbor/alpine@sha256:dabea2944dcc2b86482b4f0b0fb62da80e0673e900c46c0e03b45919881a5d84",
        "scan_overview": {
          "application/vnd.security.vulnerability.report; version=1.1": {
            "report_id": "a2573415-c727-4723-bc92-376c1d978637",
            "scan_status": "Error",
            "severity": "",
            "duration": 10,
            "summary": null,
            "start_time": "2023-04-03T07:11:15Z",
            "end_time": "2023-04-03T07:11:25Z",
            "complete_percent": 0
          }
        }
      }
    ],
    "repository": {
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    }
  }
}
```

*CloudEvents*

```json
{
  "specversion": "1.0",
  "id": "bdfe1de3-c069-4efc-b4f4-1a75c9a148c4",
  "requestid": "b28412fe-7934-42c8-9633-4d22d872d718",
  "source": "/projects/2/webhook/policies/15",
  "type": "harbor.scan.failed",
  "datacontenttype": "application/json",
  "time": "2023-04-03T07:11:25Z",
  "data": {
    "resources": [
      {
        "digest": "sha256:dabea2944dcc2b86482b4f0b0fb62da80e0673e900c46c0e03b45919881a5d84",
        "resource_url": "localhost/harbor/alpine@sha256:dabea2944dcc2b86482b4f0b0fb62da80e0673e900c46c0e03b45919881a5d84",
        "scan_overview": {
          "application/vnd.security.vulnerability.report; version=1.1": {
            "report_id": "a2573415-c727-4723-bc92-376c1d978637",
            "scan_status": "Error",
            "severity": "",
            "duration": 10,
            "summary": null,
            "start_time": "2023-04-03T07:11:15Z",
            "end_time": "2023-04-03T07:11:25Z",
            "complete_percent": 0
          }
        }
      }
    ],
    "repository": {
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    }
  },
  "operator": "auto"
}
```

##### Quota exceeded

*Default*

```json
{
  "type": "QUOTA_EXCEED",
  "occur_at": 1680505484,
  "operator": "",
  "event_data": {
    "resources": [
      {
        "digest": "sha256:402d21757a03a114d273bbe372fa4b9eca567e8b6c332fa7ebf982b902207242"
      }
    ],
    "repository": {
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    },
    "custom_attributes": {
      "Details": "adding 2.1 MiB of storage resource, which when updated to current usage of 8.3 MiB will exceed the configured upper limit of 10.0 MiB."
    }
  }
}
```

*CloudEvents*

```json
{
  "specversion": "1.0",
  "id": "81f243ce-699c-44d6-9dbe-b2ee5f10237a",
  "requestid": "4b9dcf9a-db23-460c-9b52-c9d994e362ee",
  "source": "/projects/2/webhook/policies/15",
  "type": "harbor.quota.exceeded",
  "datacontenttype": "application/json",
  "time": "2023-04-03T07:04:44Z",
  "data": {
    "resources": [
      {
        "digest": "sha256:402d21757a03a114d273bbe372fa4b9eca567e8b6c332fa7ebf982b902207242"
      }
    ],
    "repository": {
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    },
    "custom_attributes": {
      "Details": "adding 2.1 MiB of storage resource, which when updated to current usage of 8.3 MiB will exceed the configured upper limit of 10.0 MiB."
    }
  },
  "operator": ""
}
```

##### Quota near threshold

*Default*

```json
{
  "type": "QUOTA_WARNING",
  "occur_at": 1680505653,
  "operator": "",
  "event_data": {
    "resources": [
      {
        "digest": "sha256:514ec80ffbe1a2ab1d9a3d5e6082296296a1d8b6870246edf897228e5df2367d"
      }
    ],
    "repository": {
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    },
    "custom_attributes": {
      "Details": "quota usage reach 85%: resource storage used 12.6 MiB of 14.0 MiB"
    }
  }
}
```

*CloudEvents*

```json
{
  "specversion": "1.0",
  "id": "1267b437-ea5a-4e06-bbe5-75e6fde733d3",
  "requestid": "77eb6c26-f3e9-45d3-bd40-2fd9421c56cd",
  "source": "/projects/2/webhook/policies/15",
  "type": "harbor.quota.warned",
  "datacontenttype": "application/json",
  "time": "2023-04-03T07:07:33Z",
  "data": {
    "resources": [
      {
        "digest": "sha256:514ec80ffbe1a2ab1d9a3d5e6082296296a1d8b6870246edf897228e5df2367d"
      }
    ],
    "repository": {
      "name": "alpine",
      "namespace": "harbor",
      "repo_full_name": "harbor/alpine",
      "repo_type": "private"
    },
    "custom_attributes": {
      "Details": "quota usage reach 85%: resource storage used 12.6 MiB of 14.0 MiB"
    }
  },
  "operator": ""
}
```

##### Replication status changed

*Default*

```json
{
  "type": "REPLICATION",
  "occur_at": 1680501904,
  "operator": "MANUAL",
  "event_data": {
    "replication": {
      "harbor_hostname": "localhost",
      "job_status": "Success",
      "artifact_type": "image",
      "override_mode": true,
      "trigger_type": "MANUAL",
      "policy_creator": "admin",
      "execution_timestamp": 1680501881,
      "src_resource": {
        "registry_name": "hub",
        "registry_type": "docker-hub",
        "endpoint": "https://hub.docker.com",
        "namespace": "library"
      },
      "dest_resource": {
        "registry_type": "harbor",
        "endpoint": "http://localhost",
        "namespace": "harbor"
      },
      "successful_artifact": [
        {
          "type": "image",
          "status": "Success",
          "name_tag": "alpine [1 item(s) in total]"
        }
      ]
    }
  }
}
```

*CloudEvents*

```json
{
  "specversion": "1.0",
  "id": "e3005250-ffa8-4a10-af92-91fe25cca22c",
  "requestid": "0d896c4d-353a-422e-b43b-5067d98ec2a3",
  "source": "/projects/2/webhook/policies/15",
  "type": "harbor.replication.status.changed",
  "datacontenttype": "application/json",
  "time": "2023-04-03T06:05:04Z",
  "data": {
    "replication": {
      "harbor_hostname": "localhost",
      "job_status": "Success",
      "artifact_type": "image",
      "override_mode": true,
      "trigger_type": "MANUAL",
      "policy_creator": "admin",
      "execution_timestamp": 1680501881,
      "src_resource": {
        "registry_name": "hub",
        "registry_type": "docker-hub",
        "endpoint": "https://hub.docker.com",
        "namespace": "library"
      },
      "dest_resource": {
        "registry_type": "harbor",
        "endpoint": "http://localhost",
        "namespace": "harbor"
      },
      "successful_artifact": [
        {
          "type": "image",
          "status": "Success",
          "name_tag": "alpine [1 item(s) in total]"
        }
      ]
    }
  },
  "operator": "MANUAL"
}
```

##### Tag retention finished

*Default*

```json
{
  "type": "TAG_RETENTION",
  "occur_at": 1680502598,
  "operator": "MANUAL",
  "event_data": {
    "retention": {
      "total": 1,
      "retained": 0,
      "harbor_hostname": "localhost",
      "project_name": "harbor",
      "retention_policy_id": 2,
      "retention_rule": [
        {
          "template": "always",
          "tag_selectors": [
            {
              "kind": "doublestar",
              "decoration": "matches",
              "pattern": "xxxxxxxxxx",
              "extras": "{\"untagged\":true}"
            }
          ],
          "scope_selectors": {
            "repository": [
              {
                "kind": "doublestar",
                "decoration": "repoMatches",
                "pattern": "**",
                "extras": ""
              }
            ]
          }
        }
      ],
      "result": "SUCCESS",
      "deleted_artifact": [
        {
          "type": "image",
          "status": "SUCCESS",
          "name_tag": "alpine:3.8"
        }
      ]
    }
  }
}
```

*CloudEvents*

```json
{
  "specversion": "1.0",
  "id": "a8618595-6fa0-4cf4-afdc-870459b1d7f6",
  "requestid": "d71943e8-872d-40cd-b12a-f6bafcce1202",
  "source": "/projects/2/webhook/policies/15",
  "type": "harbor.tag_retention.finished",
  "datacontenttype": "application/json",
  "time": "2023-04-03T06:16:38Z",
  "data": {
    "retention": {
      "total": 1,
      "retained": 0,
      "harbor_hostname": "localhost",
      "project_name": "harbor",
      "retention_policy_id": 2,
      "retention_rule": [
        {
          "template": "always",
          "tag_selectors": [
            {
              "kind": "doublestar",
              "decoration": "matches",
              "pattern": "xxxxxxxxxx",
              "extras": "{\"untagged\":true}"
            }
          ],
          "scope_selectors": {
            "repository": [
              {
                "kind": "doublestar",
                "decoration": "repoMatches",
                "pattern": "**",
                "extras": ""
              }
            ]
          }
        }
      ],
      "result": "SUCCESS",
      "deleted_artifact": [
        {
          "type": "image",
          "status": "SUCCESS",
          "name_tag": "alpine:3.8"
        }
      ]
    }
  },
  "operator": "MANUAL"
}
```

Notice that only http type endpoint supports select `Default` or `CloudEvents` format, when you select the Slack type, and fill a Slack incoming webhook URL as endpoint, the message you received in Slack will be a rich text like the following.

```json
Harbor webhook events
event_type: PUSH_ARTIFACT
occur_at: April 15th at 11:59 AM
operator: admin
event_data:
{
    "resources": [
        {
            "digest": "sha256:8a9e9863dbb6e10edb5adfe917c00da84e1700fa76e7ed02476aa6e6fb8ee0d8",
            "tag": "latest",
            "resource_url": "hub.harbor.com/test-webhook/debian:latest"
        }
    ],
    "repository": {
        "date_created": 1586922308,
        "name": "debian",
        "namespace": "test-webhook",
        "repo_full_name": "test-webhook/debian",
        "repo_type": "private"
    }
}
```

### Webhook Endpoint Recommendations

There are two kinds of endpoints.  For `HTTP` the endpoint that receives the webhook should ideally have a webhook listener that is capable of interpreting the payload and acting upon the information it contains. For example, running a shell script.

And for Slack endpoint, you should follow the [guide of Slack incoming webhook](https://api.slack.com/messaging/webhooks).

### Example Use Cases

You can configure your continuous integration and development infrastructure so that it performs the following types of operations when it receives a webhook notification from Harbor.

- Artifact push:
  - Trigger a new build immediately following a push on selected repositories or tags.
  - Notify services or applications that use the artifact that a new artifact is available and pull it.
  - Scan the artifact using Trivy.
  - Replicate the artifact to remote registries.
- Image scanning:
  - If a vulnerability is found, rescan the image or replicate it to another registry.
  - If the scan passes, deploy the image.

### Configure Webhooks

1. Log in to the Harbor interface with an account that has at least project administrator privileges.

1. Go to **Projects**, select a project, and select **Webhooks**.

    ![Webhooks option](../../../img/webhook/navbar.png)

1. Select notify type `HTTP`, so the webhook will be send to a HTTP endpoint.

1. Select payload format as `Default` or `CloudEvents` when choose the `HTTP` notify type.

1. Select events that you want to subscribe.

1. Enter the URL for your webhook endpoint listener.

1. If your webhook listener implements authentication, enter the authentication header.

1. To implement `HTTPS POST` instead of `HTTP POST`, select the **Verifiy Remote Certficate** check box.

    ![Webhook URL](../../../img/webhook/policy.png)

1. Click **Add** to create the webhook.

You can modify the webhook, you can also `Enable` or `Deactivate` the webhook.

### Webhook Job Histories

1. Click the radio box of one webhook policy, then will list the recent webhook executions in the following section.

    ![Webhook executions](../../../img/webhook/executions.png)

1. Select one webhook execution, then will redirect to the tasks page under this execution.

    ![Webhook tasks](../../../img/webhook/tasks.png)

1. Click the log button of one task, then will redirect to the page to show the webhook job logs.

    ![Webhook logs](../../../img/webhook/job_log.png)

If a webhook notification fails to send, or if it receives an HTTP error response with a code other than `2xx`, the notification is re-sent based on the configuration that you set in `harbor.yml`.

*Docker Compose*

```yaml
notification:
  # Maximum retry count for webhook job
  # Increase or decrease the retry count when webhook job failed, pay attention that a high number of retries can put pressure on the webhook job queue
  webhook_job_max_retry: 3
  # HTTP client timeout for webhook job
  # Increase the timeout if the webhook endpoint cannot respond to harbor within the specified timeout
  webhook_job_http_client_timeout: 3 #seconds
```

*Helm*

```yaml
jobservice:
  notification:
    # Maximum retry count for webhook job
    # Increase or decrease the retry count when webhook job failed, pay attention that a high number of retries can put pressure on the webhook job queue
    webhook_job_max_retry: 3
    # HTTP client timeout for webhook job
    # Increase the timeout if the webhook endpoint cannot respond to harbor within the specified timeout
    webhook_job_http_client_timeout: 3 # in seconds
```

### Globally Enable and Deactivate Webhooks

As a Harbor system administrator, you can enable and deactivate webhook notifications for all projects.

1. Go to **Configuration** > **System Settings**.
1. Scroll down and check or uncheck the **Webhooks enabled** check box.

    ![Enable/disable webhooks](../../../img/webhook/global_config.png)
