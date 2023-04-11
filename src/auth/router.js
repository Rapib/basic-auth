const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {userModel} = require('./models/model');
const basicAuth = require('./middleware/basic');


router.post('/signup', async (req, res) => {
  console.log('hit signup in router');
  try {

    // Accepts either a JSON object or FORM Data with the keys "username" and "password".
    const record = await userModel.create(req.body);
    res.status(201).json(record);
  } catch (e) { 
    console.log(e);
    res.status(403).send('Error Creating User'); 
  }
});

router.post('/signin', basicAuth, (request, response) => {
  console.log(request.body);
  // When validated, send a JSON object as the response with the following properties:
// user: The users' database record
  response.status(200).json(`user: ${request.body.username}`);
}
);

module.exports = router;


