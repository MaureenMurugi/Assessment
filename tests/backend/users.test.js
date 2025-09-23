import request from 'supertest';
import { expect } from 'chai';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const api = request(BASE_URL);

describe('Users API', () => {
  it('GET /users should return array of users', async () => {
    const res = await api.get('/users').expect(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.greaterThan(0);
    const u = res.body[0];
    expect(u).to.have.property('id');
    expect(u).to.have.property('name');
    expect(u).to.have.property('email');
  });

  it('GET /users/1 should return user with id 1', async () => {
    const res = await api.get('/users/1').expect(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(1);
  });

  it('GET /users/9999 should return 404 or empty body based on API', async () => {
    const res = await api.get('/users/9999');
    expect([200, 404]).to.include(res.status);
  });

 it('POST /users should create a new user', async () => {
    const payload = { name: 'QA Test', username: 'qatest', email: 'qa@test.com' };
    const res = await api.post('/users').send(payload).set('Accept', 'application/json');
    expect([201, 200]).to.include(res.status);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('id');
  });
  
  it('PUT /users/1 should update a user', async () => {
    const updatedPayload = {
      name: 'QA Test Updated',
      username: 'qatestupdated',
      email: 'qa.updated@test.com',
    };
    const res = await api.put('/users/1')
      .send(updatedPayload)
      .set('Accept', 'application/json')
      .expect(200);
    
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(1);
    expect(res.body.name).to.equal(updatedPayload.name);
    expect(res.body.email).to.equal(updatedPayload.email);
  });
});
