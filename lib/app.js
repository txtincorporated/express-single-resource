const express = require('express');
const path = require('path');
const app = express();

const sander = require('sander');
const fs = require('fs');
const url = require('url');

module.exports = app;

app.get('/favicon.ico', (req, res) => { 
  const favicon = fs.createReadStream('favicon.ico');
  favicon.pipe(res);
});


function bodyParser(req, res) {

  var body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    if(body) {
      req.body = JSON.parse(body);
    }
    onEnd(req, res);
  });

}

const filePath = path.join(__dirname, '/store');

app.get('/store', router);



app.use('/store', (err, req, res, next) => {
  const code = error.code || 500;
  const error = code === 500 ? 'Internal Server Error' : err.error;
  console.log(err.error || err.message);
  res.status(code).send({error});
});

app.use('*', (req, res, next) => {
  console.log('UNAUTHORIZED');
  res.write('404 Not Found. Please visit localhost:3000/store for a list of available documents.');
  res.end();
  next();
});
