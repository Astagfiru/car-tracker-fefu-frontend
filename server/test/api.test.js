const request = require('supertest');
const app = require('../app');
const { Client, Request } = require('../models');

describe('API Endpoints', () => {
  beforeAll(async () => {
    // Подготовка тестовых данных
    await Client.destroy({ where: {}, truncate: true });
    await Request.destroy({ where: {}, truncate: true });
  });

  describe('GET /api/', () => {
    it('should return welcome message', async () => {
      const res = await request(app).get('/api/');
      expect(res.statusCode).toEqual(200);
      expect(res.text).toContain('Welcome to the Car Tracker API');
    });
  });

  describe('Client Endpoints', () => {
    let testClient;

    beforeEach(async () => {
      testClient = await Client.create({
        surname: 'Иванов',
        name: 'Иван',
        phone: '+79123456789',
        email: 'test@example.com',
        passportSeries: '1234',
        passportNumber: '567890',
        passportIssuer: 'ОВД',
        passportIssueDate: '2020-01-01'
      });
    });

    afterEach(async () => {
      await Client.destroy({ where: {}, force: true });
    });

    it('GET /api/clients should return all clients', async () => {
      const res = await request(app).get('/api/clients');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('POST /api/clients should create new client', async () => {
      const newClient = {
        surname: 'Петров',
        name: 'Петр',
        email: 'new@example.com',
        passportSeries: '4321',
        passportNumber: '098765',
        passportIssuer: 'ОВД',
        passportIssueDate: '2021-01-01'
      };

      const res = await request(app)
        .post('/api/clients')
        .send(newClient);
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
    });

    it('GET /api/clients/:id should return client by id', async () => {
      const res = await request(app).get(`/api/clients/${testClient.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id', testClient.id);
    });

    it('DELETE /api/clients/:id should delete client', async () => {
      const res = await request(app).delete(`/api/clients/${testClient.id}`);
      expect(res.statusCode).toEqual(204);
    });
  });

  describe('Request Endpoints', () => {
    let testRequest;
    let testClient;

    beforeAll(async () => {
      testClient = await Client.create({
        surname: 'Иванов',
        name: 'Иван',
        phone: '+79123456789',
        email: 'client@example.com',
        passportSeries: '1234',
        passportNumber: '567890',
        passportIssuer: 'ОВД',
        passportIssueDate: '2020-01-01'
      });
    });

    afterEach(async () => {
      await Request.destroy({ where: {}, force: true });
    });

    afterAll(async () => {
      await Request.destroy({ where: {}, force: true });
      await Client.destroy({ where: {}, force: true });
    });

    beforeEach(async () => {
      testRequest = await Request.create({
        client_id: testClient.id,
        employee_id: 1,
        car_id: 1,
        date: '2023-01-01',
        status: 'НОВАЯ'
      });
    });

    afterEach(async () => {
      await Request.destroy({ where: {}, force: true });
    });

    afterAll(async () => {
      await Request.destroy({ where: {}, force: true });
      await Client.destroy({ where: {}, force: true });
    });

    it('GET /api/requests should return all requests', async () => {
      const res = await request(app).get('/api/requests');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('count');
    });

    it('POST /api/requests should create new request', async () => {
      const newRequest = {
        client_id: testClient.id,
        employee_id: 1,
        car_id: 1,
        date: '2023-01-01',
        status: 'НОВАЯ'
      };

      const res = await request(app)
        .post('/api/requests')
        .send(newRequest);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('status', 'success');
    });

    it('GET /api/requests/:id should return request by id', async () => {
      const res = await request(app).get(`/api/requests/${testRequest.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('status', 'success');
    });

    it('PUT /api/requests/:id should update request', async () => {
      const updates = { status: 'В РАБОТЕ' };
      const res = await request(app)
        .put(`/api/requests/${testRequest.id}`)
        .send(updates);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('status', 'success');
    });
    
    it('POST /api/clients should handle validation errors', async () => {
      const invalidClient = {
        surname: 'Петров',
        name: 'Петр',
        email: 'invalid-email',
        passportSeries: '432',
        passportNumber: '09876',
        passportIssuer: 'ОВД',
        passportIssueDate: '2021-01-01'
      };

      const res = await request(app)
        .post('/api/clients')
        .send(invalidClient);
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('errors');
    });
  });
});