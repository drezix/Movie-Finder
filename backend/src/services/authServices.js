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



