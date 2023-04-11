'use strict';

function error500(error, request, response, next){
  response.status(500).send('500/Server Error');
  next();
}

module.exports = error500;