---
title: Preriscaldamento P2P
weight: 30
---
Il preriscaldamento P2P integra le principali funzionalità di distribuzione P2P dei progetti CNCF come [Libellula](https://github.com/dragonflyoss/Dragonfly) (v1.0.5+)
e Uber [Kraken](https://github.com/uber/kraken) (v0.1.3+) in Harbor e consentono agli utenti di definire politiche relative a questa azione.

Prima di preriscaldare le immagini da Harbor, devi prima installare un motore P2P nel tuo ambiente. Fai riferimento al tuo P2P
guida all'installazione del motore di distribuzione per passaggi di configurazione specifici.

{{< note >}}
A causa delle limitazioni del preriscaldamento Kraken API, sono necessari passaggi di configurazione aggiuntivi. Segui il
Kraken [guida alla configurazione](https://github.com/uber/kraken/blob/master/docs/INTEGRATEWITHHARBOR.md) per saperne di più
informazioni sull'integrazione di Kraken e Harbor.
{{< /note >}}

L'amministratore di sistema può creare istanze del provider di preriscaldamento P2P fornendo l'endpoint API di preriscaldamento del fornitore selezionato
(Dragonfly o Kraken) e relative credenziali se necessarie. Le istanze del provider di preriscaldamento create possono essere utilizzate
tutti i progetti.

L'amministratore del progetto può creare più policy di preriscaldamento nel progetto specificato impostando i filtri delle risorse e
criteri di preriscaldamento (inclusi: situazione di affidabilità e vulnerabilità dei contenuti) e scelta dell'istanza del fornitore di preriscaldamento P2P
aggiunto dall'amministratore di sistema. È possibile attivare la politica di preriscaldamento in modo che venga avviata manualmente, su base programmata o in base agli eventi.
Quando la politica di preriscaldamento è in esecuzione, verranno distribuite tutte le immagini che corrispondono ai criteri definiti nella politica
e memorizzato nella cache del motore P2P di destinazione per future richieste di pull.

Harbor registra ogni volta che viene eseguita una politica di preriscaldamento. Puoi controllare i dettagli delle esecuzioni di preriscaldamento e il
log correlati dalla pagina del progetto.


{{< note >}}
Tieni presente che, per ragioni storiche, esistono due versioni di Dragonfly,
[v1](https://github.com/dragonflyoss/Dragonfly) e [v2](https://github.com/dragonflyoss/Dragonfly2),
e v1 è stato archiviato e non è più mantenuto, e v2 ha un refactoring completo di v1, quindi v2 non è compatibile con v1,
quella che segue è la relazione di compatibilità della versione tra Harbor e Dragonfly e si consiglia di eseguire l'aggiornamento alla versione più recente di Dragonfly.
{{< /note >}}

{{< table caption="Harbor and Dragonfly version-compatible supported matrix" >}}
Versione Harbor | Versione libellula |
:---------|:------------|
`>=v2.12.0` |`>=v2.1.59` |
`<v2.12.0` |`>=v1.0.5, <v2.1.59` |
{{< /table >}}
