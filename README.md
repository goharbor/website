# The Harbor website

This repo houses the assets used to build the Harbor website, available at https://goharbor.io.

## Tools

The website is built and developed using the [Hugo](https://gohugo.io/) static site generator.

Instructions for installing Hugo can be found [here](https://gohugo.io/getting-started/installing/). Use the most recent Hugo version when possible, and make *sure* to install the "extended" version of Hugo with support for [Hugo Pipes](https://gohugo.io/hugo-pipes/introduction/).

## Project Setup

### Step 1: Clone project

```shell
$ git clone https://github.com/goharbor/blog.git
$ cd blog
```

## Step 2: Install theme dependencies

Go to the root of the project and install dependencies using [npm](https://npmjs.org):

```shell
$ cd themes/harbor/
$ npm install
```

## Step 3: Run in a local dev environment

Go back to the project root:

```shell
$ cd <path>/<to>/<project root>
```

Start the Hugo server and keep listening to any changes to the website assets (Markdown, etc.):

```shell
$ hugo server --buildDrafts
```

## Step 4: Prepare for deployment to production

You can build the website in one of three "environments:" live (production), staging, and local.

```shell
# Build project for LIVE
$ ENV=live sh build.sh

# Build project for Staging
$ ENV=staging sh build.sh

# Build project for local
$ ENV=dev sh build.sh

# or
$ sh build.sh
```