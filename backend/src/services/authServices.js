const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const RevokedToken = require('../models/revokedTokenModel');

dotenv.config();

exports.registerUser = async ({ username, email, password, isAdmin = false }) => {
  const existingUser = await User.findOne({ username });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword, isAdmin });

  return newUser.save();
};

exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Email nao encontrado'); 
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new Error('Invalid password');

  const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return { user, token };
}

exports.logoutUser = async (token) => {
  const revokedToken = new RevokedToken({ token });
  await revokedToken.save();
};

