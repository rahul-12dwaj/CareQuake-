const Contribution = require('../models/contribution');
const Campaign = require('../models/Campaign');

// Create a new contribution
exports.createContribution = async (req, res) => {
    const { campaignId, amount } = req.body;
    const userId = req.user.userId; // Assuming the user ID is available in req.user from auth middleware

    try {
        // Validate campaign existence
        const campaign = await Campaign.findById(campaignId);
        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }

        const newContribution = new Contribution({ user: userId, campaign: campaignId, amount });
        await newContribution.save();
        res.status(201).json({ message: 'Contribution created', contribution: newContribution });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get contributions for a user
exports.getUserContributions = async (req, res) => {
    const userId = req.user.userId;
    try {
        const contributions = await Contribution.find({ user: userId }).populate('campaign');
        res.status(200).json(contributions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get contributions for a campaign
exports.getCampaignContributions = async (req, res) => {
    const { campaignId } = req.params;
    try {
        const contributions = await Contribution.find({ campaign: campaignId }).populate('user');
        res.status(200).json(contributions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
