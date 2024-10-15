const mongoose = require('mongoose');
const CampaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  goal: { type: Number, required: true },
  donations: { type: Number, default: 0 },
});
module.exports = mongoose.model('Campaign', CampaignSchema);

