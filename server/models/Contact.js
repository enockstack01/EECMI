const { mongoose } = require('../config/db');
const { cleanJSON } = require('../config/schemaOptions');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
}, { timestamps: true, collection: 'contacts', toJSON: cleanJSON });

module.exports = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
