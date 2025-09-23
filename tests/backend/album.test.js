import request from 'supertest';
import { expect } from 'chai';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const api = request(BASE_URL);

describe('Albums API', () => {
it('GET /albums should return array of albums', async () => {
const res = await api.get('/albums').expect(200);
expect(res.body).to.be.an('array');
expect(res.body.length).to.be.greaterThan(0);
const a = res.body[0];
expect(a).to.have.property('userId');
expect(a).to.have.property('id');
expect(a).to.have.property('title');
});


it('GET /albums?userId=1 should return albums for user 1', async () => {
const res = await api.get('/albums').query({ userId: 1 }).expect(200);
expect(res.body.every((al) => al.userId === 1)).to.be.true;
});


it('GET /albums/1/photos should return photos with albumId 1', async () => {
const res = await api.get('/albums/1/photos').expect(200);
expect(res.body.length).to.be.greaterThan(0);
expect(res.body.every((p) => p.albumId === 1)).to.be.true;
});


it('POST /albums should create album', async () => {
const payload = { userId: 1, title: 'QA Album' };
const res = await api.post('/albums').send(payload).set('Accept', 'application/json');
expect([201, 200]).to.include(res.status);
expect(res.body).to.have.property('id');
expect(res.body.title).to.equal('QA Album');
});
});