

const db = require('../config/db');



function signing(req, res) {
    const {email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "email, and password are required" });
    }

    // Check if email already exists
    const checkQuery = 'SELECT * FROM student WHERE email = ?';
    db.query(checkQuery, [email], (err, results) => {

        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        if (results[0].password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        } else {
            req.session.user = {
                name: results[0].name,
                email: results[0].email
            };
            return res.status(200).json({
                message: "Login Successful",
            });
        }

    });
}

module.exports = { signing };
