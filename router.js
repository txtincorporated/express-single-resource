const express = require('express');
const router = express.Router();

const handlers = require('../lib/requestHandlers');
const bodyParser = require('../lib/bodyParser');

router
    .get('/', (req, res) => {
      handlers.getDir(req, res);
    })
    .get('/:fileName', (req, res, next) => {
      handlers.getFile(req, res);
    })
    .post('/', bodyParser, (req, res)=> {
      handlers.post(req, res);
    })
    .put('/:fileName', bodyParser, (req, res) => {
      handlers.put(req, res);
    })
    .delete('/:fileName', (req, res) => {
      handlers.del(req, res);
    });

module.exports = router;
