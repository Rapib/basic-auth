'use strict';

// 3rd Party Resources
// to server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// to user model.js
const bcrypt = require('bcrypt');

//to basic.js
const base64 = require('base-64');
// to model.js
const { Sequelize, DataTypes } = require('sequelize');

// Prepare the express app
// to server.js
const app = express();
app.use(cors());
// Process JSON input and put the data on req.body
// to server.js
app.use(express.json());

// to model.js
const sequelize = new Sequelize(process.env.DATABASE_URL || 'sqlite:memory:');

// Process FORM intput and put the data on req.body
// to server.js
app.use(express.urlencoded({ extended: true }));

// Create a Sequelize model
// to user-model.js
const Users = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup username=john password=foo
// {
//   "username": "h",
//   "password": "h"
// }
// too router.js
app.post('/signup', async (req, res) => {

  try {
    // req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await Users.create(req.body);
    res.status(200).json(record);
  } catch (e) { res.status(403).send('Error Creating User'); }
});


// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
// to basic.js
app.post('/signin', async (req, res) => {

  /*
    req.headers.authorization is : "Basic am9objpmb28="
    To get username and password from this, take the following steps:
      - Turn that string into an array by splitting on ' '
      - Pop off the last value
      - Decode that encoded string so it returns to user:pass
      - Split on ':' to turn it into an array
      - Pull username and password from that array
  */

  let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'am9objpmb28=']
  let encodedString = basicHeaderParts.pop();  // am9objpmb28=
  let decodedString = base64.decode(encodedString); // "username:password"
  let [username, password] = decodedString.split(':'); // username, password

  /*
    Now that we finally have username and password, let's see if it's valid
    1. Find the user in the database by username
    2. Compare the plaintext password we now have against the encrypted password in the db
       - bcrypt does this by re-encrypting the plaintext password and comparing THAT
    3. Either we're valid or we throw an error
  */
  try {
    const user = await Users.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      res.status(200).json(user);
    }
    else {
      throw new Error('Invalid User');
    }
  } catch (error) { res.status(403).send('Invalid Login'); }

});

// make sure our tables are created, start up the HTTP server.

// to index
sequelize.sync()
  .then(() => {
    app.listen(3000, () => console.log('server up'));
  }).catch(e => {
    console.error('Could not start server', e.message);
  });