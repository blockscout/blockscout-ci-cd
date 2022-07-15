/* eslint-disable no-undef */
import { Testing } from 'cdk8s'
import { BlockscoutChart, ResourceMode } from './pkg/blockscout'

describe(`E2E mode`, () => {
    test(`E2E mode`, () => {
        const app = Testing.app()
        const chart = new BlockscoutChart(app, `test`, {}, {
            image: ``,
            namespaceName: ``,
            wallet: ``,
            wsURL: ``,
            httpURL: ``,
            variant: `geth`,
            port: 80,
            resourceMode: ResourceMode.E2E,
        })
        const results = Testing.synth(chart)
        expect(results).toMatchSnapshot()
    })

    test(`Load mode`, () => {
        const app = Testing.app()
        const chart = new BlockscoutChart(app, `test`, {}, {
            image: ``,
            namespaceName: ``,
            wallet: ``,
            wsURL: ``,
            httpURL: ``,
            variant: `geth`,
            port: 80,
            resourceMode: ResourceMode.E2E,
        })
        const results = Testing.synth(chart)
        expect(results).toMatchSnapshot()
    })

    test(`Chaos mode ( stateful set )`, () => {
        const app = Testing.app()
        const chart = new BlockscoutChart(app, `test`, {}, {
            image: ``,
            namespaceName: ``,
            wallet: ``,
            wsURL: ``,
            httpURL: ``,
            variant: `geth`,
            port: 80,
            resourceMode: ResourceMode.E2E,
        })
        const results = Testing.synth(chart)
        expect(results).toMatchSnapshot()
    })
})
