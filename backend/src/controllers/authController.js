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

exports.logout = async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    await authService.logoutUser(token);  
    return res.status(200).json({ msg: 'Token revoked successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error logging out', error: error.message });
  }
};
