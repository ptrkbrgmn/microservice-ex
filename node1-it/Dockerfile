FROM node:10.6.0-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install \
    && apk del .gyp
RUN apk add --no-cache bash curl jq    
COPY . .
# CMD [ "npm", "test" ]
CMD ["./healthcheck.sh", "http:/node1:8080/healthcheck/", "[.livingEsConnection,.libraryIndexExists]", "[true,true]", "npm", "test"]