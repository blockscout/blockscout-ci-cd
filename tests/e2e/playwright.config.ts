import { PlaywrightTestConfig } from '@playwright/test'
import testConfig from './testConfig'

const { ENV } = process.env

const config: PlaywrightTestConfig = {

    workers: 1,

    // Global Setup to run before all tests
    globalSetup: `./global-setup`,

    // Global Teardown to run after all tests
    globalTeardown: `./global-teardown`,

    // sets timeout for each test case
    timeout: 60000,

    expect: {
        timeout: 15000,
    },

    // number of retries if test case fails
    retries: 0,

    // Reporters
    reporter: [[`list`], [`html`, { outputFolder: `html-report`, open: `never` }], [`junit`, { outputFile: `results.xml` }]],

    projects: [
        {
            name: `ScoutCloud`,
            use: {
                baseURL: process.env.SCOUTCLOUD_URL,
                extraHTTPHeaders: {
                    Accept: `application/vnd.github.v3+json`,
                    'x-api-key': process.env.SCOUTCLOUD_TOKEN,
                },
            },
        },
        {
            name: `Chrome`,
            use: {
                browserName: `chromium`,
                channel: `chrome`,
                baseURL: testConfig[process.env.ENV],
                headless: true,
                viewport: { width: 1500, height: 730 },
                ignoreHTTPSErrors: true,
                acceptDownloads: true,
                screenshot: `only-on-failure`,
                video: `retain-on-failure`,
                trace: `retain-on-failure`,
                launchOptions: {
                    slowMo: 0,
                },
            },
        },
        {
            name: `Chrome_UI`,
            use: {
                browserName: `chromium`,
                channel: `chrome`,
                baseURL: testConfig[process.env.ENV],
                headless: false,
                viewport: { width: 1500, height: 730 },
                ignoreHTTPSErrors: true,
                acceptDownloads: true,
                screenshot: `only-on-failure`,
                video: `retain-on-failure`,
                trace: `retain-on-failure`,
                launchOptions: {
                    slowMo: 0,
                },
            },
        },
    ],
}
export default config
