const { sendResponse } = require('../utils/responseHelper');
const { cleanupCloudinaryFiles } = require('../utils/fileHelper');

const validate = (schema) => async (req, res, next) => {
  // 1. Merge File path into Body ONLY if a file exists
  const dataToValidate = {
    ...req.body,
    ...(req.file && { [req.file.fieldname]: req.file.path }),
  };

  const result = await schema.safeParseAsync(dataToValidate);

  if (!result.success) {
    // 🚀 THE FIX: Only run cleanup if there's actually a file to clean!
    if (req.file || req.files) {
      await cleanupCloudinaryFiles(req);
    }

    return sendResponse(
      res,
      400,
      false,
      'Validation Error', // Pass a simple string if that's what your helper expects
      { errors: result.error.flatten().fieldErrors },
    );
  }

  // 3. Hydrate body with clean/coerced data
  req.body = result.data;
  next();
};

module.exports = { validate };
