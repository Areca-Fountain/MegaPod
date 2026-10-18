const db = require("../config/db");

async function AddWalletAddress(req, res) {
    const email = req.user.email; // from the login cookie
    const walletAddress = String(req.body.walletAddress || '').trim();

    if (!walletAddress || walletAddress.length > 255) {
        return res.status(400).json({ message: "A valid walletAddress is required" });
    }

    try {
        const [rows] = await db.query('SELECT id FROM wallet WHERE w_email = ?', [email]);

        if (rows.length > 0) {
            await db.query('UPDATE wallet SET address = ? WHERE w_email = ?', [walletAddress, email]);
            return res.status(200).json({ message: "Wallet address updated successfully" });
        }

        await db.query('INSERT INTO wallet (w_email, address) VALUES (?, ?)', [email, walletAddress]);
        return res.status(201).json({ message: "Wallet address saved successfully" });
    } catch (err) {
        console.error("Wallet error:", err);
        return res.status(500).json({ message: "Failed to save wallet address" });
    }
}

module.exports = { AddWalletAddress };