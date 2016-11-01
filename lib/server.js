const http = require('http');

const app = require('./app');

function start() {

  console.log('server starting...');

  http.createServer(app).listen(3000, () => {
    console.log('Server has started on port 3000.');
  });
  
}

exports.start = start;
