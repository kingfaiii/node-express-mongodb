const { sendResponse } = require('../utils/responseHelper');
exports.pageNotFound = (req, res, next) => {
  return sendResponse(res, 404, false, 'Page Not Found');
};

exports.errorPagesHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  return sendResponse(res, statusCode, false, err.message);
};
