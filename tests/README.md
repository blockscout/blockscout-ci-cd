# Verifying Release

To run tests of all types for current environments use
```
pnpm i
export AIRTABLE_API_TOKEN=
export K6_OUT=
export REQUEST_TIMEOUT=30000
./release.js
```

To set the current release tag and run the tests for the latest release features use
```
./release.js new vX.X.X
```