const express = require('express');
const router = express.Router();
const { createCampaign, getCampaigns, getCampaignById, updateCampaign, deleteCampaign } = require('../controllers/campaignController');

// POST /api/campaigns - Create a new campaign
router.post('/', createCampaign);

// GET /api/campaigns - Get all campaigns
router.get('/', getCampaigns);

// GET /api/campaigns/:id - Get a single campaign by ID
router.get('/:id', getCampaignById);

// PUT /api/campaigns/:id - Update a campaign by ID
router.put('/:id', updateCampaign);

// DELETE /api/campaigns/:id - Delete a campaign by ID
router.delete('/:id', deleteCampaign);

module.exports = router;
