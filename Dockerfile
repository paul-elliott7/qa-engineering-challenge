FROM node:16.15.0-slim as builder

WORKDIR /build

COPY ./package.json ./package-lock.json /build/

RUN npm ci

COPY ./src /build/src
COPY ./public /build/public
COPY ./tsconfig.json /build/

RUN npm run build

FROM nginx:1.21.6

COPY --from=builder /build/build /usr/share/nginx/html

HEALTHCHECK --interval=10s \
    CMD curl --fail http://127.0.0.1 || exit 1
