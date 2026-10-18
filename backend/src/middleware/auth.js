const jwt = require('jsonwebtoken');

const COOKIE_NAME = 'megapod_token';
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

function secret() {
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not set');
    return process.env.JWT_SECRET;
}

function cookieOptions() {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
    };
}

function setAuthCookie(res, user) {
    const token = jwt.sign({ name: user.name, email: user.email }, secret(), { expiresIn: '30d' });
    res.cookie(COOKIE_NAME, token, { ...cookieOptions(), maxAge: MAX_AGE_MS });
}

function clearAuthCookie(res) {
    res.clearCookie(COOKIE_NAME, cookieOptions());
}

function readUser(req) {
    const token = req.cookies && req.cookies[COOKIE_NAME];
    if (!token) return null;
    try {
        const p = jwt.verify(token, secret());
        return { name: p.name, email: p.email };
    } catch {
        return null;
    }
}

function requireAuth(req, res, next) {
    const user = readUser(req);
    if (!user) return res.status(401).json({ message: 'Not logged in' });
    req.user = user;
    next();
}

module.exports = { setAuthCookie, clearAuthCookie, readUser, requireAuth };