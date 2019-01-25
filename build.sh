#!/bin/bash

# -------------------- #
# --- Global vars  --- #
# -------------------- #
LIVE_URL=https://goharbor.io
STAGING_URL=https://goharbor.io

STAGING_OUTPUT_DIR=public-staging
DEV_OUTPUT_DIR=public-dev

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

LogIt "warning" "Building static project."

# Check if environment is defined and render correct environment
case $ENV in
live)
    LogIt "warning" "Live: Cleaning up 'public' folder."
    rm -rf public/

    LogIt "success" "Building the live site with a base URL of ${LIVE_URL}"

    hugo --baseURL ${LIVE_URL}

    LogIt "success" "Live: Site build complete. Please check the /public folder and deploy it using ftp, sftp, or ssh".
    ;;
staging)
    LogIt "success" "Building the staging site with a base URL of ${STAGING_URL}"

    hugo --baseURL ${STAGING_URL} --destination public-staging

    LogIt "success" "Staging: Site build complete. Please check the ${STAGING_OUTPUT_DIR} folder and deploy it using ftp, sftp, or ssh".
    ;;
*)
    LogIt "success" "Building the local site"

    hugo --destination ${DEV_OUTPUT_DIR}

    LogIt "success" "Dev: Site build complete. Please check the ${DEV_OUTPUT_DIR} folder."
    ;;
esac
