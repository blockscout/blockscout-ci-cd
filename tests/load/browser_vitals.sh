#!/usr/bin/env bash
BASE_URL="https://eth-sepolia.blockscout.com" PAGE="/blocks" ITERATIONS=5 VUS=1 K6_BROWSER_ENABLED=true K6_BROWSER_HEADLESS=true ./k6 run src/frontend.browser.test.suite.ts
BASE_URL="https://eth-sepolia.blockscout.com" PAGE="/txs" ITERATIONS=5 VUS=1 K6_BROWSER_ENABLED=true K6_BROWSER_HEADLESS=true ./k6 run src/frontend.browser.test.suite.ts
BASE_URL="https://eth-sepolia.blockscout.com" PAGE="/ops" ITERATIONS=5 VUS=1 K6_BROWSER_ENABLED=true K6_BROWSER_HEADLESS=true ./k6 run src/frontend.browser.test.suite.ts
BASE_URL="https://eth-sepolia.blockscout.com" PAGE="/tokens" ITERATIONS=5 VUS=1 K6_BROWSER_ENABLED=true K6_BROWSER_HEADLESS=true ./k6 run src/frontend.browser.test.suite.ts
BASE_URL="https://eth-sepolia.blockscout.com" PAGE="/accounts" ITERATIONS=5 VUS=1 K6_BROWSER_ENABLED=true K6_BROWSER_HEADLESS=true ./k6 run src/frontend.browser.test.suite.ts
BASE_URL="https://eth-sepolia.blockscout.com" PAGE="/address/0x54FA517F05e11Ffa87f4b22AE87d91Cec0C2D7E1?tab=token_transfers" ITERATIONS=5 VUS=1 K6_BROWSER_ENABLED=true K6_BROWSER_HEADLESS=true ./k6 run src/frontend.browser.test.suite.ts
BASE_URL="https://eth-sepolia.blockscout.com" PAGE="/token/0x183209DA02C281709A5BcD40188AaFfA04A7fEfD?tab=holders" ITERATIONS=5 VUS=1 K6_BROWSER_ENABLED=true K6_BROWSER_HEADLESS=true ./k6 run src/frontend.browser.test.suite.ts
