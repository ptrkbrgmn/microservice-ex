FROM node:10.6.0-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install \
    && apk del .gyp
RUN apk add bash
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]
