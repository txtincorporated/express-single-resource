module.exports = function(request, response, next) {
  var body = '';

  request.on('data', (chunk) => {
    body += chunk;
  });

  request.on('end', () => {
    if(body) {
      request.body = JSON.parse(body);
      console.log('body: ', request.body);
    }
    next();
  });
};

