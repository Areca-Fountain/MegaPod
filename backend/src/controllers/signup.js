const db = require('../config/db');
const session = require('express-session');



function signup(req, res) {
    const {name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, Email and password are required" });
    }

    // Check if email already exists
    const checkQuery = 'SELECT * FROM student WHERE email = ?';
    db.query(checkQuery, [email], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (results.length > 0) {
            return res.status(409).json({ message: "Email already exists" });
        }

        // Insert new user
        const insertQuery = 'INSERT INTO student (email, name, password) VALUES (?, ?, ?)';
        db.query(insertQuery, [email, name, password], (err, result) => {
            if (err) {
                console.error("Insert error:", err);
                return res.status(500).json({ message: "User registration failed" });
            }

            return res.status(201).json({ message: "User registered successfully", userId: result.insertId });
        });
    });
}

module.exports = { signup };
