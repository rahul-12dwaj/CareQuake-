const Campaign = require('../models/Campaign');

// Create a new campaign
exports.createCampaign = async (req, res, next) => {
    const { title, description, goal } = req.body;

    // Validation
    if (!title || !description || goal === undefined) {
        return res.status(400).json({ error: 'Title, description, and goal are required.' });
    }
    if (goal <= 0) {
        return res.status(400).json({ error: 'Goal must be a positive number.' });
    }

    try {
        const newCampaign = new Campaign({ title, description, goal });
        await newCampaign.save();
        res.status(201).json({ message: 'Campaign created', campaign: newCampaign });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

// Get all campaigns
exports.getCampaigns = async (req, res, next) => {
    try {
        const campaigns = await Campaign.find();
        res.status(200).json(campaigns);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

// Get a campaign by ID
exports.getCampaignById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const campaign = await Campaign.findById(id);
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }
        res.status(200).json(campaign);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

// Update a campaign by ID
exports.updateCampaign = async (req, res, next) => {
    const { id } = req.params;
    const { title, description, goal } = req.body;

    // Validation
    if (title === undefined && description === undefined && goal === undefined) {
        return res.status(400).json({ error: 'At least one field (title, description, goal) must be provided for update.' });
    }
    if (goal !== undefined && goal <= 0) {
        return res.status(400).json({ error: 'Goal must be a positive number.' });
    }

    try {
        const updatedCampaign = await Campaign.findByIdAndUpdate(
            id,
            { title, description, goal },
            { new: true, runValidators: true } // Return the updated document and validate
        );
        if (!updatedCampaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }
        res.status(200).json({ message: 'Campaign updated', campaign: updatedCampaign });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

// Delete a campaign by ID
exports.deleteCampaign = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedCampaign = await Campaign.findByIdAndDelete(id);
        if (!deletedCampaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }
        res.status(200).json({ message: 'Campaign deleted', campaign: deletedCampaign });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};
