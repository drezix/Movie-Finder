const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

dotenv.config();

exports.registerUser = async ({ username, email, password, isAdmin = false }) => {
  const existingUser = await userModel.findOne({ username });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({ username, email, password: hashedPassword, isAdmin });

  return newUser.save();
};

exports.loginUser = async ({ username, password }) => {
  const user = await userModel.findOne({ username });
  if (!user) throw new Error('Invalid email');

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new Error('Invalid password');

  const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET, { expiresIn: '1h' });

  return { user, token };
}

