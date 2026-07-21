const Prayer = require('../models/Prayer');

exports.submitPrayer = async (req, res) => {
  try {
    const { name, email, request, isAnonymous, isPublic } = req.body;
    const prayer = await Prayer.create({ name, email, request, isAnonymous, isPublic });
    res.status(201).json({ success: true, message: 'Your prayer request has been received. Our team is praying with you.', data: prayer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};

exports.getPublicPrayers = async (req, res) => {
  try {
    const prayers = await Prayer.find({ isPublic: true }).sort({ createdAt: -1 }).limit(20);
    res.json({ success: true, data: prayers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.prayForRequest = async (req, res) => {
  try {
    const prayer = await Prayer.findByIdAndUpdate(
      req.params.id,
      { $inc: { prayerCount: 1 } },
      { new: true }
    );
    if (!prayer) return res.status(404).json({ success: false, message: 'Prayer not found.' });
    res.json({ success: true, data: prayer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
