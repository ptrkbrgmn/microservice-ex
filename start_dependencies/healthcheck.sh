#!/bin/bash

set -e

if [ "$#" -lt 3 ]; then
    echo "Usage: ${0} <healtcheck-endpoint> [.<json-prop>,.<json-prop>] [<exp-val>,<exp-val>] <command-to-run-when-healthy> <optional-command-arg>"
    echo "Example: ${0} http:/localhost:80/healthcheck [.status] '["OK"]' npm test"
    exit 1
fi

readonly SLEEP_TIME=4
readonly MAX_ATTEMPTS=100
readonly HEALTHCHECK_ENDPOINT="${1}"
readonly JQ_ARGUMENT="${2}"
readonly JQ_EXPECTED_RESULT="${3}"
shift 3
readonly CMD="$@"

nr_of_attempts=0
function system_under_test_ready() {
  (( nr_of_attempts+=1 ))

  if [ ${nr_of_attempts} -eq ${MAX_ATTEMPTS} ]; then
    echo "Waited for system under test to get healthy for $((MAX_ATTEMPTS * SLEEP_TIME)) secs, giving up"
    exit 1
  fi

  echo "Running curl -s ${HEALTHCHECK_ENDPOINT} | jq --compact-output \"${JQ_ARGUMENT}\""
  HEALTH=$(curl -s ${HEALTHCHECK_ENDPOINT} | jq --compact-output "${JQ_ARGUMENT}")
  if [[ "${HEALTH}" = "${JQ_EXPECTED_RESULT}" ]]; then
    echo "Recieved ${HEALTH}, ${HEALTHCHECK_ENDPOINT} is healthy (waited for $((nr_of_attempts * SLEEP_TIME)) secs)"
    return 0
  else
    echo "Recieved ${HEALTH} but expected ${JQ_EXPECTED_RESULT},  ${HEALTHCHECK_ENDPOINT} NOT healthy (waited for $((nr_of_attempts * SLEEP_TIME)) secs)"
    return 1
  fi
}

until system_under_test_ready; do
  echo "${HEALTHCHECK_ENDPOINT} is not ready/healty yet - sleeping"
  echo ""
  sleep 2
done

echo "${HEALTHCHECK_ENDPOINT} is ready/healthy!"
echo ""

# exec ${CMD}
