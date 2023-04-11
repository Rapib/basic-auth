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




// test('Does the middleware function (send it a basic header)', async () => {
//   const username = 'b';
//   const password = 'b';
//   const encodedCredentials = base64.encode(`${username}:${password}`);
  
//   const req = {
//     headers: {
//       authorization: `Basic ${encodedCredentials}`,
//     }
//   };

//   const res = {
//     status: jest.fn().mockReturnThis(),
//     send: jest.fn()
//   };
  
//   const nextF = jest.fn();
//   await basic(req, res, nextF);
//   expect(nextF).toHaveBeenCalled();
// });


// test('Does the middleware function (send it a basic header)', async () => {
//   let login = {        
//     username: "b",
//   password: "b",
// };
//   const req = {
//     headers: {
//       authorization: `Basic ${login}`,
//     }
//   };

//   const res = {};
//   const nextF = jest.fn();
//   await basic(req, res, nextF);
//   expect(nextF).toHaveBeenCalled();
// });


