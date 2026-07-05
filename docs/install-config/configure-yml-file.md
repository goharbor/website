---
title: Configura il file YML Harbor
weight: 35
---

Impostare i parametri a livello di sistema per Harbor nel file `harbor.yml` contenuto nel pacchetto di installazione. Questi parametri diventano effettivi quando si esegue lo script `install.sh` per installare o riconfigurare Harbor.

Dopo la distribuzione iniziale e dopo aver avviato Harbor, eseguire una configurazione aggiuntiva nel portale Web Harbor.

## Parametri obbligatori

La tabella seguente elenca i parametri che devono essere impostati quando si distribuisce Harbor. Per impostazione predefinita, tutti i parametri richiesti non sono commentati nel file `harbor.yml`. I parametri opzionali sono commentati con `#`. Non è necessariamente necessario modificare i valori dei parametri richiesti rispetto a quelli predefiniti forniti, ma questi parametri devono rimanere senza commenti. Come minimo è necessario aggiornare il parametro `hostname`.

**IMPORTANTE**: Harbor non viene spedito con alcun certificato. Nelle versioni fino alla 1.9.x inclusa, per impostazione predefinita Harbor utilizza HTTP per servire le richieste registry. Ciò è accettabile solo in ambienti di test o di sviluppo con air gap. Negli ambienti di produzione, utilizzare sempre HTTPS.

È possibile utilizzare certificati firmati da un'autorità di certificazione di terze parti attendibile oppure certificati autofirmati. Per informazioni su come creare una CA e su come utilizzare una CA per firmare un certificato server e un certificato client, vedere [Configurazione di Harbor con HTTPS Accesso](configure-https.md).

<table border="0">
  <caption>
    Parametri richiesti per la distribuzione Harbor
  </caption>
  <tr>
    <th scope="col">Parametro</th>
    <th scope="col">Sottoparametri</th>
    <th scope="col">Descrizione e parametri aggiuntivi </th>
  </tr>
  <tr>
    <td valign="top"><code>hostname</code></td>
    <td valign="top">Nessuno</td>
    <td valign="top">Specificare l'indirizzo IP o il nome di dominio completo (FQDN) dell'host di destinazione su cui distribuire Harbor. Questo è l'indirizzo al quale accedi al Portale Harbor e al servizio registry. Ad esempio, <code>192.168.1.10</code> o <code>reg.yourdomain.com</code>. Il servizio registry deve essere accessibile a client esterni, quindi non specificare <code>localhost</code>, <code>127.0.0.1</code> o <code>0.0.0.0</code> come nome host.</td>
  </tr>
  <tr>
    <td valign="top"><code>http</code></td>
    <td valign="top"></td>
    <td valign="top">Non utilizzare HTTP in ambienti di produzione. L'utilizzo di HTTP è accettabile solo in ambienti di test o sviluppo con air gap che non dispongono di una connessione a Internet esterna. L'utilizzo di HTTP in ambienti privi di air gap espone ad attacchi man-in-the-middle.</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>port</code></td>
    <td valign="top">Numero di porta per HTTP, sia per il portale Harbor che per i comandi Docker. Il valore predefinito è 80.</td>
  </tr>
  <tr>
    <td valign="top"><code>https</code></td>
    <td valign="top"></td>
    <td valign="top">Utilizzare HTTPS per accedere al portale Harbor e al servizio token/notifica. Utilizzare sempre HTTPS in ambienti di produzione e ambienti privi di intercapedini.
      </td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>port</code></td>
    <td valign="top">Il numero di porta per HTTPS, sia per il portale Harbor che per i comandi Docker. Il valore predefinito è 443.</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>certificate</code></td>
    <td valign="top">Il percorso del certificato SSL.</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>private_key</code></td>
    <td valign="top">Il percorso della chiave SSL.</td>
  </tr>

  <tr>
    <td valign="top"><code>internal_tls</code></td>
    <td valign="top"></td>
    <td valign="top"> Utilizzare HTTPS per comunicare tra i componenti del porto</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>enabled</code></td>
    <td valign="top">Imposta questo flag su <code>true</code> significa che il tls interno è abilitato</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>dir</code></td>
    <td valign="top">Il percorso della directory che contiene i certificati e le chiavi interni</td>
  </tr>

  <tr>
    <td valign="top"><code>harbor_admin_password</code></td>
    <td valign="top">Nessuno</td>
    <td valign="top">Impostare una password iniziale per l'amministratore di sistema Harbor. Questa password viene utilizzata solo la prima volta che si avvia Harbor. Agli accessi successivi, questa impostazione viene ignorata e la password dell'amministratore viene impostata nel portale Harbor. Il nome utente e la password predefiniti sono <code>admin</code> e <code>Harbor12345</code>.</td>
  </tr>
  <tr>
    <td valign="top"><code>database</code></td>
    <td valign="top"></td>
    <td valign="top">Utilizzare un database PostgreSQL locale. Facoltativamente è possibile configurare un database esterno, nel qual caso è possibile disattivare questa opzione.</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>password</code></td>
    <td valign="top">Imposta la password root per il database locale. È necessario modificare questa password per le distribuzioni di produzione.</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>max_idle_conns</code></td>
    <td valign="top">Il numero massimo di connessioni nel pool di connessioni inattivo. Se è <=0, no idle connections are retained.</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>max_open_conns</code></td>
    <td valign="top">Il numero massimo di connessioni aperte al database. Se è <= 0, then there is no limit on the number of open connections.</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>conn_max_lifetime</code></td>
    <td valign="top">Il periodo di tempo massimo in cui una connessione può essere riutilizzata. Se è <= 0, connections are not closed due to a connection's age.</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>conn_max_idle_time</code></td>
    <td valign="top">Il periodo di tempo massimo in cui una connessione può rimanere inattiva. Se è <= 0, connections are not closed due to a connection's idle time.</td>
  </tr>
  <tr>
    <td valign="top"><code>data_volume</code></td>
    <td valign="top">Nessuno</td>
    <td valign="top">La posizione sull'host di destinazione in cui archiviare i dati di Harbor. Questi dati rimangono invariati anche quando i contenitori di Harbor vengono rimossi e/o ricreati. Facoltativamente è possibile configurare l'archiviazione esterna, nel qual caso disattivare questa opzione e abilitare <code>storage_service</code>. L'impostazione predefinita è <code>/data</code>.</td>
  </tr>
  <tr>
    <td valign="top"><code>trivy</code></td>
    <td valign="top"></td>
    <td valign="top">Configura scanner Trivy.</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>ignore_unfixed</code></td>
    <td valign="top">Imposta il flag su <code>true</code> per visualizzare solo le vulnerabilità risolte. Il valore predefinito è <code>false</code></td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>security_check</code></td>
    <td valign="top">Elenco separato da virgole dei problemi di sicurezza da rilevare. I valori possibili sono <code>vuln</code>, <code>config</code> e <code>secret</code>. Il valore predefinito è <code>vuln</code>.</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>skip_update</code></td>
    <td valign="top">Potresti voler abilitare questo flag negli ambienti di test o CI/CD per evitare problemi di limitazione della velocità di GitHub. Se il flag è abilitato è necessario scaricare manualmente l'archivio <code>trivy-offline.tar.gz</code>, estrarre i file <code>trivy.db</code> e <code>metadata.json</code> e montarli nel percorso <code>/home/scanner/.cache/trivy/db/trivy.db</code> nel contenitore. Il valore predefinito è <code>false</code></td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>insecure</code></td>
    <td valign="top">Imposta il flag su <code>true</code> per saltare la verifica del certificato registry. Il valore predefinito è <code>false</code></td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>github_token</code></td>
    <td valign="top">Impostare il token di accesso GitHub per scaricare Trivy DB. Trivy DB viene scaricato da Trivy dalla pagina di rilascio di GitHub. I download anonimi da GitHub sono soggetti al limite di 60 richieste all'ora. Normalmente tale limite tariffario è sufficiente per le operazioni di produzione. Se, per qualsiasi motivo, non fosse sufficiente, potresti aumentare il limite di velocità a 5000 richieste all'ora specificando il token di accesso GitHub. Per maggiori dettagli sulla limitazione della velocità di GitHub consultare https://developer.github.com/v3/#rate-limiting. È possibile creare un token GitHub seguendo le istruzioni in https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line</td>
  </tr>
  <tr>
    <td valign="top"><code>jobservice</code></td>
    <td valign="top"><code>max_job_workers</code></td>
    <td valign="top">Il numero massimo di lavoratori di replica nel servizio processi. Per ogni processo di replica dell'immagine, un lavoratore sincronizza tutti i tag di un repository con la destinazione remota. L'aumento di questo numero consente più processi di replica simultanei nel sistema. Tuttavia, poiché ciascun lavoratore consuma una certa quantità di risorse di rete/CPU/IO, imposta il valore di questo attributo in base alla risorsa hardware dell'host. Il valore predefinito è 10.</td>
  </tr>
<tr>
    <td valign="top"><code>notification</code></td>
    <td valign="top"><code>webhook_job_max_retry</code></td>
    <td valign="top">Imposta il numero massimo di tentativi per i lavori hook web. Il valore predefinito è 10.</td>
  </tr>
  <tr>
    <td valign="top"><code>log</code></td>
    <td valign="top"></td>
    <td valign="top">Configura registrazione. Harbor utilizza `rsyslog` per raccogliere i log per ciascun contenitore.</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>level</code></td>
    <td valign="top">Impostare il livello di registrazione su <code>debug</code>, <code>info</code>, <code>warning</code>, <code>error</code> o <code>fatal</code>. L'impostazione predefinita è <code>info</code>.</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>local</code></td>
    <td valign="top">Impostare i parametri di conservazione del registro:<ul>
          <li><code>rotate_count</code>: i file di registro vengono ruotati <code>rotate_count</code> volte prima di essere rimossi. Se count è 0, le vecchie versioni vengono rimosse anziché ruotate. Il valore predefinito è 50.</li>
          <li><code>rotate_size</code>: i file di registro vengono ruotati solo se diventano più grandi di <code>rotate_size</code> byte. Utilizza <code>k</code> per kilobyte, <code>M</code> per megabyte e <code>G</code> per gigabyte.  <code>100</code>, <code>100k</code>, <code>100M</code> e <code>100G</code> sono tutti valori validi. L'impostazione predefinita è 200M.</li>
          <li><code>location</code>: impostare la directory in cui archiviare i registri. Il valore predefinito è <code>/var/log/harbor</code>.</li>
        </ul></td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>external_endpoint</code></td>
    <td valign="top">Abilitare questa opzione per inoltrare i registri a un server syslog.
      <ul>
        <li><code>protocol</code>: protocollo di trasporto per il server syslog. L'impostazione predefinita è TCP.</li>
        <li><code>host</code>: l'URL del server syslog.</li>
        <li><code>port</code>: la porta su cui è in ascolto il server syslog</li>
    </ul> </td>
  </tr>
  <tr>
    <td valign="top"><code>proxy</code></td>
    <td valign="top"></td>
    <td valign="top">Configura i proxy da utilizzare da trivy-adapter, il servizio di replicazione e Harbor. Lasciare vuoto se non sono richiesti proxy. Alcuni proxy dispongono di impostazioni di whitelist, se Trivy è abilitato, è necessario aggiungere i seguenti URL alla whitelist del server proxy: <code>github.com</code>, <code>github-releases.githubusercontent.com</code> e <code>*.s3.amazonaws.com.</code></td>
  </tr>
    <tr>
    <td valign="top"></td>
    <td valign="top"><code>http_proxy</code></td>
    <td valign="top">Configurare un proxy HTTP, ad esempio <code>http://my.proxy.com:3128</code>.</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>https_proxy</code></td>
    <td valign="top">Configurare un proxy HTTPS, ad esempio <code>http://my.proxy.com:3128</code>.</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>no_proxy</code></td>
    <td valign="top">Configurare quando non utilizzare un proxy, ad esempio, <code>127.0.0.1,localhost,core,registry</code>.</td>
  </tr>
  <tr>
    <td valign="top"><code>cache</code></td>
    <td valign="top"></td>
    <td valign="top">Configura il livello cache per la tua istanza Harbor. Se abilitato, Harbor memorizzerà nella cache alcune risorse Harbor (ad esempio, artefatti, progetti o metadati di progetto) utilizzando Redis, riducendo la quantità di tempo e risorse utilizzate per richieste ripetute per la stessa risorsa Harbor. Si consiglia vivamente di abilitare questa funzionalità sulle istanze Harbor con tassi di richieste pull simultanee elevate per migliorare le prestazioni complessive di Harbor. Per ulteriori dettagli sull'implementazione del livello cache e sui miglioramenti delle prestazioni, vedere la pagina wiki <a href="https://github.com/goharbor/perf/wiki/Cache-layer">Cache Layer</a>.</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>enabled</code></td>
    <td valign="top">L'impostazione predefinita è <code>false</code>, impostata su <code>true</code> per abilitare il livello cache di Harbor.</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>expire_hours</code></td>
    <td valign="top">Configura il limite di scadenza della cache in ore. L'impostazione predefinita è 24. </td>
  </tr>
</table>

## Parametri facoltativi

Nella tabella seguente sono elencati i parametri facoltativi aggiuntivi che è possibile impostare per configurare la distribuzione Harbor oltre le impostazioni minime richieste. Per abilitare un'impostazione, è necessario rimuoverla dal commento in `harbor.yml` eliminando il carattere `#` iniziale.

<table border="0">
  <caption>
    Parametri opzionali per Harbor
  </caption>
  <tr>
    <th scope="col">Parametro</th>
    <th scope="col">Sottoparametri</th>
    <th scope="col">Descrizione e parametri aggiuntivi </th>
  </tr>
  <tr>
    <td valign="top"><code>external_url</code></td>
    <td valign="top">Nessuno</td>
    <td valign="top">Abilita questa opzione per utilizzare un proxy esterno. Quando abilitato, il nome host non viene più utilizzato.</td>
  </tr>
  <tr>
  <tr>
    <td valign="top"><code>storage_service</code></td>
    <td valign="top"></td>
    <td valign="top">Per impostazione predefinita, Harbor memorizza immagini e grafici sul file system locale. In un ambiente di produzione, potresti voler utilizzare un altro backend di archiviazione anziché il file system locale. I parametri elencati di seguito sono le configurazioni per registry. Consulta *Configurazione del backend di archiviazione* di seguito per ulteriori informazioni su come configurare un backend diverso.</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>ca_bundle</code></td>
    <td valign="top">Il percorso del certificato CA radice personalizzato, che viene inserito nell'archivio attendibilità di registry e nei contenitori del repository di grafici. Di solito è necessario se la memoria interna utilizza un certificato autofirmato.</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>filesystem</code></td>
    <td valign="top">L'impostazione predefinita è <code>filesystem</code>, ma è possibile impostare <code>azure</code>, <code>gcs</code>, <code>s3</code>, <code>swift</code> e <code>oss</code>. Per informazioni su come configurare altri backend, vedere <a href="#backend">Configurazione di un backend di archiviazione</a> di seguito. Imposta <code>maxthreads</code> per limitare il numero di thread al provider esterno. Il valore predefinito è 100.</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>redirect</code></td>
    <td valign="top">Imposta <code>deactivate</code> su <code>true</code> quando desideri disattivare registry reindirizzamento</td>
  </tr>
  <tr>
    <td valign="top"><code>external_database</code></td>
    <td valign="top"></td>
    <td valign="top">Configurare le impostazioni del database esterno, se si disattiva l'opzione del database locale. Attualmente, Harbor supporta solo il database PostgreSQL. È necessario creare un database per il core Harbor. Le tabelle vengono generate automaticamente all'avvio di Harbor.</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>harbor</code></td>
    <td valign="top"><p>Configurare un database esterno per i dati Harbor.</p>
      <ul>
        <li><code>host</code>: nome host del database Harbor.</li>
        <li><code>port</code>: porta database.</li>
        <li><code>db_name</code>: nome del database.</li>
        <li><code>username</code>: nome utente per connettersi al database principale Harbor.</li>
        <li><code>password</code>: password per l'account impostato in <code>username</code>.</li>
        <li><code>ssl_mode</code>: abilita la modalità SSL.</li>
        <li><code>max_idle_conns</code>: il numero massimo di connessioni nel pool di connessioni inattive. Se &lt;=0 non viene mantenuta alcuna connessione inattiva. Il valore predefinito è 2.</li>
        <li><code>max_open_conns</code>: il numero massimo di connessioni aperte al database. Se &lt;= 0 non c'è limite al numero di connessioni aperte. Il valore predefinito è 0.</li>
    </ul> </td>
  </tr>
  <tr>
    <td valign="top"><code>external_redis</code></td>
    <td valign="top"></td>
    <td valign="top">Configura un'istanza Redis esterna.</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>host</code></td>
    <td valign="top">redis_host:redis_port dell'istanza Redis esterna. Se stai utilizzando la modalità Sentinel, questa parte dovrebbe essere host_sentinel1:port_sentinel1,host_sentinel2:port_sentinel2</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>sentinel_master_set</code></td>
    <td valign="top">Impostarlo solo quando si utilizza la modalità Sentinel</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>password</code></td>
    <td valign="top">Password per connettersi all'istanza Redis esterna.</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>registry_db_index</code></td>
    <td valign="top">Indice del database per Harbor registry.</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>jobservice_db_index</code></td>
    <td valign="top">Indice database per jobservice.</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>trivy_db_index</code></td>
    <td valign="top">Indice database per adattatore Trivy.</td>
  </tr>
  <tr>
    <td valign="top"><code>metric</code></td>
    <td valign="top"></td>
    <td valign="top">Configura l'esposizione dei parametri dell'istanza Harbor a una porta e un percorso specificati</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>enabled</code></td>
    <td valign="top">Abilita l'esposizione dei parametri sulla tua istanza Harbor impostandola su <code>true</code>. L'impostazione predefinita è <code>false</code></td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>port</code></td>
    Le metriche <td valign="top">Port sono esposte su. L'impostazione predefinita è <code>9090</code></td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>path</code></td>
    Le metriche <td valign="top">Path sono esposte su. L'impostazione predefinita è <code>/metrics</code></td>
  </tr>
  <tr>
    <td valign="top"><code>trace</code></td>
    <td valign="top"></td>
    <td valign="top">Configurare l'esposizione dei dati di tracciamento distribuito</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>enabled</code></td>
    <td valign="top">Abilita l'esposizione della traccia sulla tua istanza Harbor impostandola su <code>true</code>. L'impostazione predefinita è <code>false</code></td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>sample_rate</code></td>
    <td valign="top">Imposta la frequenza di campionamento del tracciamento. Ad esempio, imposta sample_rate su <code>1</code> se desideri campionare il 100% dei dati di traccia; impostare <code>0.5</code> se si desidera campionare il 50% dei dati di traccia, e così via </td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>namespace</code></td>
    <td valign="top">Namespace utilizzato per differenziare i diversi servizi portuali, che verrà impostato per attribuire con la chiave <code>service.namespace</code></td>
  </tr>
    <tr>
    <td valign="top"></td>
    <td valign="top"><code>attributes</code></td>
    <td valign="top">Gli attributi sono un valore chiave dict contenente attributi personalizzati definiti dall'utente utilizzati per inizializzare il provider di traccia e tutti questi attributi verranno aggiunti ai dati di traccia</td>
  </tr>
  <tr>
    <td valign="top"></td>
    <td valign="top"><code>jaeger</code></td>
    <td valign="top"><ul>
      <li><code>endpoint</code>: l'URL dell'endpoint (ad esempio <code>http://127.0.0.1:14268/api/traces</code>). impostare l'endpoint significa esportare su Jaeger Collector tramite http.</li>
      <li><code>username:</code>: nome utente utilizzato per connettere l'endpoint. Lasciato vuoto se non necessario.</li>
      <li><code>password:</code>: password utilizzata per connettere l'endpoint. Lasciato vuoto se non necessario.</li>
      <li><code>agent_host</code>: il nome host dell'agente Jaeger. Impostare agent_host significa esportare i dati nell'agente Jaeger tramite udp. </li>
      <li><code>agent_port:</code>: il nome della porta di jaeger agent.</li>
    </ul></td>
  </tr>
   <tr>
    <td valign="top"></td>
    <td valign="top"><code>otel</code></td>
    <td valign="top"><ul>
      <li><code>endpoint</code>: il nome host e la porta per il backend compatibile con otel (ad esempio <code>127.0.0.1:4318</code>).</li>
      <li><code>url_path:</code>: il percorso dell'URL dell'endpoint (ad esempio <code>127.0.0.1:4318</code>) </li>
      <li><code>compression:</code>: se si abilita la compressione dei dati</li>
      <li><code>insecure</code>: ignora la verifica del certificato per il backend otel </li>
      <li><code>timeout:</code>: il timeout del trasferimento dati</li>
    </ul></td>
  </tr>
</table>



{{< note >}}
Il file `harbor.yml` include opzioni per configurare un certificato CA UAA. Questa modalità di autenticazione non è consigliata e non è documentata.
{{< /note >}}

## Configurazione di un backend di archiviazione {#backend}

Per impostazione predefinita, Harbor utilizza la memoria locale per registry, ma è possibile configurare facoltativamente l'impostazione `storage_service` in modo che Harbor utilizzi la memoria esterna. Per informazioni su come configurare il backend di archiviazione di un registry per diversi provider di archiviazione, consultare la documentazione [Riferimento alla configurazione della distribuzione](https://distribution.github.io/distribution/about/configuration/) nel registro di distribuzione (in precedenza registro Docker). Ad esempio, se utilizzi Openstack Swift come backend di archiviazione, i parametri potrebbero essere simili ai seguenti:

``` yaml
storage_service:
  ca_bundle:
  swift:
    username: admin
    password: ADMIN_PASS
    authurl: http://keystone_addr:35357/v3/auth
    tenant: admin
    domain: default
    region: regionOne
    container: docker_images
  redirect:
    disabled: false
```

## Cosa fare dopo

Per installare Harbor, [Esegui lo script di installazione](run-installer-script.md).

