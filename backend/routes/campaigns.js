const express = require('express');
const {
    createCampaign,
    getCampaigns,
    getCampaignById,
    updateCampaign,
    deleteCampaign
} = require('../controllers/campaignController');

const router = express.Router();

// Create a new campaign
router.post('/', createCampaign);

// Get all campaigns
router.get('/', getCampaigns);

// Get a campaign by ID
router.get('/:id', getCampaignById);

// Update a campaign by ID
router.put('/:id', updateCampaign);

// Delete a campaign by ID
router.delete('/:id', deleteCampaign);

module.exports = router;
