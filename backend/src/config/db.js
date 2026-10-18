const mysql = require('mysql2/promise');

// Hosted MySQL providers (Aiven, TiDB Cloud, ...) require TLS. Set DB_SSL=true there.
// Aiven also gives you a CA certificate: paste it into DB_CA.
let ssl;
if (process.env.DB_SSL === 'true') {
    ssl = process.env.DB_CA
        ? { ca: process.env.DB_CA.replace(/\\n/g, '\n') }
        : { minVersion: 'TLSv1.2', rejectUnauthorized: true };
}

// A pool (not a single connection) so serverless instances can reconnect cleanly.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASS || process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 5,
    ssl
});

module.exports = pool;