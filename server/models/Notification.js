const { mongoose } = require('../config/db');
const { cleanJSON } = require('../config/schemaOptions');

// Broadcast notifications. Per-user read state is tracked by pushing the
// Clerk user id into `readBy` — a notification is "unread" for a user when
// their id is absent from that array.
const notificationSchema = new mongoose.Schema({
  type: { type: String, enum: ['update', 'devotion', 'system'], default: 'system' },
  title: { type: String, required: true },
  body: { type: String },
  linkPath: { type: String },
  refId: { type: String },
  audience: { type: String, enum: ['all'], default: 'all' },
  readBy: { type: [String], default: [] },
}, { timestamps: true, collection: 'notifications', toJSON: cleanJSON });

notificationSchema.index({ createdAt: -1 });

module.exports = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
