// Cloudinary file storage for admin-uploaded devotion materials.
//
// Configure by setting ONE env var:
//   CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
// (copy it verbatim from your Cloudinary dashboard). Until it is set,
// `isConfigured` is false and the admin upload endpoints fall back to
// asking for an external URL instead.

const cloudinary = require('cloudinary').v2;

const isConfigured = Boolean(process.env.CLOUDINARY_URL || process.env.CLOUDINARY_CLOUD_NAME);

if (process.env.CLOUDINARY_URL) {
  // The SDK auto-reads CLOUDINARY_URL, but call config() so `secure` is set.
  cloudinary.config({ secure: true });
} else if (isConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

/**
 * Upload a buffer to Cloudinary.
 * @param {Buffer} buffer
 * @param {string} folder      e.g. 'eecmi/devotions'
 * @param {'image'|'video'|'raw'|'auto'} resourceType  'raw' for PDFs, 'video' for audio/video
 * @returns {Promise<{ url: string, publicId: string, bytes: number, format: string }>}
 */
function uploadBuffer(buffer, folder, resourceType = 'auto') {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (err, result) => {
        if (err) return reject(err);
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          bytes: result.bytes,
          format: result.format,
        });
      },
    );
    stream.end(buffer);
  });
}

module.exports = { cloudinary, isConfigured, uploadBuffer };
