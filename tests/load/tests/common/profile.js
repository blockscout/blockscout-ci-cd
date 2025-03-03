// plain load profiles, 1, 5 RPS, etc
export const p5 = {
  executor: `constant-arrival-rate`,
  preAllocatedVUs: 50,
  duration: `3m`,
  rate: 5,
}

export const p1 = {
  executor: `constant-arrival-rate`,
  preAllocatedVUs: 10,
  duration: `5m`,
  rate: 1,
}

export const p5Seq = (() => {
  let st = 0
  return () => {
    const profile = {
      executor: `constant-arrival-rate`,
      preAllocatedVUs: 10,
      duration: `1m`,
      rate: 5,
      timeUnit: `1s`,
      startTime: `${st}m`,
    }
    st += 1
    return profile
  }
})()

// ramping load profiles, 1-5 RPS, etc

export const r30 = {
  executor: `ramping-arrival-rate`,
  preAllocatedVUs: 10,
  startRate: 3,
  stages: [
    { duration: `3m`, target: 30 },
  ],
}

export const r20 = {
  executor: `ramping-arrival-rate`,
  preAllocatedVUs: 20,
  startRate: 1,
  stages: [
    { duration: `3m`, target: 20 },
  ],
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
