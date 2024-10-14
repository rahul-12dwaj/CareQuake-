const express = require('express');
const Campaign = require('../models/campaign'); // Import the Campaign model
const router = express.Router();

// Create a new campaign
router.post('/', async (req, res) => {
    try {
        const newCampaign = new Campaign(req.body);
        await newCampaign.save();
        res.status(201).json(newCampaign);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all campaigns
router.get('/', async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        res.json(campaigns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a campaign by ID
router.get('/:id', async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
        res.json(campaign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a campaign by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedCampaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCampaign) return res.status(404).json({ message: 'Campaign not found' });
        res.json(updatedCampaign);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a campaign by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedCampaign = await Campaign.findByIdAndDelete(req.params.id);
        if (!deletedCampaign) return res.status(404).json({ message: 'Campaign not found' });
        res.json({ message: 'Campaign deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
