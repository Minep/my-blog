#!/bin/bash

function run-dev() {
    docker compose -f docker-compose.yaml -f dev.docker-compose.yaml up --build --force-recreate -- lxsky-mysql lxsky-redis lxsky-core
}

function run-deploy() {
    source ./.build-secret
    echo "${CR_TOKEN}" | docker login ${CR_URL} -u ${CR_USR} --password-stdin
    (docker compose -f docker-compose.yaml -f prod.docker-compose.yaml build --no-cache && docker compose push) || echo "Build failure"
    docker logout ${CR_URL}
}

function build-push() {
    (docker compose -f docker-compose.yaml -f prod.docker-compose.yaml build --no-cache && docker compose push) || (echo "Build failure" && exit 1)
}

case "$1" in
    "dev" )
        run-dev
    ;;
    "deploy" )
        run-deploy
    ;;
    "build" )
        build-push
    ;;
    *)
        echo "Unknown command '$1'"
    ;;
esac