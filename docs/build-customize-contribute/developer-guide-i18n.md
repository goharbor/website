---
title: Developing for Internationalization
---

{{< note >}}
All the files you created should use UTF-8 encoding.
{{< /note >}}

There are several translations available for the Harbor portal. See the available [translation files](https://github.com/goharbor/harbor/tree/master/src/portal/src/i18n/lang) for a full list of available languages.

{{< note >}}
Harbor only officially supports the English and Chinese translations, and both languages are verified for each release. If you plan to use another translation, its recommended that you verify the translations are correct for your Harbor version before implementing.
{{< /note >}}

Use the steps below to add a translation for a new language to the Harbor portal.

1. In the folder `src/portal/src/i18n/lang`, copy json file `en-us-lang.json` to a new file and rename it to `<language>-<locale>-lang.json` .

    The file contains a JSON object including all the key-value pairs of UI strings:

    ```javascript
    {
      "APP_TITLE": {
        "VMW_HARBOR": "Harbor",
        "HARBOR": "Harbor",
        // ...
      },
      // ...
    }
    ```

    In the file `<language>-<locale>-lang.json`, translate all the values into your language. Do not change any keys.

2. After creating your language file, you should add it to the language supporting list.

    Locate the file `src/portal/src/app/shared/entities/shared.const.ts`.

    Append `<language>-<locale>` to the language supporting list:

    ```typescript
    export const supportedLangs = ['en-us', 'zh-cn', '<language>-<locale>'];
    ```

    Define the language display name and append it to the name list:

    ```typescript
    export const languageNames = {
        "en-us": "English",
        "zh-cn": "中文简体",
        "<language>-<locale>": "<DISPLAY_NAME>"
    };
    ```
  Don't miss the comma before the new key-value item you've added.


3. Enable the new language in the view.

    Locate the file `src/portal/src/app/shared/components/navigator/navigator.component.html` and then find the following code piece:

    ```html
    <div class="dropdown-menu">
      <a href="javascript:void(0)" clrDropdownItem (click)='switchLanguage("en-us")' [class.lang-selected]='matchLang("en-us")'>English</a>
      <a href="javascript:void(0)" clrDropdownItem (click)='switchLanguage("zh-cn")' [class.lang-selected]='matchLang("zh-cn")'>中文简体</a>
    </div>
    ```

    Add a new menu item for your language:

    ```html
    <div class="dropdown-menu">
      <a href="javascript:void(0)" clrDropdownItem (click)='switchLanguage("en-us")' [class.lang-selected]='matchLang("en-us")'>English</a>
      <a href="javascript:void(0)" clrDropdownItem (click)='switchLanguage("zh-cn")' [class.lang-selected]='matchLang("zh-cn")'>中文简体</a>
      <a href="javascript:void(0)" clrDropdownItem (click)='switchLanguage("<language>-<locale>")' [class.lang-selected]='matchLang("<language>-<locale>")'>DISPLAY_NAME</a>
    </div>
    ```

4. Next, refer to [Build Harbor from Source Code](compile-guide.md) to rebuild and restart Harbor.

## Contributing localizations to Harbor
If you'd like to [contribute your localization file](https://github.com/goharbor/harbor/blob/master/CONTRIBUTING.md) to the Harbor project, please make a pull request with the changes from the instructions above. Please do your best to make sure your translations are correct and easily understood by speakers of that language.

Finding reviewers for a translation PR is best effort, maintainers may not be able to review the pull request because they do not speak or read the language of your contribution. If you know of another community member who can help with reviewing the pull request, make sure to tag them when you open the PR. You should also plan to attend a community meeting to raise awareness for your pull request and ask the community for help reviewing.

Your contribution may still be accepted without additional reviews even if we aren't able to find someone to review the translations in your pull request.
