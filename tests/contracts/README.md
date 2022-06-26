# Test contracts
This package is used to compile different test contracts for different compilers versions which then we are using in [tests](../e2e/tests/functional/Geth.test.ts)

## Install
```
npm install
```
## Compile
```
npm run build
```

## How to add a new contract
- Add a contract in folder `tests/contracts/contracts`
- run `npm run build`
- Add to a default deployment [here](../e2e/lib/Contracts.ts) or deploy in tests, [example](../e2e/tests/functional/Geth.test.ts)
