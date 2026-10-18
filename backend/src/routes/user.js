const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/signup');
const { signing } = require('../controllers/signing');
const { updateLevel, getCurrentLevelByEmail, getCompletedLevels } = require('../controllers/updateLevel');
const { readUser, requireAuth, clearAuthCookie } = require('../middleware/auth');

router.post("/signup", signup);
router.post("/signing", signing);

router.get('/check-auth', (req, res) => {
    const user = readUser(req);
    if (user) {
        res.json({ isLoggedIn: true, user });
    } else {
        res.json({ isLoggedIn: false });
    }
});

router.post('/logout', (req, res) => {
    clearAuthCookie(res);
    res.json({ message: "Logged out" });
});

router.post("/update-level", requireAuth, updateLevel);
router.post("/get-level", requireAuth, getCurrentLevelByEmail);
router.post("/completed-levels", requireAuth, getCompletedLevels);

module.exports = router;