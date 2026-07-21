const Resource = require('../models/Resource');

exports.getPublicResources = async (req, res) => {
  try {
    const resources = await Resource.find({ status: 'published' }).sort({ createdAt: -1 });
    res.json({ success: true, data: resources });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
