const express = require('express');
const router = express.Router();

const handlers = require('../lib/requestHandlers');
const bodyParser = require('../lib/bodyParser');

router
    .get('/', (request, response) => {
      console.log('You requested GET - ', request.path);
      handlers.getDir(request, response);
    })
    .get('/:fileName', (request, response, next) => {
      console.log('You requested GET - ', request.path);
      handlers.getFile(request, response);
    })
    .post('/', bodyParser, (request, response)=> {
      console.log('Calling handlers.post... ');
      handlers.post(request, response);
    })
    .put('/:fileName', bodyParser, (request, response) => {
      console.log('Calling handlers.put...');
      handlers.put(request, response);
    })
    .delete('/:fileName', (request, response) => {
      console.log('Calling handlers.del...');
      handlers.del(request, response);
    });

module.exports = router;
