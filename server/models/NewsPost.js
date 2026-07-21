const { mongoose } = require('../config/db');
const { cleanJSON } = require('../config/schemaOptions');

const newsPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, default: 'General' },
  excerpt: { type: String },
  content: { type: String },
  author: { type: String, default: 'EECMI Team' },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  featured: { type: Boolean, default: false },
  imageUrl: { type: String },
  readTime: { type: String, default: '3 min read' },
  publishedAt: { type: Date },
  views: { type: Number, default: 0 },
}, { timestamps: true, collection: 'news_posts', toJSON: cleanJSON });

module.exports = mongoose.models.NewsPost || mongoose.model('NewsPost', newsPostSchema);
