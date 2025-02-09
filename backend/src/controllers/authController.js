const authService = require('../services/authServices');

exports.register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { user, token } = await authService.loginUser(req.body);
    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
