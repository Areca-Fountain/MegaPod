const path = require('path');
// Local development reads backend/src/config/.env. On Vercel the values come from Project > Settings > Environment Variables.
require('dotenv').config({ path: path.join(__dirname, 'src', 'config', '.env') });

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const UserRouter = require('./src/routes/user');
const WalletRouter = require('./src/routes/wallet');

const app = express();
app.set('trust proxy', 1);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// The deployed site talks to the API through a same-origin rewrite, so CORS only matters for local dev.
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((o) => o.trim());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get('/api', (req, res) => {
    res.send('MegaPod API is running');
});

app.use('/api/user', UserRouter);
app.use('/api/wallet', WalletRouter);

// Last-resort error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: 'Server error' });
});

// Run a listener only for local development; Vercel imports the exported app instead.
if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
}

module.exports = app;