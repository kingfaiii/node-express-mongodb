const { sendResponse } = require('../utils/responseHelper');

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const errorDetails = result.error.issues.map((issue) => ({
      field: issue.path[0],
      message: issue.message,
    }));
    return sendResponse(res, 400, false, 'Validation Failed', errorDetails);
  }
  req.body = result.data;
  next();
};

module.exports = { validate };
