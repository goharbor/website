---
title: Etichettatura degli artefatti
weight: 75
---

Harbor v2.0 ora supporta immagini OCI e indici di immagini OCI ([OCI Specifiche dell'indice delle immagini](https://github.com/opencontainers/image-spec/blob/master/image-index.md)). Un indice di immagini OCI (o indice OCI) è un manifest di livello superiore che punta a un elenco di manifest di immagini, ideale per una o più piattaforme.  Sia l'indice stesso che le immagini a cui si fa riferimento vengono definiti artefatti nel gergo Harbor. Un indice OCI potrebbe contenere un altro indice OCI e così via.  Per qualsiasi artefatto a cui fa riferimento un indice OCI, l'artefatto a cui si fa riferimento è noto come artefatto figlio e l'indice OCI che fa riferimento all'artefatto è noto come artefatto genitore.  Possiamo anche dire che l'artefatto figlio appartiene all'artefatto genitore o è una parte dell'artefatto genitore.  

Gli utenti possono aggiungere tutti i tag che desiderano a qualsiasi artefatto senza influire sul digest dell'artefatto o sullo spazio di archiviazione associato. Per un indice OCI, gli utenti possono aggiungere tag all'indice principale nonché aggiungere tag ai singoli artefatti a cui si fa riferimento all'interno. I tag aggiunti all'artefatto padre non vengono ereditati automaticamente dagli artefatti figli. È possibile contrassegnare gli artefatti sulla console Web Harbor come segue:

Nell'interfaccia Harbor, fare clic su un artefatto per visualizzare il set corrente di tag, quindi fare clic su "AGGIUNGI TAG", specificare il nome e fare clic su "OK"

![aggiungi artefatto](../../../img/addtag1.png)

