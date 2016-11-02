module.exports = function(request, response, next) {
  var body = '';
  request.on('data', (chunk) => {
    console.log('bodyParser engaged... ');
    body += chunk;
  });

  request.on('end', () => {
    try {
      request.body = JSON.parse(body);
      console.log('body: ', request.body);
      next();
    }
    catch(err) {
      next(err);
    }
  });
};

