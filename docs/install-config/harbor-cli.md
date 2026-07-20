---
title: Install the Harbor CLI
weight: 15
---

This guide describes how to install and setup the official Harbor CLI on your local environment or containerized workloads.

## Packages

### macOS / Linux (Homebrew)

| Package Manager | Package | Command |
| :--- | :--- | :--- |
| Homebrew | harbor-cli | `brew install harbor-cli` |

### Linux

| Operating System | Package Manager | Package | Command |
| :--- | :--- | :--- | :--- |
| Alpine | apk-tools | harbor-cli | `wget https://github.com/goharbor/harbor-cli/releases/download/<version>/harbor-cli_<version>_linux_amd64.apk && sudo apk add --allow-untrusted harbor-cli_<version>_linux_amd64.apk` |
| Debian / Ubuntu | apt | harbor-cli | `echo "deb [trusted=yes] https://harborcli.goharbor.io stable main" \| sudo tee /etc/apt/sources.list.d/harbor-cli.list && sudo apt update && sudo apt install harbor-cli` |
| Fedora / CentOS / RHEL | dnf / rpm | harbor-cli | `wget https://github.com/goharbor/harbor-cli/releases/download/<version>/harbor-cli_<version>_linux_amd64.rpm && sudo rpm -i harbor-cli_<version>_linux_amd64.rpm` |

---

## Container

Running Harbor CLI as a container is the simplest way to run commands without local package dependencies.

Use the following command to get started:

```bash
docker run -ti --rm -v $HOME/.config/harbor-cli:/root/.config/harbor-cli \
  -e HARBOR_ENCRYPTION_KEY=$(echo "ThisIsAVeryLongPassword" | base64) \
  registry.goharbor.io/harbor-cli/harbor-cli \
  --help
```

> **Note:** Use the `HARBOR_ENCRYPTION_KEY` environment variable as a base64-encoded 32-byte key for AES-256 encryption. This securely encrypts and stores your Harbor login credentials.

To run the CLI as a container seamlessly, set up an alias in your `.bashrc` or `.zshrc` profile:

```bash
echo "export HARBOR_CLI_CONFIG=\$HOME/.config/harbor-cli" >> ~/.zshrc
echo "export HARBOR_ENCRYPTION_KEY=\$(cat <path_to_32bit_private_key_file> | base64)" >> ~/.zshrc
echo "alias harbor='docker run -ti --rm -v \$HARBOR_CLI_CONFIG:/root/.config/harbor-cli -e HARBOR_ENCRYPTION_KEY=\$HARBOR_ENCRYPTION_KEY registry.goharbor.io/harbor-cli/harbor-cli'" >> ~/.zshrc 
source ~/.zshrc
```

---

## Dockerfile Integration

If you want to copy the Harbor CLI binary into a custom container build, copy it directly from the official image:

```dockerfile
COPY --from=registry.goharbor.io/harbor-cli/harbor-cli:latest /harbor /usr/local/bin/harbor
```

---

## Build from Source

Ensure you have a Go workspace (Go v1.24 or later) or Dagger installed.

### Using Dagger

```bash
git clone https://github.com/goharbor/harbor-cli.git && cd harbor-cli
dagger call build-dev --platform darwin/arm64 export --path=./harbor-cli
./harbor-dev --help
```

### Using Go Toolchain

```bash
git clone https://github.com/goharbor/harbor-cli.git && cd harbor-cli
go build -o harbor-cli cmd/harbor/main.go
```

