---
title: CLI Reference  
weight: 50
---
The Harbor CLI provides comprehensive access to key Harbor functionalities. With this tool, you can perform the following operations:
- **Projects**: Create, update, delete, and list projects.
- **Registry**: Configure settings, monitor status, and manage operations.
- **Repositories**: Create, update, delete, and list repositories.
- **Users**: Add, update, delete, and list user accounts.
- **Artifacts**: Upload, download, delete, and list artifacts.
This tool enables efficient and streamlined management of Harbor's core components directly from the command line.

## harbor
Official Harbor CLI

```shell
harbor [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--config` |  | config file |
| `--help` | `-h` | help for harbor |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor artifact
Manage artifacts

```shell
harbor artifact [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for artifact |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor artifact delete
delete an artifact

```shell
harbor artifact delete [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for delete |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor artifact info
Get info of an artifact

```shell
harbor artifact info [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for info |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor artifact list
list artifacts within a repository

```shell
harbor artifact list [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for list |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor artifact scan
Scan an artifact

```shell
harbor artifact scan [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for scan |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor artifact scan start
Start a scan of an artifact

```shell
harbor artifact scan start [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for start |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor artifact scan stop
Stop a scan of an artifact

```shell
harbor artifact scan stop [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for stop |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor artifact tags
Manage tags of an artifact

```shell
harbor artifact tags [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for tags |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor artifact tags create
Create a tag of an artifact

```shell
harbor artifact tags create [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for create |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor artifact tags delete
Delete a tag of an artifact

```shell
harbor artifact tags delete [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for delete |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor artifact tags list
List tags of an artifact

```shell
harbor artifact tags list [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for list |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor completion
Generate the autocompletion script for the specified shell

```shell
harbor completion [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for completion |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor completion bash
Generate the autocompletion script for bash

```shell
harbor completion bash
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for bash |
| `--no-descriptions` |  | disable completion descriptions |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor completion fish
Generate the autocompletion script for fish

```shell
harbor completion fish [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for fish |
| `--no-descriptions` |  | disable completion descriptions |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor completion powershell
Generate the autocompletion script for powershell

```shell
harbor completion powershell [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for powershell |
| `--no-descriptions` |  | disable completion descriptions |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor completion zsh
Generate the autocompletion script for zsh

```shell
harbor completion zsh [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for zsh |
| `--no-descriptions` |  | disable completion descriptions |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor login
Log in to Harbor registry

```shell
harbor login [server] [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for login |
| `--name` |  | name for the set of credentials |
| `--password` | `-p` | Password |
| `--username` | `-u` | Username |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor project
Manage projects and assign resources to them

```shell
harbor project [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for project |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor project create
create project

```shell
harbor project create [project name] [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for create |
| `--proxy-cache` |  | Whether the project is a proxy cache project |
| `--public` |  | Project is public or private |
| `--registry-id` |  | ID of referenced registry when creating the proxy cache project
 |
| `--storage-limit` |  | Storage quota of the project |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor project delete
delete project by name or id

```shell
harbor project delete [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for delete |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor project list
list project

```shell
harbor project list [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for list |
| `--name` |  | Name of the project |
| `--page` |  | Page number |
| `--page-size` |  | Size of per page |
| `--public` |  | Project is public or private |
| `--query` | `-q` | Query string to query resources |
| `--sort` |  | Sort the resource list in ascending or descending order |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor project logs
get project logs

```shell
harbor project logs [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for logs |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor project view
get project by name or id

```shell
harbor project view [NAME|ID] [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for view |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor registry
Manage registries

```shell
harbor registry [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for registry |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor registry create
create registry

```shell
harbor registry create [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--credential-access-key` |  | Access key, e.g. user name when credential type is 'basic' |
| `--credential-access-secret` |  | Access secret, e.g. password when credential type is 'basic' |
| `--credential-type` |  | Credential type, such as 'basic', 'oauth' |
| `--description` |  | Description of the registry |
| `--help` | `-h` | help for create |
| `--insecure` |  | Whether Harbor will verify the server certificate |
| `--name` |  | Name of the registry |
| `--type` |  | Type of the registry |
| `--url` |  | Registry endpoint URL |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor registry delete
delete registry by id

```shell
harbor registry delete [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for delete |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor registry info
get registry info

```shell
harbor registry info [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for info |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor registry list
list registry

```shell
harbor registry list [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for list |
| `--page` |  | Page number |
| `--page-size` |  | Size of per page |
| `--query` | `-q` | Query string to query resources |
| `--sort` |  | Sort the resource list in ascending or descending order |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor registry update
update registry

```shell
harbor registry update [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--credential-access-key` |  | Access key, e.g. user name when credential type is 'basic' |
| `--credential-access-secret` |  | Access secret, e.g. password when credential type is 'basic' |
| `--credential-type` |  | Credential type, such as 'basic', 'oauth' |
| `--description` |  | Description of the registry |
| `--help` | `-h` | help for update |
| `--insecure` |  | Whether or not the certificate will be verified when Harbor tries to access the server
 |
| `--name` |  | Name of the registry |
| `--type` |  | Type of the registry |
| `--url` |  | Registry endpoint URL |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor registry view
get registry by id

```shell
harbor registry view [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for view |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor repo
Manage repositories

```shell
harbor repo [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for repo |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor repo delete
Delete a repository

```shell
harbor repo delete [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for delete |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor repo info
Get repository information

```shell
harbor repo info [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for info |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor repo list
list repositories within a project

```shell
harbor repo list [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for list |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor user
Manage users

```shell
harbor user [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for user |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor user create
create user

```shell
harbor user create [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--comment` |  | Comment |
| `--email` |  | Email |
| `--help` | `-h` | help for create |
| `--password` |  | Password |
| `--realname` |  | Realname |
| `--username` |  | Username |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor user delete
delete user

```shell
harbor user delete [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for delete |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor user elevate
elevate user

```shell
harbor user elevate [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for elevate |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor user list
list users

```shell
harbor user list [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for list |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


## harbor version
Version of Harbor CLI

```shell
harbor version [flags]
```

__Flags__
| Long | Short | Description |
| :--- | :---- | :---------- |
| `--help` | `-h` | help for version |
| `--config` |  | config file |
| `--output-format` | `-o` | Output format. One of: json|yaml |
| `--verbose` | `-v` | verbose output |


