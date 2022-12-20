---
title: Developing the Harbor Frontend
---

If you already have a harbor backend environment, you can build a frontend development environment with the following configuration.

1. Create the file proxy.config.json in the directory harbor/src/portal，and config it according to the sample below.

    **NOTE:** You should replace “hostname” with an available Harbor hostname.

    ```json
    [
      {
        "context": [
          "/api",
          "/c",
          "/i18n",
          "/chartrepo",
          "/LICENSE",
          "/swagger.json",
          "/swagger2.json",
          "/devcenter-api-2.0",
          "/swagger-ui.bundle.js"
        ],
        "target": "https://hostname",
        "secure": false,
        "changeOrigin": true,
        "logLevel": "debug"
      }
    ]
    ```

2. Open the terminal and run the following command，install npm packages as 3rd-party dependencies.

    ```sh
    cd harbor/src/portal
    npm install
    ```

3. Execute the following command，serve Harbor locally.

    ```sh
    npm run start
    ```

4. Then you can visit the Harbor by address: https://localhost:4200.
