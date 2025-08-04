const http = require('http');
const app = require('./main');
const supertest = require('supertest');

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(done);
});

afterAll((done) => {
  server.close(done);
});

test('GET /api/status returns app status', async () => {
  const response = await supertest(server).get('/api/status');
  expect(response.statusCode).toBe(200);
  expect(response.body.status).toBe('running');
  expect(response.body.appName).toBe('My JS App');
});

test('GET /api/time returns current time', async () => {
  const response = await supertest(server).get('/api/time');
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('timestamp');
  expect(response.body).toHaveProperty('localTime');
});
