---
title: Harbor Metrics
weight: 37
---

Harbor exposes some key metrics needed for operators and administrators to monitor how your Harbor instance is running in real time. Observability is a key feature for operating a service in production and using this data you can identify abnormal statuses and make informed decisions to fix issues when an error occurs. Harbor exposes metrics as  [Prometheus](https://prometheus.io/docs/introduction/overview/) templates.

In Harbor v2.2 and later you are able to enable metrics in your Harbor [configuration file](../../install-config/configure-yml-file.md). Harbor metrics are available at `<harbor_instance>:<metrics_port>/<metrics_path>` based on your configured values.

Harbor metrics show data related to
* Runtime information from the [GO library](https://github.com/prometheus/client_golang)
* Performance metrics about all API requests in core
* Number of requests in flight in core
* Metrics provided by the [docker distribution](https://github.com/distribution/distribution/blob/main/notifications/metrics.go) itself
* Some data related to business logic which already exist in the Harbor database

Metrics are exposed by three components: `exporter`, `core` and `registry`. In addition to runtime and performance data, these components expose Harbor specific metrics. Thee following sections list the available Harbor metrics.

## Harbor Exporter Metrics

The `exporter` component metrics relate to your Harbor instance configuration and collects some data from the Harbor database. Metrics are available at `<harbor_instance>:<metrics_port>/<metrics_path>`.

{{< table caption="Metrics exposed by the Harbor Exporter" >}}
Name | Description | Labels | Metric type
:---------|:------------|:-------|:-------
`harbor_project_total` |	Total number of public and private projects | public (`true`,`false`) | gauge
`harbor_project_repo_total` |	Total number of repositories in a project |	public (`true`,`false`),  project_name | gauge
`harbor_project_member_total` |	Total number of members in a project |	project_name | gauge
`harbor_project_quota_usage_byte` |	Total used resources of a project |	project_name | gauge
`harbor_project_quota_byte` |	Quota set in a project |	project_name | gauge
`harbor_artifact_pulled` |	Number of images pulled in a project |	project_name | gauge
`harbor_project_artifact_total` | Total number of artifacts type in a project | artifact_type , project_name, public (`true`,`false`) | gauge
`harbor_health` | Current status of Harbor | | gauge
`harbor_system_info` | Information about your Harbor instance | auth_mode, harbor_version, self_registration(`true`,`false`) | gauge
`harbor_up`| Running status of Harbor components  | component (`chartmuseum`, `core`, `database`, `jobservice`, `portal`, `redis`, `registry`, `registryctl`, `trivy`) | gauge
{{< /table >}}

## Harbor Core Metrics

The following are metrics pulled from the Harbor core pod and are available at `<harbor_instance>:<metrics_port>/<metrics_path>?comp=core`.

{{< table caption="Metrics exposed by Harbor Core" >}}
Name | Description | Labels | Metric type
:---------|:------------|:-------|:-------
`harbor_core_http_inflight_requests` | The total number of requests | operation | gauge
`harbor_core_http_request_duration_seconds` | The time duration of the requests | method (`GET`, `POST`, `HEAD`, `PATCH`, `PUT`), operation, quantile | summary
`harbor_core_http_request_total` | The total number of requests | method (`GET`, `POST`, `HEAD`, `PATCH`, `PUT`), operation | counter
{{< /table >}}

## Registry Metrics

The following are metrics pulled from the Docker distribution and are available at `<harbor_instance>:<metrics_port>/<metrics_path>?comp=registry`.

{{< table caption="Metrics exposed by Harbor Core" >}}
Name | Description | Labels |Metric type
:---------|:------------|:-------|:-------
`registry_http_in_flight_requests` | The in-flight HTTP requests | handler | gauge
`registry_http_request_duration_seconds` | The HTTP request latencies in seconds | handler, method (`GET`, `POST`, `HEAD`, `PATCH`, `PUT`), le | histogram
`registry_http_request_size_bytes` | The HTTP request sizes in bytes. | handler, le | histogram
{{< /table >}}

## Scrapping Metrics with Prometheus

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
      ```
1. Once you have configured your Prometheus server to collect your Harbor metrics, you can use [Grafana](https://grafana.com/docs/) to visualize your data.  
