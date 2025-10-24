---
title: User-defined OCI artifact
weight: 25
---

Harbor now can expands support for Machine Learning on K8s datamodels such as Kubeflow datamodels. Actually, they are still OCI artifacts.
These artifacts follow Harbor-specific configuration so that harbor can show their rich metadata in a way and their icons. They are called user-defined OCI artifact.


## Harbor-specific Configuration

The Harbor-specific configuration defines annotations keys in the manifest of an OCI artifact.

- **```io.goharbor.artifact.v1alpha1.skip-list```** string  
It is in ```manifest.config.annotations```.  
OPTIONAL property. The list of skip keys. Harbor will ignore these keys in configuration JSON layer. The value for this key should be type string separated by comma.

- **```io.goharbor.artifact.v1alpha1.icon```** empty string  
It is in ```manifest.layers[].annotations```.  
The identifier of artifact icon. The value for this key should be empty string. Only key will be processed, the value will not be used.
If an icon is used by artifacts, the icon must be a layer of artifacts when building artifacts.
Note: The mediaType of icons support "image/gif, image/png, image/jpeg".


## Example OCI Manifest

Example showing a user-defined OCI artifact:

```
{
    "schemaVersion": 2,
    "config": {
        "mediaType": "application/vnd.caicloud.model.config.v1alpha1+json",
        "digest": "sha256:be948daf0e22f264ea70b713ea0db35050ae659c185706aa2fad74834455fe8c",
        "size": 187,
        "annotations": {
            "io.goharbor.artifact.v1alpha1.skip-list": "metrics,git"
        }
    },
    "layers": [
        {
            "mediaType": "image/png",
            "digest": "sha256:d923b93eadde0af5c639a972710a4d919066aba5d0dfbf4b9385099f70272da0",
            "size": 166015,
            "annotations": {
                "io.goharbor.artifact.v1alpha1.icon": ""
            }
        },
        {
            "mediaType": "application/tar+gzip",
            "digest": "sha256:d923b93eadde0af5c639a972710a4d919066aba5d0dfbf4b9385099f70272da0",
            "size": 166015
        }
    ]
}
```

## User-defined OCI Artifact Example
If you are interested in user-defined OCI artifact, [ORMB](https://github.com/kleveross/ormb) is a great example.