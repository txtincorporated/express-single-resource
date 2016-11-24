const http = require('http');

<<<<<<< HEAD
const app = require('./lib/app');

http.createServer(app).listen(8888);
=======
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log('Server running at ', server.address());
});
  

>>>>>>> txtincDev
