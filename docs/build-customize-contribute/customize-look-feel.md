---
title: Customize the Look and Feel of Harbor
---

The primary look & feel of Harbor supports to be customized with several simple steps. All the relevant customization in configurations are saved in the `setting.json` file under `$HARBOR_DIR/src/portal/src` folder with `json` format and will be loaded when Harbor is launched.

{{< note >}}
There is a known issue in Harbor v2.0.0 where the `headerBgColor` setting is overridden by Harbor's default light and dark mode value. If you were using this setting in previous versions, it will be ignored after upgrading to v2.0. This will be fixed in a future version.
{{< /note >}}

## Configure

Open the `setting.json` file, you'll see the default content as shown below:

```json
{
  "headerBgColor": "#004a70",
  "headerLogo": "",
  "loginBgImg": "",
  "appTitle": "",
  "product": {
    "name": "Harbor",
    "introduction": {
      "zh-cn": "",
      "es-es": "",
      "en-us": ""
    }
  }
}
```

Change the values of configuration if you want to override the default style to your own. Here are references:

* **headerBgColor**: Background color of the page header, support either HEX or RGB value. e.g: `#004a70` and `rgb(210,110,235)`.
* **headerLogo**: Name path of the logo image in the header, e.g: 'logo.png'. The image file should be put in the `images` folder.
* **loginBgImg**: Name path of the background image displayed in the login page, e.g: 'login_bg.png'. The image file should be put in the `images` folder. Suggest the size of this image should be bigger than 800px*600px.
* **Product**: Contain metadata / description of the product.
  - **title**: The full product title displayed in the login page.
  - **company**: Name of the company publishing the product.
  - **name**: Name of the product.
  - **introductions**: The introduction about the product with different languages, which are displayed in the `About` dialog.

## Build

Once the `setting.json` configurations has been updated, re-[build](#configure) your product to apply the new changes.
