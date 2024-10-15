const express = require('express');
const { createContribution, getUserContributions, getCampaignContributions } = require('../controllers/contributionController');
const authMiddleware = require('../middleware/authMiddleware'); // Ensure this is in place for auth
const router = express.Router();

// Create a new contribution
router.post('/', authMiddleware, createContribution);

// Get all contributions for a user
router.get('/', authMiddleware, getUserContributions);

// Get all contributions for a specific campaign
router.get('/campaign/:campaignId', authMiddleware, getCampaignContributions);

module.exports = router;
