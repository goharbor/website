---
title: "Guida allo stile della documentazione"
---

_Questa guida di stile è adattata da [Guida allo stile Kubernetes](https://kubernetes.io/docs/contribute/style/style-guide/)._

Questa pagina delinea le linee guida sullo stile di scrittura per la documentazione Harbor e dovresti usarla come riferimento mentre scrivi o modifichi il contenuto. Queste sono linee guida, non regole. Usa il tuo miglior giudizio mentre scrivi la documentazione e sentiti libero di proporre modifiche a queste linee guida.

Le modifiche alla guida di stile vengono apportate dai manutentori di Harbor come gruppo. Per proporre una modifica o un'aggiunta crea un [problema/PR](https://github.com/goharbor/harbor/issues), oppure vieni a un [incontro comunitario](/community) per discutere i tuoi suggerimenti.

La documentazione Harbor utilizza il renderer [Marchio d'oro](https://gohugo.io/getting-started/configuration-markup/#goldmark) Markdown.

## Migliori pratiche sui contenuti
### Usa il tempo presente

{{< table caption="Do and Don't - Use present tense" >}}
|Fai|Non|
|--- |--- |
|Questo comando avvia un proxy.|Questo comando avvia un proxy.|
{{< /table >}}

Eccezione: utilizzare il futuro o il passato se è necessario trasmettere il significato corretto.

### Usa la voce attiva

{{< table caption="Do and Don't - Use active voice" >}}
|Fai|Non|
|--- |--- |
|È possibile esplorare API utilizzando un browser.|È possibile esplorare API utilizzando un browser.|
|Il file YAML specifica il conteggio delle repliche.|Il conteggio delle repliche è specificato nel file YAML.|
{{< /table >}}

Eccezione: utilizzare la voce passiva se la voce attiva porta a una costruzione della frase scomoda.

### Usa un linguaggio semplice e diretto

Utilizza un linguaggio semplice e diretto. Evita di usare frasi non necessarie, come dire "per favore".

{{< table caption="Do and Don't - Use simple and direct language" >}}
|Fai|Non|
|--- |--- |
|Per creare un ReplicaSet, ...|Per creare un ReplicaSet, ...|
|Consulta il file di configurazione.|Consulta il file di configurazione.|
|Visualizza i pod.|Con questo comando successivo, visualizzeremo i pod.|
{{< /table >}}

### Rivolgiti al lettore chiamandolo "tu"

{{< table caption="Do and Don't - Addressing the reader" >}}
|Fai|Non|
|--- |--- |
|Puoi creare una distribuzione entro...|Creeremo una distribuzione entro...|
|Nell'output precedente puoi vedere...|Nell'output precedente puoi vedere...|
{{< /table >}}

### Evita le frasi latine

Preferire i termini inglesi alle abbreviazioni latine.

{{< table caption="Do and Don't - Avoid Latin phrases" >}}
|Fai|Non|
|--- |--- |
|Ad esempio, ...|ad esempio, ...|
|Cioè, ...|cioè, ...|
{{< /table >}}

Eccezione: utilizzare "ecc." per eccetera.

## Schemi da evitare


### Evita di usare "noi"

Usare "noi" in una frase può creare confusione, perché il lettore potrebbe non saperlo
se fanno parte del "noi" che stai descrivendo.

{{< table caption="Do and Don't - Avoid using we" >}}
|Fai|Non|
|--- |--- |
|La versione 1.4 include...|Nella versione 1.4 abbiamo aggiunto...|
|Kubernetes fornisce una nuova funzionalità per...|Forniamo una nuova funzionalità...|
|Questa pagina ti insegna come utilizzare i Pod.|In questa pagina impareremo a conoscere i Pod.|
{{< /table >}}

### Evita gergo e modi di dire

Molti lettori parlano inglese come seconda lingua. Evita il gergo e gli idiomi per aiutarli a capire meglio.

{{< table caption="Do and Don't - Avoid jargon and idioms" >}}
|Fai|Non|
|--- |--- |
|Internamente, ...|Sotto il cofano, ...|
|Crea un nuovo cluster.|Attiva un nuovo cluster.|
{{< /table >}}

### Evita affermazioni sul futuro o che presto diventeranno obsolete

Evita di fare promesse o dare suggerimenti sul futuro. Se hai bisogno di parlarne
una funzionalità beta, inserisci il testo sotto un titolo che lo identifichi come beta
informazioni.

Evita anche parole come "recentemente", "attualmente" e "nuovo". Una funzionalità che oggi è nuova potrebbe non esserlo
considerato nuovo in pochi mesi.

{{< table caption="Do and Don't - Avoid statements that will soon be out of date" >}}
|Fai|Non|
|--- |--- |
|Nella versione 1.4, ...|Nella versione attuale, ...|
|La funzionalità Federazione fornisce...|La nuova funzionalità Federazione fornisce...|
{{< /table >}}

### Lingua

Questa documentazione utilizza l'ortografia e la grammatica dell'inglese americano.

## Standard di formattazione della documentazione

### Utilizza le parentesi angolari per i segnaposto

Utilizzare le parentesi angolari per i segnaposto. Spiega al lettore cosa rappresenta un segnaposto.

1. Visualizza le informazioni su un Pod:

        kubectl descrive il pod <pod-name> -n <namespace>

    Se il pod si trova nello spazio dei nomi predefinito, puoi omettere il parametro '-n'.

### Usa il grassetto per gli elementi dell'interfaccia utente

{{< table caption="Do and Don't - Bold interface elements" >}}
|Fai|Non|
|--- |--- |
|Fare clic su **Biforcazione**.|Fare clic su "Biforcazione".|
|Seleziona **Altro**.|Seleziona "Altro".|
{{< /table >}}

### Utilizza lo stile del codice per nomi di file, directory, percorsi, nomi di campi oggetto e spazi dei nomi
{{< table caption="Do and Don't - Use code style for filenames, directories, paths, object field names and namespaces" >}}
|Fai|Non|
|--- |--- |
|Apri il file `envars.yaml`.|Apri il file envars.yaml.|
|Vai alla directory `/docs/tutorials`.|Vai alla directory /docs/tutorials.|
|Apri il file `/_data/concepts.yaml`.|Apri il file /\_data/concepts.yaml.|
{{< /table >}}


### Usa la punteggiatura tra virgolette
{{< table caption="Do and Don't - Use code style for filenames, directories, paths, object field names and namespaces" >}}
|Fai|Non|
|--- |--- |
|gli eventi vengono registrati con un "palcoscenico" associato |gli eventi vengono registrati con un "palcoscenico" associato |
|La copia si chiama "fork".|La copia si chiama "fork".|
{{< /table >}}

Eccezione: quando la parola tra virgolette è un input dell'utente.

Esempio:
* Il mio ID utente è "IM47g".
* Hai provato la password "mycatisawesome"?

## Formattazione del codice in linea


### Usa lo stile del codice per il codice e i comandi in linea

Per il codice in linea in un documento HTML, utilizzare il tag `<code>`. In un ribasso
documento, utilizzare il backtick (`` ` ``).

{{< table caption="Do and Don't - Use code style for filenames, directories, paths, object field names and namespaces" >}}
|Fai|Non|
|--- |--- |
|Il comando `kubectl run` crea una distribuzione.|Il comando "kubectl run" crea una distribuzione.|
|Per la gestione dichiarativa, utilizzare `kubectl apply`.|Per la gestione dichiarativa, utilizzare "kubectl apply".|
|Utilizzare singoli apici inversi per racchiudere il codice in linea. Ad esempio, `var example = true`.|Utilizza due asterischi (`**`) o un carattere di sottolineatura (`_`) per racchiudere il codice in linea. Ad esempio, **var esempio = true**.|
|Utilizza tripli apici inversi (\`\`\`) prima e dopo un blocco di codice su più righe per blocchi di codice recintati.|Utilizza blocchi di codice su più righe per creare diagrammi, diagrammi di flusso o altre illustrazioni.|
|Utilizza nomi di variabili significativi che abbiano un contesto.|Utilizza nomi di variabili come 'foo','bar' e 'baz' che non hanno significato e mancano di contesto.|
|Rimuovi gli spazi finali nel codice.|Aggiungi spazi finali nel codice, dove sono importanti, perché anche un'utilità per la lettura dello schermo leggerà gli spazi.|
{{< /table >}}

### Usa lo stile normale per i valori dei campi stringa e interi

Per i valori dei campi di tipo stringa o intero, utilizzare lo stile normale senza virgolette.

{{< table caption="Do and Don't - Use normal style for string and integer field values" >}}
|Fai|Non|
|--- |--- |
|Imposta il valore di `imagePullPolicy` su `Always`.|Imposta il valore di `imagePullPolicy` su "Sempre".|
|Imposta il valore di `image` su `nginx:1.16`.|Imposta il valore di `image` su nginx:1.16.|
|Imposta il valore del campo `replicas` su `2`.|Imposta il valore del campo `replicas` su 2.|
{{< /table >}}

## Formattazione dello snippet di codice


### Non includere il prompt dei comandi

{{< table caption="Do and Don't - Don't include the command prompt" >}}
|Fai|Non|
|--- |--- |
|kubectl get pod|$ kubectl get pod|
{{< /table >}}

### Comandi separati dall'output

Verifica che il Pod sia in esecuzione sul nodo scelto:

```
kubectl get pods --output=wide
```

L'output è simile a questo:

```
NAME     READY     STATUS    RESTARTS   AGE    IP           NODE
nginx    1/1       Running   0          13s    10.200.0.4   worker0
```

## Harbor elenco di parole


Un elenco di termini e parole specifici di Harbor da utilizzare in modo coerente in tutto il sito.

{{< table caption="Harbor word list" >}}
|Trem|Utilizzo|
|--- |--- |
|Kubernetes|Kubernetes deve sempre essere maiuscolo.|
|Harbor|Harbor deve sempre essere maiuscolo.|
|Docker|Docker deve sempre essere maiuscolo.|
|Lista consentita|Utilizza la lista consentita invece della lista bianca.|
|Lista negata|Utilizza la lista negata invece della lista nera.|
{{< /table >}}

## Elementi di riduzione

### Intestazioni
Le persone che accedono a questa documentazione possono utilizzare uno screen reader o altre tecnologie assistive (AT). [Lettori di schermo](https://en.wikipedia.org/wiki/Screen_reader) sono dispositivi di output lineari, emettono elementi su una pagina uno alla volta. Se una pagina contiene molti contenuti, puoi utilizzare i titoli per conferire alla pagina una struttura interna. Una buona struttura della pagina aiuta tutti i lettori a navigare facilmente nella pagina o a filtrare gli argomenti di interesse.

{{< table caption="Do and Don't - Headings" >}}
|Fai|Non|
|--- |--- |
|Includi un titolo in ogni pagina o post del blog.|Includi più titoli (#) in una pagina.|
|Utilizza titoli ordinati per fornire una descrizione significativa di alto livello dei tuoi contenuti.|Utilizza titoli dal livello 4 al 6, a meno che non sia assolutamente necessario. Se il tuo contenuto è così dettagliato, potrebbe essere necessario suddividerlo in articoli separati.|
|Utilizzare maiuscole e minuscole per i titoli. Ad esempio, **Estendi Kubectl con i plugin**|Utilizza maiuscole/minuscole per i titoli. Ad esempio, **Estendi kubectl con i plugin**|
{{< /table >}}

### Paragrafi

{{< table caption="Do and Don't - Paragraphs" >}}

|Fai|Non|
|--- |--- |
|Cerca di mantenere i paragrafi sotto le 6 frasi.|Scrivi paragrafi prolissi.|
|Utilizza tre trattini (`---`) per creare un filetto orizzontale per le interruzioni nel contenuto del paragrafo.|Utilizza filetti orizzontali per la decorazione.|
{{< /table >}}

### Collegamenti

{{< table caption="Do and Don't - Links" >}}
|Fai|Non|
|--- |--- |
| Scrivi collegamenti ipertestuali che forniscano il contesto per il contenuto a cui si collegano. Ad esempio: alcune porte sono aperte sulle tue macchine. Vedi [controllare le porte richieste](#check-required-ports) per maggiori dettagli.|Utilizza termini ambigui come "fai clic qui". Ad esempio: alcune porte sono aperte sulle tue macchine. Vedi [Qui](#check-required-ports) per maggiori dettagli.|
|Scrivi link in stile Markdown: `[link text](URL)`. Ad esempio: `[community meeting agenda](https://hackmd.io/Jq6F5zqZR7S80CeDWUklkA)` e l'output è [ordine del giorno degli incontri comunitari](https://hackmd.io/Jq6F5zqZR7S80CeDWUklkA).|Scrivi collegamenti in stile HTML: `<a href="/media/examples/link-element-example.css" target="_blank">Visit our tutorial!</a>`|
{{< /table >}}


### Elenchi

Raggruppa elementi in un elenco che sono correlati tra loro e devono essere visualizzati in un ordine specifico o per indicare una correlazione tra più elementi. Quando un'utilità per la lettura dello schermo incontra un elenco, indipendentemente dal fatto che si tratti di un elenco ordinato o non ordinato, verrà annunciato all'utente che esiste un gruppo di elementi dell'elenco. L'utente può quindi utilizzare i tasti freccia per spostarsi su e giù tra le varie voci dell'elenco.
I collegamenti di navigazione del sito Web possono anche essere contrassegnati come elementi di elenco; dopotutto non sono altro che un insieme di link correlati.

 - Termina ogni elemento dell'elenco con un punto se uno o più elementi dell'elenco sono frasi complete. Per motivi di coerenza, normalmente tutti gli elementi o nessuno dovrebbero essere frasi complete.

  - Gli elenchi ordinati che fanno parte di una frase introduttiva incompleta possono essere scritti in minuscolo e punteggiati come se ogni elemento facesse parte della frase introduttiva.

 - Utilizzare il numero uno (`1.`) per gli elenchi ordinati.

 - Utilizzare (`+`), (`*`) o (`-`) per elenchi non ordinati: essere coerenti all'interno dello stesso documento.

 - Lascia una riga vuota dopo ogni elenco.

 - Rientra gli elenchi nidificati con quattro spazi (ad esempio, ⋅⋅⋅⋅).

 - Le voci dell'elenco possono essere costituite da più paragrafi. Ogni paragrafo successivo in una voce di elenco deve essere rientrato di quattro spazi o di una tabulazione.

### Tabelle

Lo scopo semantico di una tabella dati è presentare dati tabulari. Gli utenti vedenti possono scansionare rapidamente la tabella ma uno screen reader scorre riga per riga. Una tabella [didascalia](https://www.w3schools.com/tags/tag_caption.asp) viene utilizzata per creare un titolo descrittivo per una tabella di dati. Le tecnologie assistive (AT) utilizzano l'elemento didascalia della tabella HTML per identificare il contenuto della tabella all'utente all'interno della struttura della pagina.

Se devi creare una tabella, crea la tabella in markdown e utilizza la tabella [Codice breve Hugo](https://gohugo.io/content-management/shortcodes/) per includere una didascalia.

```
{{</* table caption="Configuration parameters" >}}
Parameter | Description | Default
:---------|:------------|:-------
`timeout` | The timeout for requests | `30s`
`logLevel` | The log level for log output | `INFO`
{{< /table */>}}

```
**Nota:** questo shortcode non supporta i link in stile riferimento al markdown. Utilizza collegamenti in stile in linea nelle tabelle. Visualizza ulteriori informazioni su [stili di collegamento di ribasso](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#links).
