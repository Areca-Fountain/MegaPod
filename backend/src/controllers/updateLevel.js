const db = require('../config/db');

const MAX_LEVEL = 10; // LevelPage shows 10 levels

async function currentMaxLevel(email) {
    const [rows] = await db.query(
        `SELECT MAX(sl.level) AS max_level
         FROM student_has_student_level shsl
         JOIN student_level sl ON shsl.student_level_l_id = sl.l_id
         WHERE shsl.student_email = ?`,
        [email]
    );
    return rows[0]?.max_level || 0;
}

// The user's email now comes from the login cookie (req.user), not from the request body.
async function updateLevel(req, res) {
    const email = req.user.email;
    const level = parseInt(req.body.level, 10);

    if (!Number.isInteger(level) || level < 1 || level > MAX_LEVEL) {
        return res.status(400).json({ message: `level must be a number from 1 to ${MAX_LEVEL}` });
    }

    try {
        const maxLevel = await currentMaxLevel(email);
        if (level > maxLevel) {
            await db.query(
                'INSERT INTO student_has_student_level (student_email, student_level_l_id) VALUES (?, ?)',
                [email, level]
            );
            return res.status(200).json({ message: "Level inserted successfully" });
        }
        return res.status(200).json({ message: "No update needed. Level not increased." });
    } catch (err) {
        console.error("updateLevel error:", err);
        return res.status(500).json({ message: "Failed to update level" });
    }
}

async function getCurrentLevelByEmail(req, res) {
    try {
        const max_level = await currentMaxLevel(req.user.email);
        return res.status(200).json({ max_level });
    } catch (err) {
        console.error("getLevel error:", err);
        return res.status(500).json({ message: "Failed to get level" });
    }
}

async function getCompletedLevels(req, res) {
    try {
        const [rows] = await db.query(
            `SELECT sl.level
             FROM student_has_student_level shsl
             JOIN student_level sl ON shsl.student_level_l_id = sl.l_id
             WHERE shsl.student_email = ?
             ORDER BY sl.level ASC`,
            [req.user.email]
        );
        return res.status(200).json({ completedLevels: rows.map((r) => r.level) });
    } catch (err) {
        console.error("completedLevels error:", err);
        return res.status(500).json({ message: "Failed to get completed levels" });
    }
}

module.exports = { updateLevel, getCurrentLevelByEmail, getCompletedLevels };