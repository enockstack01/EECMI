const Contact = require('../models/Contact');

exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const contact = await Contact.create({ name, email, phone, subject, message });
    res.status(201).json({ success: true, message: 'Message received. We will respond shortly.', data: contact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: contacts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
