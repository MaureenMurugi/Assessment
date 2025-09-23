import http from 'k6/http';
import { check, sleep } from 'k6';


// Performance Test Plan: Users


export const options = {
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% of requests under 500ms
    http_req_failed: ['rate<0.01'],    // <1% errors allowed
    http_req_waiting: ['avg<300'],     // latency (TTFB) under 300ms avg
  },
  scenarios: {
    // 1. Load Testing
    load_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '1m', target: 100 }, // ramp up
        { duration: '3m', target: 100 }, // sustain
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
        { duration: '30s', target: 500 },
      ],
      exec: 'stressScenario',
      startTime: '6m', // run after load test
    },

    // 3. Response Time Testing
    response_time: {
      executor: 'constant-vus',
      vus: 10,
      duration: '1m',
      exec: 'responseTimeScenario',
      startTime: '9m', // run after stress test
    },
  },
};


// Load Test
export function loadScenario() {
  let res = http.get('https://jsonplaceholder.typicode.com/users');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response has users': (r) => r.body.includes('"id":'),
  });
  sleep(Math.random() * 2);
}

// Stress Test
export function stressScenario() {
  let res = http.get('https://jsonplaceholder.typicode.com/users');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}

// Response Time Test
export function responseTimeScenario() {
  let res = http.get('https://jsonplaceholder.typicode.com/users/1');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'correct user returned': (r) => r.body.includes('"id": 1'),
  });
  sleep(1);
}
