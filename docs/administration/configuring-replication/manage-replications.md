---
title: Esecuzione manuale della replica
weight: 30
---

1. Accedere all'interfaccia Harbor con un account che disponga dei privilegi di amministratore di sistema Harbor.
1. Espandere **Amministrazione** e selezionare **Repliche**.
1. Selezionare una regola di replica e fare clic su **Replica**. 

    ![Aggiungi una regola di replica](../../../img/replication-rule6.png)

    Le risorse a cui viene applicata la regola iniziano immediatamente a replicarsi dall'origine registry alla destinazione.     
1. Fare clic sulla regola per visualizzarne lo stato di esecuzione.
1. Fare clic sull'**ID** dell'esecuzione per visualizzare i dettagli della replica e l'elenco delle attività. Il conteggio dello stato `IN PROGRESS` nel riepilogo include sia le attività `Pending` che `In Progress`.  
1. Facoltativamente, fare clic su **STOP** per interrompere la replica. 
1. Fare clic sull'icona del registro per visualizzare informazioni dettagliate sull'attività di replica. 

    ![Visualizza l'attività di replica](../../../img/list-tasks.png)

Per modificare o eliminare una regola di replica, seleziona la regola di replica nella visualizzazione **Repliche** e fai clic su **Modifica** o **Elimina**. È possibile modificare ed eliminare solo le regole che non hanno esecuzioni in corso.  

![Elimina o modifica la regola](../../../img/replication-rule6.png)
