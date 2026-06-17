---
title: Configurazione della replica
weight: 30
---

La replica consente agli utenti di replicare risorse, ovvero immagini e grafici, tra registri Harbor e non Harbor, sia in modalità pull che push.

Quando l'amministratore di sistema Harbor ha impostato una regola di replica, tutte le risorse e le eventuali firme Cosign associate che corrispondono ai modelli di filtro definiti vengono replicate nella destinazione registry quando viene soddisfatta la condizione di attivazione. Ogni risorsa replicata avvia un'attività di replica. Se lo spazio dei nomi non esiste nella destinazione registry, viene creato automaticamente un nuovo spazio dei nomi. Se esiste già e l'account utente configurato nella politica di replica non dispone di privilegi di scrittura, il processo non riesce. Le informazioni sui membri non vengono replicate.  

Potrebbe verificarsi un ritardo durante la replica in base alle condizioni della rete. Se un'attività di replica fallisce, viene riprogrammata per alcuni minuti e riprovata più volte.  

{{< note >}}
A causa delle modifiche API, la replica tra diverse versioni di Harbor non è supportata.
{{< /note >}}
