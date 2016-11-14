const express = require('express');
const router = express.Router();

const handlers = require('../lib/requestHandlers');
const bodyParser = require('../lib/bodyParser');

router
    .get('/', (req, res) => {
      console.log('You requested GET - ', req.path);
      handlers.getDir(req, res);
    })
    .get('/:fileName', (req, res, next) => {
      console.log('You requested GET - ', req.path);
      handlers.getFile(req, res);
    })
    .post('/', bodyParser, (req, res)=> {
      console.log('Calling handlers.post... ');
      handlers.post(req, res);
    })
    .put('/:fileName', bodyParser, (req, res) => {
      console.log('Calling handlers.put...');
      handlers.put(req, res);
    })
    .delete('/:fileName', (req, res) => {
      console.log('Calling handlers.del...');
      handlers.del(req, res);
    });

module.exports = router;
