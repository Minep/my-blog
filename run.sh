#!/bin/bash

function run-dev() {
    docker compose -f docker-compose.yaml -f dev.docker-compose.yaml up --build --force-recreate -- lxsky-mysql lxsky-redis lxsky-core
}

function run-deploy() {
    echo "Not implemented"
}

case "$1" in
    "dev" )
        run-dev
    ;;
    "deploy" )
        run-deploy
    ;;
    *)
        echo "Unknown command '$1'"
    ;;
esac