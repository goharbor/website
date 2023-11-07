---
title: Access Metrics
weight: 37
---

Harbor exposes some key metrics needed for operators and administrators to monitor how your Harbor instance is running in real time. Observability is a key feature for operating a service in production and using this data you can identify abnormal statuses and make informed decisions to fix issues when an error occurs. Harbor exposes metrics using the  [Prometheus data model](https://prometheus.io/docs/concepts/data_model/) so you can easily start scraping your Harbor instance's metrics using Prometheus.

In Harbor v2.2 and later you are able to enable metrics in your Harbor [configuration file](../../install-config/configure-yml-file.md). Harbor metrics are available at `<harbor_instance>:<metrics_port>/<metrics_path>` based on your configured values.

Harbor metrics show data related to
* Runtime information from the [GO library](https://github.com/prometheus/client_golang)
* Performance metrics about all API requests in core
* Number of requests in flight in core
* Metrics provided by the [docker distribution](https://github.com/distribution/distribution/blob/main/notifications/metrics.go) itself
* Some data related to business logic which already exist in the Harbor database

Metrics are exposed by several Harbor components: `exporter`, `core`, `jobservice`, and `registry`. In addition to runtime and performance data, these components also expose Harbor specific metrics. The following sections list the available Harbor metrics.

## Harbor Exporter Metrics

The `exporter` component metrics relate to your Harbor instance configuration and collects some data from the Harbor database. Metrics are available at `<harbor_instance>:<metrics_port>/<metrics_path>`.

{{< table caption="Metrics exposed by the Harbor Exporter" >}}
Name | Description | Labels (Values) | Metric type
:---------|:------------|:-------|:-------
`harbor_project_total` |	Total number of public and private projects | public (`true`,`false`) | gauge
`harbor_project_repo_total` |	Total number of repositories in a project |	public (`true`,`false`),  project_name | gauge
`harbor_project_member_total` |	Total number of members in a project |	project_name | gauge
`harbor_project_quota_usage_byte` |	Total used resources of a project |	project_name | gauge
`harbor_project_quota_byte` |	Quota set in a project |	project_name | gauge
`harbor_artifact_pulled` |	Number of images pulled in a project |	project_name | gauge
`harbor_project_artifact_total` | Total number of artifacts type in a project | artifact_type , project_name, public (`true`,`false`) | gauge
`harbor_health` | Current status of Harbor | | gauge
`harbor_system_info` | Information about your Harbor instance | auth_mode (`db_auth`, `ldap_auth`, `uaa_auth`, `http_auth`, `oidc_auth`), harbor_version, self_registration(`true`,`false`) | gauge
`harbor_up`| Running status of Harbor components  | component (`chartmuseum`, `core`, `database`, `jobservice`, `portal`, `redis`, `registry`, `registryctl`, `trivy`) | gauge
`harbor_task_queue_size` | The total number of tasks per type in the queue | instance, job, type  | gauge
`harbor_task_queue_latency` | How long ago the next job to be processed was enqueued per type | instance, job, type | gauge
`harbor_task_scheduled_total` | 	Number of scheduled tasks | instance, job | gauge
`harbor_task_concurrency` | 	Total number of concurrent tasks per type on a pool | instance, job, pool, type | gauge
{{< /table >}}

## Harbor Core Metrics

The following are metrics pulled from the Harbor core pod and are available at `<harbor_instance>:<metrics_port>/<metrics_path>?comp=core`.

{{< table caption="Metrics exposed by Harbor Core" >}}
Name | Description | Labels (Values) | Metric type
:---------|:------------|:-------|:-------
`harbor_core_http_inflight_requests` | The total number of requests | operation (values from `operationId` in [Harbor API](https://github.com/goharbor/harbor/blob/main/api/v2.0/swagger.yaml). Some legacy endpoints do not have an `operationId`, so the label value is `unknown`) | gauge
`harbor_core_http_request_duration_seconds` | The time duration of the requests | method (`GET`, `POST`, `HEAD`, `PATCH`, `PUT`), operation (values from `operationId` in [Harbor API](https://github.com/goharbor/harbor/blob/main/api/v2.0/swagger.yaml). Some legacy endpoints do not have an `operationId`, so the label value is `unknown`), quantile | summary
`harbor_core_http_request_total` | The total number of requests | method (`GET`, `POST`, `HEAD`, `PATCH`, `PUT`), operation (values from `operationId` in [Harbor API](https://github.com/goharbor/harbor/blob/main/api/v2.0/swagger.yaml). Some legacy endpoints do not have an `operationId`, so the label value is `unknown`) | counter
{{< /table >}}

## Registry Metrics

The following are metrics pulled from the Docker distribution and are available at `<harbor_instance>:<metrics_port>/<metrics_path>?comp=registry`.

{{< table caption="Metrics exposed by Harbor Core" >}}
Name | Description | Labels (Values) |Metric type
:---------|:------------|:-------|:-------
`registry_http_in_flight_requests` | The in-flight HTTP requests | handler | gauge
`registry_http_request_duration_seconds_bucket` `registry_http_request_duration_seconds_sum` `registry_http_request_duration_seconds_count` | The HTTP request latencies in seconds | handler, method (`GET`, `POST`, `HEAD`, `PATCH`, `PUT`), le | histogram
`registry_http_request_size_bytes_bucket registry_http_request_size_bytes_sum registry_http_request_size_bytes_count` | The HTTP request sizes in bytes | handler, le | histogram
`registry_http_requests_total` | Total number of HTTP requests made | code,handler,method,le | counter
`registry_http_response_size_bytes_bucket` `registry_http_response_size_bytes_sum` `registry_http_response_size_bytes_count` | The HTTP response sizes in bytes | handler,le | histogram
`registry_storage_action_seconds_bucket` `registry_storage_action_seconds_sum` `registry_storage_action_seconds_count`| The number of seconds that the storage action takes | action,driver,le | histogram
`registry_storage_cache_total` | The number of cache request received | type | gauge
{{< /table >}}

## Harbor Jobservice metrics

The following are metrics pulled from the Harbor Jobservice and are available at `<harbor_instance>:<metrics_port>/<metrics_path>?comp=jobservice`.

{{< table caption="Metrics exposed by Harbor Jobservice" >}}
Name | Description | Labels (Values) |Metric type
:---------|:------------|:-------|:-------
`harbor_jobservice_info` |  The information of Jobservice | instance, job, node, pool, workers | gauge
`harbor_jobservice_task_total` |  The number of processed tasks per job type | instance, job, status, type | counter
`harbor_jobservice_task_process_time_seconds` | The duration of the task processing time | instance, job, quantile, status, type | summary

{{< /table >}}



## Scraping Metrics with Prometheus

To begin accessing your Harbor instance's metrics with Prometheus,
1. Enable exposing metrics in your `harbor.yml` [configuration file](../../install-config/configure-yml-file.md) and set the port and path for metrics to be exposed on. Also see more about [reconfiguring your Harbor instance](../../install-config/reconfigure-manage-lifecycle/).
1. Set up a Prometheus server, see the [Prometheus documentation](https://prometheus.io/docs/prometheus/latest/installation/) for more information on installing.  
1. Configure your Prometheus config file to scrape Harbor metrics exposed at your configured port and path. Below is an example scrape config, see the Prometheus documentation for all available [scrape configuration options](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#scrape_config).

    ```
      scrape_configs:

        - job_name: 'harbor-exporter'
          scrape_interval: 20s
          static_configs:
            # Scrape metrics from the Harbor exporter component
            - targets: ['<harbor_instance>:<metrics_port>']

        - job_name: 'harbor-core'
          scrape_interval: 20s
          params:
            # Scrape metrics from the Harbor core component
            comp: ['core']
          static_configs:
            - targets: ['<harbor_instance>:<metrics_port>']

        - job_name: 'harbor-registry'
          scrape_interval: 20s
          params:
            # Scrape metrics from the Harbor registry component
            comp: ['registry']
          static_configs:
            - targets: ['<harbor_instance>:<metrics_port>']

        - job_name: 'harbor-jobservice'
          scrape_interval: 20s
          params:
            # Scrape metrics from the Harbor jobservice component
            comp: ['jobservice']
          static_configs:
            - targets: ['<harbor_instance>:<metrics_port>']
      ```
1. Once you have configured your Prometheus server to collect your Harbor metrics, you can use [Grafana](https://grafana.com/docs/) to visualize your data. An [example Grafana dashboard](https://github.com/goharbor/harbor/blob/main/contrib/grafana-dashboard/metrics-example.json) is available in the Harbor repo to help you get started visualizing Harbor metrics.  

### From a Kubernetes cluster

You can also use Prometheus to collect metrics from a Harbor instance deployed in your Kubernetes cluster. You should already have [installed  Prometheus](https://github.com/prometheus-community/helm-charts) and set up to pull metrics from your cluster.

1. Create a ServiceMonitor in Prometheus for Harbor.

    ```
    apiVersion: monitoring.coreos.com/v1
    kind: ServiceMonitor
    metadata:
      name: harbor
      labels:
        app: harbor
    spec:
      selector:
        matchLabels:
          app: harbor
      endpoints:
      - port: metrics
    ```

2. Enable Harbor to expose metrics by updating your harbor-helm `values.yaml` file and set `metrics.enabled` to `true`. You can also edit the port and path the metrics are exposed on by updating the available harbor-helm chart [configuration options for metrics](https://github.com/goharbor/harbor-helm#configuration).

Prometheus should now show your Harbor instance's metrics.  
