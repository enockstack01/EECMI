const { mongoose } = require('../config/db');
const { cleanJSON } = require('../config/schemaOptions');

const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true, collection: 'newsletters', toJSON: cleanJSON });

module.exports = mongoose.models.Newsletter || mongoose.model('Newsletter', newsletterSchema);
