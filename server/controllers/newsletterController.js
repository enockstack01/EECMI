const Newsletter = require('../models/Newsletter');

exports.subscribe = async (req, res) => {
  try {
    const { email, name } = req.body;

    const existing = await Newsletter.findOne({ where: { email } });
    if (existing) {
      if (!existing.isActive) {
        await existing.update({ isActive: true });
        return res.json({ success: true, message: 'Welcome back! You have been re-subscribed.' });
      }
      return res.status(400).json({ success: false, message: 'This email is already subscribed.' });
    }

    await Newsletter.create({ email, name });
    res.status(201).json({ success: true, message: 'Thank you for subscribing to our newsletter!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};

exports.unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;
    await Newsletter.update({ isActive: false }, { where: { email } });
    res.json({ success: true, message: 'You have been unsubscribed.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
