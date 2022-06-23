FROM node:16-alpine as build

WORKDIR /app

COPY ./package.json /app
COPY ./package-lock.json /app

ENV NODE_ENV=prod

RUN npm install --omit=dev

COPY ./tsconfig.json /app
COPY ./config-overrides.js /app

COPY ./typings/ /app/typings
COPY ./src/ /app/src
COPY ./public/ /app/public

RUN npm run build


FROM nginx:1.23-alpine as nginx

WORKDIR /app

COPY --from=build /app /app
