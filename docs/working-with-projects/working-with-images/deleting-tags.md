---
title: Detagging degli artefatti
weight: 75
---

Harbor v2.0 ora supporta immagini OCI e indici di immagini OCI ([OCI Specifiche dell'indice delle immagini](https://github.com/opencontainers/image-spec/blob/master/image-index.md)). Un indice di immagini OCI (o indice OCI) è un manifest di livello superiore che punta a un elenco di manifest di immagini, ideale per una o più piattaforme.  Sia l'indice stesso che le immagini a cui si fa riferimento vengono definiti artefatti nel gergo Harbor. Un indice OCI potrebbe contenere un altro indice OCI e così via.  Per qualsiasi artefatto a cui fa riferimento un indice OCI, l'artefatto a cui si fa riferimento è noto come artefatto figlio e l'indice OCI che fa riferimento all'artefatto è noto come artefatto genitore.  Possiamo anche dire che l'artefatto figlio appartiene all'artefatto genitore o è una parte dell'artefatto genitore.  

Gli utenti possono eliminare qualsiasi tag esistente da un artefatto senza eliminare il digest dell'artefatto e tutti gli altri tag esistenti. Per un indice OCI, gli utenti possono eliminare i tag dall'indice principale e dagli artefatti di riferimento al suo interno. I tag rimossi dall'artefatto padre non vengono rimossi automaticamente dagli artefatti figli. Ad esempio, puoi taggare gli artefatti come segue:

Nell'interfaccia Harbor, fai clic su un artefatto per vedere il suo set corrente di tag, quindi seleziona il tag che desideri eliminare e fai clic su "RIMUOVI TAG", quindi fai clic su "OK"

![eliminare l'etichetta](../../../img/deletetag1.png)

Puoi rimuovere tutti i tag da un artefatto senza eliminare il manifesto dell'artefatto stesso.  L'artefatto è ancora visibile sulla console web e non è elencato nulla in "Tag"