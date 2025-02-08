const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

dotenv.config();

exports.register = async (req, res) => {
  const { username, email, password, isAdmin = false } = req.body;
    
  try {
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 15);

    const newUser = new userModel({ username, email, password: hashedPassword, isAdmin });
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  }
  catch (error) {
    return res.status(500).json({ message: 'Error registering user' });
  }
}