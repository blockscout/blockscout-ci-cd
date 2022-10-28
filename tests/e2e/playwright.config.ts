import { PlaywrightTestConfig } from '@playwright/test'
import testConfig from './testConfig'

const { ENV } = process.env

const config: PlaywrightTestConfig = {

    workers: 20,

    // Global Setup to run before all tests
    globalSetup: `./global-setup`,

    // Global Teardown to run after all tests
    globalTeardown: `./global-teardown`,

    // sets timeout for each test case
    timeout: 300000,

    // number of retries if test case fails
    retries: 0,

    // Reporters
    reporter: [[`list`], [`html`, { outputFolder: `html-report`, open: `never` }], [`junit`, { outputFile: `results.xml` }]],

    projects: [
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
                screenshot: `on`,
                video: `retain-on-failure`,
                trace: `on`,
                launchOptions: {
                    slowMo: 0,
                },
            },
        },
    ],
}
export default config
