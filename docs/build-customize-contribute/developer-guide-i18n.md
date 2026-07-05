---
title: Sviluppare per l'internazionalizzazione
---

{{< note >}}
Tutti i file che hai creato dovrebbero utilizzare la codifica UTF-8.
{{< /note >}}

Sono disponibili diverse traduzioni per il portale Harbor. Consulta [file di traduzione](https://github.com/goharbor/harbor/tree/main/src/portal/src/i18n/lang) disponibile per un elenco completo delle lingue disponibili.

{{< note >}}
Harbor supporta ufficialmente solo le traduzioni in inglese e cinese ed entrambe le lingue vengono verificate per ogni versione. Se prevedi di utilizzare un'altra traduzione, ti consigliamo di verificare che le traduzioni siano corrette per la tua versione Harbor prima dell'implementazione.
{{< /note >}}

Utilizzare i passaggi seguenti per aggiungere una traduzione per una nuova lingua al portale Harbor.

1. Nella cartella `src/portal/src/i18n/lang`, copia il file json `en-us-lang.json` in un nuovo file e rinominalo in `<language>-<locale>-lang.json`.

    Il file contiene un oggetto JSON che include tutte le coppie chiave-valore delle stringhe UI:

    ```javascript
    {
      "APP_TITLE": {
        "VMW_HARBOR": "Harbor",
        "HARBOR": "Harbor",
        // ...
      },
      // ...
    }
    ```

    Nel file `<language>-<locale>-lang.json`, traduci tutti i valori nella tua lingua. Non modificare nessuna chiave.

2. Aggiungi la lingua al set di lingue supportate in `src/portal/src/app/shared/entities/shared.const.ts`:

    ```typescript
    export const LANGUAGES = {
        'en-us': ['English', locale_en],
        'zh-cn': ['中文简体', locale_zh_CN],
        '<language>-<locale>': ['<DISPLAY_NAME>', '<LOCALE_DATA>'],
    } as const;
    ```
   
{{< note >}}
Per `LOCALE_DATA`, è necessario importarlo correttamente:
```typescript
import locale_en 
  from '@angular/common/locales/en';
import locale_zh_CN 
  from '@angular/common/locales/zh-Hans';
```
{{< /note >}}

3. Successivamente, fare riferimento a [Costruisci Harbor dal codice sorgente](compile-guide.md) per ricostruire e riavviare Harbor.

## Contribuire alle localizzazioni a Harbor
Se desideri [contribuisci con il tuo file di localizzazione](https://github.com/goharbor/harbor/blob/main/CONTRIBUTING.md) al progetto Harbor, effettua una richiesta pull con le modifiche rispetto alle istruzioni sopra. Fai del tuo meglio per assicurarti che le traduzioni siano corrette e facilmente comprensibili da chi parla quella lingua.

Trovare revisori per una traduzione PR è il massimo sforzo, i manutentori potrebbero non essere in grado di rivedere la richiesta pull perché non parlano o leggono la lingua del tuo contributo. Se conosci un altro membro della comunità che può aiutarti a rivedere la richiesta pull, assicurati di taggarlo quando apri il PR. Dovresti anche pianificare di partecipare a una riunione della comunità per aumentare la consapevolezza della tua richiesta pull e chiedere aiuto alla comunità per la revisione.

Il tuo contributo potrebbe comunque essere accettato senza ulteriori revisioni anche se non riusciamo a trovare qualcuno che revisioni le traduzioni nella tua richiesta pull.
