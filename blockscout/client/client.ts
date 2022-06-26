/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/prefer-default-export */
import * as k8s from '@kubernetes/client-node'

const exec = require(`child_process`).execSync
const _ = require(`lodash`)

function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

const readinessPollInterval = 3000
// 5 min
const deploymentTimeout = 300000

// K8sClient is high level K8s client
export class K8sClient {
    client: k8s.CoreV1Api

    namespace: string

    readySelector: string

    constructor(namespace: string, readySelector: string) {
        this.namespace = namespace
        this.readySelector = readySelector

        const kc = new k8s.KubeConfig()
        // ~/.kube/config must be present
        kc.loadFromDefault()
        this.client = kc.makeApiClient(k8s.CoreV1Api)
    }

    // waits until all blockscout pods are ready
    async allPodsReady(): Promise<string> {
        const startTime = new Date().getTime()
        console.log(`waiting for containers to be in status: Ready`)
        for (;;) {
            const now = new Date().getTime()
            if (Math.abs(now - startTime) > deploymentTimeout) {
                await this.client.deleteNamespace(this.namespace)
                throw Error(`deployment timed out`)
            }
            await sleep(readinessPollInterval)
            const pods = await this.client.listNamespacedPod(this.namespace, undefined, undefined, undefined, undefined, this.readySelector)
            const podStatuses = pods.body.items[0].status?.containerStatuses
            if (podStatuses !== undefined) {
                const readiness = _.map(podStatuses, (status: k8s.V1ContainerStatus) => status.ready)
                if (_.every(readiness, Boolean)) {
                    console.log(`all containers are ready, deployment complete`)
                    return pods.body.items[0].metadata!.name!
                }
            }
        }
    }

    static execCmd(cmd: string) {
        console.log(`running command: ${cmd}`)
        const out = exec(cmd, { encoding: `utf-8` })
        console.log(`command output: ${out}`)
    }

    // deploys or changes current manifest deployment
    async deploy() {
        K8sClient.execCmd(`kubectl create -f dist`)
        await this.allPodsReady()
    }
}
