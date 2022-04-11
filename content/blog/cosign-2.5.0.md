---
title: "Introducing Cosign in Harbor v2.5.0"
author:
  name: "Orlin Vasilev"
description: "Introducing Cosign in Harbor v2.5.0"
date: 2022-04-11T12:00:00+04:00
---
![Cosign](https://raw.githubusercontent.com/sigstore/cosign/main/images/logo.svg)

TL;DR;  
Artifact signing and signature verification are critical security capabilities that allow you to verify the integrity of an artifact. Harbor supports content trust through integrations with [Notary](https://github.com/notaryproject/notary) and [Cosign](https://github.com/sigstore/cosign).  

Harbor v2.5 integrates support for [Cosign](https://github.com/sigstore/cosign), a OCI artifact signing and verification solution that is part of the [Sigstore project](https://github.com/sigstore).

Cosign signs OCI artifacts and pushes the generated signature into Harbor. This signature is stored as an artifact accessory along side the signed artifact. Harbor manages a link between the signed artifact and cosign signature, allowing you to apply things like **tag retention rules** and **immutable rules** to a signed artifact, and it will extend to both the signed artifact and the signature. In this way you can use Harbor's built in functionality to manage signed artifacts and Cosign signature accessories.

A key feature of using Cosign with Harbor is the ability use Harbor's [replication capabilities](https://goharbor.io/docs/2.5.0/administration/configuring-replication/) to replicate signatures with their associated signed artifact. This means that if a **replication rule** applies to a signed artifact, Harbor will apply the replication rule to the signature in the same way it applies it to the signed artifact.

* When replicating between Harbor instances, the target Harbor instance will maintain the link between the signed artifact and its associated signatures. You will be able to see the relationship between the two artifacts in the target Harbor interface, in the same way that you do in the source registry.

Full Documentation you will be able to find [here](https://goharbor.io/docs/2.5.0/working-with-projects/working-with-images/sign-images/)

## Demo Setup 
**Configure two Harbor instances with Cosign enabled(default in v2.5.0) per repo and configure replication**
We will have two instances harbor1 and harbor2, project "cosign" and replication rule(push based) between harbor1-to-harbor2, using robo-account.

#### 1. Install two instances with cosig(and notary) enabled
   In our setup we use [offline installer](https://goharbor.io/docs/2.5.0/install-config/download-installer/).

```
# ./install.sh --with-notary --with-trivy

[Step 0]: checking if docker is installed ...
...
...
...
[Step 5]: starting Harbor ...
Creating network "harbor_harbor" with the default driver
Creating network "harbor_harbor-notary" with the default driver
Creating network "harbor_notary-sig" with the default driver
Creating harbor-log ... done
Creating harbor-portal ... done
Creating redis         ... done
Creating registryctl   ... done
Creating registry      ... done
Creating harbor-db     ... done
Creating trivy-adapter ... done
Creating notary-signer     ... done
Creating harbor-core   ... done
Creating harbor-jobservice ... done
Creating nginx             ... done
Creating notary-server     ... done
✔ ----Harbor has been installed and started successfully.----
```

#### 2. Create new project "cosign"
![Cosign Project](../img/cosign/cosign-project.png)
Enable cosign on the repo:
![Cosign cosign](../img/cosign/cosign-cosign.png)

#### 3. Create new user "cosign-demo" and assign it to the project "cosign"
![cosign-demo](../img/cosign/cosign-user.png)
![cosign-demo-member](../img/cosign/cosign-member.png)

#### 4. Setup project cosign on second instance
![Cosign Project](../img/cosign/cosign-project.png)

#### 5. [Create robot account](https://goharbor.io/docs/2.5.0/administration/robot-accounts/) on second instance "robo-cosign"
![robo-cosign](../img/cosign/cosign-robot.png)
Save robot secret for setup replication:
![robo-secret](../img/cosign/cosign-robo-secret.png)
#### 6. [Setup replication](https://goharbor.io/docs/2.5.0/administration/configuring-replication/) on the first instance
Setup new target registry:
![harbor2](../img/cosign/cosign-harbor2.png)

Setup Replication from harbor1 -> harbor2:
![replication](../img/cosign/cosign-replication.png)

#### 7. Create cosign key-pair
To be able to perform the follwing steps you need to have "cosign" installed.
Here are the [instructions](https://docs.sigstore.dev/cosign/installation/) for the installation.  

```
$ cosign generate-key-pair
Enter password for private key:
Enter again:
Private key written to cosign.key
Public key written to cosign.pub
```

You can export the password for the key(aka pass-phrase) so you can use it in automation:
```
export COSIGN_PASSWORD=Your_Super_P1$$w0rD
```

#### 8. Push and sign Image
Use your cosign-demo user to sign into the first Harbor instance.  

```
$ docker login harbor1.orlix.org
Authenticating with existing credentials...
Login Succeeded
```
Then push an image to the cosign project you have set up, the example below uses pause:1.
```
$ docker push harbor1.orlix.org/cosign/pause:1
The push refers to repository [harbor1.orlix.org/cosign/pause]
5f70bf18a086: Layer already exists
e16a89738269: Layer already exists
1: digest: sha256:b31bfb4d0213f254d361e0079deaaebefa4f82ba7aa76ef82e90b4935ad5b105 size: 938
```

Once we have the image available in the registry we can sign the image with cosign.
```
$ cosign sign --key cosign.key harbor1.orlix.org/cosign/pause:1
Enter password for private key:
Pushing signature to: harbor1.orlix.org/cosign/pause
```

#### 9. Trigger replication and verify results
![harbor1-replicate](../img/cosign/cosign-replicate.png)

Verify replication:
![cosign-harbor2-results](../img/cosign/cosign-harbor2-results.png)

After triggering the replication rule harbor1->harbor2 on the harbor1 instance, you can see that the image is signed by Cosign in both Harbor instances or by running cosign verify.
```
$ cosign verify --key cosign.pub harbor1.orlix.org/cosign/pause:1 | jq .

Verification for harbor1.orlix.org/cosign/pause:1 --
The following checks were performed on each of these signatures:
  - The cosign claims were validated
  - The signatures were verified against the specified public key
[
  {
    "critical": {
      "identity": {
        "docker-reference": "harbor1.orlix.org/cosign/pause"
      },
      "image": {
        "docker-manifest-digest": "sha256:b31bfb4d0213f254d361e0079deaaebefa4f82ba7aa76ef82e90b4935ad5b105"
      },
      "type": "cosign container image signature"
    },
    "optional": null
  }
]

$ cosign verify --key cosign.pub harbor2.orlix.org/cosign/pause:1 | jq .

Verification for harbor2.orlix.org/cosign/pause:1 --
The following checks were performed on each of these signatures:
  - The cosign claims were validated
  - The signatures were verified against the specified public key
[
  {
    "critical": {
      "identity": {
        "docker-reference": "harbor1.orlix.org/cosign/pause"
      },
      "image": {
        "docker-manifest-digest": "sha256:b31bfb4d0213f254d361e0079deaaebefa4f82ba7aa76ef82e90b4935ad5b105"
      },
      "type": "cosign container image signature"
    },
    "optional": null
  }
```

Both verification returns result and exit code zero which indicates for valid signature!
As well the digest is the same! 

Hurray!!!  
### Collaborate with the Harbor Community!  

Join the [Harbor Community][community] meetings and distribution lists  
Get updates on Twitter at [@project_harbor][twitter]  
Chat with us on Slack at [#harbor][users-slack] on the [CNCF Slack][cncf-slack]  
Collaborate with us on GitHub: [github.com/goharbor/harbor](https://github.com/goharbor/harbor)  



[Orlin Vasilev](https://twitter.com/OrlinVasilev)  
Harbor Community Manager  
[github.com/OrlinVasilev](https://github.com/OrlinVasilev)  

[community]: https://goharbor.io/community/
[users-slack]: https://cloud-native.slack.com/archives/CC1E09J6S
[cncf-slack]: https://slack.cncf.io
[twitter]: https://twitter.com/project_harbor

