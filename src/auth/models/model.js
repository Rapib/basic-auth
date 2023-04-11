'use strict';

const { Sequelize } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(process.env.DATABASE_URL || 'sqlite:memory:');
const createUserModel = require('./users-model');
const userModel = createUserModel(sequelize);



module.exports = {
  sequelize,
  userModel
};
