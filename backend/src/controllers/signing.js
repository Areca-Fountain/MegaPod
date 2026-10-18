const bcrypt = require('bcryptjs');
const db = require('../config/db');
const { setAuthCookie } = require('../middleware/auth');

async function signing(req, res) {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (!email || !password) {
        return res.status(400).json({ message: "email, and password are required" });
    }

    try {
        const [rows] = await db.query('SELECT * FROM student WHERE email = ?', [email]);
        const student = rows[0];

        // Same message for "no such user" and "wrong password" so emails can't be probed.
        if (!student || !(await bcrypt.compare(password, student.password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        setAuthCookie(res, { name: student.name, email: student.email });
        return res.status(200).json({ message: "Login Successful" });
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Database error" });
    }
}

module.exports = { signing };