# Verifying Release

## Setup 
Install git lfs
```
brew install git-lfs
```

To run tests of all types for current environments use
```
pnpm i
export AIRTABLE_API_TOKEN=
export K6_OUT=
./release.js
```

To set the current release tag and run the tests for the latest release features use
```
./release.js new vX.X.X
```

If you run load tests the dashboard is [here](https://grafana.k8s-dev.blockscout.com/d/a21-pyAWz/k6-load-test-view?orgId=1&from=now-5m&to=now&var-testid=eth.blockscout.com-v6.10.1.%2Bcommit.8aff9e50&timezone=browser&refresh=5s), select the tag containing your release name

Example of comparing load profiles
```
./compare.js ./releases/eth.blockscout.com-v6.10.1.+commit.8aff9e50.json ./releases/eth.blockscout.com-v6.10.1.+commit.8aff9e50-2.json
```


To generate test data use
```
./release.js generate https://eth.blockscout.com
```