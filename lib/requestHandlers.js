const sander = require('sander');
const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, '/store');

const handlers = {};

handlers.getDir = function(request, response) {
  sander.readdir(filePath)
    .then((data) => {
      response.write('You requested ' + filePath + '\n');
      data.forEach((el) => {
        response.write(el + '\n');
      });
      response.end();
    })
    .catch((err) => {
      console.log(err);
    });
};

handlers.getFile = function(request, response) {
  let fileName = filePath + '/' + request.params.fileName; 
  console.log('fileName: ' + fileName);
  sander.readFile(fileName)
    .then((data) => {
      response.write('You requested ' + fileName + '\n');
      response.write(data);
      response.end();
    });
};

handlers.post = function(request, response) {
  var file;
  var book = JSON.stringify(request.body);
  console.log('book');

  var bookName = request.body.title;
  var fileName = bookName.replace(' ', '_');

  file = path.join(filePath, fileName + '.json');
  fs.writeFile(file, book, (err) => {
    if(err) {
      throw err;
    } else {
      response.write('File uploaded.');
      response.end();
    }
  });
};

handlers.put = function(request, response) {
  var putBook = null;
  var pathname = request.pathname;

  sander.readFile('.' + pathname)
    .then((data) => {
      var bookObj = JSON.parse(data);
      var editObj = request.body;
      Object.keys(editObj).forEach((key) => {
        bookObj[key] = editObj[key];
      });
      return sander.writeFile('.' + pathname, JSON.stringify(bookObj));
    })
    .then(() => {
      response.write(pathname + 'updated successfully.');
      response.end();
    })
    .catch((err) => {
      console.log('ERROR: ', err);
    });
};

handlers.del = function(request, response) {
  var filePath = '.' + request.pathname;
  var pathArray = request.pathname.split('/');

  if (pathArray[pathArray.length - 1] && pathArray[pathArray.length - 1] !== 'store') {
    sander.unlink(filePath)
      .then(() => {
        response.write('File successfully deleted. \n', () => {
          response.end(filePath.substr(1) + ' successfully deleted. \n');
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    response.write(pathArray[pathArray.length - 1] + ' is not a file.  Please try again. \n');
  }
};

handlers.fourohfour = function(href, response) {
  console.log('Method is unsupported.');
  response.write(`405 ${request.method} METHOD NOT ALLOWED`);
  response.end();
};

module.exports = handlers;