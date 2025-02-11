#!/usr/bin/env bash
source .envrc

run_api=false
run_ui=false
run_load=false
version=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --version)
      version=true
      shift
      ;;
    --api)
      run_api=true
      shift
      ;;
    --ui)
      run_ui=true
      shift
      ;;
    --load)
      run_load=true
      shift
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

if $run_api; then
  (
    cd e2e && npm run test:api
  )
fi

if $run_ui; then
  (
    cd e2e && npm run test:ondemand
  )
fi

if $run_load; then
  if [ ${#BLOCKSCOUT_URLS[@]} -ne ${#TEST_DATA_FILES[@]} ] || [ ${#BLOCKSCOUT_URLS[@]} -ne ${#LOAD_TAGS[@]} ]; then
    echo "Error: BLOCKSCOUT_URLS, TEST_DATA_FILES, and LOAD_TAGS arrays must have the same length."
    exit 1
  fi
  for i in "${!BLOCKSCOUT_URLS[@]}"; do
    (
      cd load/tests && ../bin_k6/k6-tsdb-darwin \
                 --env BASE_URL="${BLOCKSCOUT_URLS[$i]}" \
                 --env TEST_DATA_FILE="${TEST_DATA_FILES[$i]}" \
                 --env LOKI_GUN_DEBUG=none \
                 --out ${K6_OUT_FILE} \
                 --out ${K6_OUT} \
                 --verbose \
                 run \
                 --tag testid="${LOAD_TAGS[$i]}" \
                 --log-output=stdout \
                 --no-usage-report \
                 blockscoutv2.js
    )
  done
fi

if $version; then
  for url in "${BLOCKSCOUT_URLS[@]}"; do
    response=$(curl -s -L "${url}"/api/v2/config/backend-version)
    if [ $? -eq 0 ]; then
      backend_version=$(echo "$response" | jq -r '.backend_version')
      echo "$url $backend_version"
    else
      echo "$url Error: Failed to retrieve data"
    fi
  done
fi