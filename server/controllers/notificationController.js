const Notification = require('../models/Notification');

const shape = (doc, userId) => ({
  id: doc._id.toString(),
  type: doc.type,
  title: doc.title,
  body: doc.body,
  linkPath: doc.linkPath,
  refId: doc.refId,
  read: (doc.readBy || []).includes(userId),
  createdAt: doc.createdAt,
});

// GET /api/notifications  — recent 50 with per-user read state
exports.list = async (req, res) => {
  try {
    const userId = req.clerkUserId;
    const docs = await Notification.find({ audience: 'all' }).sort({ createdAt: -1 }).limit(50).lean();
    res.json({ success: true, data: docs.map((d) => shape(d, userId)) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to load notifications.' });
  }
};

// GET /api/notifications/unread-count
exports.unreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({ audience: 'all', readBy: { $ne: req.clerkUserId } });
    res.json({ success: true, data: { count } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to load unread count.' });
  }
};

// POST /api/notifications/read  — { ids?: string[] }  (omit ids to mark all)
exports.markRead = async (req, res) => {
  try {
    const userId = req.clerkUserId;
    const filter = { audience: 'all', readBy: { $ne: userId } };
    if (Array.isArray(req.body.ids) && req.body.ids.length) filter._id = { $in: req.body.ids };
    await Notification.updateMany(filter, { $addToSet: { readBy: userId } });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to update notifications.' });
  }
};
