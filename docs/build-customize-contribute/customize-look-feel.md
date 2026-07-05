---
title: Personalizza l'aspetto di Harbor
---

L'aspetto primario di Harbor può essere personalizzato con diversi semplici passaggi. Tutte le personalizzazioni rilevanti nelle configurazioni vengono salvate nel file `setting.json` nella cartella `$HARBOR_DIR/src/portal/src` con formato `json` e verranno caricate all'avvio di Harbor. 

## Configura

Apri il file `setting.json`, vedrai il contenuto predefinito come mostrato di seguito:

```json
{
  "headerBgColor": {
    "darkMode": "",
    "lightMode": ""
  },
  "loginBgImg": "",
  "loginTitle": "",
  "product": {
    "name": "",
    "logo": "",
    "introduction": ""
  }
}
```

Modifica i valori di configurazione se desideri sovrascrivere lo stile predefinito con il tuo. Ecco i riferimenti:

* **headerBgColor**: il colore di sfondo dell'intestazione della pagina, supporta il valore HEX o RGB. es: `#004a70` e `rgb(210,110,235)`.
  - **darkMode**: il colore di sfondo dell'intestazione della pagina per la modalità oscura.
  - **lightMode**: il colore di sfondo dell'intestazione della pagina per la modalità luce.
* **loginBgImg**: il percorso del nome dell'immagine di sfondo visualizzata nella pagina di accesso, ad esempio: 'login_bg.png'. Il file immagine deve essere inserito nella cartella `images`. Suggerisci che la dimensione di questa immagine dovrebbe essere maggiore di 800px*600px.
* **loginTitle**: il titolo completo del prodotto visualizzato nella pagina di accesso.
* **Prodotto**: contiene metadati/descrizione del prodotto.
  - **nome**: Il nome del prodotto.
  - **logo**: il percorso del nome del logo del prodotto, ad esempio: 'logo.png'. Il file immagine deve essere inserito nella cartella `images`.
  - **introduzioni**: l'introduzione sul prodotto, che viene visualizzata nella finestra di dialogo `About`.

## Costruire

Una volta aggiornate le configurazioni `setting.json`, re-[costruire](#configure) il prodotto per applicare le nuove modifiche.
