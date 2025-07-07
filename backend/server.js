const express = require('express');
const session = require('express-session');
const cors = require('cors');
const UserRouter = require('./src/routes/user');
const WalletRouter = require('./src/routes/wallet');



const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // React frontend URL
    credentials: true
}));

app.listen(3000, () => { console.log("Server is running on http://localhost:3000"); });
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax'
    }
}));

// Simple route to check session
app.get("/session", (req, res) => {
    res.json(req.session.user || { message: 'No active session' });
});

app.get("/", (req, res) => {
    console.log("fun01 working");
    res.send("HI");
});


app.use('/user', UserRouter);


app.use("/wallet", WalletRouter);
