const express = require('express');
const path = require('path');
const app = express();

const router = require('../routes/router');
const bodyParser = require('./bodyParser');
const errorHandler = require('../routes/error-handler');

module.exports = app;

app.get('/favicon.ico', (req, res) => { 
  const favicon = fs.createReadStream('favicon.ico');
  favicon.pipe(res);
});

app.use('/store', router);

app.use(errorHandler);

app.use('*', (req, res, next) => {
  console.log('UNAUTHORIZED');
  res.write('404 Not Found. Please visit localhost:3000/lib/store for a list of available documents.');
  res.end();
  next();
});
