#!/bin/bash

# -------------------- #
# --- Functions    --- #
# -------------------- #
LogIt(){

    #Set variables
    local _message=$2
    local _type=$1
    local _color

    #condition to select color
    if [ $_type = "warning" ]
    then
        echo "\033[32m $_message \033[0m"

    elif [ $_type = "error" ]
    then
        echo "\033[31m $_message \033[0m"

    elif [ $_type = "success" ]
    then
         echo "\033[36m $_message \033[0m"

    else
        #default color
         echo "\033[38m $_message \033[0m"

    fi
}

# -------------------- #
# --- Script       --- #
# -------------------- #

# Parse options
    while getopts e:c option
    do
    case "${option}"
    in
        e) ENV=${OPTARG};;
        c)
            LogIt "warning" "Cleaning up residual css files from /themes/harbor/static/css"
            rm -rf themes/harbor/static/css/core-*

            LogIt "warning" "Cleaning up residual js files from /themes/harbor/static/js"
            rm -rf themes/harbor/static/js/fresh-*

            echo "\n";

        ;;
    esac
    done

LogIt "warning" "Initiating asset, css, static files build."
cd themes/harbor
gulp build
echo "\n";

LogIt "warning" "Building static project."
cd ../..

# Check if environment is defined and render correct environment
    case $ENV in
    live)
        LogIt "warning" "Live: Cleaning up 'public' folder. ".
        rm -rf public/*
        hugo --config config.yaml,config-prod.yaml
        cp LICENSE public/LICENSE
        echo -n "goharbor.io" > public/CNAME
        LogIt "success" "Live: Site build complete. Please check /public folder and deploy it using ftp,sftp or ssh".
        ;;
    staging)
        LogIt "warning" "Staging: Cleaning up 'public-staging' folder. ".
        rm -rf public-staging/*
        hugo --config config.yaml,config-stage.yaml
        LogIt "success" "Staging: Site build complete. Please check /public-staging folder and deploy it using ftp,sftp or ssh".
        ;;
    *)
        LogIt "warning" "Dev: Cleaning up 'public-dev' folder. ".
        rm -rf public-dev/*
        hugo
        LogIt "success" "Dev: Site build complete. Please check /public-dev folder."
        ;;
    esac
