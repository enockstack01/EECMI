const { mongoose } = require('../config/db');
const { cleanJSON } = require('../config/schemaOptions');

const prayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  request: { type: String, required: true },
  isAnonymous: { type: Boolean, default: false },
  isPublic: { type: Boolean, default: false },
  prayerCount: { type: Number, default: 0 },
  status: { type: String, enum: ['pending', 'prayed', 'answered'], default: 'pending' },
}, { timestamps: true, collection: 'prayers', toJSON: cleanJSON });

module.exports = mongoose.models.Prayer || mongoose.model('Prayer', prayerSchema);
