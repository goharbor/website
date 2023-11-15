---
title: Configure the Harbor YML File
weight: 35
---

You set system level parameters for Harbor in the `harbor.yml` file that is contained in the installer package. These parameters take effect when you run the `install.sh` script to install or reconfigure Harbor.

After the initial deployment and after you have started Harbor, you perform additional configuration in the Harbor Web Portal.

## Required Parameters

The table below lists the parameters that must be set when you deploy Harbor. By default, all of the required parameters are uncommented in the `harbor.yml` file. The optional parameters are commented with `#`. You do not necessarily need to change the values of the required parameters from the defaults that are provided, but these parameters must remain uncommented. At the very least, you must update the `hostname` parameter.

**IMPORTANT**: Harbor does not ship with any certificates. In versions up to and including 1.9.x, by default Harbor uses HTTP to serve registry requests. This is acceptable only in air-gapped test or development environments. In production environments, always use HTTPS.

You can use certificates that are signed by a trusted third-party CA, or you can use self-signed certificates. For information about how to create a CA, and how to use a CA to sign a server certificate and a client certificate, see [Configuring Harbor with HTTPS Access](configure-https.md).

<table border="0">
  <caption>
    Required Parameters for Harbor Deployment
  </caption>
  <tr>
    <th scope="col">Parameter</th>
    <th scope="col">Sub-parameters</th>
    <th scope="col">Description and Additional Parameters </th>
  </tr>
  <tr>
    <td valign="top"><code>hostname</code></td>
    <td valign="top">None</td>
    <td valign="top">Specify the IP address or the fully qualified domain name (FQDN) of the target host on which to deploy Harbor. This is the address at which you access the Harbor Portal and the registry service. For example, <code>192.168.1.10</code> or <code>reg.yourdomain.com</code>. The registry service must be accessible to external clients, so do not specify <code>localhost</code>, <code>127.0.0.1</code>, or <code>0.0.0.0</code> as the hostname.</td>
  </tr>
  <tr>
    <td valign="top"><code>http</code></td>
    <td valign="top">&nbsp;</td>
    <td valign="top">Do not use HTTP in production environments. Using HTTP is acceptable only in air-gapped test or development environments that do not have a connection to the external internet. Using HTTP in environments that are not air-gapped exposes you to man-in-the-middle attacks.</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>port</code></td>
    <td valign="top">Port number for HTTP, for both Harbor portal and Docker commands. The default is 80.</td>
  </tr>
  <tr>
    <td valign="top"><code>https</code></td>
    <td valign="top">&nbsp;</td>
    <td valign="top">Use HTTPS to access the Harbor Portal and the token/notification service. Always use HTTPS in production environments and environments that are not air-gapped.
      </td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>port</code></td>
    <td valign="top">The port number for HTTPS, for both Harbor portal and Docker commands. The default is 443.</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>certificate</code></td>
    <td valign="top">The path to the SSL certificate.</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>private_key</code></td>
    <td valign="top">The path to the SSL key.</td>
  </tr>

  <tr>
    <td valign="top"><code>internal_tls</code></td>
    <td valign="top">&nbsp;</td>
    <td valign="top"> Use HTTPS to communicate between harbor components</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>enabled</code></td>
    <td valign="top">Set this flag to <code>true</code> means internal tls is enabled</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>dir</code></td>
    <td valign="top">The path to the directory that contains internal certs and keys</td>
  </tr>

  <tr>
    <td valign="top"><code>harbor_admin_password</code></td>
    <td valign="top">None</td>
    <td valign="top">Set an initial password for the Harbor system administrator. This password is only used on the first time that Harbor starts. On subsequent logins, this setting is ignored and the administrator's password is set in the Harbor Portal. The default username and password are <code>admin</code> and <code>Harbor12345</code>.</td>
  </tr>
  <tr>
    <td valign="top"><code>database</code></td>
    <td valign="top">&nbsp;</td>
    <td valign="top">Use a local PostgreSQL database. You can optionally configure an external database, in which case you can deactivate this option.</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>password</code></td>
    <td valign="top">Set the root password for the local database. You must change this password for production deployments.</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>max_idle_conns</code></td>
    <td valign="top">The maximum number of connections in the idle connection pool. If it <=0, no idle connections are retained.</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>max_open_conns</code></td>
    <td valign="top">The maximum number of open connections to the database. If it <= 0, then there is no limit on the number of open connections.</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>conn_max_lifetime</code></td>
    <td valign="top">The maximum amount of time a connection may be reused. If it <= 0, connections are not closed due to a connection's age.</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>conn_max_idle_time</code></td>
    <td valign="top">The maximum amount of time a connection may be idle. If it <= 0, connections are not closed due to a connection's idle time.</td>
  </tr>
  <tr>
    <td valign="top"><code>data_volume</code></td>
    <td valign="top">None</td>
    <td valign="top">The location on the target host in which to store Harbor's data. This data remains unchanged even when Harbor's containers are removed and/or recreated. You can optionally configure external storage, in which case deactivate this option and enable <code>storage_service</code>. The default is <code>/data</code>.</td>
  </tr>
  <tr>
    <td valign="top"><code>trivy</code></td>
    <td valign="top">&nbsp;</td>
    <td valign="top">Configure Trivy scanner.</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>ignore_unfixed</code></td>
    <td valign="top">Set the flag to <code>true</code> to display only fixed vulnerabilities. The default value is <code>false</code></td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>security_check</code></td>
    <td valign="top">Comma-separated list of what security issues to detect. Possible values are <code>vuln</code>, <code>config</code> and <code>secret</code>. Defaults to <code>vuln</code>.</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>skip_update</code></td>
    <td valign="top">You might want to enable this flag in test or CI/CD environments to avoid GitHub rate limiting issues. If the flag is enabled you have to download the <code>trivy-offline.tar.gz</code> archive manually, extract and the <code>trivy.db</code> and <code>metadata.json</code> files and mount them in the <code>/home/scanner/.cache/trivy/db/trivy.db</code> path in container. The default value is <code>false</code></td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>insecure</code></td>
    <td valign="top">Set the flag to <code>true</code> to skip verifying registry certificate. The default value is <code>false</code></td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>github_token</code></td>
    <td valign="top">Set the GitHub access token to download Trivy DB. Trivy DB is downloaded by Trivy from the GitHub release page. Anonymous downloads from GitHub are subject to the limit of 60 requests per hour. Normally such rate limit is enough for production operations. If, for any reason, it's not enough, you could increase the rate limit to 5000 requests per hour by specifying the GitHub access token. For more details on GitHub rate limiting please consult https://developer.github.com/v3/#rate-limiting .You can create a GitHub token by following the instructions in https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line</td>
  </tr>
  <tr>
    <td valign="top"><code>jobservice</code></td>
    <td valign="top"><code>max_job_workers</code></td>
    <td valign="top">The maximum number of replication workers in the job service. For each image replication job, a worker synchronizes all tags of a repository to the remote destination. Increasing this number allows more concurrent replication jobs in the system. However, since each worker consumes a certain amount of network/CPU/IO resources, set the value of this attribute based on the hardware resource of the host. The default is 10.</td>
  </tr>
<tr>
    <td valign="top"><code>notification</code></td>
    <td valign="top"><code>webhook_job_max_retry</code></td>
    <td valign="top">Set the maximum number of retries for web hook jobs. The default is 10.</td>
  </tr>
  <tr>
    <td valign="top"><code>log</code></td>
    <td valign="top">&nbsp;</td>
    <td valign="top">Configure logging. Harbor uses `rsyslog` to collect the logs for each container.</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>level</code></td>
    <td valign="top">Set the logging level to <code>debug</code>, <code>info</code>, <code>warning</code>, <code>error</code>, or <code>fatal</code>. The default is <code>info</code>.</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>local</code></td>
    <td valign="top">Set the log retention parameters:<ul>
          <li><code>rotate_count</code>: Log files are rotated <code>rotate_count</code> times before being removed. If count is 0, old versions are removed rather than rotated. The default is 50.</li>
          <li><code>rotate_size</code>: Log files are rotated only if they grow bigger than <code>rotate_size</code> bytes. Use <code>k</code> for kilobytes, <code>M</code> for megabytes, and <code>G</code> for gigabytes.  <code>100</code>, <code>100k</code>, <code>100M</code> and <code>100G</code> are all valid values. The default is 200M.</li>
          <li><code>location</code>: Set the directory in which to store the logs. The default is <code>/var/log/harbor</code>.</li>
        </ul></td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>external_endpoint</code></td>
    <td valign="top">Enable this option to forward logs to a syslog server.
      <ul>
        <li><code>protocol</code>: Transport protocol for the syslog server. Default is TCP.</li>
        <li><code>host</code>: The URL of the syslog server.</li>
        <li><code>port</code>: The port on which the syslog server listens</li>
    </ul>    </td>
  </tr>
  <tr>
    <td valign="top"><code>proxy</code></td>
    <td valign="top">&nbsp;</td>
    <td valign="top">Configure proxies to be used by trivy-adapter, the replication jobservice, and Harbor. Leave blank if no proxies are required. Some proxies have whitelist settings, if Trivy is enabled, you need to add the following urls to the proxy server whitelist: <code>github.com</code>, <code>github-releases.githubusercontent.com</code>, and <code>*.s3.amazonaws.com.</code></td>
  </tr>
    <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>http_proxy</code></td>
    <td valign="top">Configure an HTTP proxy, for example,  <code>http://my.proxy.com:3128</code>.</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>https_proxy</code></td>
    <td valign="top">Configure an HTTPS proxy, for example,  <code>http://my.proxy.com:3128</code>.</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>no_proxy</code></td>
    <td valign="top">Configure when not to use a proxy, for example, <code>127.0.0.1,localhost,core,registry</code>.</td>
  </tr>
  <tr>
    <td valign="top"><code>cache</code></td>
    <td valign="top">&nbsp;</td>
    <td valign="top">Configure cache layer for your Harbor instance. When enabled, Harbor will cache some Harbor resources (for example, artifacts, projects, or project metadata) using Redis, reducing the amount of time and resources used for repeated requests for the same Harbor resource. It's strongly recommended that you enable this feature on Harbor instances with high concurrent pull request rates to improve Harbor's overall performance. For more details on the cache layer implementation and performance improvements, see the <a href="https://github.com/goharbor/perf/wiki/Cache-layer">Cache Layer wiki page</a>.</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>enabled</code></td>
    <td valign="top">Default is <code>false</code>, set to <code>true</code> to enable Harbor's cache layer.</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>expire_hours</code></td>
    <td valign="top">Configure the cache expiration limit in hours. Default is 24. </td>
  </tr>
</table>

## Optional Parameters

The following table lists the additional, optional parameters that you can set to configure your Harbor deployment beyond the minimum required settings. To enable a setting, you must uncomment it in `harbor.yml` by deleting the leading `#` character.

<table border="0">
  <caption>
    Optional Parameters for Harbor
  </caption>
  <tr>
    <th scope="col">Parameter</th>
    <th scope="col">Sub-Parameters</th>
    <th scope="col">Description and Additional Parameters </th>
  </tr>
  <tr>
    <td valign="top"><code>external_url</code></td>
    <td valign="top">None</td>
    <td valign="top">Enable this option to use an external proxy. When  enabled, the hostname is no longer used.</td>
  </tr>
  <tr>
  <tr>
    <td valign="top"><code>storage_service</code></td>
    <td valign="top">&nbsp;</td>
    <td valign="top">By default, Harbor stores images and charts on your local filesystem. In a production environment, you might want to use another storage backend instead of the local filesystem. The parameters listed below are the configurations for the registry. See *Configuring Storage Backend* below for more information about how to configure a different backend.</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>ca_bundle</code></td>
    <td valign="top">The path to the custom root CA certificate, which is injected into the trust store of registry and chart repository containers. This is usually needed if internal storage uses a self signed certificate.</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>filesystem</code></td>
    <td valign="top">The default is <code>filesystem</code>, but you can set <code>azure</code>, <code>gcs</code>, <code>s3</code>, <code>swift</code> and <code>oss</code>. For information about how to configure other backends, see <a href="#backend">Configuring a Storage Backend</a> below. Set <code>maxthreads</code> to limit the number of threads to the external provider. The default is 100.</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>redirect</code></td>
    <td valign="top">Set <code>deactivate</code> to <code>true</code> when you want to deactivate registry redirect</td>
  </tr>
  <tr>
    <td valign="top"><code>external_database</code></td>
    <td valign="top">&nbsp;</td>
    <td valign="top">Configure external database settings, if you deactivate the local database option. Currently, Harbor only supports PostgreSQL database. You must create a database for Harbor core. The tables are generated automatically when Harbor starts up.</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>harbor</code></td>
    <td valign="top"><p>Configure an external database for Harbor data.</p>
      <ul>
        <li><code>host</code>: Hostname of the Harbor database.</li>
        <li><code>port</code>: Database port.</li>
        <li><code>db_name</code>: Database name.</li>
        <li><code>username</code>: Username to connect to the core Harbor database.</li>
        <li><code>password</code>: Password for the account you set in <code>username</code>.</li>
        <li><code>ssl_mode</code>: Enable SSL mode.</li>
        <li><code>max_idle_conns</code>: The maximum number of connections in the idle connection pool. If &lt;=0 no idle connections are retained. The default value is 2.</li>
        <li><code>max_open_conns</code>: The maximum number of open connections to the database. If &lt;= 0 there is no limit on the number of open connections. The default value is 0.</li>
    </ul>      </td>
  </tr>
  <tr>
    <td valign="top"><code>external_redis</code></td>
    <td valign="top">&nbsp;</td>
    <td valign="top">Configure an external Redis instance.</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>host</code></td>
    <td valign="top">redis_host:redis_port of the external Redis instance. If you are using Sentinel mode, this part should be host_sentinel1:port_sentinel1,host_sentinel2:port_sentinel2</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>sentinel_master_set</code></td>
    <td valign="top">Only set this when using Sentinel mode</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>password</code></td>
    <td valign="top">Password to connect to the external Redis instance.</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>registry_db_index</code></td>
    <td valign="top">Database index for Harbor registry.</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>jobservice_db_index</code></td>
    <td valign="top">Database index for jobservice.</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>chartmuseum_db_index</code></td>
    <td valign="top">Database index for Chart museum.</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>trivy_db_index</code></td>
    <td valign="top">Database index for Trivy adapter.</td>
  </tr>
  <tr>
    <td valign="top"><code>metric</code></td>
    <td valign="top">&nbsp;</td>
    <td valign="top">Configure exposing Harbor instance metrics to a specified port and path</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>enabled</code></td>
    <td valign="top">Enable exposing metrics on your Harbor instance by setting this to <code>true</code>. Default is <code>false</code></td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>port</code></td>
    <td valign="top">Port metrics are exposed on. Default is <code>9090</code></td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>path</code></td>
    <td valign="top">Path metrics are exposed on. Default is <code>/metrics</code></td>
  </tr>
  <tr>
    <td valign="top"><code>trace</code></td>
    <td valign="top">&nbsp;</td>
    <td valign="top">Configure exposing Distributed tracing data</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>enabled</code></td>
    <td valign="top">Enable exposing tracing on your Harbor instance by setting this to <code>true</code>. Default is <code>false</code></td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>sample_rate</code></td>
    <td valign="top">Set the sample rate of tracing. For example, set sample_rate to <code>1</code> if you wanna sampling 100% of trace data; set <code>0.5</code> if you wanna sampling 50% of trace data, and so forth </td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>namespace</code></td>
    <td valign="top">Namespace used to differenciate different harbor services, which will set to attribute with key <code>service.namespace</code></td>
  </tr>
    <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>attributes</code></td>
    <td valign="top">The attributes is a key value dict contains user defined customized attributes used to initialize trace provider, and all of these atributes will added to trace data</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>jaeger</code></td>
    <td valign="top"><ul>
      <li><code>endpoint</code>: The url of endpoint(for example <code>http://127.0.0.1:14268/api/traces</code>). set endpoint means export to jaeger collector via http.</li>
      <li><code>username:</code>: Username used to connect endpoint. Left empty if not needed.</li>
      <li><code>password:</code>: Password used to connect endpoint. Left empty if not needed.</li>
      <li><code>agent_host</code>: The host name of jaeger agent. Set agent_host means export data to jaeger agent via udp. </li>
      <li><code>agent_port:</code>: The port name of jaeger agent.</li>
    </ul></td>
  </tr>
   <tr>
    <td valign="top">&nbsp;</td>
    <td valign="top"><code>otel</code></td>
    <td valign="top"><ul>
      <li><code>endpoint</code>: The hostname and port for otel compitable backend(for example <code>127.0.0.1:4318</code>).</li>
      <li><code>url_path:</code>: The url path of endpoint(for example <code>127.0.0.1:4318</code>) </li>
      <li><code>compression:</code>: If enabling data compression</li>
      <li><code>insecure</code>: Ignore cert verification for otel backend </li>
      <li><code>timeout:</code>: The timeout of data transfer</li>
    </ul></td>
  </tr>
</table>



{{< note >}}
The `harbor.yml` file includes options to configure a UAA CA certificate. This authentication mode is not recommended and is not documented.
{{< /note >}}

## Configuring a Storage Backend {#backend}

By default Harbor uses local storage for the registry, but you can optionally configure the `storage_service` setting so that Harbor uses external storage. For information about how to configure the storage backend of a registry for different storage providers, see the [Distribution Configuration Reference](https://distribution.github.io/distribution/about/configuration/) in the Distribution Registry (previously Docker Registry) documentation. For example, if you use Openstack Swift as your storage backend, the parameters might resemble the following:

``` yaml
storage_service:
  ca_bundle:
  swift:
    username: admin
    password: ADMIN_PASS
    authurl: http://keystone_addr:35357/v3/auth
    tenant: admin
    domain: default
    region: regionOne
    container: docker_images
  redirect:
    disabled: false
```

## What to Do Next

To install Harbor, [Run the Installer Script](run-installer-script.md).
