const Volunteer = require('../models/Volunteer');

exports.registerVolunteer = async (req, res) => {
  try {
    const { name, email, phone, location, skills, areas, availability, motivation } = req.body;

    const existing = await Volunteer.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ success: false, message: 'This email is already registered as a volunteer.' });
    }

    const areasArray = !areas ? [] : Array.isArray(areas) ? areas : [areas];
    const volunteer = await Volunteer.create({ name, email, phone, location, skills, areas: areasArray, availability, motivation });
    res.status(201).json({ success: true, message: 'Thank you for volunteering! We will be in touch soon.', data: volunteer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};
