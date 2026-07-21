const { mongoose } = require('../config/db');
const { cleanJSON } = require('../config/schemaOptions');

const partnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  organization: { type: String },
  partnerType: { type: String, enum: ['Church', 'NGO', 'Business', 'School', 'Individual'], default: 'Individual' },
  partnershipAreas: { type: [String], default: [] },
  message: { type: String },
  status: { type: String, enum: ['pending', 'active', 'inactive'], default: 'pending' },
}, { timestamps: true, collection: 'partners', toJSON: cleanJSON });

module.exports = mongoose.models.Partner || mongoose.model('Partner', partnerSchema);
