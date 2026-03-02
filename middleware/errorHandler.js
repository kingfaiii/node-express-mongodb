const httpError = require('../models/httpError');

exports.pageNotFound = (req, res, next) => {
  const error = new httpError('Page Not Found', 404);
  throw error;
};

exports.errorPagesHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
  });
};
