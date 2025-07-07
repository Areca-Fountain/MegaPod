const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { AddWalletAddress } = require('../controllers/walletControllers');

router.post('/save-wallet', AddWalletAddress);

module.exports = router;
