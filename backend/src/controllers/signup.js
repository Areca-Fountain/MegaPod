const bcrypt = require('bcryptjs');
const db = require('../config/db');

async function signup(req, res) {
    const name = String(req.body.name || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, Email and password are required" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    try {
        const [existing] = await db.query('SELECT email FROM student WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(409).json({ message: "Email already exists" });
        }

        const hash = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO student (email, name, password) VALUES (?, ?, ?)', [email, name, hash]);

        return res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: "Email already exists" });
        }
        console.error("Signup error:", err);
        return res.status(500).json({ message: "User registration failed" });
    }
}

module.exports = { signup };