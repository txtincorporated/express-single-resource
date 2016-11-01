const express = require('express');
const app = express();
const handlers = require('./requestHandlers');

module.exports = function(request, response) {
  console.log('app in effect...');
  var method = request.method;

  console.log('Request for ' + request.pathname + ' received');
  console.log(method);

  app.get('/lib/store', (request, response) => {
    console.log('calling handlers...');
    handlers.get(request, response);
  });

  app.use(errorHandler);
  
  // switch(method) {
  // case 'GET': 
  //   handlers.get(request, response);
  //   break;
  // case 'POST': 
  //   handlers.post(request, response);
  //   break;
  // case 'PUT': 
  //   handlers.put(request, response);
  //   break;
  // case 'DELETE':
  //   handlers.del(request, response)
  //   break;
  // default:
  //   handlers.fourohfour(request, response);
  // }
};

function errorHandler(error, request, response, next) {
  console.log('In error handler, ', error);
  next(error);
};
