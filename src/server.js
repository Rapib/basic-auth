'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./auth/router');
const error404 = require('./middleware/404');
const error500 = require('./middleware/500');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use('*', error404);
app.use(error500);

module.exports = {
  app,
  start: (port) => app.listen(port, () => {
    console.log(`${port} is listening`);
  }),
};