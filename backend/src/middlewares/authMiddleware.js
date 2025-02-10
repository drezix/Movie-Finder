const jwt = require('jsonwebtoken');
const RevokedToken = require('../models/revokedTokenModel');
const dotenv = require('dotenv');
dotenv.config();

const requireAuth = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verificar se o token foi revogado
    const revokedToken = await RevokedToken.findOne({ token });
    if (revokedToken) {
      return res.status(403).json({ msg: 'Token has been revoked' });
    }

    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ msg: 'Invalid or expired token' });
  }
};

const logout = async (req, res) => {
  const token = req.header('Authorization');
  const revokedToken = new RevokedToken({ token });
  await revokedToken.save();
  res.status(200).json({ msg: 'Logged out successfully' });
};

module.exports = requireAuth, logout;
