module.exports = function(req, res, next) {
  var body = '';
  req.on('data', (chunk) => {
    console.log('bodyParser engaged... ');
    body += chunk;
  });

  req.on('end', () => {
    try {
      req.body = JSON.parse(body);
      next();
    }
    catch(err) {
      next(err);
    }
  });
};

