const db = require("../config/db");

function AddWalletAddress(req, res) {
    console.log("AddWalletAddress -> req.body", req.body);
    const { walletAddress, email } = req.body;

    if (!walletAddress || !email) {
        return res.status(400).json({ message: "walletAddress and email are required" });
    }

    // Check if a wallet record already exists for this user
    const checkQuery = 'SELECT * FROM wallet WHERE w_email = ?';
    db.query(checkQuery, [email], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (results.length > 0) {
            // Wallet record exists, update the address
            const updateQuery = 'UPDATE wallet SET address = ? WHERE w_email = ?';
            db.query(updateQuery, [walletAddress, email], (updateErr) => {
                if (updateErr) {
                    console.error("Update error:", updateErr);
                    return res.status(500).json({ message: "Failed to update wallet address" });
                }
                return res.status(200).json({ message: "Wallet address updated successfully" });
            });
        } else {
            // No record found, insert a new one
            const insertQuery = 'INSERT INTO wallet (w_email, address) VALUES (?, ?)';
            db.query(insertQuery, [email, walletAddress], (insertErr) => {
                if (insertErr) {
                    console.error("Insert error:", insertErr);
                    return res.status(500).json({ message: "Failed to save wallet address" });
                }
                return res.status(201).json({ message: "Wallet address saved successfully" });
            });
        }
    });
}

module.exports = { AddWalletAddress };