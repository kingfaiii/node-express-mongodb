const { sendResponse } = require('../utils/responseHelper');
exports.pageNotFound = (req, res, next) => {
  return sendResponse(res, 404, false, 'Page Not Found');
};

exports.errorPagesHandler = (err, req, res, next) => {
  const statusCode =
    Number.isInteger(err.status) || Number.isInteger(err.statusCode)
      ? err.status || err.statusCode
      : 500;

  // Log the specific Multer code for your own debugging
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({
      success: false,
      message:
        'Unexpected field name for file upload. Check your form-data key.',
    });
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};
