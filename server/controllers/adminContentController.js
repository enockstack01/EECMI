const SiteContent = require('../models/SiteContent');
const { DEFAULT_CONTENT } = require('../data/defaultContent');

const KEYS = Object.keys(DEFAULT_CONTENT);

// GET /api/admin/content  — every section (falls back to defaults for any
// key not yet persisted)
exports.getAll = async (req, res) => {
  try {
    const docs = await SiteContent.find().lean();
    const byKey = Object.fromEntries(docs.map((d) => [d.key, d.data]));
    const data = Object.fromEntries(KEYS.map((k) => [k, byKey[k] ?? DEFAULT_CONTENT[k]]));
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load content.' });
  }
};

// GET /api/admin/content/:key
exports.getKey = async (req, res) => {
  try {
    if (!KEYS.includes(req.params.key)) return res.status(404).json({ success: false, message: 'Unknown content key.' });
    const doc = await SiteContent.findOne({ key: req.params.key }).lean();
    res.json({ success: true, data: doc ? doc.data : DEFAULT_CONTENT[req.params.key] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load content.' });
  }
};

// PUT /api/admin/content/:key   — body: { data }
exports.putKey = async (req, res) => {
  try {
    if (!KEYS.includes(req.params.key)) return res.status(404).json({ success: false, message: 'Unknown content key.' });
    if (req.body.data === undefined) return res.status(400).json({ success: false, message: 'Missing `data`.' });
    const doc = await SiteContent.findOneAndUpdate(
      { key: req.params.key },
      { data: req.body.data, updatedBy: req.clerkUserId },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );
    res.json({ success: true, data: doc.data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to save content.' });
  }
};

// POST /api/admin/content/:key/reset  — restore the bundled default
exports.resetKey = async (req, res) => {
  try {
    if (!KEYS.includes(req.params.key)) return res.status(404).json({ success: false, message: 'Unknown content key.' });
    await SiteContent.findOneAndUpdate(
      { key: req.params.key },
      { data: DEFAULT_CONTENT[req.params.key], updatedBy: req.clerkUserId },
      { upsert: true },
    );
    res.json({ success: true, data: DEFAULT_CONTENT[req.params.key] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to reset content.' });
  }
};
