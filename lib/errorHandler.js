function errorHandler(err, req, res, next) { // eslint-disable-line
  console.log('ERROR NAME', err.name);
  if(err.name === 'ValidationError') {
    err.status = 422;
    err.message = 'Unprocessable Entity';
    const errors = {};
    for(const field in err.errors) {
      errors[field] = err.errors[field].message;
    }
    err.errors = errors;
  }

  const status = err.status || 500;
  const message = err.message || 'Test';

  return res.status(status).json({ message, errors: err.errors });
}

module.exports = errorHandler;
