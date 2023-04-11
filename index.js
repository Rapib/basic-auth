'use strict';
const server = require('./src/server');
const PORT = process.env.PORT || 3002;
const { sequelize } = require('./src/auth/models/model');

sequelize.sync()
  .then(() => {
    server.start(PORT);
  })
  .catch(err => {
    console.log('SQL CONNECTION ERROR: ', err);
  });