// Extract the authentication logic for /signin as middleware.
// Create a new node module.
// Interact with the headers and the users model.
// Add the user record (if valid) to the request object and call next().
// Call next() with an error in the event of a bad login.

'use strict';

const {userModel} = require('../models/model');
const base64 = require('base-64');
const bcrypt = require('bcrypt');

async function signin (req, res, next){

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
        // const validUser = userModel.authenticate(username, password);

        const user = await userModel.findOne({ where: { username: username } });

        const valid = await bcrypt.compare(password, user.password);
        console.log('hit findone', user, password, user.password,valid);
        if (valid) {
          console.log('valid user')
          // res.status(200).json(user);
          next();
        }
        else {
          // next('signin error at basic');
          throw new Error('new Error at line 50');
        }
      } catch (error) { 
        console.log(error);
        res.status(403).send('Invalid Login');
       }

}


module.exports = signin;