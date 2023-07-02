---
title: Using Make
---

## Variables

Variable           | Description
-------------------|-------------
BASEIMAGETAG       | The tag for base image, default:dev
VERSIONTAG         | The tag for harbor image, default:dev
DEVFLAG            | Build model flag, default: true
GOBUILDIMAGE       | Golang image to compile harbor go source code.
TRIVYFLAG          | Whether to enable trivy in harbor, default:false
CHARTFLAG          | Whether to enable chartmuseum in harbor, default:false
HTTPPROXY          | Clarity proxy to build UI.

## Targets

Target              | Description
--------------------|-------------
all                 | prepare env, compile binaries, build images and install images
prepare             | prepare env
compile             | compile core and jobservice code
compile_core        | compile core binary
compile_jobservice  | compile jobservice binary
build               | build Harbor docker images
build_base_docker   | build Harbor docker base images
install             | compile binaries, build images, prepare specific version of compose file and startup Harbor instance
start               | startup Harbor instance
down                | shutdown Harbor instance
package_online      | prepare online install package
package_offline     | prepare offline install package
pushimage           | push Harbor images to specific registry server
cleanall            | remove binary, Harbor images, specific version docker-compose file, specific version tag and online/offline install package
cleanbinary         | remove core and jobservice binary
cleanimage          | remove Harbor images
cleandockercomposefile  | remove specific version docker-compose
cleanpackage        | remove online/offline install package

## Examples

### Build and run harbor from source code

```sh
make install
```

### Package offline installer

```sh
make package_offline
```