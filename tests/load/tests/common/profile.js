export const p5 = {
    executor: `constant-arrival-rate`,
    preAllocatedVUs: 10,
    duration: `3m`,
    rate: 5,
}

export const p1 = {
    executor: `constant-arrival-rate`,
    preAllocatedVUs: 10,
    duration: `1m`,
    rate: 1,
}

export const sane = {
    checks: [`rate>0.95`],
    http_req_failed: [`rate<0.005`],
    http_req_waiting: [`p(50)<20000`],
    http_req_duration: [`p(95)<30000`],
}

export const t30 = 30000

export const check200 = {
    'is status 200': (r) => r.status === 200,
}
