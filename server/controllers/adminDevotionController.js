const DevotionMaterial = require('../models/DevotionMaterial');
const { isConfigured, uploadBuffer } = require('../config/cloudinary');
const { resourceTypeFor } = require('../middleware/upload');
const { createNotification } = require('../utils/notify');

const paginate = (query) => {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, parseInt(query.limit) || 20);
  return { limit, offset: (page - 1) * limit, page };
};
const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Body fields that map straight onto the model.
const FIELDS = ['title', 'series', 'description', 'scriptureRef', 'body', 'type',
  'externalUrl', 'coverImageUrl', 'author', 'status'];

const pick = (body) => FIELDS.reduce((acc, f) => {
  if (body[f] !== undefined) acc[f] = body[f];
  return acc;
}, {});

async function maybeUpload(req) {
  if (!req.file) return null;
  if (!isConfigured) {
    const err = new Error('File storage is not configured. Set CLOUDINARY_URL, or paste an external URL instead.');
    err.status = 400;
    throw err;
  }
  const { url } = await uploadBuffer(req.file.buffer, 'eecmi/devotions', resourceTypeFor(req.file.mimetype));
  return url;
}

// GET /api/admin/devotions
exports.list = async (req, res) => {
  try {
    const { limit, offset, page } = paginate(req.query);
    const where = {};
    if (req.query.search) {
      const rx = new RegExp(escapeRegExp(req.query.search), 'i');
      where.$or = [{ title: rx }, { series: rx }, { author: rx }];
    }
    if (req.query.status) where.status = req.query.status;
    const [rows, count] = await Promise.all([
      DevotionMaterial.find(where).sort({ createdAt: -1 }).skip(offset).limit(limit),
      DevotionMaterial.countDocuments(where),
    ]);
    res.json({ success: true, data: rows, total: count, page, pages: Math.ceil(count / limit) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch devotions.' });
  }
};

// POST /api/admin/devotions   (multipart: optional `file`)
exports.create = async (req, res) => {
  try {
    const data = pick(req.body);
    if (!data.title) return res.status(400).json({ success: false, message: 'Title is required.' });
    const uploadedUrl = await maybeUpload(req);
    if (uploadedUrl) data.fileUrl = uploadedUrl;
    if (data.status === 'published') data.publishedAt = new Date();

    const item = await DevotionMaterial.create(data);

    if (item.status === 'published') {
      await createNotification({
        type: 'devotion',
        title: `New devotion: ${item.title}`,
        body: item.description || item.scriptureRef || `A new ${item.series} was published.`,
        linkPath: `/devotions/${item.id}`,
        refId: item.id,
      });
    }
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message || 'Failed to create devotion.' });
  }
};

// PUT /api/admin/devotions/:id
exports.update = async (req, res) => {
  try {
    const item = await DevotionMaterial.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found.' });

    const wasPublished = item.status === 'published';
    const data = pick(req.body);
    const uploadedUrl = await maybeUpload(req);
    if (uploadedUrl) data.fileUrl = uploadedUrl;
    Object.assign(item, data);
    if (item.status === 'published' && !wasPublished) item.publishedAt = new Date();
    await item.save();

    if (item.status === 'published' && !wasPublished) {
      await createNotification({
        type: 'devotion',
        title: `New devotion: ${item.title}`,
        body: item.description || item.scriptureRef || `A new ${item.series} was published.`,
        linkPath: `/devotions/${item.id}`,
        refId: item.id,
      });
    }
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message || 'Update failed.' });
  }
};

// DELETE /api/admin/devotions/:id
exports.remove = async (req, res) => {
  try {
    const item = await DevotionMaterial.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found.' });
    res.json({ success: true, message: 'Deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Delete failed.' });
  }
};

// GET /api/admin/devotions/upload-status  — so the UI can hide the file picker
exports.uploadStatus = (req, res) => {
  res.json({ success: true, data: { fileUploads: isConfigured } });
};
