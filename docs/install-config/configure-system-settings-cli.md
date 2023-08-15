---
title: Harbor Configuration
weight: 65
---

Some Harbor configuration is configured separately from the [Configure the Harbor YML File](configure-yml-file.md) section. You can change the configuration in the Harbor interface, through HTTP requests, or using an environment variable. This page describes the available configuration items, and how to use the commandline or environment variable to update the configuration.


## Example Configuration Commands for the Commandline


**Get the current configuration:**

```sh
curl -u "<username>:<password>" -H "Content-Type: application/json" -ki <Harbor Server URL>/api/v2.0/configurations
```

**Update the current configuration:**

```sh
curl -X PUT -u "<username>:<password>" -H "Content-Type: application/json" -ki <Harbor Server URL>/api/v2.0/configurations -d'{"<item_name>":"<item_value>"}'
```


**Update Harbor to use LDAP authentication:**

Command

```shell
curl -X PUT -u "<username>:<password>" -H "Content-Type: application/json" -ki https://harbor.sample.domain/api/v2.0/configurations -d'{"auth_mode":"ldap_auth"}'
```

Output

```
HTTP/1.1 200 OK
Server: nginx
Date: Wed, 08 May 2019 08:22:02 GMT
Content-Type: text/plain; charset=utf-8
Content-Length: 0
Connection: keep-alive
Set-Cookie: sid=a5803a1265e2b095cf65ce1d8bbd79b1; Path=/; HttpOnly
```

**Restrict project creation to Harbor administrators:**

Command

```shell
curl -X PUT -u "<username>:<password>" -H "Content-Type: application/json" -ki https://harbor.sample.domain/api/v2.0/configurations -d'{"project_creation_restriction":"adminonly"}'
```

Output

```
HTTP/1.1 200 OK
Server: nginx
Date: Wed, 08 May 2019 08:24:32 GMT
Content-Type: text/plain; charset=utf-8
Content-Length: 0
Connection: keep-alive
Set-Cookie: sid=b7925eaf7af53bdefb13bdcae201a14a; Path=/; HttpOnly
```

**Update the token expiration time:**

Command

```shell
curl -X PUT -u "<username>:<password>" -H "Content-Type: application/json" -ki https://harbor.sample.domain/api/v2.0/configurations -d'{"token_expiration":"300"}'
```

Output

```
HTTP/1.1 200 OK
Server: nginx
Date: Wed, 08 May 2019 08:23:38 GMT
Content-Type: text/plain; charset=utf-8
Content-Length: 0
Connection: keep-alive
Set-Cookie: sid=cc1bc93ffa2675253fc62b4bf3d9de0e; Path=/; HttpOnly
```

## Set Configuration Items Using An Environment Variable

Introduced in 2.3.0 is the ability to use an environment variable, `CONFIG_OVERWRITE_JSON`, in the core container to set the configuration. Once the `CONFIG_OVERWRITE_JSON` variable is set, you can only update or remove the configuration by updating the `CONFIG_OVERWRITE_JSON` and restarting the container. You will not be able to update the configuration in the Harbor interface or in the commandline.

**Example CONFIG_OVERWRITE_JSON configuration:**

```
CONFIG_OVERWRITE_JSON={"ldap_verify_cert":"false", "auth_mode":"ldap_auth","ldap_base_dn":"dc=example,dc=com", "ldap_search_dn":"cn=admin,dc=example,dc=com","ldap_search_password":"admin","ldap_url":"myldap.example.com", "ldap_scope":2}

```

See the [Harbor Configuration Items](#harbor-configuration-items) table below for more information about available inputs for `CONFIG_OVERWRITE_JSON`.

{{< note >}}
If there is a legacy user in your instance of Harbor, the authentication mode can’t be changed by the environment variable `CONFIG_OVERWRITE_JSON`.
{{< /note >}}


## Harbor Configuration Items

| Configure item name | Description                                                                                                                                                                         | Type    | Required | Default Value |
| ------------ |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------| ----- | ----- |
auth_mode | Authentication mode, it can be db_auth, ldap_auth, uaa_auth or oidc_auth                                                                                                            | string  
ldap_url | LDAP URL                                                                                                                                                                            | string  | required |
ldap_base_dn | LDAP base DN                                                                                                                                                                        | string  | required(ldap_auth)
ldap_filter | LDAP filter                                                                                                                                                                         | string  | optional
ldap_scope | LDAP search scope, 0-Base Level, 1- One Level, 2-Sub Tree                                                                                                                           | number  | optional | 2-Sub Tree
ldap_search_dn | LDAP DN to search LDAP users                                                                                                                                                        | string  | required(ldap_auth)
ldap_search_password | LDAP DN's password                                                                                                                                                                  | string  | required(ldap_auth)
ldap_timeout | LDAP connection timeout                                                                                                                                                             | number  | optional | 5
ldap_uid | LDAP attribute to indicate the username in Harbor                                                                                                                                   | string  | optional | cn
ldap_verify_cert | Verify cert when create SSL connection with LDAP server, true or false                                                                                                              | boolean | optional | true
ldap_group_admin_dn | LDAP Group Admin DN                                                                                                                                                                 | string  | optional
ldap_group_attribute_name | LDAP Group Attribute, the LDAP attribute indicate the groupname in Harbor, it can be gid or cn                                                                                      | string  | optional | cn
ldap_group_base_dn | The Base DN which to search the LDAP groups                                                                                                                                         | string  | required(ldap_auth and LDAP group)
ldap_group_search_filter | The filter to search LDAP groups                                                                                                                                                    | string  | optional
ldap_group_search_scope | LDAP group search scope, 0-Base Level, 1- One Level, 2-Sub Tree                                                                                                                     | number  | optional | 2-Sub Tree|
ldap_group_membership_attribute | LDAP group membership attribute, to indicate the group membership, it can be memberof, or ismemberof                                                                                | string  | optional | memberof
project_creation_restriction | The option to indicate user can be create object, it can be everyone, adminonly                                                                                                     | string  | optional | everyone
read_only | The option to set repository read only, it can be true or false                                                                                                                     | boolean | optional | false
self_registration | User can register account in Harbor, it can be true or false                                                                                                                        | boolean | optional| true
token_expiration | Security token expirtation time in minutes                                                                                                                                          | number  |optional| 30
uaa_client_id | UAA client ID                                                                                                                                                                       | string  | required(uaa_auth)
uaa_client_secret | UAA certificate                                                                                                                                                                     | string  | required(uaa_auth)
uaa_endpoint | UAA endpoint                                                                                                                                                                        | string  |  required(uaa_auth)
uaa_verify_cert | UAA verify cert, true or false                                                                                                                                                      | boolean | optional | true
oidc_name | Name for OIDC authentication                                                                                                                                                        | string  | required(oidc_auth)
oidc_endpoint | Endpoint for OIDC auth                                                                                                                                                              | string  | required(oidc_auth)
oidc_extra_redirect_parms | Extra parameters to add when redirect request to OIDC provider                                                                                                                      | string  | optional | {}
oidc_client_id | Client id for OIDC auth                                                                                                                                                             | string  | required(oidc_auth)
oidc_client_secret | Client secret for OIDC auth                                                                                                                                                         | string  | required(oidc_auth)
oidc_groups_claim | The name of a custom group claim that you have configured in your OIDC provider, that includes the groups to add to Harbor                                                          | string  | optional
oidc_admin_group | The name of the admin group, if the ID token of the user shows that he is a member of this group, the user will have admin privilege in Harbor. Note: You can only set one Admin Group. | string  | optional
oidc_scope | Scope for OIDC auth                                                                                                                                                                 | string  | required(oidc_auth)
oidc_verify_cert | Verify certificate for OIDC auth, true or false                                                                                                                                     | boolean | optional | true
oidc_auto_onboard | Skip the onboarding screen, so user cannot change its username. Username is provided from ID Token, true or false                                                                   | boolean | optional | false
oidc_user_claim | The name of the claim in the ID Token where the username is retrieved from                                                                                                          | string  | optional | name
robot_token_duration | Robot token expiration time in minutes                                                                                                                                              | number  | optional | 43200 (30days)
audit_log_forward_endpoint | Forward audit logs to the syslog endpoint, for example: harbor-log:10514                                                                                                            | string  | optional |
skip_audit_log_database | Skip to log audit log in the database, only available when audit log forward endpoint is configured                                                                                 | boolean | optional | false
scanner_skip_update_pulltime | Vulnerability scanner(e.g. Trivy) will not update the image "last pull time" when the image is scanned                                                                              | boolean | optional |
banner_message | The banner message for the UI. It is the stringified result of the banner message object                                                                              | string  | optional |

{{< note >}}
Both booleans and numbers can be enclosed with double quote in the request json, for example: `123`, `"123"`, `"true"` or `true` is OK.
{{< /note >}}
