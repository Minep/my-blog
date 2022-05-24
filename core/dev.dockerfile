FROM node:15.10.0-alpine3.10

WORKDIR /core

ENV PATH /core/node_modules/.bin:$PATH

ENV APP_RUN_MODE dev

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm ci

COPY . ./

RUN npm run build

RUN [ "chmod", "+x", "/core/entry.sh" ]

ENTRYPOINT [ "/core/entry.sh" ]