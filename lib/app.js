const express = require('express');
const path = require('path');
const app = express();

const handlers = require('./requestHandlers');
const filePath = path.join(__dirname, '/store');

module.exports = app;

console.log('app in effect on path', filePath);

app.get('/favicon.ico', (request, response) => { 
  const favicon = fs.createReadStream('favicon.ico');
  favicon.pipe(response);
});

app.get('/store', (request, response) => {
  console.log('You requested ', request.path);
  handlers.getDir(filePath, request, response);
});

app.get('/store/:fileName', (request, response) => {
  console.log('You requested ', request.path);
  handlers.getFile(filePath + '/' + request.params.fileName, request, response);
});
  
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



app.use('*', (request, response, next) => {
  console.log('UNAUTHORIZED');
  response.write('404 Not Found. Please visit localhost:3000/lib/store for a list of available documents.');
  response.end();
  next();
});
