const SiteContent = require('../models/SiteContent');
const { DEFAULT_CONTENT } = require('../data/defaultContent');

// Insert any site_content key that doesn't exist yet. Idempotent, and never
// overwrites an existing document, so admin edits are safe across restarts.
async function seedSiteContent() {
  try {
    const keys = Object.keys(DEFAULT_CONTENT);
    const existing = await SiteContent.find({ key: { $in: keys } }).select('key').lean();
    const have = new Set(existing.map((d) => d.key));
    const missing = keys.filter((k) => !have.has(k));
    if (!missing.length) return;
    await SiteContent.insertMany(
      missing.map((key) => ({ key, data: DEFAULT_CONTENT[key], updatedBy: 'seed' })),
    );
    console.log(`Seeded site_content: ${missing.join(', ')}`);
  } catch (err) {
    console.error('seedSiteContent failed:', err.message);
  }
}

module.exports = { seedSiteContent };
