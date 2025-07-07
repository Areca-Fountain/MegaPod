const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/signup');
const { signing } = require('../controllers/signing');
const { updateLevel, getCurrentLevelByEmail, getCompletedLevels} = require('../controllers/updateLevel');


router.post("/signup", signup);

router.post("/signing", signing);

router.get('/check-auth', (req, res) => {
    if (req.session.user) {
        res.json({ isLoggedIn: true, user: req.session.user });
    } else {
        res.json({ isLoggedIn: false });
    }
});

router.post("/update-level", updateLevel);

router.post("/get-level", getCurrentLevelByEmail);

router.post("/completed-levels", getCompletedLevels);

module.exports = router;
