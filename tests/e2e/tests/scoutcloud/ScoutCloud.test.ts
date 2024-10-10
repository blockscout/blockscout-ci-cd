/* eslint-disable dot-notation */
import test from '@lib/BaseTest'
import { expect } from "@playwright/test"
import { faker } from '@faker-js/faker'
import chalk from 'chalk'
// eslint-disable-next-line import/no-extraneous-dependencies
import winston from "winston"

const logLevel = `debug`

const l = winston.createLogger({
    level: logLevel,
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console({
            level: logLevel,
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
            ),
        }),
    ],
})

test.describe.configure({ mode: `parallel` })

const createInstance = async (r, cfg) => {
    const response = await r.post(`/api/v1/instances`, {
        data: cfg,
    })
    const bodyJSON = await response.json()
    l.info(`url requested: ${response.url()}`)
    l.info(`body: ${await response.body()}`)
    expect(response.ok()).toBeTruthy()
    return bodyJSON[`instance_id`]
}

const getInstances = async (r) => {
    const response = await r.get(`/api/v1/instances`)
    const bodyJSON = await response.json()
    l.info(`url requested: ${response.url()}`)
    l.info(`body: ${await response.body()}`)
    expect(response.ok()).toBeTruthy()
    return bodyJSON
}

const getInstance = async (r, instance) => {
    const resp = await r.get(`/api/v1/instances/${instance}`)
    const body = await resp.body()
    l.debug(`url requested: ${resp.url()}`)
    l.debug(`body: ${body}`)
}

const getDeployment = async (r, deployment) => {
    const resp = await r.get(`/api/v1/deployments/${deployment}`)
    const body = await resp.body()
    const bodyJSON = await resp.json()
    l.debug(`url requested: ${resp.url()}`)
    l.debug(`body: ${body}`)
    return bodyJSON
}

const delay = async (time: number) => new Promise((resolve) => {
    setTimeout(resolve, time)
})

const updateStatus = async (r, instance, cfg) => {
    const resp = await r.post(`/api/v1/instances/${instance}/status:update`, {
        data: cfg,
    })
    const body = await resp.body()
    l.info(`url requested: ${resp.url()}`)
    l.info(`body: ${body}`)
    const bodyJSON = await resp.json()
    return bodyJSON[`deployment_id`]
}

const waitForStatus = async (r, deployment, requiredStatus, waitMillis, retries) => {
    for (let i = 0; i < retries; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const deploymentInfo = await getDeployment(r, deployment)
        l.debug(`status: ${deploymentInfo[`status`]}, requiredStatus: ${requiredStatus}`)
        if (deploymentInfo[`status`] === requiredStatus) {
            l.debug(`Deployment ${deployment} is now ${requiredStatus}`)
            return
        }
        // eslint-disable-next-line no-await-in-loop
        await delay(waitMillis)
    }
    throw Error(`timeout waiting for deployment status`)
}

const deleteAllInstances = async (r) => {
    const instances = await getInstances(r)
    l.info(`Instances: ${JSON.stringify(instances, null, 2)}`)
    for (const i of instances[`items`]) {
        l.info(`Removing instance: ${i[`instance_id`]}`)
        // // eslint-disable-next-line no-await-in-loop
        // eslint-disable-next-line no-await-in-loop
        const deploymentID = await updateStatus(r, i[`instance_id`], { action: `STOP` })
        // eslint-disable-next-line no-await-in-loop
        l.info(`Waiting for status: STOPPED`)
        // eslint-disable-next-line no-await-in-loop
        await waitForStatus(r, deploymentID, `STOPPED`, 10000, 50)

        // eslint-disable-next-line no-await-in-loop
        const resp = await r.delete(`/api/v1/instances/${i[`instance_id`]}`)
        // eslint-disable-next-line no-await-in-loop
        const body = await resp.body()
        l.info(`url requested: ${resp.url()}`)
        l.info(`body: ${body}`)
    }
}

const forceDeleteInstances = async (r) => {
    const instances = await getInstances(r)
    l.info(`Instances: ${JSON.stringify(instances, null, 2)}`)
    for (const i of instances[`items`]) {
        // eslint-disable-next-line no-await-in-loop
        const resp = await r.delete(`/api/v1/instances/${i[`instance_id`]}`)
        // eslint-disable-next-line no-await-in-loop
        const body = await resp.body()
        l.info(`url requested: ${resp.url()}`)
        l.info(`body: ${body}`)
    }
}

const getInstanceDeployments = async (r, instance) => {
    const resp = await r.get(`/api/v1/instances/${instance}/deployments`)
    const body = await resp.body()
    l.debug(`url requested: ${resp.url()}`)
    l.debug(`body: ${body}`)
}

// eslint-disable-next-line no-shadow
test(`@DeploymentCleanup Clean up all instances`, async ({ request }) => {
    await forceDeleteInstances(request)
})

// eslint-disable-next-line no-shadow
test(`@ScoutCloud Create New Instance, check UI, delete it`, async ({ request, newHomePage }) => {
    await deleteAllInstances(request)
    const instanceName = faker.random.alpha(8)
    const instanceID = await createInstance(request, {
        name: `autotest-${instanceName}`,
        config: {
            instance_url: `autotest-${instanceName}.cloud.blockscout.com`,
            rpc_url: process.env.SCOUTCLOUD_RPC_URL,
            server_size: process.env.SCOUTCLOUD_SERVER_SIZE,
            node_type: process.env.SCOUTCLOUD_NODE_TYPE,
        },
    })
    const deploymentID = await updateStatus(request, instanceID, { action: `START` })
    await waitForStatus(request, deploymentID, `RUNNING`, 20000, 70)
    const status = await getDeployment(request, deploymentID)
    const url = status[`blockscout_url`]
    l.info(`Blockscout URL: ${status[`blockscout_url`]}`)
    await newHomePage.open_custom(url)
    await newHomePage.checkIndexing()
    await newHomePage.checkHeader()
    await newHomePage.checkBlocksWidget()
    await deleteAllInstances(request)
})
