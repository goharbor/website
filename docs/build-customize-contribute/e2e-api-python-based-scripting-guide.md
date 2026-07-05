---
title: E2E (API) Guida allo scripting di test basato su Python
draft: true
---

#### Preparazione ####

Dopo aver ottenuto il codice sorgente Harbor (git clone https://github.com/goharbor/harbor.git), gli script di test Harbor E2E API possono essere trovati nella directory tests/apitests/python.

Prima di creare script, assicurati che il client swagger sia stato creato da "make swagger_client", quindi verrà creato l'archivio "harborclient"

1.`git clone https://github.com/goharbor/harbor.git`

2.`cd harbor`

3.`make swagger_client`

4.`cd harborclient/`


Usiamo $HARBORCLIENT_PATH per rappresentare il percorso di "harborclient" che hai creato con "make swagger_client".

Distribuisci l'istanza Harbor per i test e utilizzeremo $HARBOR_IP_ADDR per rappresentare l'istanza Harbor distribuita in questo documento.

Gli script di test Harbor E2E API importeranno la libreria Python nell'archivio "harborclient", imposta la variante dell'ambiente del sistema operativo per gli script di test Harbor E2E API:


1.`export HARBOR_HOST=$HARBOR_IP_ADDR`
2.`export SWAGGER_CLIENT_PATH=$HARBORCLIENT_PATH`

Fino ad ora, abbiamo svolto tutto il lavoro di preparazione.

#### Script ####

Come puoi vedere, utilizzeremo la libreria Python creata da "make swagger_client", in questa libreria abbiamo tutte le funzioni e i modelli API, ma per maggiore comodità incapsuliamo un ulteriore livello nell'archivio "libreria", quindi la struttura dello script è la seguente:

	-biblioteca/

	-test_project_level_policy_content_trust.py

	-test_progetto_quota.py

	-test_retention.py

	-...

Puoi aggiungere sia il codice della libreria che quello dello script, poiché non tutte le API sono state incapsulate.


#### Esempio di esecuzione manuale ####

root@porto:/porto/codice/porto# `python ./tests/apitests/python/test_add_sys_label_to_tag.py`

2020-03-11 13:40:07,269 DEBUG Avvio della nuova connessione HTTPS (1): 1.1.1.1:443
invia: 'POST /api/v2.0/users HTTP/1.1\r\nHost: 1.1.1.1\r\nAccept-Encoding: identità\r\nContent-Length: 156\r\nContent-Type: application/json\r\nAccept: application/json\r\nAutorizzazione: Basic YWRtaW46SGFyYm9yMTIzNDU=\r\nAgente utente: Swagger-Codegen/1.0.0/python\r\n\r\n{"username": "user-1583934007059", "role_id": 0, "password": "xxxxxxxx", "email": "realname-1583934007059@vmware.com", "realname": "realname-1583934007059"}'
risposta: 'HTTP/1.1 201 Creato\r\n'
intestazione: Server: nginx
intestazione: Data: mercoledì 11 marzo 2020 13:40:07 GMT
intestazione: Lunghezza contenuto: 0
intestazione: Connessione: keep-alive
intestazione: Posizione: /api/v2.0/users/9
intestazione: Set-Cookie: sid=2e05f902f345b855ec33221ade1c6d09; Percorso=/; Sicuro; HttpOnly
intestazione: ID-richiesta X: 9ba11b26-2cdb-432f-878e-3fed04fa61b1
intestazione: Strict-Transport-Security: max-age=31536000; includeresottodomini; precarico
intestazione: X-Frame-Opzioni: DENY
intestazione: Content-Security-Policy: frame-antenati 'nessuno'
2020-03-11 13:40:07,482 DEBUG https://1.1.1.1:443 "POST /api/v2.0/users HTTP/1.1" 201 0
2020-03-11 13:40:07,483 Corpo della risposta DEBUG:

......

......

......

#### Come aggiungere più script E2E in CI ####

Se desideri che i tuoi script vengano eseguiti in CI che serve per la verifica delle richieste pull, aggiungi il percorso completo dello script nel file *https://github.com/goharbor/harbor/blob/main/tests/robot-cases/Group0-BAT/API_DB.robot*, quindi gli script in questo file potranno essere attivati ​​una volta che c'è una richiesta pull.



#### Esegui test E2E tramite contenitore Docker ####

1. Avvia contenitore
    `docker run -it --privileged -v /harbor/code/harbor:/drone -w /drone goharbor/harbor-e2e-engine:3.0.1-api bash`
	Nota: "/harbor/code/harbor" è la directory principale del codice sorgente di Harbor.

2. Inizializza l'ambiente
    `robot -v DOCKER_USER:user -v DOCKER_PWD:pwd -v ip:10.10.10.10 -v ip1: -v HARBOR_PASSWORD:Harbor12345 /drone/tests/robot-cases/Group1-Nightly/Setup.robot`
	Nota: l'inizializzazione include la creazione del client swagger, l'avvio di dockerd e containerd, ecc.

3. Eseguire gli script API
    `robot --include robot_account -v DOCKER_USER:user -v DOCKER_PWD:pwd -v ip:10.10.10.10-v ip1: -v HARBOR_PASSWORD:Harbor12345  /drone/tests/robot-cases/Group0-BAT/API_DB.robot`
	Nota: gli script di test Python devono essere inclusi in API_DB.robot e raggruppati per tag, i tag sono l'input per l'opzione "–include". quindi gli script possono essere eseguiti in base ai tag.

