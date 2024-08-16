/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import { Options } from 'k6/options'

import { defaultThresholds, selectScenario } from './common'

export * from './frontend.test.suite'
export * from './backend.test.suite'
export * from './bens.test.suite'
export * from './random.test.suite'
export * from './metadata.test.suite'
export * from './advanced.tx.test.suite'
export * from './txactions.test.suite'

export const options: Options = {
    noCookiesReset: true,
    thresholds: defaultThresholds,
    // managed by Loki debug in gun.ts
    discardResponseBodies: false,
    scenarios: selectScenario(__ENV.SCENARIO),
}
