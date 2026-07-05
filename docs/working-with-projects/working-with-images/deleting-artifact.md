---
title: Eliminazione di artefatti
weight: 75
---

Harbor v2.0 ora supporta immagini OCI e indici di immagini OCI ([OCI Specifiche dell'indice delle immagini](https://github.com/opencontainers/image-spec/blob/master/image-index.md)). Un indice di immagini OCI (o indice OCI) è un manifest di livello superiore che punta a un elenco di manifest di immagini, ideale per una o più piattaforme.  Sia l'indice stesso che le immagini a cui si fa riferimento vengono definiti artefatti nel gergo Harbor. Un indice OCI potrebbe contenere un altro indice OCI e così via.  Per qualsiasi artefatto a cui fa riferimento un indice OCI, l'artefatto a cui si fa riferimento è noto come artefatto figlio e l'indice OCI che fa riferimento all'artefatto è noto come artefatto genitore.  Possiamo anche dire che l'artefatto figlio appartiene all'artefatto genitore o è una parte dell'artefatto genitore.  

Un esempio di indice di immagini OCI 

```
{
  "schemaVersion": 2,
  "manifests": [
    {
      "mediaType": "application/vnd.oci.image.manifest.v1+json",
      "size": 7143,
      "digest": "sha256:e692418e4cbaf90ca69d05a66403747baa33ee08806650b51fab815ad7fc331f",
      "platform": {
        "architecture": "ppc64le",
        "os": "linux"
      }
    },
    {
      "mediaType": "application/vnd.oci.image.manifest.v1+json",
      "size": 7682,
      "digest": "sha256:5b0bcabd1ed22e9fb1310cf6c2dec7cdef19f0ad69efa1f392e94a4333501270",
      "platform": {
        "architecture": "amd64",
        "os": "linux"
      }
    }
  ],
  "annotations": {
    "com.example.key1": "value1",
    "com.example.key2": "value2"
  }
}
```

**Eliminazione dell'artefatto**:

Quando un artefatto non fa riferimento a nessun indice OCI, è possibile eliminare liberamente l'artefatto, eliminando così il suo manifest e tutti i tag associati. 

Quando un artefatto fa riferimento a un indice OCI, non è possibile eliminarlo.  Per eliminare questo artefatto, è necessario prima eliminare tutti gli indici OCI che fanno riferimento a questo artefatto, ricordando che a un artefatto possono fare riferimento più artefatti principali inseriti su Harbor da utenti diversi.  Pertanto, quando si elimina un indice OCI contenente 9 artefatti figli a cui non fa riferimento nessun altro indice e 1 artefatto figlio a cui fa riferimento un altro indice, verranno eliminati solo 9 artefatti figli su 10.

Per eliminare qualsiasi artefatto nell'interfaccia Harbor, fare clic sull'artefatto, selezionare "Elimina" e confermare.  

![elimina l'immagine1](../../../img/deleteimage1.png)

![elimina l'immagine2](../../../img/deleteimage2.png)
