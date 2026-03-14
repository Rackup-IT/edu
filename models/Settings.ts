import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  logoUrl: {
    type: String,
    default: "" // Fallback to hardcoded if empty
  },
  companyName: {
    type: String,
    required: true,
    default: "Rackup IT Solution"
  },
  footerText: {
    type: String,
    default: "Leading Web and Desktop Development Solutions"
  }
}, {
  timestamps: true,
});

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
