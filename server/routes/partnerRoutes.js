const router = require('express').Router();
const Partner = require('../models/Partner');

router.post('/', async (req, res) => {
  try {
    const { name, email, organization, partnerType, partnershipAreas, message } = req.body;
    if (!name || !email)
      return res.status(400).json({ success: false, message: 'Name and email are required.' });

    await Partner.create({ name, email, organization, partnerType, partnershipAreas, message });
    res.status(201).json({
      success: true,
      message: 'Thank you for your interest in partnering with EECMI. Our team will reach out to you soon.',
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Submission failed. Please try again.' });
  }
});

module.exports = router;
