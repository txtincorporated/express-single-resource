const express = require('express');
const path = require('path');
const app = express();


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
      console.log('body: ' + body);
    }
    onEnd(req, res);
  });

}


app.use('/store', router);

app.use(errorHandler);

app.use('*', (req, res, next) => {
  console.log('UNAUTHORIZED');
  res.write('404 Not Found. Please visit localhost:3000/store for a list of available documents.');
  res.end();
  next();
});
