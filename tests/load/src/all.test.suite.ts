/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import { Options } from 'k6/options'

import { defaultThresholds, selectScenario } from './common'

export * from './frontend.test.suite'
export * from './backend.test.suite'
export * from './bens.test.suite'

export const options: Options = {
    noCookiesReset: true,
    thresholds: defaultThresholds,
    userAgent: `MyK6UserAgentString/1.0`,
    // managed by Loki debug in gun.ts
    discardResponseBodies: false,
    scenarios: selectScenario(__ENV.SCENARIO),
}
