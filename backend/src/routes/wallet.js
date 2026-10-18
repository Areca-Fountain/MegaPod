const express = require('express');
const router = express.Router();
const { AddWalletAddress } = require('../controllers/walletControllers');
const { requireAuth } = require('../middleware/auth');

router.post('/save-wallet', requireAuth, AddWalletAddress);

module.exports = router;