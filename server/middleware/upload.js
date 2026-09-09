const multer = require('multer');

// In-memory storage — files are streamed straight to Cloudinary, never
// written to Render's ephemeral disk.
const storage = multer.memoryStorage();

const ALLOWED = [
  'application/pdf',
  'audio/mpeg', 'audio/mp3', 'audio/mp4', 'audio/x-m4a', 'audio/aac', 'audio/wav',
  'video/mp4', 'video/quicktime',
  'image/jpeg', 'image/png', 'image/webp',
];

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB
  fileFilter: (req, file, cb) => {
    if (ALLOWED.includes(file.mimetype)) return cb(null, true);
    cb(new Error('Unsupported file type. Upload a PDF, audio, video or image file.'));
  },
});

// Field name is `file`; tolerate a missing file (admin may paste a URL instead).
const uploadSingle = (fieldName = 'file') => (req, res, next) => {
  upload.single(fieldName)(req, res, (err) => {
    if (err) {
      const message = err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE'
        ? 'File is too large (25 MB max).'
        : err.message || 'File upload failed.';
      return res.status(400).json({ success: false, message });
    }
    next();
  });
};

/** Cloudinary resource_type for a given mimetype. */
const resourceTypeFor = (mimetype = '') => {
  if (mimetype === 'application/pdf') return 'raw';
  if (mimetype.startsWith('audio/') || mimetype.startsWith('video/')) return 'video';
  if (mimetype.startsWith('image/')) return 'image';
  return 'auto';
};

module.exports = { uploadSingle, resourceTypeFor };
