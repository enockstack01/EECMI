const Volunteer = require('../models/Volunteer');
const { getClerkUserId } = require('../utils/currentUser');

exports.registerVolunteer = async (req, res) => {
  try {
    const { name, email, phone, location, skills, areas, availability, motivation } = req.body;
    const clerkUserId = getClerkUserId(req);

    const existing = await Volunteer.findOne({ email });
    if (existing) {
      // Link an existing record to the account if it isn't already, then treat as success.
      if (clerkUserId && !existing.clerkUserId) {
        existing.clerkUserId = clerkUserId;
        await existing.save();
      }
      return res.status(400).json({ success: false, message: 'This email is already registered as a volunteer.' });
    }

    const areasArray = !areas ? [] : Array.isArray(areas) ? areas : [areas];
    const volunteer = await Volunteer.create({ name, email, phone, location, skills, areas: areasArray, availability, motivation, clerkUserId });
    res.status(201).json({ success: true, message: 'Thank you for volunteering! We will be in touch soon.', data: volunteer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};
