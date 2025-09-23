import http from 'k6/http';
import { check, sleep } from 'k6';

// Performance Test Plan: Albums

export const options = {
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% of requests under 500ms
    http_req_failed: ['rate<0.01'],    // <1% requests fail
    http_req_waiting: ['avg<300'],     // latency (time to first byte) under 300ms on avg
  },
  scenarios: {
    // 1. Load Testing
    load_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '1m', target: 100 }, // ramp up to 100 users
        { duration: '3m', target: 100 }, // sustain 100 users
        { duration: '1m', target: 0 },   // ramp down
      ],
      exec: 'loadScenario',
    },

    // 2. Stress Testing
    stress_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 100 },
        { duration: '30s', target: 200 },
        { duration: '30s', target: 300 },
        { duration: '30s', target: 400 },
        { duration: '30s', target: 500 }, // push system beyond expected
      ],
      exec: 'stressScenario',
      startTime: '6m', // start after load test finishes
    },

    // 3. Response Time Testing
    response_time: {
      executor: 'constant-vus',
      vus: 10,                   
      duration: '1m',
      exec: 'responseTimeScenario',
      startTime: '9m',           // start after stress test finishes
    },
  },
};

// Load Test
export function loadScenario() {
  let res = http.get('https://jsonplaceholder.typicode.com/albums');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'body is not empty': (r) => r.body && r.body.length > 0,
  });
  sleep(Math.random() * 2); // simulate user think time
}

// Stress Test
export function stressScenario() {
  let res = http.get('https://jsonplaceholder.typicode.com/albums');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}

// Response Time Test
export function responseTimeScenario() {
  let res = http.get('https://jsonplaceholder.typicode.com/albums/1');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'single album returned': (r) => r.body.includes('"id": 1'),
  });
  sleep(1);
}
