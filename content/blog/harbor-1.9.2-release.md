# Sub-component construction harbor's arm mirror construction
## Background
Make building source code is not convenient for chunking, because sometimes you don't need to build the entire source code, just a few components, and chunking is convenient, Here are some harbor component constructs

## Environment to prepare
Pre-install some software such as Docker and Docker-Compose before compiling

| Software     | Version | 
| -------- | ---- | 
| docker   | 17.05 + |
| docker-compose | 	1.18.0 + | 
| git | 1.9.1 +| 
| golang* | 1.7.3 +| 

### Core
#### steps:
steps1:

[github.com/goharbor/harbor/src/core](https://github.com/goharbor/harbor/src/core") .../go build -o Target binary

steps2:

docker build --network=host -f /$GOPATH/src/[github.com/goharbor/harbor/make/photon/core/Dockerfile](https://github.com/goharbor/harbor/make/photon/core/Dockerfile") -t Target mirror name .

### Front-end component Photo
#### steps:
steps1:

[github.com/goharbor/harbor/src/photo](https://github.com/goharbor/harbor/src/photo") .../go build -o Target binary

steps2:

docker build --network=host -f /$GOPATH/src/[github.com/goharbor/harbor/make/photon/portal/Dockerfile](https://github.com/goharbor/harbor/make/photon/portal/Dockerfile") -t Target mirror name .

### Registry source code compilation builds
steps1:

Use the command./ builder v2.7.1 to compile and output binaries in the container

./builder v2.0.9(version)

steps2:

docker build --network=host -f /$GOPATH/src/[github.com/goharbor/harbor/make/photon/registry/Dockerfile](https://github.com/goharbor/harbor/make/photon/registry/Dockerfile") -t Target mirror name .

### Clair source code compilation build
steps1:

go build -ldflags "-X github.com/coreos/clair/pkg/version.Version=v2.0.9" github.com/coreos/clair/cmd/clair


./builder v2.0.9

steps2:

docker build --network=host -f /$GOPATH/src/[github.com/goharbor/harbor/make/photon/clair/Dockerfile](https://github.com/goharbor/harbor/make/photon/clair/Dockerfile") -t  Target mirror name .

### Jobservice source code compilation build
steps1:

[github.com/goharbor/harbor/src/jobservice](https://github.com/goharbor/harbor/src/jobservice") .../go build -o Target binary

steps2:

docker build --network=host -f /$GOPATH/src/[github.com/goharbor/harbor/make/photon/jobservice/Dockerfile](https://github.com/goharbor/harbor/make/photon/jobservice/Dockerfile") -t  Target mirror name .

### registryctl source code compilation build
steps1:

[github.com/goharbor/harbor/src/registryctl](https://github.com/goharbor/harbor/src/registryctl") .../go build -o Target binary

steps2:

docker build --network=host -f /$GOPATH/src/[github.com/goharbor/harbor/make/photon/registryctl/Dockerfile](https://github.com/goharbor/harbor/make/photon/registryctl/Dockerfile") -t  Target mirror name .

## Special point

- Arm architectures must be built based on an ARM environment, unless static compilation is used

- The base image of the different schema images is replaced by the corresponding schema

- Clear is an external component that needs to download the source code before it can be built

- Clear and Registry can be built using the./ Builder + version number in the directory

- There is also a component dumb-init in clear, which is in C language and requires Python3, and it must be compiled with the source code now

This is a partial list of images that we built

- `registry-jinan-lab.inspurcloud.cn/library/goharbor/harbor-core-arm64:v1.9.2`
- `registry-jinan-lab.inspurcloud.cn/library/goharbor/harbor-jobservice-arm64:v1.9.2`
- `registry-jinan-lab.inspurcloud.cn/library/goharbor/harbor-portal-arm64:v1.9.2`
- `docker pull registry-jinan-lab.inspurcloud.cn/library/goharbor/harbor-registry-arm64:v1.9.2`
- `registry-jinan-lab.inspurcloud.cn/library/goharbor/harbor-registryctl-arm64:v1.9.2`
- `registry-jinan-lab.inspurcloud.cn/library/goharbor/clair-init-amd64:1.0.0`



