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
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET, { expiresIn: '1h' });

    return res.status(200).json({ user, token });
  }
  catch (error) {
    return res.status(500).json({ message: 'Error logging in' });
  }
}