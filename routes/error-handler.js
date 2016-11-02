module.exports = function errorHandler(error, request, response, next) {// eslint-disable-line no-unused-var

  const code = error.code || 500;
  const err = code === 500 ? 'Internal Server Error' : err.error;
  console.log(err.error || err.message);
  response.status(code).send({error});
 
};