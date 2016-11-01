const express = require('express');
const path = require('path');
const app = express();

const handlers = require('./requestHandlers');
const bodyParser = require('./bodyParser');

module.exports = app;

app.get('/favicon.ico', (request, response) => { 
  const favicon = fs.createReadStream('favicon.ico');
  favicon.pipe(response);
});

app.get('/store', (request, response) => {
  console.log('You requested ', request.path);
  handlers.getDir(request, response);
});

app.get('/store/:fileName', (request, response) => {
  console.log('You requested ', request.path);
  handlers.getFile(request, response);
});

app.post('/store', bodyParser, (request, response)=> {
  console.log('Calling handlers.post... ');
  handlers.post(request, response);
});

app.put('/store/:fileName', bodyParser, (request, response) => {
  console.log('Calling handlers.put...');
  handlers.put(request, response);
});
  
  // switch(method) {
  // case 'PUT': 
  //   handlers.put(request, response);
  //   break;
  // case 'DELETE':
  //   handlers.del(request, response)
  //   break;
  // default:
  //   handlers.fourohfour(request, response);
  // }



app.use('*', (request, response, next) => {
  console.log('UNAUTHORIZED');
  response.write('404 Not Found. Please visit localhost:3000/lib/store for a list of available documents.');
  response.end();
  next();
});
