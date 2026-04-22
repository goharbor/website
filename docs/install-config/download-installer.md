---
title: Scarica il programma di installazione Harbor
weight: 25
---

È possibile scaricare i programmi di installazione Harbor dalla pagina [comunicati ufficiali](https://github.com/goharbor/harbor/releases). Scarica il programma di installazione online o quello offline. 

- **Programma di installazione online:** Il programma di installazione online scarica le immagini Harbor dall'hub Docker. Per questo motivo l'installatore è di dimensioni molto ridotte.

- **Programma di installazione offline:** utilizzare il programma di installazione offline se l'host su cui si sta distribuendo Harbor non dispone di una connessione a Internet. Il programma di installazione offline contiene immagini predefinite, quindi è più grande del programma di installazione online.

I processi di installazione sono quasi gli stessi per i programmi di installazione online e offline.

## Scarica e decomprimi il programma di installazione

1. Vai a [Harbor pubblica la pagina](https://github.com/goharbor/harbor/releases). 
1. Scarica il programma di installazione online o offline per la versione che desideri installare.
1. Facoltativamente, scarica il file `*.asc` corrispondente per verificare che il pacchetto sia autentico. 
  
   Il file `*.asc` è un file di chiave OpenPGP. Eseguire i seguenti passaggi per verificare che il pacchetto scaricato sia autentico. 
   
   1. Ottenere la chiave pubblica per il file `*.asc`.
      
      ```sh
      gpg --keyserver hkps://keyserver.ubuntu.com --receive-keys 644FF454C0B4115C
      ```
      
      Dovresti vedere il messaggio ` public key "Harbor-sign (The key for signing Harbor build) <jiangd@vmware.com>" imported`
   1. Verifica che il pacchetto sia autentico eseguendo uno dei seguenti comandi.

      - Programma di installazione in linea:

         ```sh
         gpg -v --keyserver hkps://keyserver.ubuntu.com --verify harbor-online-installer-version.tgz.asc
         ```

      - Programma di installazione offline:

         ```sh
         gpg -v --keyserver hkps://keyserver.ubuntu.com --verify harbor-offline-installer-version.tgz.asc
         ```
      
      Il comando `gpg` verifica che la firma del bundle corrisponda a quella del file chiave `*.asc`. Dovresti vedere la conferma che la firma è corretta.
      
      ```sh
      gpg: armor header: Version: GnuPG v1
      gpg: assuming signed data in 'harbor-online-installer-v2.0.2.tgz'
      gpg: Signature made Tue Jul 28 09:49:20 2020 UTC
      gpg:                using RSA key 644FF454C0B4115C
      gpg: using pgp trust model
      gpg: Good signature from "Harbor-sign (The key for signing Harbor build) <jiangd@vmware.com>" [unknown]
      gpg: WARNING: This key is not certified with a trusted signature!
      gpg:          There is no indication that the signature belongs to the owner.
      Primary key fingerprint: 7722 D168 DAEC 4578 06C9  6FF9 644F F454 C0B4 115C
      gpg: binary signature, digest algorithm SHA1, key algorithm rsa4096
      ```

1. Utilizzare `tar` per estrarre il pacchetto di installazione:

   - Programma di installazione in linea:

      ```sh
      bash $ tar xzvf harbor-online-installer-version.tgz
      ```

   - Programma di installazione offline:
   
      ```sh
      bash $ tar xzvf harbor-offline-installer-version.tgz
      ```
   
## Passaggi successivi

- Per proteggere le connessioni a Harbor, vedere [Configura HTTPS Accesso a Harbor](configure-https.md).
- Per configurare l'installazione Harbor, vedere [Configura il file YML Harbor](configure-yml-file.md).

### Note sulla directory dell'installatore

È possibile estrarre il programma di installazione Harbor in qualsiasi posizione. L'utente che esegue lo script di installazione deve disporre delle autorizzazioni per eseguire i comandi Docker (solitamente essendo nel gruppo `docker`).

Questa directory viene utilizzata solo per l'installazione e la configurazione. Non è qui che vengono archiviati i dati permanenti di Harbor. Tutti i servizi Harbor vengono eseguiti all'interno di contenitori Docker e i relativi dati vengono archiviati in volumi Docker. Dovresti conservare questa directory in modo da poter gestire la tua istanza Harbor in un secondo momento (ad esempio, per aggiornamenti o modifiche alla configurazione).