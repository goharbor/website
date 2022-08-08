---
title: Distributed Tracing
weight: 37
---

Observability is a key feature for operating a service in production, allowing you to identify abnormal statuses and make informed decisions to fix issues when an error occurs. Distributed tracing is key element of observability in modern application. Harbor can provide distributed tracing data for operators and administrators to understand the current running status and to help with troubleshooting. Harbor expose tracing data using the [OpenTelemetry](https://opentelemetry.io/) SDK so you can easily export traces via the otel protocol, which can be consumed by the [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/) for export to many on-prem or cloud trace backends. Because of the popularity of [Jaeger](https://www.jaegertracing.io), Harbor also can expose tracing data to the Jaeger backend directly.

In Harbor v2.4 and later you are able to enable distributed tracing in your Harbor [configuration file](../../install-config/configure-yml-file.md). Only one exporter is supported at a time; if tracing is enabled, you must set one and you cannot set both. If you want to send data to multiple exporters, you can set otel as the exporter and leverage the OpenTelemetry Collector to retransmit to multiple exporters. Similarly, the Jaeger exporter supports agent mode and endpoint mode, but only one mode can enabled at a time.

# Exposed data

Tracing data are exposed by serveral Harbor components: `core`, `jobservice`, `registry`. The following sections list the available Harbor trace data.

| Data                     | Component   | Example                                                      |
| :----------------------- | :---------- | :----------------------------------------------------------- |
| Received HTTP Request    | Core        | Every HTTP request (like operation on harbor UI, push image, etc. ) |
| Client Sent HTTP Request | Core        | core access other services via HTTP(like health check, proxy to chartmuseum, call job service API, etc.) |
| Request ID               | Core        | Every http tracing will added a `X-Request-ID` , which will help to find the log |
| Database Transaction     | Core        | Every Operation that triggered DB transaction(like create project, push image to harbor, etc) |
| Received HTTP Request    | Jobservice  | Every HTTP request(like health check, call from core, etc.)  |
| Client Sent HTTP Request | Jobservice  | jobservice access other services via HTTP(like replication job calling core API to push image, GC job calling registryctl API, etc.) |
| backend jobs             | Jobservice  | Any job ran by jobservice                                    |
| Received HTTP Request    | Registryctl | Every HTTP request(like health check from core, call from jobservice, etc.) |

