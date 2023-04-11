'use strict';
const supertest = require('supertest');
const server = require('../../src/server');
const request = supertest(server.app);
const router = require('../../src/auth/router');


test('Do the routes assert the requirements (signup)', async () => {
  const response = await request.post('/signup').send({
    what: "1"
  });
  expect(response.status).toEqual(403);

});

// test('Do the routes assert the requirements (signin)', async () => {
//   const response = await request.post('/signin').send({
//     username: "1"
//   });
//   expect(response.status).toEqual(403);
  
// });