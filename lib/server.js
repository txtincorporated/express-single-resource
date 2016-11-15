const http = require('http');

const app = require('./app');

function start() {

  http.createServer(app).listen(3000, () => {
  });
  
}

exports.start = start;
