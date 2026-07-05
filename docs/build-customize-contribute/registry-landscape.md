---
title: Paesaggio del registro
---

L'ecosistema nativo del cloud si sta muovendo rapidamente: i registri e i relativi set di funzionalità non fanno eccezione. Abbiamo fatto del nostro meglio per esaminare il panorama dei container registry e confrontarlo con il nostro set di funzionalità principali.

Questa tabella è mantenuta dai contributi della comunità Harbor. Se trovi qualcosa di obsoleto o completamente errato, invia un PR e lo sistemeremo immediatamente.

| Caratteristica | Harbor | Docker Registro attendibile | Banchina | Provider cloud (GCP, AWS, Azure) | Distribuzione/Distribuzione | Artifabbrica | GitLab |
| -------------:                                         | :----: | :---------------------: | :-----: | :-------------------------------: | :-----------------:         | :---------: | :------: |
| Capacità di determinare la versione dei file binari nei contenitori | ✓ | ✓ | ✓ | ✗ | ✗ | ?           | ?        |
| Repository di artefatti (rpms, git, jar, ecc.) | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | parziale |
| Registri di controllo | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ |
| Affidabilità e convalida dei contenuti | ✓ | ✓ | ✓ | ✗ | parziale | parziale | ✗ |
| Certificati TLS personalizzati | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ |
| Helm Gestore archivio grafici | ✓ | ✗ | parziale | ✗ | ✗ | ✓ | ✗ |
| Autenticazione basata su LDAP | ✓ | ✓ | ✓ | parziale | ✗ | ✓ | ✓ |
| Autenticazione locale | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ |
| Metriche | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Multi-tenancy (progetti, team, spazi dei nomi, ecc.) | ✓ | ✓ | ✓ | parziale | ✗ | ✓ | ✓ |
| Open Source | ✓ | parziale | ✓ | ✗ | ✓ | parziale | parziale |
| Quote del progetto (per consumo di spazio di archiviazione) | ✓ | ✗ | ✓ | parziale | ✗ | ✗ | ✗ |
| Replica tra istanze | ✓ | ✓ | ✓ | n/a | ✗ | ✓ | ✗ |
| Replica tra non istanze | ✓ | ✗ | ✓ | n/a | ✗ | ✗ | ✗ |
| Conti robot per grafici Helm | ✓ | ✗ | ✗ | ?                                 | ✗ | ✗ | ✗ |
| Account robot per immagini | ✓ | ?                       | ✓ | ?                                 | ✗ | ?           | ?        |
| Controllo degli accessi basato sui ruoli | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ | ✗ |
| Accesso singolo (OIDC) | ✓ | ✓ | ✓ | ✓ | ✗ | parziale | ✗ |
| Politica di conservazione dei tag | ✓ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| Cache proxy del registro a monte | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ | ✗ |
| Scansione e monitoraggio delle vulnerabilità | ✓ | ✓ | ✓ | ✗ | ✗ | ✓ | parziale |
| Framework del plugin per la scansione delle vulnerabilità | ✓ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| Inserimento nella lista consentita delle vulnerabilità | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Webhook | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
