const sander = require('sander');
const path = require('path');
const fs = require('fs');
const url = require('url');

const filePath = path.join(__dirname, '/store');

const handlers = {};

handlers.getDir = function(request, response) {
  sander.readdir(filePath)
    .then((data) => {
      response.write('You requested /store \n');
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
  let fileName = request.params.fileName;
  let fullPath = path.join(filePath, fileName); 
  console.log('fullPath: ' + fullPath);
  sander.readFile(fullPath)
    .then((data) => {
      response.write('You requested ' + fullPath + '\n');
      response.write(data);
      response.end();
    });
};

handlers.post = function(request, response) {
  let file;
  let book = JSON.stringify(request.body);
  console.log('book');

  let bookName = request.body.title;
  let fileName = bookName.replace(/\s/g, '_');

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
  let fileName = request.params.fileName;
  console.log('Entering handlers.put', fileName);
  let fullPath = path.join(filePath, fileName); 
  console.log('fullPath = ', fullPath);

  sander.readFile(fullPath)
    .then((data) => {
      // throw new Error('RRRRRRRCCCCCHHH!');
      var bookObj = JSON.parse(data);
      var editObj = request.body;
      Object.keys(editObj).forEach((key) => {
        bookObj[key] = editObj[key];
      });
      return sander.writeFile(fullPath, JSON.stringify(bookObj));
    })
    .then(() => {
      response.write(fullPath + 'updated successfully.');
      response.end();
    })
    .catch((err) => {
      console.log('ERROR: ', err);
      response.write('ERROR: ' + err);
      response.end();
    });
};

handlers.del = function(request, response) {
  let fileName = request.params.fileName;
  let fullPath = path.join(filePath, fileName); 
  console.log('Entering handlers.del', fullPath);

  if (fileName) {
    sander.unlink(fullPath)
      .then(() => {
        response.write('File successfully deleted. \n', () => {
          response.end(fileName + ' successfully deleted. \n');
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    response.write(filePath + ' is not a file.  Please try again. \n');
  }
};

module.exports = handlers;