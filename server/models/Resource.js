const { mongoose } = require('../config/db');
const { cleanJSON } = require('../config/schemaOptions');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, default: 'Downloads' },
  description: { type: String },
  fileUrl: { type: String },
  externalUrl: { type: String },
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
  year: { type: String },
  downloads: { type: Number, default: 0 },
}, { timestamps: true, collection: 'resources', toJSON: cleanJSON });

module.exports = mongoose.models.Resource || mongoose.model('Resource', resourceSchema);
