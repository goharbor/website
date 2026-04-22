---
title: Tracciamento distribuito
weight: 37
---

L'osservabilità è una caratteristica fondamentale per il funzionamento di un servizio in produzione e utilizzando questi dati è possibile identificare stati anomali e prendere decisioni informate per risolvere i problemi quando si verifica un errore. La traccia distribuita è un elemento chiave dell'osservabilità nell'applicazione moderna. Harbor può fornire dati di tracciamento distribuiti agli operatori e all'amministratore per conoscere lo stato di funzionamento corrente e facilitare la risoluzione dei problemi.  Harbor espone i dati di traccia utilizzando l'sdk [OpenTelemetria](https://opentelemetry.io/), puoi esportare facilmente le tracce tramite il protocollo Otel che può essere utilizzato da [Raccoglitore OpenTelemetry](https://opentelemetry.io/docs/collector/) quindi esposto quasi al backend di traccia on-prem o cloud. A causa della popolarità di [Jaeger](https://www.jaegertracing.io), Harbor può anche esporre direttamente i dati di tracciamento al backend Jaeger.

In Harbor v2.4 e versioni successive puoi abilitare la traccia distribuita in te Harbor [file di configurazione](../../install-config/configure-yml-file.md). Ma supportiamo solo un esportatore alla volta (non puoi impostare bosh o nessuno di essi se hai abilitato il tracciamento). Puoi impostare otel come esportatore e sfruttare OpenTelemetry Collector per ritrasmettere a più backend se desideri inviare dati a più esportatori. Allo stesso modo, l'esportatore Jaeger supporta la modalità agente e la modalità endpoint, ma è possibile abilitare solo una modalità alla volta.

# Dati esposti

I dati di tracciamento sono esposti da diversi componenti Harbor: `core`, `jobservice`, `registry`. Le sezioni seguenti elencano i dati di traccia Harbor disponibili.

| Dati | Componente | Esempio |
| :----------------------- | :---------- | :----------------------------------------------------------- |
| Ricevuta richiesta HTTP | Nucleo | Ogni richiesta HTTP (come operazione sul porto UI, immagine push, ecc.) |
| Il cliente ha inviato la richiesta HTTP | Nucleo | accesso principale ad altri servizi tramite HTTP (come controllo dello stato, chiamata servizio di lavoro API, ecc.) |
| Richiedi ID | Nucleo | Ad ogni traccia http verrà aggiunto un `X-Request-ID` , che aiuterà a trovare il log |
| Transazione database | Nucleo | Ogni operazione che ha attivato una transazione DB (come la creazione di un progetto, il push dell'immagine nel porto, ecc.) |
| Ricevuta richiesta HTTP | Servizio lavoro | Ogni richiesta HTTP (come controllo dello stato, chiamata dal core, ecc.) |
| Il cliente ha inviato la richiesta HTTP | Servizio lavoro | jobservice accede ad altri servizi tramite HTTP (come il lavoro di replica che chiama core API per inviare l'immagine, il lavoro GC che chiama Registryctl API, ecc.) |
| lavori di back-end | Servizio lavoro | Qualsiasi lavoro gestito da jobservice |
| Ricevuta richiesta HTTP | Registroctl | Ogni richiesta HTTP (come controllo dello stato dal core, chiamata dal servizio di lavoro, ecc.) |

