const express = require('express');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

const users = [
    { username: "ADMIN", password: "ADMIN", role: "ADMIN" },
    { username: "USER", password: "USER", role: "USER" }
];

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u =>
        u.username === username && u.password === password
    );

    if (!user) {
        return res.status(400).json({
            message: "invalid credential"
        });
    }

    const token = jwt.sign(
        { role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.status(200).json({
        token: token
    });
});

router.get('/request', verifyToken, (req, res) => {

    if (req.user.role === "ADMIN") {
        return res.status(200).json({
            message: "Hi from ADMIN"
        });
    }

    if (req.user.role === "USER") {
        return res.status(200).json({
            message: "Hi from USER"
        });
    }

    return res.status(401).json({
        message: "you're not allowed to do this"
    });
});

module.exports = router;