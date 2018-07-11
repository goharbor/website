# Welcome
Welcome to Harbor static website developed in Hugo. Hugo is an open-source static site generator. To find out more about hugo you can check out their [website](https://gohugo.io/) as well as [developer documentation](https://gohugo.io/documentation/)

# Project Setup
## Step 1: Clone project
```
$ git clone https://github.com/apparent/harbor-hugo.git <path>/<to>/<project>
```
> to install on the folder that you're currently only use following command:
>
> ```
> $ git clone https://github.com/apparent/harbor-hugo.git .
> ```

## Step 2: Install dependencies
Go to the root of the project and install dependencies using NPM.
```
$ cd themes/harbor/
$ npm install
```

## Step 3: Run on dev/local environment
Go to the root
```
$ cd <path>/<to>/<project root>
```

Start hugo server and keep listening to any changes on config,content,data,layouts,static or themes.
```
$ hugo server -D
```
or
```
$ hugo server -D --config config.yaml
```
*Here config.yaml is base config file and is identified by default.*

### Listening to scss changes
This project uses gulp and scss for frontend/project workflow. To keep listening to scss changes:
```
$ cd <path>/<to>/<project root>
$ cd themes/harbor/
$ make dev
```
*In this instance make dev is simply runing gulp's watch command.*

> ### Test Live config
> ```
> $ hugo server -D --config config.yaml,config-prod.yaml
> ```
>
> *Adding --config parameter in this fashion loads "**config.yaml**" first and then overrides any similar config with the ones in "**config-live.yaml**"*

## Step 4: Prepare for deployment to production
As Hugo is a static site generator, none of the dynamic hugo logic will work in the production. You will first need to render your project as a static HTML project using hugo cli command.

To render your project use following command:
```
#Build project for LIVE
$ sh build.sh -e live

#Build project for Staging
$ sh build.sh -e staging

#Build project for local
$ sh build.sh -e dev
   # or,
$ sh build.sh
```