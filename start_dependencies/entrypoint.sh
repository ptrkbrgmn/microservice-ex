#!/usr/bin/env bash

# Example
# ./entrypoint.sh 'http://es-content:9200/_cluster/health/ [.status] ["green"]' 'http://some-other-service [.status] ["ok"]' ...
#
# Each string will be split by space, i.e
# http://es-content:9200/_cluster/health/ [.status] ["green"]
# =>
# ${array[0]} => http://es-content:9200/_cluster/health/
# ${array[1]} => [.status]
# ${array[2]} => ["green"]
#
# This way we can specify multiple service dependencies on docker-compose as:
#
# start_dependencies:
#    build: integration-test/start_dependencies
#    depends_on:
#    - es-content
#    - some-other-service
#    command: ['http://es-content:9200/_cluster/health/ [.status] ["green"]', 'http://some-other-service [.status] ["ok"]']


for var in "$@"
do
  IFS=', ' read -r -a array <<< "${var}"
  ./usr/local/bin/healthcheck.sh ${array[0]} ${array[1]} ${array[2]}
done
