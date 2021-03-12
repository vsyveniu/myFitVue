FROM node:15.10.0-alpine3.10

RUN mkdir -p /src/myFitVue && chown node:node /src/myFitVue

USER node

WORKDIR /src/myFitVue

RUN chmod -R +w /src/myFitVue

COPY --chown=node:node package.json package-lock.json ./

RUN npm install  @vue/cli

RUN npm install


