# Harbor CLI Documentation

Welcome to the Harbor CLI Documentation! This guide provides a comprehensive overview of the commands available in the Harbor CLI, which allows you to efficiently manage and interact with your Harbor registry.

## Overview
The Harbor CLI is designed to facilitate the management of your Harbor registry. It provides a range of commands that enable you to perform various operations efficiently.

## Command Categories
The Harbor CLI commands are categorized by function:

- **`harbor`**: Configure the Harbor CLI.
- **`harbor artifact`**: Manage artifacts in Harbor Repository.
- **`harbor project`**: Manage projects and assign resources to them.
- **`harbor registry`**: Manage registries in Harbor.
- **`harbor repo`**: Manage repositories in Harbor context.
- **`harbor user`**: Administer users in Harbor, including creating, updating, and managing user accounts.

## Local Development

### Step 1: Clone the Project
To get started, clone the repository using the following commands:

```sh
git clone https://github.com/goharbor/website.git
cd website
```

### Step 2: View CLI documentation content
Navigate to the directory containing the CLI documentation:

```sh
cd content/cli-docs/cli-docs
```
The Markdown content for the Harbor CLI documentation is located in the cli-docs folder.

### Step 3: Update Markdown Files
To ensure that your documentation is up to date with the latest files from the Harbor CLI repository, run:
```sh
make prepare
```

This command clones the harbor-cli repository, checks for any missing documentation files, and copies them into the website's directory.

### Step 4: Run Hugo in server mode
Start a local Hugo server to preview your changes:
```sh
make serve
```
This starts up the local Hugo server on http://localhost:1313. As you make changes, the site refreshes automatically in your browser.

## Creating a Pull Request
If you wish to contribute, please make your changes to the Markdown files in the [cli-docs](./cli-docs/) folder. After making your changes, submit a pull request.

## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fgoharbor%2Fwebsite.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fgoharbor%2Fwebsite?ref=badge_large)


