const UserProfile = require('../models/UserProfile');
const DevotionMaterial = require('../models/DevotionMaterial');
const Contact = require('../models/Contact');
const Prayer = require('../models/Prayer');
const Volunteer = require('../models/Volunteer');
const Partner = require('../models/Partner');
const { getClerkUser } = require('../utils/currentUser');

// Load (or lazily create) the UserProfile for the signed-in Clerk user.
async function loadProfile(clerkUserId, email) {
  let profile = await UserProfile.findOne({ clerkUserId });
  if (!profile) {
    profile = await UserProfile.create({ clerkUserId, email });
  } else if (email && profile.email !== email) {
    profile.email = email;
    await profile.save();
  }
  return profile;
}

// GET /api/me
exports.getMe = async (req, res) => {
  try {
    const { user, email } = await getClerkUser(req.clerkUserId);
    const profile = await loadProfile(req.clerkUserId, email);
    res.json({
      success: true,
      data: {
        id: user.id,
        name: [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username || email,
        email,
        imageUrl: user.imageUrl,
        role: user.publicMetadata?.role || 'user',
        phone: profile.phone || '',
        location: profile.location || '',
        interests: profile.interests || [],
        notifyInApp: profile.notifyInApp !== false,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to load your profile.' });
  }
};

// PATCH /api/me  — { phone, location, interests, notifyInApp }
exports.updateMe = async (req, res) => {
  try {
    const { email } = await getClerkUser(req.clerkUserId);
    const profile = await loadProfile(req.clerkUserId, email);
    const { phone, location, interests, notifyInApp } = req.body;
    if (phone !== undefined) profile.phone = String(phone).trim();
    if (location !== undefined) profile.location = String(location).trim();
    if (Array.isArray(interests)) profile.interests = interests.map((s) => String(s).trim()).filter(Boolean);
    if (notifyInApp !== undefined) profile.notifyInApp = Boolean(notifyInApp);
    await profile.save();
    res.json({
      success: true,
      data: {
        phone: profile.phone,
        location: profile.location,
        interests: profile.interests,
        notifyInApp: profile.notifyInApp,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to save your profile.' });
  }
};

// GET /api/me/activity  — the user's own submissions across all forms
exports.getActivity = async (req, res) => {
  try {
    const { email } = await getClerkUser(req.clerkUserId);
    const match = email
      ? { $or: [{ clerkUserId: req.clerkUserId }, { email }] }
      : { clerkUserId: req.clerkUserId };

    const [contacts, prayers, volunteers, partners] = await Promise.all([
      Contact.find(match).sort({ createdAt: -1 }).limit(25).lean(),
      Prayer.find(email ? { $or: [{ clerkUserId: req.clerkUserId }, { email }] } : { clerkUserId: req.clerkUserId })
        .sort({ createdAt: -1 }).limit(25).lean(),
      Volunteer.find(match).sort({ createdAt: -1 }).limit(25).lean(),
      Partner.find(match).sort({ createdAt: -1 }).limit(25).lean(),
    ]);

    const items = [
      ...contacts.map((d) => ({ kind: 'Message', id: d._id.toString(), title: d.subject || 'Contact message', status: d.status, createdAt: d.createdAt })),
      ...prayers.map((d) => ({ kind: 'Prayer request', id: d._id.toString(), title: d.request.slice(0, 80), status: d.status, createdAt: d.createdAt })),
      ...volunteers.map((d) => ({ kind: 'Volunteer application', id: d._id.toString(), title: (d.areas || []).join(', ') || 'Volunteer application', status: d.status, createdAt: d.createdAt })),
      ...partners.map((d) => ({ kind: 'Partnership enquiry', id: d._id.toString(), title: d.organization || 'Partnership enquiry', status: d.status, createdAt: d.createdAt })),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({ success: true, data: items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to load your activity.' });
  }
};

// GET /api/me/devotions  — saved / bookmarked devotions
exports.getSavedDevotions = async (req, res) => {
  try {
    const { email } = await getClerkUser(req.clerkUserId);
    const profile = await loadProfile(req.clerkUserId, email);
    await profile.populate({ path: 'savedDevotions', match: { status: 'published' } });
    res.json({ success: true, data: (profile.savedDevotions || []).filter(Boolean) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to load saved devotions.' });
  }
};

// POST /api/me/devotions/:id/save   /   DELETE …/save
exports.toggleSavedDevotion = async (req, res) => {
  try {
    const { email } = await getClerkUser(req.clerkUserId);
    const profile = await loadProfile(req.clerkUserId, email);
    const devotion = await DevotionMaterial.findById(req.params.id);
    if (!devotion) return res.status(404).json({ success: false, message: 'Devotion not found.' });

    const id = devotion._id.toString();
    const has = profile.savedDevotions.some((d) => d.toString() === id);
    if (req.method === 'DELETE' || (req.method === 'POST' && has)) {
      profile.savedDevotions = profile.savedDevotions.filter((d) => d.toString() !== id);
    } else {
      profile.savedDevotions.push(devotion._id);
    }
    await profile.save();
    res.json({ success: true, data: { saved: profile.savedDevotions.some((d) => d.toString() === id) } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to update saved devotions.' });
  }
};
