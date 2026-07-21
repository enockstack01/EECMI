const { mongoose } = require('../config/db');
const { cleanJSON } = require('../config/schemaOptions');

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  location: { type: String },
  skills: { type: String },
  areas: { type: [String], default: [] },
  availability: { type: String },
  motivation: { type: String },
  status: { type: String, enum: ['pending', 'active', 'inactive'], default: 'pending' },
}, { timestamps: true, collection: 'volunteers', toJSON: cleanJSON });

module.exports = mongoose.models.Volunteer || mongoose.model('Volunteer', volunteerSchema);
