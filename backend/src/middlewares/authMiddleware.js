const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const requireAuth = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ msg: 'Invalid or expired token' });
    }
};

module.exports = requireAuth;