const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const header = req.headers['authorization'];

    if (!header) {
        return res.status(401).json({
            message: "you're not allowed to do this"
        });
    }

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "you're not allowed to do this"
        });
    }
}

module.exports = { verifyToken };