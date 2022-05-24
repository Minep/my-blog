#!/bin/sh

cd /core || (echo "fail to cd to correct location" && exit)

if [ "$APP_RUN_MODE" = "dev" ]; then
    npm run start:seed && npm run start:dev
else
    npm run start:prod
fi