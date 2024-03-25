---
title: Run the Installer Script

weight: 35
---

Once you have configured `harbor.yml` copied from `harbor.yml.tmpl` and optionally set up a storage backend, you install and start Harbor by using the `install.sh` script. Note that it might take some time for the online installer to download all of the Harbor images from Docker hub.

You can install Harbor in different configurations:

- Just Harbor, without Trivy
- Harbor with Trivy

## Default installation without Trivy

The default Harbor installation does not include Trivy service. Run the following command

```sh
sudo ./install.sh
```

If the installation succeeds, you can open a browser to visit the Harbor interface at `http://reg.yourdomain.com`, changing `reg.yourdomain.com` to the hostname that you configured in `harbor.yml`. If you did not change them in `harbor.yml`, the default administrator username and password are `admin` and `Harbor12345`.

Log in to the admin portal and create a new project, for example, `myproject`. You can then use Docker commands to log in to Harbor, tag images, and push them to Harbor.

```sh
docker login reg.yourdomain.com
docker push reg.yourdomain.com/myproject/myrepo:mytag
```

{{< important >}}
- If your installation of Harbor uses HTTPS, you must provide the Harbor certificates to the Docker client. For information, see [Configure HTTPS Access to Harbor](configure-https.md#provide-the-certificates-to-harbor-and-docker).
- If your installation of Harbor uses HTTP, you must add the option `--insecure-registry` to your client's Docker daemon and restart the Docker service. For more information, see [Connecting to Harbor via HTTP](#connect-http) below.
{{< /important >}}

## Installation with Trivy
To install Harbor with Trivy service, add the `--with-trivy` parameter when you run `install.sh`:

```sh
sudo ./install.sh --with-trivy
```

For more information about Trivy, see the [Trivy documentation](https://github.com/aquasecurity/trivy).
For more information about how to use Trivy in an webproxy environment see [Configure custom Certification Authorities for trivy](administration/vulnerability-scanning/configure-custom-certs.md)

## Connecting to Harbor via HTTP {#connect-http}

**IMPORTANT:** If your installation of Harbor uses HTTP rather than HTTPS, you must add the option `--insecure-registry` to your client's Docker daemon. By default, the daemon file is located at `/etc/docker/daemon.json`.

For example, add the following to your `daemon.json` file:

<pre>
{
"insecure-registries" : ["<i>myregistrydomain.com</i>:5000", "0.0.0.0"]
}
</pre>

After you update `daemon.json`, you must restart both Docker Engine and Harbor.

1. Restart Docker Engine.

    ```sh
    systemctl restart docker
    ```

1. Stop Harbor.

    ```sh
    docker compose down -v
    ```

1. Restart Harbor.

    ```sh
    docker compose up -d
    ```

## What to Do Next ##

- If the installation succeeds, see [Harbor Administration](../administration) for information about using Harbor.
- If you deployed Harbor with HTTP and you want to secure the connections to Harbor, see [Configure HTTPS Access to Harbor](configure-https.md).
- If installation fails, see [Troubleshooting Harbor Installation](troubleshoot-installation.md).
