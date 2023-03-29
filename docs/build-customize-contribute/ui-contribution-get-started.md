---
title: Developing the Harbor Frontend
---

If you already have a harbor backend environment, you can build a frontend development environment with the following
configuration.

1. Open the terminal and run the following command to copy "proxy.config.mjs.temp" file to "proxy.config.mjs".
    ```sh
    cd harbor/src/portal
    cp proxy.config.mjs.temp proxy.config.mjs
    ```

   **NOTE:** You should specify an available Harbor hostname. And you can specify the agent if you work behind a
   corporate proxy.

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

2. Install npm packages and 3rd-party dependencies.

    ```sh
    npm install
    ```

3. Execute the following command，serve Harbor locally.

    ```sh
    npm run start
    ```

4. Then you can visit the Harbor by address: https://localhost:4200.
