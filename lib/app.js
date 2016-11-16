const path = require('path');
const express = require('express');
const app = express();

const sander = require('sander');
const fs = require('fs');
const url = require('url');

module.exports = app;

app.get('/favicon.ico', (req, res) => { 
  const favicon = fs.createReadStream('favicon.ico');
  favicon.pipe(res);
});

const filePath = path.join(__dirname, '/store');

app.get('/store', function(req, res) {

  let files = [];
  let body;

  sander.readdir(filePath)
    .then((data) => {
      data.forEach((el) => {
        files.push(el);
      });
      body = files;
      res.send(body);
      res.end();
    })
    .catch((err) => {
      console.log(err);
    });

});

app.get('/store/:fileName', function(req, res) {

  let file = '';
  let body;

  let fileName = req.params.fileName;
  let fullPath = path.join(filePath, fileName); 

  sander.readFile(fullPath)
    .then((data) => {
      file += data.toString('utf8');
      file = JSON.parse(file);
      body = file;
      res.send(body);
      res.end();
    });

});

app.post('/store', function(req, res) {
  
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    req.body = JSON.parse(body);
    
    let file;
    
    let book = JSON.stringify(req.body);

    let bookName = req.body.title;
    let fileName = bookName.replace(/\s/g, '_');

    file = path.join(filePath, fileName + '.json');

    fs.writeFile(file, book, (err) => {

      if(err) {
        throw err;
      } else {
        body = {fileName: fileName};
        res.send(body);
        res.end();
      }

    });
  });
});

app.put('/store/:fileName', (req, res) => {

  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    req.body = JSON.parse(body);

    let file;

    let fileName = req.params.fileName;
    let fullPath = path.join(filePath, fileName); 

    sander.readFile(fullPath)
      .then((data) => {
        var bookObj = JSON.parse(data);
        var editObj = req.body;
        console.log('editObj: ', editObj);
        Object.keys(editObj).forEach((key) => {
          bookObj[key] = editObj[key];
        });
        file = bookObj;
        return sander.writeFile(fullPath, JSON.stringify(bookObj));
      })
      .then(() => {
        res.send(file);
        res.end();
      })
      .catch((err) => {
        console.log('ERROR: ', err);
        res.write('ERROR: ' + err);
        res.end();
      });

  });
});

app.delete('/store/:fileName', (req, res) => {
  
  let fileName = req.params.fileName;
  let fullPath = path.join(filePath, fileName); 

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
    res.write(fileName + ' is not a file.  Please try again. \n');
  }
  
});

app.use('/store', (err, req, res, next) => {
  const code = err.code || 500;
  const error = code === 500 ? 'Internal Server Error' : err.error;
  console.log(err.error || err.message);
  res.status(code).send({error});
});

app.use('*', (req, res, next) => {
  console.log('UNAUTHORIZED');
  res.write('404 Not Found. Please visit localhost:3000/store for a list of available documents.');
  res.end();
  next();
});
