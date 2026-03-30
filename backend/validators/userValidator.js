const { sendResponse } = require('../utils/responseHelper');
const { cleanupCloudinaryFiles } = require('../utils/fileHelper');

const validate = (schema) => async (req, res, next) => {
  // 1. Merge File path into Body for Zod to see
  const dataToValidate = {
    ...req.body,
    ...(req.file && { [req.file.fieldname]: req.file.path }),
  };

  const result = await schema.safeParseAsync(dataToValidate);

  if (!result.success) {
    // 2. Use our Utility to wipe the "orphan" files
    await cleanupCloudinaryFiles(req);

    return sendResponse(
      res,
      400,
      false,
      { message: 'Validation Error' },
      { errors: result.error.flatten().fieldErrors },
    );
  }

  // 3. Hydrate body with clean/coerced data and move on
  req.body = result.data;
  next();
};

module.exports = { validate };
