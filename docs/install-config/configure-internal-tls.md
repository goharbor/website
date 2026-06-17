---
title: Configurare la comunicazione TLS interna tra il componente Harbor
weight: 30
---

 Per impostazione predefinita, la comunicazione interna tra il componente Harbor (harbor-core,harbor-jobservice,proxy,harbor-portal,registry,registryctl,trivy_adapter) utilizza il protocollo HTTP che potrebbe non essere sufficientemente sicuro per alcuni ambienti di produzione. A partire da Harbor v2.0, TLS può essere utilizzato per questa rete interna. Negli ambienti di produzione, utilizzare sempre HTTPS è una procedura consigliata.

Questa funzionalità viene introdotta tramite `internal_tls` nel file `harbor.yml`. Per abilitare TLS interno, impostare `enabled` su `true` e impostare il valore `dir` sul percorso della directory che contiene i file del certificato interno.

Tutti i certificati possono essere generati automaticamente dallo strumento `prepare`.
```bash
docker run -v /:/hostfs goharbor/prepare:<current_harbor_version> gencert -p /path/to/internal/tls/cert
```

L'utente può anche fornire la propria CA per generare gli altri certificati. Basta inserire il certificato e la chiave della CA nella directory tls cert interna e denominarli `harbor_internal_ca.key` e `harbor_internal_ca.crt`.
Inoltre, un utente può anche fornire i certificati per tutti i componenti. Tuttavia, ci sono alcuni vincoli per i certificati:

* Innanzitutto, tutti i certificati devono essere firmati da un'unica CA univoca
* In secondo luogo, il nome file del certificato interno e il campo `CN` nel file del certificato devono seguire la convenzione elencata di seguito.
* In terzo luogo, poiché il certificato autofirmato senza SAN era deprecato in Golang 1.5, è necessario aggiungere l'estensione SAN ai file del certificato quando si generano certificati autonomamente, altrimenti l'istanza Harbor non si avvierà normalmente. Il nome DNS nell'estensione SAN deve corrispondere al campo CN nella tabella seguente. Per ulteriori informazioni fare riferimento a [Note sulla versione di Golang 1.5](https://golang.org/doc/go1.15#commonname) e [questo problema](https://github.com/golang/go/issues/24151).

    |nome|utilizzo|CN|
    |---|---|---|
    |`harbor_internal_ca.key`| file chiave di ca per TLS interno | N/D |
    |`harbor_internal_ca.crt`| file di certificato ca per TLS interno | N/D |
    |`core.key`| file chiave del core | N/D |
    |`core.crt`| file del certificato core| `core` |
    |`job_service.key`| File chiave di job_service | N/D |
    |`job_service.crt`| File del certificato di job_service| `jobservice` |
    |`proxy.key`| file chiave del proxy | N/D |
    |`proxy.crt`| file del certificato del proxy| `proxy` |
    |`portal.key`| file chiave del portale | N/D |
    |`portal.crt`| file di certificato del portale| `portal` |
    |`registry.key`| File chiave di registry | N/D |
    |`registry.crt`| File del certificato di registry| `registry` |
    |`registryctl.key`| File chiave di Registryctl | N/D |
    |`registryctl.crt`| File del certificato di Registryctl| `registryctl` |
    |`trivy_adapter.key`| file chiave di trivy_adapter. | N/D |
    |`trivy_adapter.crt`| File del certificato di trivy_adapter.| `trivy-adapter` |
