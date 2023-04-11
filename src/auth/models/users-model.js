'use strict';
const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');

const Users = (sequelize) => {
  let model = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  //Add a before-create hook in the model ... Before we save a record
  model.beforeCreate(async user => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  //Create a method in the schema to authenticate a user using the hashed password.
  // model.authenticate = function (username, password) {

  // }
  return model;
};


module.exports = Users;