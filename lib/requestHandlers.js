const sander = require('sander');
const path = require('path');
const fs = require('fs');
const url = require('url');

const filePath = path.join(__dirname, '/store');

const handlers = {};

handlers.getDir = function(req, res) {
  sander.readdir(filePath)
    .then((data) => {
      res.write('You requested /store \n');
      data.forEach((el) => {
        res.write(el + '\n');
      });
      res.end();
    })
    .catch((err) => {
      console.log(err);
    });
};

handlers.getFile = function(req, res) {
  let fileName = req.params.fileName;
  let fullPath = path.join(filePath, fileName); 
  console.log('fullPath: ' + fullPath);
  sander.readFile(fullPath)
    .then((data) => {
      res.write('You requested ' + fullPath + '\n');
      res.write(data);
      res.end();
    });
};

handlers.post = function(req, res) {
  let file;
  let book = JSON.stringify(req.body);
  console.log('book');

  let bookName = req.body.title;
  let fileName = bookName.replace(/\s/g, '_');

  file = path.join(filePath, fileName + '.json');
  fs.writeFile(file, book, (err) => {
    if(err) {
      throw err;
    } else {
      res.send({fileName: fileName});
      res.end();
    }
  });
};

handlers.put = function(req, res) {
  let fileName = req.params.fileName;
  console.log('Entering handlers.put', fileName);
  let fullPath = path.join(filePath, fileName); 
  console.log('fullPath = ', fullPath);

  sander.readFile(fullPath)
    .then((data) => {
      // throw new Error('RRRRRRRCCCCCHHH!');
      var bookObj = JSON.parse(data);
      var editObj = req.body;
      Object.keys(editObj).forEach((key) => {
        bookObj[key] = editObj[key];
      });
      return sander.writeFile(fullPath, JSON.stringify(bookObj));
    })
    .then(() => {
      res.write(fullPath + 'updated successfully.');
      res.end();
    })
    .catch((err) => {
      console.log('ERROR: ', err);
      res.write('ERROR: ' + err);
      res.end();
    });
};

handlers.del = function(req, res) {
  let fileName = req.params.fileName;
  let fullPath = path.join(filePath, fileName); 
  console.log('Entering handlers.del', fullPath);

  if (fileName) {
    sander.unlink(fullPath)
      .then(() => {
        res.write('File successfully deleted. \n', () => {
          res.end(fileName + ' successfully deleted. \n');
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.write(filePath + ' is not a file.  Please try again. \n');
  }
};

module.exports = handlers;