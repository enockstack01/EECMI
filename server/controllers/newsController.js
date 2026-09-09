const NewsPost = require('../models/NewsPost');

// GET /api/news  — published only, newest first, optional ?category=
exports.getPublicNews = async (req, res) => {
  try {
    const where = { status: 'published' };
    if (req.query.category && req.query.category !== 'All') where.category = req.query.category;
    const items = await NewsPost.find(where).sort({ publishedAt: -1, createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// GET /api/news/:id
exports.getNewsPost = async (req, res) => {
  try {
    const item = await NewsPost.findOneAndUpdate(
      { _id: req.params.id, status: 'published' },
      { $inc: { views: 1 } },
      { new: true },
    );
    if (!item) return res.status(404).json({ success: false, message: 'Article not found.' });
    res.json({ success: true, data: item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
