const SiteContent = require('../models/SiteContent');
const { DEFAULT_CONTENT } = require('../data/defaultContent');

// GET /api/content  — every section as one keyed object. Missing keys fall
// back to the bundled defaults so the site always has something to render.
exports.getAllContent = async (req, res) => {
  try {
    const docs = await SiteContent.find().lean();
    const content = { ...DEFAULT_CONTENT };
    for (const doc of docs) content[doc.key] = doc.data;
    res.json({ success: true, data: content });
  } catch (error) {
    console.error(error);
    res.json({ success: true, data: DEFAULT_CONTENT });
  }
};

// GET /api/content/:key
exports.getContentKey = async (req, res) => {
  try {
    const doc = await SiteContent.findOne({ key: req.params.key }).lean();
    const data = doc ? doc.data : DEFAULT_CONTENT[req.params.key];
    if (data === undefined) return res.status(404).json({ success: false, message: 'Unknown content key.' });
    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
