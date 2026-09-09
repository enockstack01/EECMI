const { mongoose } = require('../config/db');
const { cleanJSON } = require('../config/schemaOptions');

// App-specific profile data for a signed-in user. Name / email / avatar stay
// in Clerk; this holds only what the ministry app adds on top.
const userProfileSchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true, unique: true, index: true },
  email: { type: String },
  displayName: { type: String },
  phone: { type: String },
  location: { type: String },
  interests: { type: [String], default: [] },
  savedDevotions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DevotionMaterial' }],
  notifyInApp: { type: Boolean, default: true },
}, { timestamps: true, collection: 'user_profiles', toJSON: cleanJSON });

module.exports = mongoose.models.UserProfile || mongoose.model('UserProfile', userProfileSchema);
