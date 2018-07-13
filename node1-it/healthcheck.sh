#!/bin/bash

set -e

if [ "$#" -lt 3 ]; then
    echo "Usage: ${0} <healtcheck-endpoint> [.<json-prop>,.<json-prop>] [<exp-val>,<exp-val>] <command-to-run-when-healthy> <optional-command-arg>"
    echo "Example: ${0} http:/localhost:8080/healthcheck/ [.livingEsConnection,.libraryIndexExists] [true,true] npm test"
    exit 1
fi

readonly HEALTHCHECK_ENDPOINT="${1}"
readonly JQ_ARGUMENT="${2}"
readonly JQ_EXPECTED_RESULT="${3}"
shift 3
readonly CMD="$@"

nr_of_attempts=0
function system_under_test_ready() {
  (( nr_of_attempts+=1 ))

  if [ ${nr_of_attempts} -eq 6 ]; then
    echo "Waited for system under test to get healthy long enough, giving up"
    exit 1
  fi  

  echo "Running curl -s ${HEALTHCHECK_ENDPOINT} | jq --compact-output \"${JQ_ARGUMENT}\""
  HEALTH=$(curl -s ${HEALTHCHECK_ENDPOINT} | jq --compact-output "${JQ_ARGUMENT}")
  if [[ "${HEALTH}" = "${JQ_EXPECTED_RESULT}" ]]; then
    echo "Recieved ${HEALTH}, system under test is healty and ready for test"
    return 0
  else
    echo "Recieved ${HEALTH}, system under test is NOT ready for test"
    return 1
  fi  
}

until system_under_test_ready; do
  echo "System under test is not ready for testing - sleeping"
  sleep 2
done

echo "System under test is ready for testing - running tests..."

exec ${CMD}