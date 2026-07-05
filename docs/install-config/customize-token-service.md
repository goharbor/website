---
title: Personalizza il servizio token Harbor
weight: 60
---

Per impostazione predefinita, Harbor utilizza la propria chiave privata e il proprio certificato per autenticarsi con i client Docker. Questo argomento descrive come personalizzare facoltativamente la configurazione per utilizzare la propria chiave e il proprio certificato.

Harbor richiede che il client Docker acceda a Harbor registry con un token. La procedura per generare un token è come [Autenticazione del registro di distribuzione v2](https://github.com/distribution/distribution/blob/main/docs/content/spec/auth/token.md). Innanzitutto, fai una richiesta al servizio token per un token. Il token è firmato dalla chiave privata. Successivamente, esegui una nuova richiesta con il token a Harbor registry, Harbor registry verifica il token con la chiave pubblica nel bundle del certificato root. Quindi Harbor registry autorizza il client Docker a eseguire il push e il pull delle immagini.

- Se non disponi già di un certificato, segui le istruzioni in [Genera un certificato radice](#gen-cert) per generare un certificato root utilizzando openSSL.
- Se hai già un certificato, vai su [Fornire il certificato a Harbor](#provide-cert).

## Genera un certificato radice {#gen-cert}

1. Genera una chiave privata.

   ```sh
   openssl genrsa -out private_key.pem 4096
   ```

1. Genera un certificato.

   ```sh
   openssl req -new -x509 -key private_key.pem -out root.crt -days 3650
   ```

1. Inserisci le informazioni da includere nella richiesta di certificato.

   Quello che stai per inserire è quello che viene chiamato Nome distinto o DN. Ci sono parecchi campi ma puoi lasciarne alcuni vuoti. Per alcuni campi esiste un valore predefinito. Se inserisci `.`, il campo rimane vuoto.

   - Nome del Paese (codice a 2 lettere) [AU]:
   - Nome dello Stato o della Provincia (nome completo) [Alcuni Stati]:
   - Nome della località (ad esempio, città) []:
   - Nome dell'organizzazione (ad esempio, azienda) [Internet Widgits Pty Ltd]:
   - Nome dell'unità organizzativa (es. sezione) []:
   - Nome comune (ad esempio, FQDN del server o il TUO nome) []:
   - Indirizzo e-mail []:

   Dopo aver eseguito questi comandi, i file `private_key.pem` e `root.crt` vengono creati nella directory corrente.

## Fornisci il certificato a Harbor {#provide-cert}

Vedere [Esegui lo script di installazione](run-installer-script.md) o [Riconfigurare Harbor e gestire il ciclo di vita Harbor](reconfigure-manage-lifecycle.md) per installare o riconfigurare Harbor. Dopo aver eseguito `./install` o `./prepare`, Harbor genera diversi file di configurazione. È necessario sostituire la chiave privata e il certificato originali con la propria chiave e il proprio certificato.

1. Sostituisci la chiave e il certificato predefiniti.

   Supponendo che la nuova chiave e il certificato siano in `/root/cert` e che `/srv/harbor/data` sia stato specificato come `data_volume`, eseguire i seguenti comandi:

   ```sh
   cd config/ui
   cp /root/cert/private_key.pem /srv/harbor/data/secret/core/private_key.pem
   cp /root/cert/root.crt /srv/harbor/data/secret/registry/root.crt
   ```

1. Torna alla directory `make` e avvia Harbor utilizzando il seguente comando:

   ```sh
   docker compose up -d
   ```

1. Spingere e tirare le immagini da e verso Harbor per verificare che il proprio certificato funzioni.
