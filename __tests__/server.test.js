'use strict';

const supertest = require('supertest');
const server = require('../src/server');
const { sequelize } = require('../src/auth/models/model');
const request = supertest(server.app);


beforeAll(
  async () => {
    await sequelize.sync();
  }
)
afterAll(
  async () => {
    await sequelize.drop();
  }
)
test('POST to /signup to create a new user.', async() => {
  const response = await request.post('/signup').send({
    username: "1",
    password: "1"
  });
  expect(response.status).toEqual(201);
})

test('POST to /signin to login as a user (use basic auth).', async() => {
  const response = await request.post('/signin').auth("1","1")
  expect(response.status).toEqual(200);
})