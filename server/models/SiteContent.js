const { mongoose } = require('../config/db');
const { cleanJSON } = require('../config/schemaOptions');

// Admin-editable platform content. One document per section (`key`), each
// holding an arbitrary JSON blob (`data` — an array or object). Both the
// website and the mobile app read these through GET /api/content and fall
// back to their bundled defaults when a key is missing or the API is down.
const siteContentSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, index: true },
  data: { type: mongoose.Schema.Types.Mixed, default: {} },
  updatedBy: { type: String },
}, { timestamps: true, collection: 'site_content', minimize: false, toJSON: cleanJSON });

module.exports = mongoose.models.SiteContent || mongoose.model('SiteContent', siteContentSchema);
