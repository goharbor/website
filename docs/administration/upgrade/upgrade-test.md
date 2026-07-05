---
title: Prova l'aggiornamento Harbor
weight: 50
---

## Prepara i dati  
1. Aggiungi utente usera userb userc userd usere, imposta usera userb come amministratore di sistema.  
2. Crea il progetto projecta projectc come privato, crea projectb come pubblico.  
3. Aggiungi usera come amministratore di projecta, userc come sviluppatore e userd come ospite. Fai lo stesso con projectb e projectc.  
4. Accedi al porto come usera, invia un'immagine non firmata a projecta, quindi invia un'immagine firmata a projecta.
5. Accedi al porto come userc, invia un'immagine non firmata a projecta, quindi invia un'immagine firmata a projeca.
6. Accedi al porto come utente, invia ciascuna immagine una volta.   
7. Ripetere 4 5 6 per projectb e projectc.
8. Aggiungi un endpoint al porto.  
9. Aggiungi una regola di replica immediata a projeca, una regola di pianificazione a projectb, una regola manuale a projectc, attiva ciascuna regola una volta.  
10. Aggiungere 5 etichette di sistema syslabel1 a syslabel5 e taggare syslabel1 e syslabel2 a tutte le immagini non firmate.    
11. In ogni progetto aggiungi 5 etichette di progetto projlabela a projlabele, aggiungi projlabela projlabelb e projlabelc all'immagine firmata.
12. Avviare un processo di scansione di tutte le immagini per scansionare tutte le immagini (per l'istanza abilitata Trivy)  
13. Aggiorna pubblicamente il progetto, l'attendibilità dei contenuti, la gravità e le impostazioni di scansione.
14. Aggiorna l'e-mail Harbor, la scadenza del token di sola lettura e le impostazioni di scansione.  
15. Aggiorna le informazioni sul repository.   
**NOTA**: il passaggio di creazione utente non è necessario se la modalità di autenticazione è LDAP.  

# Aggiornamento

## Segui la guida all'aggiornamento  
1. Eseguire l'immagine db migrator sul database di backup.
2. Eseguire l'immagine db migrator per migrare il database.
3. Installa la nuova versione del porto.

# Dopo l'aggiornamento  

1. Confermare che gli utenti esistano e siano disponibili (non è necessaria la modalità VIC e LDAP).  
2. Confermare che gli utenti abbiano il ruolo corretto.  
3. Confermare che le etichette siano esistenti e corrette. (Non è necessario VIC)   
4. Confermare l'esistenza dell'endpoint.  
5. Confermare che la regola di replica esiste e funziona bene.  
6. Conferma le impostazioni a livello di progetto (pubblicamente, attendibilità dei contenuti, scansione) come prima.  
7. Confermare le impostazioni a livello di sistema (scansione della scadenza del token e-mail) come prima.  
8. Confermare che il risultato della scansione sia lo stesso di prima dell'aggiornamento.  
9. Confermare il registro degli accessi come prima dell'aggiornamento.  
10. Confermare le informazioni sul repository come prima.  
11. Conferma gli altri metadati dell'immagine (ad esempio autore, dimensione) come prima.
