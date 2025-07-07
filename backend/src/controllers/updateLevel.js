const db = require('../config/db');

function updateLevel(req, res) {
    const { email, level } = req.body;
    console.log("updateLevel -> req.body", req.body);
    if (!level || !email) {
        return res.status(400).json({message: "level and email are required"});
    }

    // Only insert if the new level is greater than current max level
    const checkQuery = `SELECT MAX(sl.level) AS max_level\nFROM megapod.student_has_student_level shsl\nJOIN megapod.student_level sl ON shsl.student_level_l_id = sl.l_id\nWHERE shsl.student_email = ?`;
    db.query(checkQuery, [email], (err, results) => {
        if (err) {
            console.error("Query error:", err);
            return res.status(500).json({ message: "Failed to check current level" });
        }
        const max_level = results[0]?.max_level || 0;
        if (level > max_level) {
            const insertQuery = 'INSERT INTO megapod.student_has_student_level (student_email, student_level_l_id)\n' +
                'VALUES (?, ?);';
            db.query(insertQuery, [email, level], (err) => {
                if (err) {
                    console.error("Insert error:", err);
                    return res.status(500).json({ message: "Failed to insert level" });
                }
                return res.status(200).json({ message: "Level inserted successfully" });
            });
        } else {
            return res.status(200).json({ message: "No update needed. Level not increased." });
        }
    });
}

// Get the current (max) level of a student by email (Express handler)
function getCurrentLevelByEmail(req, res) {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "email is required" });
    }
    const query = `SELECT MAX(sl.level) AS max_level\nFROM megapod.student_has_student_level shsl\nJOIN megapod.student_level sl ON shsl.student_level_l_id = sl.l_id\nWHERE shsl.student_email = ?`;
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error("Query error:", err);
            return res.status(500).json({ message: "Failed to get level" });
        }
        const max_level = results[0]?.max_level || 0;
        return res.status(200).json({ max_level });
    });
}


function getCompletedLevels(req, res) {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "email is required" });

    const query = `
        SELECT sl.level
        FROM megapod.student_has_student_level shsl
        JOIN megapod.student_level sl ON shsl.student_level_l_id = sl.l_id
        WHERE shsl.student_email = ?
        ORDER BY sl.level ASC;
    `;
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error("Query error:", err);
            return res.status(500).json({ message: "Failed to get completed levels" });
        }

        const levels = results.map(row => row.level);
        res.status(200).json({ completedLevels: levels });
    });
}


module.exports = { updateLevel, getCurrentLevelByEmail, getCompletedLevels };
