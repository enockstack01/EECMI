const Notification = require('../models/Notification');

/**
 * Create a broadcast notification. Fire-and-forget — never throws into the
 * calling request handler (a failed notification must not fail a publish).
 *
 * @param {{ type?: string, title: string, body?: string, linkPath?: string, refId?: string }} input
 * @returns {Promise<void>}
 */
async function createNotification({ type = 'system', title, body, linkPath, refId }) {
  try {
    if (!title) return;
    await Notification.create({ type, title, body, linkPath, refId, audience: 'all', readBy: [] });
  } catch (err) {
    console.error('createNotification failed:', err.message);
  }
}

module.exports = { createNotification };
