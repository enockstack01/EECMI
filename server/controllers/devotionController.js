const DevotionMaterial = require('../models/DevotionMaterial');

// GET /api/devotions  — published only, newest first, optional ?series=
exports.getPublicDevotions = async (req, res) => {
  try {
    const where = { status: 'published' };
    if (req.query.series) where.series = req.query.series;
    const items = await DevotionMaterial.find(where).sort({ publishedAt: -1, createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// GET /api/devotions/:id
exports.getDevotion = async (req, res) => {
  try {
    const item = await DevotionMaterial.findOneAndUpdate(
      { _id: req.params.id, status: 'published' },
      { $inc: { views: 1 } },
      { new: true },
    );
    if (!item) return res.status(404).json({ success: false, message: 'Devotion not found.' });
    res.json({ success: true, data: item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// POST /api/devotions/:id/download  — bump the counter
exports.recordDownload = async (req, res) => {
  try {
    await DevotionMaterial.updateOne({ _id: req.params.id }, { $inc: { downloads: 1 } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
