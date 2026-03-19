const { sendResponse } = require('../utils/responseHelper');
exports.pageNotFound = (req, res, next) => {
  return sendResponse(res, 404, false, 'Page Not Found');
};

exports.errorPagesHandler = (err, req, res, next) => {
  const statusCode = err.code || 500;
  if (res.headerSent) {
    return next(err);
  }
  return sendResponse(
    res,
    statusCode,
    false,
    err.message || 'An unknown error occurred',
  );
};
