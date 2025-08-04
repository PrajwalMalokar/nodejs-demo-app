const request = require('supertest');
const server = require('./main');

describe('Node.js Demo App', () => {
  afterAll((done) => {
    if (server.listening) {
      server.close(done);
    } else {
      done();
    }
  });

  test('GET / returns welcome page', async () => {
    const response = await request(server).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Welcome to My JS App');
  });

  test('GET /about returns about page', async () => {
    const response = await request(server).get('/about');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('About My JS App');
  });

  test('GET /api/status returns app status', async () => {
    const response = await request(server).get('/api/status');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('running');
    expect(response.body.appName).toBe('My JS App');
    expect(response.body.version).toBe('1.0.0');
  });

  test('GET /api/time returns current time', async () => {
    const response = await request(server).get('/api/time');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('localTime');
    expect(response.body).toHaveProperty('timezone');
  });

  test('GET /nonexistent returns 404', async () => {
    const response = await request(server).get('/nonexistent');
    expect(response.statusCode).toBe(404);
    expect(response.text).toContain('404 - Page Not Found');
  });
});
