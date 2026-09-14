const { mongoose } = require('../config/db');
const { cleanJSON } = require('../config/schemaOptions');

const devotionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  series: { type: String, default: 'Daily Devotion' },
  description: { type: String },
  scriptureRef: { type: String },
  body: { type: String },
  type: { type: String, enum: ['text', 'pdf', 'document', 'image', 'audio', 'video', 'link'], default: 'text' },
  fileUrl: { type: String },
  externalUrl: { type: String },
  coverImageUrl: { type: String },
  author: { type: String, default: 'EECMI Team' },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  publishedAt: { type: Date },
  views: { type: Number, default: 0 },
  downloads: { type: Number, default: 0 },
}, { timestamps: true, collection: 'devotion_materials', toJSON: cleanJSON });

module.exports = mongoose.models.DevotionMaterial || mongoose.model('DevotionMaterial', devotionSchema);
