// const sander = require('sander');
// const path = require('path');
// const fs = require('fs');
// const url = require('url');

// const filePath = path.join(__dirname, '/store');

// const handlers = {};


// handlers.getDir = function(req, res) {

//   let files = '';
//   let body;

//   sander.readdir(filePath)
//     .then((data) => {
//       data.forEach((el) => {
//         files += el + '\n';
//       });
//       body = {files};
//       res.send(body);
//       res.end();
//     })
//     .catch((err) => {
//       console.log(err);
//     });

// };

// handlers.getFile = function(req, res) {

//   let file = '';
//   let body;

//   let fileName = req.params.fileName;
//   let fullPath = path.join(filePath, fileName); 

//   sander.readFile(fullPath)
//     .then((data) => {
//       file += data.toString('utf8');
//       file = JSON.parse(file);
//       body = file;
//       res.send(body);
//       res.end();
//     });

// };

// handlers.post = function(req, res) {

//   let file;
//   let body;
  
//   let book = JSON.stringify(req.body);

//   let bookName = req.body.title;
//   let fileName = bookName.replace(/\s/g, '_');

//   file = path.join(filePath, fileName + '.json');

//   fs.writeFile(file, book, (err) => {

//     if(err) {
//       throw err;
//     } else {
//       body = {fileName: fileName};
//       res.send(body);
//       res.end();
//     }

//   });
// };

// handlers.put = function(req, res) {

//   let file;
//   let body;

//   let fileName = req.params.fileName;
//   let fullPath = path.join(filePath, fileName); 

//   sander.readFile(fullPath)
//     .then((data) => {
//       var bookObj = JSON.parse(data);
//       var editObj = req.body;
//       Object.keys(editObj).forEach((key) => {
//         bookObj[key] = editObj[key];
//       });
//       file = bookObj;
//       return sander.writeFile(fullPath, JSON.stringify(bookObj));
//     })
//     .then(() => {
//       res.send(file);
//       res.end();
//     })
//     .catch((err) => {
//       console.log('ERROR: ', err);
//       res.write('ERROR: ' + err);
//       res.end();
//     });

// };

// handlers.del = function(req, res) {
  
//   let fileName = req.params.fileName;
//   let fullPath = path.join(filePath, fileName); 

//   if (fileName) {
//     sander.unlink(fullPath)
//       .then(() => {
//         res.write('File successfully deleted. \n', () => {
//           res.end(fileName + ' successfully deleted. \n');
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   } else {
//     res.write(filePath + ' is not a file.  Please try again. \n');
//   }
  
// };

// module.exports = handlers;