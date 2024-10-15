const Campaign = require('../models/Campaign');

// Create a new campaign
exports.createCampaign = async (req, res) => {
  try {
    const { title, description, goal } = req.body;
    const campaign = new Campaign({ title, description, goal });
    await campaign.save();
    res.status(201).json(campaign);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create campaign', error });
  }
};

// Get all campaigns
exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve campaigns', error });
  }
};

// Get a single campaign by ID
exports.getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve campaign', error });
  }
};

// Update a campaign
exports.updateCampaign = async (req, res) => {
  try {
    const { title, description, goal } = req.body;
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { title, description, goal },
      { new: true }
    );
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.json(campaign);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update campaign', error });
  }
};

// Delete a campaign
exports.deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete campaign', error });
  }
};
