FROM node:17-alpine

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