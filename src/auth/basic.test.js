'use strict';

// const supertest = require('supertest');
// const server = require('../../src/server');
// const { sequelize, userModel } = require('../../src/auth/models/model');
const basic = require('./middleware/basic');
const base64 = require('base-64');
const bcrypt = require('bcrypt');
// const request = supertest(server.app);

// beforeAll(
//   async () => {
//     await sequelize.sync();
//   }
// )
// afterAll(
//   async () => {
//     await sequelize.drop();
//   }
// )


test('Does the middleware function (send it a basic header)', async () => {
  let login = {        
    username: "b",
  password: "$2b$10$x/iCkjJUhKrrs3/GvMhdYetz1WV4uhRMOQ2vewJ7W6ZpCWVqqTrPK",
};
  const req = {
    headers: {
      authorization: `Basic ${login}`,
    }
  };

  const res = {};
  const nextF = jest.fn();
  await basic(req, res, nextF);
  expect(nextF).toHaveBeenCalled();
});


xtest('Do the routes assert the requirements (signup/signin)', async () => {
  const response = await request.post('/signin').auth("1", "1")
  expect(response.status).toEqual(200);
});