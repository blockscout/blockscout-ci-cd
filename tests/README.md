# Verifying Release

To verify a release we follow a simple process:
1. Add release environment URLs to `.envrc`
    ```
   BLOCKSCOUT_URLS=(
      # URL of environment to verify installed release
      "https://eth.blockscout.com"
   )
   TEST_DATA_FILES=(
      # usually stays the same, add more data if needed, check load/tests/data
      "data/ethereum.json"
   )
   LOAD_TAGS=(
      # change this when release
      "eth-v7.0.0-api-v2-baseline"
   )
   export BLOCKSCOUT_URL=$(IFS=,; echo "${BLOCKSCOUT_URLS[*]}")

   K6_OUT=$secret
   K6_OUT_FILE=json=$your_release_filename.json
   REQUEST_TIMEOUT=30000
    ```
2. Run all the tests using `./release.sh`
3. Confirm, hotfix or rollback the release

## Comparing Performance Baselines
```
cd load/tests
BEFORE=release1.json NOW=release2.json node common/compare.js
```