const cloudinary = require('cloudinary').v2;

/**
 * Automatically cleans up uploaded files from Cloudinary
 * Works for single (req.file) or multiple (req.files) uploads.
 */
const cleanupCloudinaryFiles = async (req) => {
  try {
    // 1. Collect all files (single or array) into one list
    const files = [];
    if (req.file) files.push(req.file);
    if (req.files)
      files.push(
        ...(Array.isArray(req.files)
          ? req.files
          : Object.values(req.files).flat()),
      );

    // 2. Map to delete promises (using the public_id/filename)
    const deletePromises = files
      .filter((f) => f.filename)
      .map((f) => cloudinary.uploader.destroy(f.filename));

    return await Promise.all(deletePromises);
  } catch (error) {
    console.error('🧹 Cleanup Utility Error:', error.message);
  }
};

module.exports = { cleanupCloudinaryFiles };
