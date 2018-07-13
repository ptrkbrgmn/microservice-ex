FROM node:10.6.0

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
CMD ["./healthcheck.sh"]