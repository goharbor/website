---
title: Ricodifica degli artefatti
weight: 75
---

L'utente con privilegi sufficienti può copiare gli artefatti in Harbor in repository e progetti diversi. Ad esempio, puoi copiare le immagini come segue:

-`release/app:stg` --> `release/app:prd`
-`develop/app:v1.0` --> `release/app:v1.0`

Per copiare un artefatto, è necessario disporre dell'autorizzazione di lettura (ruolo ospite o superiore) nel progetto di origine e dell'autorizzazione di scrittura (ruolo di sviluppatore o superiore) nel progetto di destinazione.

Nell'interfaccia Harbor, selezionare l'artefatto da copiare e fare clic su `Copy`.

![retaggare l'artefatto](../../../img/retag1.png)

Nella finestra Ricodifica, inserisci il nome del progetto, il nome del repository, il nuovo nome del tag e fai clic su **Conferma**. 

![retaggare l'artefatto](../../../img/retag2.png)