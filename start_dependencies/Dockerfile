FROM alpine:3.8
RUN apk add --no-cache bash curl jq

ADD healthcheck.sh /usr/local/bin/healthcheck.sh
RUN chmod a+x /usr/local/bin/healthcheck.sh

ADD entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod a+x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
