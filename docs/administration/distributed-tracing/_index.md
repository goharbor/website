---
title: Distributed Tracing
weight: 37
---

Observability is a key feature for operating a service in production and using this data you can identify abnormal statuses and make informed decisions to fix issues when an error occurs. The distributed tracing is key element of observability in modern application. Harbor can provide distributed tracing data for operators and administrator to know the current running status and to help  troubleshooting.  Harbor expose tracing data using the [OpenTelemetry](https://opentelemetry.io/) sdk, you can eazily export traces via Otel protocol which can comsumed by [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/) then expose to almost the on-prem or cloud trace backend. Because of the popularity [Jaeger](https://www.jaegertracing.io), Harbor also can expose tracing data to Jaeger backend directly.

In harbor v2.4 and later you are able to enable distributed tracing in you Harbor [configuration file](../../install-config/configure-yml-file.md). But we only support one exporter at a time( you can not set bosh or none of them if you enabled tracing). You can set otel as exporter and leveraging OpenTelemetry Collector to retransmit to multiple backend if you want to send data to multiple exporter. And similarly, Jaeger exporter  support agent mode and endpoint mode, but only one mode can enabled at a time.

# Exposed data

Tracing data are exposed by serveral Harbor components: `core`, `jobservice`, `registry`. The following sections list the available Harbor trace data.

| Data                     | Component   | Example                                                      |
| :----------------------- | :---------- | :----------------------------------------------------------- |
| Received HTTP Request    | Core        | Every HTTP request (like operation on harbor UI, push image, etc. ) |
| Client Sent HTTP Request | Core        | core access other services via HTTP(like health check, call job service API, etc.) |
| Request ID               | Core        | Every http tracing will added a `X-Request-ID` , which will help to find the log |
| Database Transaction     | Core        | Every Operation that triggered DB transaction(like create project, push image to harbor, etc) |
| Received HTTP Request    | Jobservice  | Every HTTP request(like health check, call from core, etc.)  |
| Client Sent HTTP Request | Jobservice  | jobservice access other services via HTTP(like replication job calling core API to push image, GC job calling registryctl API, etc.) |
| backend jobs             | Jobservice  | Any job ran by jobservice                                    |
| Received HTTP Request    | Registryctl | Every HTTP request(like health check from core, call from jobservice, etc.) |

