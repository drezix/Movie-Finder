const authServices = require('../services/authServices');

exports.register = async (req, res) => {
  try {
    const user = await authServices.registerUser(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

