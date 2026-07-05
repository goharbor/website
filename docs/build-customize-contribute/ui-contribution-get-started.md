---
title: Sviluppo del frontend Harbor
---

Se disponi già di un ambiente backend Harbor, puoi creare un ambiente di sviluppo frontend con quanto segue
configurazione.

1. Aprire il terminale ed eseguire il comando seguente per copiare il file "proxy.config.mjs.temp" in "proxy.config.mjs".
    ```sh
    cd harbor/src/portal
    cp proxy.config.mjs.temp proxy.config.mjs
    ```

   **NOTA:** è necessario specificare un nome host Harbor disponibile. E puoi specificare l'agente se lavori dietro a
   delega aziendale.

```js
import HttpsProxyAgent from 'https-proxy-agent';
// Define the proxy configuration
const HarborProxyConfig = [
  {
    "context": [
      "/api",
      "/c",
      "/i18n",
      "/chartrepo",
      "/LICENSE",
      "/swagger.json",
      "/devcenter-api-2.0",
      "/swagger-ui.bundle.js"
    ],
    "target": "${A Harbor server}",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
];
// Define if you use agent
const useAgent = false;
// Specify an agent server, if empty, will read it from environment variable http_proxy or HTTP_PROXY
const specifiedAgentServer = "${An agent server}";

function setupForCorporateProxy(proxyConfig) {
  if (useAgent) {
    const agentServer = process.env.http_proxy || process.env.HTTP_PROXY || specifiedAgentServer;
    if (agentServer) {
      const agent = new HttpsProxyAgent(agentServer);
      console.log('Using corporate agent server: ' + agentServer);
      proxyConfig.forEach(function (entry) {
        entry.agent = agent;
      });
    }
  }
  return proxyConfig;
}

export default setupForCorporateProxy(HarborProxyConfig);  
```

2. Installa i pacchetti npm e le dipendenze di terze parti.

    ```sh
    npm install
    ```

3. Eseguire il comando seguente, servire Harbor localmente.

    ```sh
    npm run start
    ```

4. Quindi puoi visitare Harbor tramite l'indirizzo: https://localhost:4200.
